import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Section from '../components/Section';
import Button from '../components/Button';
import { getOrderDetails } from '../services/stripeService';

const SuccessContainer = styled.div`
  text-align: center;
  padding: 5rem 0;
`;

const SuccessIcon = styled.div`
  font-size: 5rem;
  color: var(--teal);
  margin-bottom: 2rem;
`;

const OrderDetailsCard = styled.div`
  background-color: var(--light-gray);
  padding: 2rem;
  border-radius: 8px;
  max-width: 600px;
  margin: 2rem auto;
  text-align: left;
`;

const OrderDetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
    padding-top: 1rem;
    border-top: 1px solid #ddd;
    font-weight: bold;
  }
`;

const Loader = styled.div`
  text-align: center;
  padding: 3rem;
`;

const ErrorMessage = styled.div`
  color: red;
  margin: 2rem 0;
`;

const CheckoutSuccessPage = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        // Get session_id from URL query parameters
        const searchParams = new URLSearchParams(location.search);
        const sessionId = searchParams.get('session_id');
        
        if (!sessionId) {
          setError('No session ID found. Please contact support.');
          setLoading(false);
          return;
        }
        
        const result = await getOrderDetails(sessionId);
        
        if (result.success && result.data) {
          setOrderDetails(result.data);
        } else {
          setError('Could not retrieve order details. Please contact support.');
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
        setError('An error occurred while fetching your order details. Please contact support.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrderDetails();
  }, [location]);
  
  // Redirect to home if accessed directly without session_id
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const sessionId = searchParams.get('session_id');
    
    if (!sessionId) {
      setTimeout(() => {
        navigate('/');
      }, 5000);
    }
  }, [location, navigate]);
  
  return (
    <Section background="teal">
      <SuccessContainer>
        <SuccessIcon>✓</SuccessIcon>
        <Section.Title align="center">Thank You For Your Purchase!</Section.Title>
        
        {loading ? (
          <Loader>Loading order details...</Loader>
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : orderDetails ? (
          <OrderDetailsCard>
            <Section.Subtitle>Order Details</Section.Subtitle>
            
            <OrderDetailRow>
              <span>Order Number:</span>
              <span>{orderDetails.id}</span>
            </OrderDetailRow>
            
            <OrderDetailRow>
              <span>Date:</span>
              <span>{new Date(orderDetails.purchaseDate).toLocaleDateString()}</span>
            </OrderDetailRow>
            
            <OrderDetailRow>
              <span>Product:</span>
              <span>{orderDetails.productName}</span>
            </OrderDetailRow>
            
            <OrderDetailRow>
              <span>Payment Status:</span>
              <span>{orderDetails.status}</span>
            </OrderDetailRow>
            
            <OrderDetailRow>
              <span>Total:</span>
              <span>${orderDetails.amount.toFixed(2)}</span>
            </OrderDetailRow>
          </OrderDetailsCard>
        ) : (
          <p>No order details available. Please contact support.</p>
        )}
        
        <p>A confirmation has been sent to your email.</p>
        <p>If you have any questions, please don't hesitate to contact us.</p>
        
        <Button to="/" style={{ marginTop: '2rem' }}>
          Return to Home
        </Button>
      </SuccessContainer>
    </Section>
  );
};

export default CheckoutSuccessPage; 