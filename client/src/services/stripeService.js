import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

// Initialize Stripe
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

// API base URL
const API_URL = process.env.REACT_APP_API_URL;

/**
 * Create a checkout session for a coaching package
 * @param {Object} packageDetails - The coaching package details
 * @param {Object} customerDetails - Customer details (name, email)
 */
export const createCoachingCheckout = async (packageDetails, customerDetails) => {
  try {
    const response = await axios.post(`${API_URL}/api/create-checkout-session`, {
      productType: 'coaching',
      productId: packageDetails.id,
      customerEmail: customerDetails.email,
      customerName: customerDetails.name,
      successUrl: `${window.location.origin}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${window.location.origin}/checkout-cancel`,
    });

    const { sessionId } = response.data;
    
    // Redirect to Stripe checkout
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({ sessionId });
    
    if (error) {
      console.error('Stripe checkout error:', error);
      return { success: false, error: error.message };
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return { success: false, error: error.response?.data?.message || error.message };
  }
};

/**
 * Create a checkout session for an independent plan
 * @param {Object} planDetails - The independent plan details
 * @param {Object} customerDetails - Customer details (name, email)
 */
export const createPlanCheckout = async (planDetails, customerDetails) => {
  try {
    const response = await axios.post(`${API_URL}/api/create-checkout-session`, {
      productType: 'plan',
      productId: planDetails.id,
      customerEmail: customerDetails.email,
      customerName: customerDetails.name,
      successUrl: `${window.location.origin}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${window.location.origin}/checkout-cancel`,
    });

    const { sessionId } = response.data;
    
    // Redirect to Stripe checkout
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({ sessionId });
    
    if (error) {
      console.error('Stripe checkout error:', error);
      return { success: false, error: error.message };
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return { success: false, error: error.response?.data?.message || error.message };
  }
};

/**
 * Get order details from a checkout session
 * @param {string} sessionId - The Stripe checkout session ID
 */
export const getOrderDetails = async (sessionId) => {
  try {
    const response = await axios.get(`${API_URL}/api/display-orders/${sessionId}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error fetching order details:', error);
    return { success: false, error: error.response?.data?.message || error.message };
  }
};
