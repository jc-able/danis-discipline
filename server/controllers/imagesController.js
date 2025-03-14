// Import required dependencies
const supabaseService = require('../services/supabase');

/**
 * Get all polaroid images
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - JSON response with polaroid images
 */
const getPolaroids = async (req, res) => {
  try {
    const { data, error } = await supabaseService.supabase
      .from('polaroids')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return res.status(200).json({ success: true, data });
  } catch (err) {
    console.error('Error fetching polaroid images:', err);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch polaroid images' 
    });
  }
};

/**
 * Get all testimonial images
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - JSON response with testimonial images
 */
const getTestimonials = async (req, res) => {
  try {
    const { data, error } = await supabaseService.supabase
      .from('testimonial_images')
      .select('*')
      .order('display_order', { ascending: true });
    
    if (error) throw error;
    
    return res.status(200).json({ success: true, data });
  } catch (err) {
    console.error('Error fetching testimonial images:', err);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch testimonial images' 
    });
  }
};

/**
 * Get a public URL for an image
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - JSON response with image URL
 */
const getImageUrl = async (req, res) => {
  try {
    const { bucket, filename } = req.params;
    
    // Validate allowed buckets for security
    const allowedBuckets = ['polaroids', 'testimonials', 'products', 'content'];
    if (!allowedBuckets.includes(bucket)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid bucket specified'
      });
    }
    
    // Get the URL for the image
    const publicUrl = supabaseService.getPublicUrl(bucket, filename);
    
    if (!publicUrl) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }
    
    return res.status(200).json({ 
      success: true, 
      url: publicUrl 
    });
  } catch (err) {
    console.error('Error getting image URL:', err);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to get image URL' 
    });
  }
};

module.exports = {
  getPolaroids,
  getTestimonials,
  getImageUrl
};
