// Script to assist with testing Stripe webhooks
require('dotenv').config({ path: '../.env' });
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

/**
 * This script provides instructions for testing webhooks with Stripe CLI
 * It does not run actual webhook tests, but guides you through the process
 */

console.log(`
========================================================
STRIPE WEBHOOK TESTING GUIDE
========================================================

To test Stripe webhooks locally, follow these steps:

1. Install the Stripe CLI: 
   https://stripe.com/docs/stripe-cli

2. Login to your Stripe account with the CLI:
   $ stripe login

3. Start listening for webhook events and forward them to your local server:
   $ stripe listen --forward-to http://localhost:3001/api/webhook

4. Stripe CLI will provide a webhook signing secret. Copy this value and 
   update your .env file with:
   STRIPE_WEBHOOK_SECRET=your_webhook_signing_secret

5. In a separate terminal, trigger a test webhook event:
   $ stripe trigger checkout.session.completed

6. Check your server logs to see if the webhook was properly received and processed.

Other useful test events:
- $ stripe trigger payment_intent.succeeded
- $ stripe trigger payment_intent.payment_failed

Note: Keep the Stripe CLI running in listen mode while testing your checkout flow.
The CLI will forward webhook events from Stripe to your local server.

========================================================
`);

// Optional: If Stripe secret key is set, show some basic account info
if (process.env.STRIPE_SECRET_KEY) {
  (async () => {
    try {
      const account = await stripe.account.retrieve();
      console.log(`Connected to Stripe account: ${account.display_name || account.id}`);
      console.log(`Account country: ${account.country}`);
      console.log(`Account status: ${account.charges_enabled ? 'Active' : 'Inactive'}`);
      console.log('\nYour Stripe integration is ready for testing!');
    } catch (error) {
      console.error('Error connecting to Stripe:', error.message);
      console.log('Please check your Stripe API key in the .env file.');
    }
  })();
} else {
  console.log('Stripe secret key not found in .env file. Please add it before proceeding.');
} 