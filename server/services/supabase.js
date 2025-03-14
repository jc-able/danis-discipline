// Import required dependencies
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase credentials missing in environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Generic function to get all records from a table
 * @param {string} table - Table name
 * @param {Object} options - Query options
 * @returns {Promise<Array>} - Results
 */
const getAll = async (table, options = {}) => {
  try {
    let query = supabase.from(table).select('*');

    // Apply filters if provided
    if (options.filters) {
      for (const [key, value] of Object.entries(options.filters)) {
        query = query.eq(key, value);
      }
    }

    // Apply order if provided
    if (options.orderBy) {
      query = query.order(options.orderBy, { ascending: options.ascending });
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching from ${table}:`, error);
    throw error;
  }
};

/**
 * Get a single record by ID
 * @param {string} table - Table name
 * @param {string} id - Record ID
 * @returns {Promise<Object>} - Result
 */
const getById = async (table, id) => {
  try {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching ${table} with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Insert a new record
 * @param {string} table - Table name
 * @param {Object} record - Record to insert
 * @returns {Promise<Object>} - Inserted record
 */
const insert = async (table, record) => {
  try {
    const { data, error } = await supabase
      .from(table)
      .insert([record])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error inserting into ${table}:`, error);
    throw error;
  }
};

/**
 * Update an existing record
 * @param {string} table - Table name
 * @param {string} id - Record ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} - Updated record
 */
const update = async (table, id, updates) => {
  try {
    const { data, error } = await supabase
      .from(table)
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error updating ${table} with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Upload a file to Supabase storage
 * @param {string} bucket - Storage bucket name
 * @param {string} path - File path in storage
 * @param {File} file - File to upload
 * @returns {Promise<Object>} - Upload result
 */
const uploadFile = async (bucket, path, file) => {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

/**
 * Get a public URL for a file
 * @param {string} bucket - Storage bucket name
 * @param {string} path - File path in storage
 * @returns {string} - Public URL
 */
const getPublicUrl = (bucket, path) => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
};

module.exports = {
  supabase,
  getAll,
  getById,
  insert,
  update,
  uploadFile,
  getPublicUrl
};
