// Import services
const stripeService = require('../services/stripe');
const emailService = require('../services/email');
const Joi = require('joi');

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
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const createCheckoutSession = async (req, res, next) => {
  try {
    // Validate request body
    const { error, value } = checkoutSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: error.details.map(detail => detail.message) 
      });
    }
    
    // Create checkout session
    const session = await stripeService.createCheckoutSession(value);
    
    res.json({ 
      sessionId: session.id
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    
    if (error.message === 'Product not found') {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    next(error);
  }
};

/**
 * Handle webhook events from Stripe
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const webhook = async (req, res, next) => {
  try {
    console.log('Webhook request received');
    
    // Get the signature from headers
    const signature = req.headers['stripe-signature'];
    
    if (!signature) {
      console.error('Stripe signature is missing in headers');
      return res.status(400).json({ message: 'Stripe signature is missing' });
    }
    
    console.log('Processing webhook with signature:', signature.substring(0, 10) + '...');
    
    // Process webhook event
    const result = await stripeService.handleWebhookEvent(signature, req.rawBody);
    
    console.log('Webhook processed successfully. Event type:', result.event);
    
    // If this was a successful checkout, send confirmation email
    if (result.event === 'checkout.session.completed' && result.data) {
      const order = result.data;
      
      console.log('Sending purchase confirmation email to:', order.customerEmail);
      
      // Send purchase confirmation email (async, don't wait)
      emailService.sendPurchaseConfirmation(order).catch(err => {
        console.error('Error sending purchase confirmation email:', err);
      });
    }
    
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
 * Get order details by session ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const getOrderBySessionId = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ message: 'Session ID is required' });
    }
    
    const orderDetails = await stripeService.getOrderBySessionId(id);
    
    if (!orderDetails) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(orderDetails);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCheckoutSession,
  webhook,
  getOrderBySessionId
};
