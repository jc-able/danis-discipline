// Import dependencies
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

/**
 * @route   POST /api/contact
 * @desc    Submit a contact form
 * @access  Public
 */
router.post('/', contactController.submitContactForm);

module.exports = router;
