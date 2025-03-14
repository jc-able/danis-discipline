// Import required dependencies
require('dotenv').config();
const nodemailer = require('nodemailer');

// Initialize email transporter based on environment variables
const createTransporter = () => {
  // Check if email configuration is available
  if (!process.env.EMAIL_SERVICE || !process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.warn('Email configuration missing. Email functionality will be unavailable.');
    return null;
  }

  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

// Create transporter on module load
const transporter = createTransporter();

/**
 * Send an email
 * @param {Object} options - Email options
 * @returns {Promise<Object>} - Email sending result
 */
const sendEmail = async (options) => {
  try {
    // If transporter is not available, log and skip
    if (!transporter) {
      console.warn('Email not sent: Email service not configured');
      return { success: false, message: 'Email service not configured' };
    }

    const { to, subject, text, html } = options;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text, // Plain text version
      html  // HTML version (optional)
    };

    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Send a purchase confirmation email
 * @param {Object} order - Order details
 * @returns {Promise<Object>} - Email sending result
 */
const sendPurchaseConfirmation = async (order) => {
  try {
    const productType = order.productType === 'coaching' ? 'Coaching Package' : 'Fitness Plan';
    const productName = order.productType === 'coaching' 
      ? order.coaching_packages?.title || 'Coaching Package'
      : order.independent_plans?.title || 'Fitness Plan';
    
    const subject = `Order Confirmation - ${productName}`;
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #8CDCD9; color: #000; padding: 20px; text-align: center;">
          <h1>Thank You for Your Purchase!</h1>
        </div>
        
        <div style="padding: 20px;">
          <p>Hello ${order.customerName},</p>
          
          <p>Thank you for purchasing the <strong>${productName}</strong>.</p>
          
          <div style="background-color: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px;">
            <h3>Order Details:</h3>
            <p><strong>Order ID:</strong> ${order.id}</p>
            <p><strong>Product:</strong> ${productType} - ${productName}</p>
            <p><strong>Amount:</strong> $${order.amount.toFixed(2)}</p>
            <p><strong>Date:</strong> ${new Date(order.purchaseDate).toLocaleDateString()}</p>
          </div>
          
          <p>If you have any questions about your purchase, please don't hesitate to contact us.</p>
          
          <p>Best regards,<br>Dani's Discipline Team</p>
        </div>
        
        <div style="background-color: #E686D3; color: #fff; padding: 15px; text-align: center;">
          <p>&copy; ${new Date().getFullYear()} Dani's Discipline. All rights reserved.</p>
        </div>
      </div>
    `;
    
    const text = `
      Thank You for Your Purchase!
      
      Hello ${order.customerName},
      
      Thank you for purchasing the ${productName}.
      
      Order Details:
      Order ID: ${order.id}
      Product: ${productType} - ${productName}
      Amount: $${order.amount.toFixed(2)}
      Date: ${new Date(order.purchaseDate).toLocaleDateString()}
      
      If you have any questions about your purchase, please don't hesitate to contact us.
      
      Best regards,
      Dani's Discipline Team
    `;
    
    return await sendEmail({
      to: order.customerEmail,
      subject,
      text,
      html
    });
  } catch (error) {
    console.error('Error sending purchase confirmation:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Send a contact form submission confirmation
 * @param {Object} submission - Contact form submission
 * @returns {Promise<Object>} - Email sending result
 */
const sendContactConfirmation = async (submission) => {
  try {
    const subject = `Thank you for contacting Dani's Discipline`;
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #8CDCD9; color: #000; padding: 20px; text-align: center;">
          <h1>We've Received Your Message</h1>
        </div>
        
        <div style="padding: 20px;">
          <p>Hello ${submission.name},</p>
          
          <p>Thank you for contacting Dani's Discipline. We've received your message and will get back to you as soon as possible.</p>
          
          <div style="background-color: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px;">
            <h3>Your Message:</h3>
            <p><strong>Subject:</strong> ${submission.subject}</p>
            <p><strong>Message:</strong> ${submission.message}</p>
          </div>
          
          <p>If you have any additional questions, please don't hesitate to reach out.</p>
          
          <p>Best regards,<br>Dani's Discipline Team</p>
        </div>
        
        <div style="background-color: #E686D3; color: #fff; padding: 15px; text-align: center;">
          <p>&copy; ${new Date().getFullYear()} Dani's Discipline. All rights reserved.</p>
        </div>
      </div>
    `;
    
    const text = `
      We've Received Your Message
      
      Hello ${submission.name},
      
      Thank you for contacting Dani's Discipline. We've received your message and will get back to you as soon as possible.
      
      Your Message:
      Subject: ${submission.subject}
      Message: ${submission.message}
      
      If you have any additional questions, please don't hesitate to reach out.
      
      Best regards,
      Dani's Discipline Team
    `;
    
    return await sendEmail({
      to: submission.email,
      subject,
      text,
      html
    });
  } catch (error) {
    console.error('Error sending contact confirmation:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Send an internal notification for contact form submission
 * @param {Object} submission - Contact form submission
 * @returns {Promise<Object>} - Email sending result
 */
const sendContactNotification = async (submission) => {
  try {
    // If no admin email is configured, skip
    if (!process.env.ADMIN_EMAIL) {
      console.warn('Admin email not sent: ADMIN_EMAIL not configured');
      return { success: false, message: 'Admin email not configured' };
    }
    
    const subject = `New Contact Form Submission: ${submission.subject}`;
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #8CDCD9; color: #000; padding: 20px; text-align: center;">
          <h1>New Contact Form Submission</h1>
        </div>
        
        <div style="padding: 20px;">
          <p>A new contact form submission has been received:</p>
          
          <div style="background-color: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px;">
            <p><strong>Name:</strong> ${submission.name}</p>
            <p><strong>Email:</strong> ${submission.email}</p>
            <p><strong>Subject:</strong> ${submission.subject}</p>
            <p><strong>Message:</strong> ${submission.message}</p>
            <p><strong>Date:</strong> ${new Date(submission.date).toLocaleString()}</p>
          </div>
          
          <p>This submission has been recorded in the Supabase database.</p>
        </div>
      </div>
    `;
    
    const text = `
      New Contact Form Submission
      
      A new contact form submission has been received:
      
      Name: ${submission.name}
      Email: ${submission.email}
      Subject: ${submission.subject}
      Message: ${submission.message}
      Date: ${new Date(submission.date).toLocaleString()}
      
      This submission has been recorded in the Supabase database.
    `;
    
    return await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject,
      text,
      html
    });
  } catch (error) {
    console.error('Error sending contact notification:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendEmail,
  sendPurchaseConfirmation,
  sendContactConfirmation,
  sendContactNotification
};
