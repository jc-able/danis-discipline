// Script to add the Grocery Shopping Guide product to Supabase
require('dotenv').config({ path: '../.env' });
const supabaseService = require('../services/supabase');

/**
 * Add the grocery shopping guide plan to the independent_plans table
 * @param {string} stripeProductId - Stripe product ID
 * @param {string} stripePriceId - Stripe price ID (optional)
 */
async function addPlanToSupabase(stripeProductId, stripePriceId = null) {
  try {
    console.log('Adding Grocery Shopping Guide to Supabase...');

    // Check if plan already exists
    const existingPlans = await supabaseService.getAll('independent_plans', {
      filters: { title: 'HEALTHY GROCERY SHOPPING GUIDE' }
    });

    if (existingPlans && existingPlans.length > 0) {
      console.log('Plan already exists in Supabase. Updating instead...');
      
      const planId = existingPlans[0].id;
      const updatedPlan = await supabaseService.update('independent_plans', planId, {
        stripe_product_id: stripeProductId,
        updated_at: new Date().toISOString()
      });
      
      console.log(`Plan updated successfully with ID: ${updatedPlan.id}`);
      return updatedPlan;
    }

    // Create new plan
    const newPlan = {
      title: 'HEALTHY GROCERY SHOPPING GUIDE',
      description: 'A comprehensive list of nutritious food options to keep your pantry stocked with healthy choices.',
      icon: 'shopping-cart',
      display_order: 1,
      stripe_product_id: stripeProductId,
      price: 19.99,
      active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Add metadata for price ID if provided
    if (stripePriceId) {
      newPlan.stripe_price_id = stripePriceId;
    }

    const result = await supabaseService.insert('independent_plans', newPlan);
    
    console.log(`Plan added successfully with ID: ${result.id}`);
    return result;
  } catch (error) {
    console.error('Error adding plan to Supabase:', error);
    throw error;
  }
}

// Run the function if this script is executed directly
if (require.main === module) {
  // Check if product ID was provided as a command-line argument
  const stripeProductId = process.argv[2];
  const stripePriceId = process.argv[3];
  
  if (!stripeProductId) {
    console.error('Please provide a Stripe product ID as an argument');
    console.log('Usage: node addPlanToSupabase.js <stripeProductId> [stripePriceId]');
    process.exit(1);
  }
  
  addPlanToSupabase(stripeProductId, stripePriceId)
    .then(result => {
      console.log('\nDone! The plan has been added to Supabase.');
      console.log(`Plan ID: ${result.id}`);
      process.exit(0);
    })
    .catch(error => {
      console.error('Unhandled error:', error);
      process.exit(1);
    });
}

// Export the function for use in other scripts
module.exports = { addPlanToSupabase }; 