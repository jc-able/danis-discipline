// Import services
const supabaseService = require('../services/supabase');
const emailService = require('../services/email');
const Joi = require('joi');

// Validation schema for contact form submissions
const contactSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required()
    .messages({
      'string.min': 'Name must be at least 2 characters long',
      'string.max': 'Name cannot exceed 100 characters',
      'any.required': 'Name is required'
    }),
  email: Joi.string().email().required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),
  subject: Joi.string().trim().min(3).max(200).required()
    .messages({
      'string.min': 'Subject must be at least 3 characters long',
      'string.max': 'Subject cannot exceed 200 characters',
      'any.required': 'Subject is required'
    }),
  message: Joi.string().trim().min(10).max(5000).required()
    .messages({
      'string.min': 'Message must be at least 10 characters long',
      'string.max': 'Message cannot exceed 5000 characters',
      'any.required': 'Message is required'
    })
});

/**
 * Submit a contact form
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const submitContactForm = async (req, res) => {
  try {
    // Validate request body
    const { error, value } = contactSchema.validate(req.body, { abortEarly: false });
    
    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.context.key,
        message: detail.message
      }));
      return res.status(400).json({ success: false, errors });
    }

    const { name, email, subject, message } = value;
    
    // Store contact form submission in database
    const { data, error: dbError } = await supabaseService.getClient()
      .from('contact_submissions')
      .insert({
        name,
        email,
        subject,
        message,
        status: 'pending'
      });
    
    if (dbError) {
      console.error('Error storing contact form submission:', dbError);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to submit contact form. Please try again later.' 
      });
    }

    // Send notification email to admin
    const adminEmailContent = {
      to: process.env.ADMIN_EMAIL || 'admin@danisdiscipline.com',
      subject: `New Contact Form: ${subject}`,
      text: `New contact form submission from ${name} (${email}):\n\n${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <div>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        </div>
      `
    };
    
    // Send confirmation email to user
    const userEmailContent = {
      to: email,
      subject: 'Thank you for contacting Dani\'s Discipline',
      text: `Hi ${name},\n\nThank you for contacting Dani's Discipline. We have received your message and will get back to you as soon as possible.\n\nRegards,\nDani's Discipline Team`,
      html: `
        <h2>Thank You for Contacting Dani's Discipline</h2>
        <p>Hi ${name},</p>
        <p>Thank you for contacting Dani's Discipline. We have received your message and will get back to you as soon as possible.</p>
        <p>Regards,<br>Dani's Discipline Team</p>
      `
    };

    // Send both emails
    try {
      await Promise.all([
        emailService.sendEmail(adminEmailContent),
        emailService.sendEmail(userEmailContent)
      ]);
    } catch (emailError) {
      console.error('Error sending notification emails:', emailError);
      // Continue execution - emails failing shouldn't prevent success response
      // but we should log it for monitoring
    }

    return res.status(201).json({ 
      success: true, 
      message: 'Your message has been submitted successfully. We will get back to you soon!' 
    });
    
  } catch (err) {
    console.error('Unexpected error in contact form submission:', err);
    return res.status(500).json({ 
      success: false, 
      message: 'An unexpected error occurred. Please try again later.' 
    });
  }
};

module.exports = {
  submitContactForm
};
