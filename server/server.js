// Import required dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Apply middleware
app.use(helmet()); // Security headers
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'stripe-signature']
}));
app.use(morgan('dev')); // Logging

// Import routes
const coachingRoutes = require('./routes/coaching');
const plansRoutes = require('./routes/plans');
const contactRoutes = require('./routes/contact');
const ordersRoutes = require('./routes/orders');
const stripeRoutes = require('./routes/stripe');
const imagesRoutes = require('./routes/images');

// Apply stripe routes first (before JSON body parser)
// This is important for webhook signature verification which needs the raw body
app.use('/api', stripeRoutes); // Contains create-checkout-session, webhook, etc.

// Apply JSON body parser for other routes
app.use(express.json()); // Body parser for JSON

// Set up rate limiting to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false // Disable the `X-RateLimit-*` headers
});
app.use(limiter);

// Apply other routes
app.use('/api/coaching-packages', coachingRoutes);
app.use('/api/independent-plans', plansRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/display-orders', ordersRoutes);
app.use('/api/images', imagesRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: "Welcome to Dani's Discipline API" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; // Export for testing
