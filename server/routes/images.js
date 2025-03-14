// Import dependencies
const express = require('express');
const router = express.Router();
const imagesController = require('../controllers/imagesController');

/**
 * @route   GET /api/images/polaroids
 * @desc    Get all polaroid images
 * @access  Public
 */
router.get('/polaroids', imagesController.getPolaroids);

/**
 * @route   GET /api/images/testimonials
 * @desc    Get all testimonial images
 * @access  Public
 */
router.get('/testimonials', imagesController.getTestimonials);

/**
 * @route   GET /api/images/:bucket/:filename
 * @desc    Get a direct URL for an image
 * @access  Public
 */
router.get('/:bucket/:filename', imagesController.getImageUrl);

module.exports = router;
