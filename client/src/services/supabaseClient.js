import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase credentials missing in environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Fetch all coaching packages
 */
export const getCoachingPackages = async () => {
  try {
    const { data, error } = await supabase
      .from('coaching_packages')
      .select('*')
      .eq('active', true)
      .order('price');

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching coaching packages:', error);
    return [];
  }
};

/**
 * Fetch all independent plans
 */
export const getIndependentPlans = async () => {
  try {
    const { data, error } = await supabase
      .from('independent_plans')
      .select('*')
      .eq('active', true)
      .order('order');

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching independent plans:', error);
    return [];
  }
};

/**
 * Fetch all certifications
 */
export const getCertifications = async () => {
  try {
    const { data, error } = await supabase
      .from('certifications')
      .select('*')
      .order('year', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching certifications:', error);
    return [];
  }
};

/**
 * Subscribe to newsletter
 */
export const subscribeToNewsletter = async (name, email) => {
  try {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ name, email, active: true }]);

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Submit contact form
 */
export const submitContactForm = async (formData) => {
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([{ 
        name: formData.name, 
        email: formData.email, 
        subject: formData.subject, 
        message: formData.message,
        isRead: false
      }]);

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return { success: false, error: error.message };
  }
}; 