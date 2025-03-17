import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import Button from '../components/Button';

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--black);
  background-image: linear-gradient(135deg, var(--black) 0%, #111 100%);
  padding: 20px;
`;

const LoginCard = styled.div`
  background-color: var(--white);
  border-radius: 10px;
  padding: 40px;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3), 0 0 20px var(--teal), 0 0 40px rgba(255, 105, 180, 0.2);
  border-left: 5px solid var(--teal);
  border-right: 5px solid var(--pink);
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: 30px;
  
  h1 {
    font-family: 'Georgia', serif;
    font-weight: 700;
    font-size: 2.5rem;
    margin-bottom: 10px;
    position: relative;
    display: inline-block;
    color: var(--black);
    
    &::after {
      content: 'Dani\'s Discipline';
      position: absolute;
      left: -3px;
      top: 3px;
      color: var(--pink);
      z-index: -1;
    }
  }
  
  p {
    color: var(--teal);
    font-family: 'Arial', sans-serif;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 0.9rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: var(--black);
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s;
  
  &:focus {
    border-color: var(--teal);
    outline: none;
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  margin-top: 5px;
  font-size: 14px;
`;

const SuccessMessage = styled.div`
  color: #2ecc71;
  margin-top: 5px;
  font-size: 14px;
`;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate('/');
      }
    };
    
    checkSession();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      setSuccess('Login successful! Redirecting...');
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      console.error('Error logging in:', error);
      setError(error.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Logo>
          <h1>Dani's Discipline</h1>
          <p>Restricted Access</p>
        </Logo>
        
        <form onSubmit={handleLogin}>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </FormGroup>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}
          
          <Button 
            variant="primary" 
            type="submit" 
            fullWidth 
            disabled={loading}
            style={{ marginTop: '10px' }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </LoginCard>
    </LoginContainer>
  );
};

export default LoginPage; 