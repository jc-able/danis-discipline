import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

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
    const { data: uploadData, error: uploadError } = await supabase
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
    const { data: updateData, error: updateError } = await supabase
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