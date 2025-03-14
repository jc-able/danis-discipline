// Import dependencies
const express = require('express');
const router = express.Router();
const plansController = require('../controllers/plansController');

/**
 * @route   GET /api/independent-plans
 * @desc    Get all independent plans
 * @access  Public
 */
router.get('/', plansController.getAllPlans);

/**
 * @route   GET /api/independent-plans/featured
 * @desc    Get featured plans for homepage
 * @access  Public
 */
router.get('/featured', plansController.getFeaturedPlans);

/**
 * @route   GET /api/independent-plans/:id
 * @desc    Get a single independent plan by ID
 * @access  Public
 */
router.get('/:id', plansController.getPlanById);

module.exports = router;
