// Import dependencies
const Stripe = require('stripe');
const { createClient } = require('@supabase/supabase-js');
const Joi = require('joi');

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Initialize Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Validation schema for checkout session
const checkoutSchema = Joi.object({
  productType: Joi.string().valid('coaching', 'plan').required(),
  productId: Joi.string().required(),
  customerEmail: Joi.string().email().required(),
  customerName: Joi.string().min(2).max(100).required(),
  successUrl: Joi.string().uri().required(),
  cancelUrl: Joi.string().uri().required()
});

/**
 * Create a checkout session
 * @param {Object} req - HTTP request object
 * @param {Object} res - HTTP response object
 */
const createCheckoutSession = async (req, res) => {
  try {
    // Get request body (with serverless function handling)
    const body = req.body;
    
    // Validate request body
    const { error, value } = checkoutSchema.validate(body);
    
    if (error) {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: error.details.map(detail => detail.message) 
      });
    }
    
    // Destructure validated data
    const { productType, productId, customerEmail, customerName, successUrl, cancelUrl } = value;
    
    let productDetails = null;
    let lineItems = [];
    
    // Get product details based on type
    if (productType === 'plan') {
      // Query independent plan from Supabase
      const { data, error } = await supabase
        .from('independent_plans')
        .select('title, price, stripe_product_id')
        .eq('id', productId)
        .eq('active', true)
        .single();
      
      if (error || !data) {
        return res.status(404).json({ message: 'Product not found' });
      }
      
      productDetails = data;
      
      // Create line items for stripe
      lineItems = [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: productDetails.title,
            },
            unit_amount: Math.round(productDetails.price * 100),
          },
          quantity: 1,
        },
      ];
    } else if (productType === 'coaching') {
      // For future implementation of coaching packages
      return res.status(404).json({ message: 'Coaching packages not implemented yet' });
    }
    
    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: customerEmail,
      client_reference_id: productId,
      metadata: {
        productType,
        customerName,
        productId
      }
    });
    
    // Return session ID
    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    
    if (error.message === 'Product not found') {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.status(500).json({ 
      message: 'Error creating checkout session',
      error: process.env.NODE_ENV === 'production' ? 'Server error' : error.message
    });
  }
};

module.exports = { createCheckoutSession }; 