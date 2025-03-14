// Import dependencies
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Contact routes have been deprecated since the contact_messages table has been removed
// and contact functionality has been replaced with a social media link tree.
// This file is kept for reference but its functionality is no longer in use.

module.exports = router;
