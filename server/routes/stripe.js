// Import dependencies
const express = require('express');
const router = express.Router();
const stripeController = require('../controllers/stripeController');

// Raw body parser for webhook
const rawBodyParser = (req, res, next) => {
  if (req.originalUrl === '/api/webhook' && req.method === 'POST') {
    // Get raw body for webhook verification
    let rawBody = '';
    req.on('data', chunk => {
      rawBody += chunk.toString();
    });
    req.on('end', () => {
      req.rawBody = rawBody;
      next();
    });
  } else {
    next();
  }
};

// Apply raw body parser to all routes in this router
router.use(rawBodyParser);

/**
 * @route   POST /api/create-checkout-session
 * @desc    Create a Stripe checkout session
 * @access  Public
 */
router.post('/create-checkout-session', stripeController.createCheckoutSession);

/**
 * @route   POST /api/webhook
 * @desc    Handle Stripe webhook events
 * @access  Public
 */
router.post('/webhook', express.raw({ type: 'application/json' }), stripeController.webhook);

/**
 * @route   GET /api/checkout-success
 * @desc    Handle successful checkout (redirect route)
 * @access  Public
 */
router.get('/checkout-success', (req, res) => {
  // This is just a redirect endpoint - actual processing is done via webhooks
  res.redirect(`${process.env.CORS_ORIGIN || 'http://localhost:3000'}/checkout-success?session_id=${req.query.session_id}`);
});

/**
 * @route   GET /api/checkout-cancel
 * @desc    Handle canceled checkout (redirect route)
 * @access  Public
 */
router.get('/checkout-cancel', (req, res) => {
  // This is just a redirect endpoint
  res.redirect(`${process.env.CORS_ORIGIN || 'http://localhost:3000'}/checkout-cancel`);
});

/**
 * @route   GET /api/display-orders/:id
 * @desc    Get order details by session ID
 * @access  Public
 */
router.get('/display-orders/:id', stripeController.getOrderBySessionId);

module.exports = router;
