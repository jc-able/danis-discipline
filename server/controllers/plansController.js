// Import services
const supabaseService = require('../services/supabase');

/**
 * Get all independent plans
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const getAllPlans = async (req, res, next) => {
  try {
    // Only return active plans by default, sorted by display order
    const data = await supabaseService.getAll('independent_plans', {
      filters: { active: true },
      orderBy: 'display_order',
      ascending: true
    });
    
    res.json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * Get a single independent plan by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const getPlanById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ message: 'Plan ID is required' });
    }
    
    const data = await supabaseService.getById('independent_plans', id);
    
    if (!data) {
      return res.status(404).json({ message: 'Plan not found' });
    }
    
    res.json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * Get details for featured plans (for homepage)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const getFeaturedPlans = async (req, res, next) => {
  try {
    // Get featured plans marked as active and featured
    const { data, error } = await supabaseService.supabase
      .from('independent_plans')
      .select('*')
      .eq('active', true)
      .order('display_order', { ascending: true })
      .limit(3); // Limit to first 3 plans for featuring
    
    if (error) throw error;
    
    res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPlans,
  getPlanById,
  getFeaturedPlans
};
