// Import required dependencies
require('dotenv').config();
const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const helmet = require('helmet');

// Initialize Express app
const app = express();

// Apply middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'stripe-signature']
}));

// Import route handlers
const { createCheckoutSession } = require('./stripe/checkout');
const { handleWebhook } = require('./stripe/webhook');
const { getOrderBySessionId } = require('./stripe/orders');
const { getIndependentPlans } = require('./plans');

// Raw body parser for webhook
const rawBodyParser = (req, res, next) => {
  if (req.url === '/api/webhook' && req.method === 'POST') {
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

// Apply raw body parser
app.use(rawBodyParser);

// API routes
app.post('/api/create-checkout-session', createCheckoutSession);
app.post('/api/webhook', express.raw({ type: 'application/json' }), handleWebhook);
app.get('/api/display-orders/:id', getOrderBySessionId);
app.get('/api/independent-plans', getIndependentPlans);

// Checkout success/cancel redirect routes
app.get('/api/checkout-success', (req, res) => {
  res.redirect(`${process.env.CORS_ORIGIN || '/'}/checkout-success?session_id=${req.query.session_id}`);
});

app.get('/api/checkout-cancel', (req, res) => {
  res.redirect(`${process.env.CORS_ORIGIN || '/'}/checkout-cancel`);
});

// Root route
app.get('/api', (req, res) => {
  res.json({ message: "Welcome to Dani's Discipline API" });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? 'Server error' : err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Export the serverless handler
module.exports = serverless(app); 