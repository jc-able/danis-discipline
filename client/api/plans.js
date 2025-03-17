// Import dependencies
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

/**
 * Get all active independent plans
 * @param {Object} req - HTTP request object
 * @param {Object} res - HTTP response object
 */
const getIndependentPlans = async (req, res) => {
  try {
    // Query active plans from database, ordered by display_order
    const { data, error } = await supabase
      .from('independent_plans')
      .select('*')
      .eq('active', true)
      .order('display_order', { ascending: true });
    
    if (error) {
      console.error('Error fetching plans:', error);
      return res.status(500).json({ message: 'Error fetching plans' });
    }
    
    res.json(data);
  } catch (error) {
    console.error('Error getting plans:', error);
    res.status(500).json({ 
      message: 'Error getting plans',
      error: process.env.NODE_ENV === 'production' ? 'Server error' : error.message
    });
  }
};

module.exports = { getIndependentPlans }; 