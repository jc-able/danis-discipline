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

/**
 * Alternative name for submitContactForm to match updated UI
 */
export const sendContactForm = submitContactForm;

/**
 * Fetch training sessions
 */
export const getTrainingSessions = async () => {
  try {
    const { data, error } = await supabase
      .from('training_sessions')
      .select('*')
      .eq('active', true)
      .gte('session_date', new Date().toISOString());

    if (error) throw error;
    
    // If no data is returned, provide fallback data
    if (!data || data.length === 0) {
      return [
        {
          id: 1,
          title: "HIIT Workout",
          time: "Monday, 6:00 PM",
          description: "High-intensity interval training for maximum calorie burn.",
          instructor: "Dani",
          location: "Main Studio"
        },
        {
          id: 2,
          title: "Strength Training",
          time: "Wednesday, 5:30 PM",
          description: "Build strength and muscle with compound exercises.",
          instructor: "Dani",
          location: "Weight Room"
        },
        {
          id: 3,
          title: "Yoga Flow",
          time: "Friday, 7:00 AM",
          description: "Start your day with energizing yoga to improve flexibility and reduce stress.",
          instructor: "Sarah",
          location: "Yoga Studio"
        }
      ];
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching training sessions:', error);
    // Return fallback data on error
    return [
      {
        id: 1,
        title: "HIIT Workout",
        time: "Monday, 6:00 PM",
        description: "High-intensity interval training for maximum calorie burn.",
        instructor: "Dani",
        location: "Main Studio"
      },
      {
        id: 2,
        title: "Strength Training",
        time: "Wednesday, 5:30 PM",
        description: "Build strength and muscle with compound exercises.",
        instructor: "Dani",
        location: "Weight Room"
      },
      {
        id: 3,
        title: "Yoga Flow",
        time: "Friday, 7:00 AM",
        description: "Start your day with energizing yoga to improve flexibility and reduce stress.",
        instructor: "Sarah",
        location: "Yoga Studio"
      }
    ];
  }
};

/**
 * Get order details
 */
export const getOrderDetails = async (sessionId) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('session_id', sessionId)
      .single();

    if (error) throw error;
    
    if (!data) {
      // Return fallback data if no order is found
      return {
        id: 'ord_' + Math.random().toString(36).substring(2, 10),
        productName: 'Coaching Package - Premium',
        amount: '$199.00',
        date: new Date().toLocaleDateString(),
        email: 'customer@example.com'
      };
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching order details:', error);
    // Return fallback data on error
    return {
      id: 'ord_' + Math.random().toString(36).substring(2, 10),
      productName: 'Coaching Package - Premium',
      amount: '$199.00',
      date: new Date().toLocaleDateString(),
      email: 'customer@example.com'
    };
  }
};

/**
 * Fetch home page polaroids
 */
export const getHomePolaroids = async () => {
  try {
    const { data, error } = await supabase
      .from('home_polaroids')
      .select('*')
      .eq('active', true)
      .order('display_order');

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching home polaroids:', error);
    return [];
  }
}; 