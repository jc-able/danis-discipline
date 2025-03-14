// Script to create a Stripe product for the Grocery Shopping Guide
require('dotenv').config({ path: '../.env' });
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

/**
 * Create a product and price in Stripe
 * This script creates a product for the Grocery Shopping Guide
 * with a price of $19.99
 */
async function createProduct() {
  try {
    // Check if Stripe API key is available
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('Stripe secret key is missing in environment variables');
      process.exit(1);
    }

    console.log('Creating Stripe product for Grocery Shopping Guide...');

    // Create product
    const product = await stripe.products.create({
      name: 'HEALTHY GROCERY SHOPPING GUIDE',
      description: 'A comprehensive list of nutritious food options to keep your pantry stocked with healthy choices.',
      active: true,
      metadata: {
        product_type: 'plan',
        category: 'grocery'
      }
    });

    console.log(`Product created successfully with ID: ${product.id}`);

    // Create price
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: 1999, // $19.99 in cents
      currency: 'usd',
      active: true,
      metadata: {
        product_name: 'HEALTHY GROCERY SHOPPING GUIDE'
      }
    });

    console.log(`Price created successfully with ID: ${price.id}`);
    console.log('\nPlease save these IDs for use in the next step:');
    console.log(`Product ID: ${product.id}`);
    console.log(`Price ID: ${price.id}`);

    return {
      productId: product.id,
      priceId: price.id
    };
  } catch (error) {
    console.error('Error creating Stripe product:', error);
    process.exit(1);
  }
}

// Run the function if this script is executed directly
if (require.main === module) {
  createProduct()
    .then(() => {
      console.log('\nDone! Now you can use these IDs to add the product to Supabase.');
      process.exit(0);
    })
    .catch(error => {
      console.error('Unhandled error:', error);
      process.exit(1);
    });
}

// Export the function for use in other scripts
module.exports = { createProduct }; 