import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';

/**
 * A wrapper component that protects routes by checking if the user is authenticated
 * Redirects to login page if not authenticated
 */
const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check for active session
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }
        
        // If session exists, user is authenticated
        setAuthenticated(!!data.session);
      } catch (error) {
        console.error('Error checking authentication:', error);
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // If we're still loading, show nothing or a loading spinner
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        backgroundColor: 'var(--black)',
        color: 'var(--white)',
      }}>
        <div>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            borderRadius: '50%', 
            border: '4px solid var(--teal)',
            borderTopColor: 'var(--pink)',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px auto'
          }} />
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // If authenticated, render the protected component
  // Otherwise, redirect to login page
  return authenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute; 