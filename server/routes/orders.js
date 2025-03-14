// Import dependencies
const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');

/**
 * @route   GET /api/display-orders
 * @desc    Get all orders (with optional filtering)
 * @access  Public
 */
router.get('/', ordersController.getOrders);

/**
 * @route   GET /api/display-orders/:id
 * @desc    Get a single order by ID
 * @access  Public
 */
router.get('/:id', ordersController.getOrderById);

/**
 * @route   GET /api/display-orders/customer/:email
 * @desc    Get orders by customer email
 * @access  Public
 */
router.get('/customer/:email', ordersController.getOrdersByCustomer);

/**
 * @route   GET /api/display-orders/session/:sessionId
 * @desc    Get order by Stripe session ID
 * @access  Public
 */
router.get('/session/:sessionId', ordersController.getOrderBySessionId);

module.exports = router;
