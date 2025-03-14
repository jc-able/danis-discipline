// Import required dependencies
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const supabaseService = require('./supabase');

if (!process.env.STRIPE_SECRET_KEY) {
  console.error('Stripe secret key missing in environment variables');
  process.exit(1);
}

/**
 * Create a checkout session for a product
 * @param {Object} options - Options for creating the checkout session
 * @returns {Promise<Object>} - Stripe checkout session
 */
const createCheckoutSession = async (options) => {
  try {
    const {
      productType,
      productId,
      customerEmail,
      customerName,
      successUrl,
      cancelUrl
    } = options;

    // Get product details from Supabase
    let product;
    if (productType === 'coaching') {
      product = await supabaseService.getById('coaching_packages', productId);
    } else if (productType === 'plan') {
      product = await supabaseService.getById('independent_plans', productId);
    } else {
      throw new Error('Invalid product type');
    }

    if (!product) {
      throw new Error('Product not found');
    }

    // Format price (Stripe requires amount in cents)
    const priceInCents = Math.round(product.price * 100);
    
    // Create the session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.title,
              description: product.description,
            },
            unit_amount: priceInCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: customerEmail,
      metadata: {
        productType,
        productId,
        customerName
      }
    });

    // Store order in database
    await supabaseService.insert('display_orders', {
      customerEmail,
      customerName,
      productType,
      productId,
      amount: product.price,
      stripeSessionId: session.id,
      status: 'pending',
      purchaseDate: new Date().toISOString()
    });

    return session;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

/**
 * Handle webhook events from Stripe
 * @param {string} signature - Stripe signature header
 * @param {Object} rawBody - Raw request body
 * @returns {Promise<Object>} - Event details and processing result
 */
const handleWebhookEvent = async (signature, rawBody) => {
  try {
    // Verify event using Stripe's webhook secret
    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        
        // Update order status in database
        const { data, error } = await supabaseService.supabase
          .from('display_orders')
          .update({
            status: 'completed',
            stripePaymentId: session.payment_intent,
            updatedAt: new Date().toISOString()
          })
          .eq('stripeSessionId', session.id)
          .select();

        if (error) throw error;
        
        return { event: event.type, success: true, data };
      }
      
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object;
        
        // Get the session ID from payment intent
        const paymentId = paymentIntent.id;
        const sessions = await stripe.checkout.sessions.list({
          payment_intent: paymentId
        });
        
        if (sessions && sessions.data.length > 0) {
          const sessionId = sessions.data[0].id;
          
          // Update order status in database
          const { data, error } = await supabaseService.supabase
            .from('display_orders')
            .update({
              status: 'failed',
              updatedAt: new Date().toISOString()
            })
            .eq('stripeSessionId', sessionId)
            .select();
            
          if (error) throw error;
        }
        
        return { event: event.type, success: true };
      }
      
      default:
        return { event: event.type, success: true };
    }
  } catch (error) {
    console.error('Error handling webhook event:', error);
    throw error;
  }
};

/**
 * Get order details by session ID
 * @param {string} sessionId - Stripe checkout session ID
 * @returns {Promise<Object>} - Order details
 */
const getOrderBySessionId = async (sessionId) => {
  try {
    const { data, error } = await supabaseService.supabase
      .from('display_orders')
      .select('*, independent_plans(*), coaching_packages(*)')
      .eq('stripeSessionId', sessionId)
      .single();
      
    if (error) throw error;
    
    // If order isn't found, fetch directly from Stripe
    if (!data) {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      return {
        id: sessionId,
        status: session.status,
        customerEmail: session.customer_email,
        amount: session.amount_total / 100,
        purchaseDate: new Date(session.created * 1000).toISOString()
      };
    }
    
    return data;
  } catch (error) {
    console.error('Error getting order by session ID:', error);
    throw error;
  }
};

module.exports = {
  createCheckoutSession,
  handleWebhookEvent,
  getOrderBySessionId,
  stripe // Export the Stripe instance for direct access if needed
};
