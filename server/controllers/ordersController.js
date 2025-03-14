// Import services
const supabaseService = require('../services/supabase');
const stripeService = require('../services/stripe');

/**
 * Get all orders (with optional filtering)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const getOrders = async (req, res, next) => {
  try {
    const { customerEmail, status } = req.query;
    
    // Start building the query
    let query = supabaseService.supabase.from('display_orders').select('*, independent_plans(*), coaching_packages(*)');
    
    // Apply filters if provided
    if (customerEmail) {
      query = query.eq('customerEmail', customerEmail);
    }
    
    if (status) {
      query = query.eq('status', status);
    }
    
    // Execute query
    const { data, error } = await query.order('purchaseDate', { ascending: false });
    
    if (error) throw error;
    
    res.json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * Get a single order by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ message: 'Order ID is required' });
    }
    
    const { data, error } = await supabaseService.supabase
      .from('display_orders')
      .select('*, independent_plans(*), coaching_packages(*)')
      .eq('id', id)
      .single();
    
    if (error) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * Get orders by customer email
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const getOrdersByCustomer = async (req, res, next) => {
  try {
    const { email } = req.params;
    
    if (!email) {
      return res.status(400).json({ message: 'Customer email is required' });
    }
    
    const { data, error } = await supabaseService.supabase
      .from('display_orders')
      .select('*, independent_plans(*), coaching_packages(*)')
      .eq('customerEmail', email)
      .order('purchaseDate', { ascending: false });
    
    if (error) throw error;
    
    res.json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * Get order by Stripe session ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const getOrderBySessionId = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    
    if (!sessionId) {
      return res.status(400).json({ message: 'Session ID is required' });
    }
    
    // Try to get from Supabase first
    const { data, error } = await supabaseService.supabase
      .from('display_orders')
      .select('*, independent_plans(*), coaching_packages(*)')
      .eq('stripeSessionId', sessionId)
      .single();
    
    // If found in Supabase, return it
    if (!error && data) {
      return res.json(data);
    }
    
    // If not found in Supabase, try to get from Stripe directly
    try {
      const orderDetails = await stripeService.getOrderBySessionId(sessionId);
      return res.json(orderDetails);
    } catch (stripeError) {
      return res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOrders,
  getOrderById,
  getOrdersByCustomer,
  getOrderBySessionId
};
