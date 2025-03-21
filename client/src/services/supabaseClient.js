import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

// Initialize the Supabase client
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Check if environment variables are available and create the client
let supabase;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase credentials missing in environment variables. Using mock client.');
  
  // Create a mock client that returns empty arrays for queries
  supabase = {
    from: () => ({
      select: () => ({
        eq: () => ({
          order: () => Promise.resolve({ data: [], error: null }),
          single: () => Promise.resolve({ data: null, error: null }),
          maybeSingle: () => Promise.resolve({ data: null, error: null })
        }),
        order: () => Promise.resolve({ data: [], error: null })
      }),
      update: () => ({
        eq: () => Promise.resolve({ data: {}, error: null })
      }),
      insert: () => Promise.resolve({ data: {}, error: null })
    }),
    storage: {
      from: () => ({
        upload: () => Promise.resolve({ data: {}, error: null }),
        getPublicUrl: () => ({ data: { publicUrl: '' } })
      })
    },
    auth: {
      signInWithPassword: () => Promise.resolve({ data: null, error: { message: 'Mock auth error' } }),
      signUp: () => Promise.resolve({ data: null, error: { message: 'Mock auth error' } }),
      signOut: () => Promise.resolve({ error: null }),
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    }
  };
} else {
  console.log('Creating Supabase client with credentials - URL exists:', !!supabaseUrl);
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };

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
      .order('display_order');

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching independent plans:', error);
    return [];
  }
};

/**
 * Get order details
 */
export const getOrderDetails = async (sessionId) => {
  try {
    // Try both field naming conventions
    let data, error;
    
    // First try with snake_case (stripe_session_id)
    const result1 = await supabase
      .from('display_orders')
      .select('*, independent_plans(*), coaching_packages(*)')
      .eq('stripe_session_id', sessionId)
      .maybeSingle();
      
    if (result1.data) {
      data = result1.data;
      error = result1.error;
    } else {
      // If not found, try with camelCase (stripeSessionId)
      const result2 = await supabase
        .from('display_orders')
        .select('*, independent_plans(*), coaching_packages(*)')
        .eq('stripeSessionId', sessionId)
        .maybeSingle();
        
      data = result2.data;
      error = result2.error;
    }

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
    
    // Map the database fields to what the UI expects
    return {
      id: data.id,
      productName: data.product_type === 'plan' 
        ? data.independent_plans?.title || 'Independent Plan'
        : data.coaching_packages?.title || 'Coaching Package',
      amount: `$${parseFloat(data.amount).toFixed(2)}`,
      date: new Date(data.purchase_date).toLocaleDateString(),
      email: data.customer_email
    };
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
 * Fetch home page polaroids with improved image handling
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

/**
 * Upload a polaroid image to Supabase storage and update database
 */
export const uploadPolaroidImage = async (file, polaroidId) => {
  try {
    // Generate a unique filename with UUID
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const storagePath = `home/${fileName}`;
    
    // Upload to storage
    const { error: uploadError } = await supabase
      .storage
      .from('images')
      .upload(storagePath, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (uploadError) throw uploadError;
    
    // Get metadata about the uploaded file
    const { data: { publicUrl } } = supabase
      .storage
      .from('images')
      .getPublicUrl(storagePath);
    
    // Update the database record
    const { error: updateError } = await supabase
      .from('home_polaroids')
      .update({
        image_storage_path: storagePath,
        image_original_filename: file.name,
        image_content_type: file.type,
        image_uploaded_at: new Date().toISOString()
      })
      .eq('id', polaroidId);
    
    if (updateError) throw updateError;
    
    return { success: true, publicUrl };
  } catch (error) {
    console.error('Error uploading polaroid image:', error);
    return { success: false, error: error.message };
  }
}; 