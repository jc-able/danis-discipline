// Import dependencies
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

/**
 * Get order details by session ID
 * @param {Object} req - HTTP request object
 * @param {Object} res - HTTP response object
 */
const getOrderBySessionId = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ message: 'Session ID is required' });
    }
    
    // Query order from database
    const { data: order, error } = await supabase
      .from('display_orders')
      .select(`
        id,
        customer_email,
        customer_name,
        product_type,
        product_id,
        amount,
        stripe_session_id,
        status,
        purchase_date
      `)
      .eq('stripe_session_id', id)
      .single();
    
    if (error || !order) {
      console.error('Error fetching order:', error);
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Get product details based on type
    let productDetails = null;
    
    if (order.product_type === 'plan') {
      const { data: plan } = await supabase
        .from('independent_plans')
        .select('title, description')
        .eq('id', order.product_id)
        .single();
      
      productDetails = plan;
    } else if (order.product_type === 'coaching') {
      // For future implementation
      productDetails = { title: 'Coaching package', description: 'Details unavailable' };
    }
    
    // Return combined data
    res.json({
      ...order,
      product: productDetails
    });
  } catch (error) {
    console.error('Error getting order details:', error);
    res.status(500).json({ 
      message: 'Error getting order details',
      error: process.env.NODE_ENV === 'production' ? 'Server error' : error.message
    });
  }
};

module.exports = { getOrderBySessionId }; 