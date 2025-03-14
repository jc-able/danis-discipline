// Import dependencies
const express = require('express');
const router = express.Router();
const coachingController = require('../controllers/coachingController');

/**
 * @route   GET /api/coaching-packages
 * @desc    Get all coaching packages
 * @access  Public
 */
router.get('/', coachingController.getAllCoachingPackages);

/**
 * @route   GET /api/coaching-packages/availability
 * @desc    Check if coaching services are available
 * @access  Public
 */
router.get('/availability', coachingController.checkCoachingAvailability);

/**
 * @route   GET /api/coaching-packages/:id
 * @desc    Get a single coaching package by ID
 * @access  Public
 */
router.get('/:id', coachingController.getCoachingPackageById);

module.exports = router;
