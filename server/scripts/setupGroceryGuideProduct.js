// Script to set up the Grocery Shopping Guide product in Stripe and Supabase
require('dotenv').config();
const { createProduct } = require('./createStripeProduct');
const { addPlanToSupabase } = require('./addPlanToSupabase');

/**
 * Set up the Grocery Shopping Guide product in both Stripe and Supabase
 * This script:
 * 1. Creates the product in Stripe
 * 2. Gets the Stripe product ID
 * 3. Adds the product to Supabase with the Stripe product ID
 */
async function setupGroceryGuideProduct() {
  try {
    console.log('========================================');
    console.log('GROCERY SHOPPING GUIDE PRODUCT SETUP');
    console.log('========================================\n');
    
    // Step 1: Create the product in Stripe
    console.log('STEP 1: Creating product in Stripe...\n');
    const { productId, priceId } = await createProduct();
    
    console.log('\nSTEP 1 COMPLETED: Product created in Stripe!');
    console.log(`Product ID: ${productId}`);
    console.log(`Price ID: ${priceId}\n`);
    
    // Step 2: Add the product to Supabase
    console.log('STEP 2: Adding product to Supabase...\n');
    const plan = await addPlanToSupabase(productId, priceId);
    
    console.log('\nSTEP 2 COMPLETED: Product added to Supabase!');
    console.log(`Database ID: ${plan.id}\n`);
    
    // Final summary
    console.log('========================================');
    console.log('SETUP COMPLETED SUCCESSFULLY!');
    console.log('========================================\n');
    console.log('The Grocery Shopping Guide product has been set up in both Stripe and Supabase.');
    console.log('You can now test the checkout flow at: http://localhost:3000/test-checkout\n');
    console.log('Next steps:');
    console.log('1. Make sure your webhook secret is properly set in the .env file');
    console.log('2. Run the testStripeWebhook.js script for webhook testing instructions');
    console.log('3. Start both client and server applications\n');
    
    return { 
      success: true, 
      productId, 
      priceId, 
      planId: plan.id 
    };
  } catch (error) {
    console.error('\nERROR DURING SETUP:', error);
    console.log('\nPlease check the error message above and try again.');
    return { 
      success: false, 
      error: error.message 
    };
  }
}

// Run the function if this script is executed directly
if (require.main === module) {
  setupGroceryGuideProduct()
    .then(result => {
      if (!result.success) {
        process.exit(1);
      }
      process.exit(0);
    })
    .catch(error => {
      console.error('Unhandled error:', error);
      process.exit(1);
    });
}

module.exports = { setupGroceryGuideProduct }; 