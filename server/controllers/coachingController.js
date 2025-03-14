// Import services
const supabaseService = require('../services/supabase');

/**
 * Get all coaching packages
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const getAllCoachingPackages = async (req, res, next) => {
  try {
    // Only return active packages, sorted by price
    const data = await supabaseService.getAll('coaching_packages', {
      filters: { active: true },
      orderBy: 'price',
      ascending: true
    });
    
    if (process.env.HIDE_COACHING === 'true') {
      // If coaching is hidden (future phase), return empty array
      return res.json([]);
    }
    
    res.json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * Get a single coaching package by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const getCoachingPackageById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ message: 'Coaching package ID is required' });
    }
    
    if (process.env.HIDE_COACHING === 'true') {
      // If coaching is hidden (future phase), return not found
      return res.status(404).json({ message: 'Coaching packages are not available at this time' });
    }
    
    const data = await supabaseService.getById('coaching_packages', id);
    
    if (!data) {
      return res.status(404).json({ message: 'Coaching package not found' });
    }
    
    // Check if the package is active
    if (!data.active) {
      return res.status(404).json({ message: 'Coaching package is not currently available' });
    }
    
    res.json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * Check if coaching is available
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const checkCoachingAvailability = (req, res) => {
  res.json({ 
    available: process.env.HIDE_COACHING !== 'true',
    message: process.env.HIDE_COACHING === 'true' 
      ? 'Coaching services will be available soon.' 
      : 'Coaching services are available.'
  });
};

module.exports = {
  getAllCoachingPackages,
  getCoachingPackageById,
  checkCoachingAvailability
};
