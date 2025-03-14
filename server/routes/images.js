// Import dependencies
const express = require('express');
const router = express.Router();
const imagesController = require('../controllers/imagesController');

/**
 * @route   GET /api/images/testimonials
 * @desc    Get all testimonial images
 * @access  Public
 */
router.get('/testimonials', imagesController.getTestimonials);

/**
 * @route   GET /api/images/url
 * @desc    Get a public URL for an image
 * @access  Public
 */
router.get('/url', imagesController.getImageUrl);

module.exports = router;
