// Test script to check if environment variables are loading correctly
require('dotenv').config();
const path = require('path');

console.log('Testing environment variable loading:');
console.log('STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY ? 'Found (starts with ' + process.env.STRIPE_SECRET_KEY.substring(0, 10) + '...)' : 'Not found');
console.log('STRIPE_WEBHOOK_SECRET:', process.env.STRIPE_WEBHOOK_SECRET ? 'Found' : 'Not found');
console.log('NODE_ENV:', process.env.NODE_ENV || 'Not set');
console.log('Current directory:', process.cwd());
console.log('Looking for .env file in:', path.resolve(process.cwd(), '.env')); 