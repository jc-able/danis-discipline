// Import dependencies
const Stripe = require('stripe');
const { createClient } = require('@supabase/supabase-js');

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Initialize Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

/**
 * Handle webhook events from Stripe
 * @param {Object} req - HTTP request object
 * @param {Object} res - HTTP response object
 */
const handleWebhook = async (req, res) => {
  try {
    console.log('Webhook request received');
    
    // Get the signature from headers
    const signature = req.headers['stripe-signature'];
    
    if (!signature) {
      console.error('Stripe signature is missing in headers');
      return res.status(400).json({ message: 'Stripe signature is missing' });
    }
    
    console.log('Processing webhook with signature:', signature.substring(0, 10) + '...');
    
    // Verify and construct the event
    const event = stripe.webhooks.constructEvent(
      req.rawBody || req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    
    console.log('Webhook event verified:', event.type);
    
    // Handle different event types
    if (event.type === 'checkout.session.completed') {
      await handleCheckoutComplete(event.data.object);
    }
    
    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    
    if (error.type === 'StripeSignatureVerificationError') {
      console.error('Signature verification failed. Check STRIPE_WEBHOOK_SECRET.');
    }
    
    // Still return 200 to avoid Stripe retrying
    res.status(200).json({ 
      received: true,
      error: error.message
    });
  }
};

/**
 * Handle successful checkout completion
 * @param {Object} session - Stripe checkout session
 */
const handleCheckoutComplete = async (session) => {
  try {
    // Extract data from session
    const {
      id: sessionId,
      client_reference_id: productId,
      customer_email: customerEmail,
      amount_total: amount,
      payment_intent: paymentIntent,
      metadata
    } = session;
    
    const { customerName, productType } = metadata || {};
    
    // Record the order in Supabase
    const { data, error } = await supabase
      .from('display_orders')
      .insert({
        customer_email: customerEmail,
        customer_name: customerName,
        product_type: productType,
        product_id: productId,
        amount: amount / 100, // Convert from cents to dollars
        stripe_session_id: sessionId,
        stripe_payment_id: paymentIntent,
        status: 'completed',
        purchase_date: new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error recording order in database:', error);
      throw new Error('Failed to record order');
    }
    
    // Send confirmation email (would be implemented in a separate service)
    // await sendConfirmationEmail(data);
    
    console.log('Order recorded successfully:', data.id);
    return data;
  } catch (error) {
    console.error('Error processing checkout completion:', error);
    throw error;
  }
};

module.exports = { handleWebhook }; 