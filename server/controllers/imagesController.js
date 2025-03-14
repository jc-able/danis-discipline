// Import required dependencies
const supabaseService = require('../services/supabase');

/**
 * Get testimonial images
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - JSON response with testimonial images
 */
const getTestimonials = async (req, res) => {
  try {
    const { data, error } = await supabaseService.supabase
      .from('testimonials')
      .select('*')
      .order('display_order');
    
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
 * Generate public URL for an image
 * @param {Object} req - Express request object with path query param
 * @param {Object} res - Express response object
 * @returns {Object} - JSON response with public URL
 */
const getImageUrl = async (req, res) => {
  try {
    const { path } = req.query;
    
    if (!path) {
      return res.status(400).json({
        success: false,
        message: 'Image path is required'
      });
    }
    
    // Generate public URL
    const { data } = supabaseService.supabase
      .storage
      .from('images')
      .getPublicUrl(path);
    
    if (!data || !data.publicUrl) {
      return res.status(404).json({
        success: false,
        message: 'Image not found or URL generation failed'
      });
    }
    
    return res.status(200).json({
      success: true,
      url: data.publicUrl
    });
  } catch (err) {
    console.error('Error generating image URL:', err);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to generate image URL' 
    });
  }
};

module.exports = {
  getTestimonials,
  getImageUrl
};
