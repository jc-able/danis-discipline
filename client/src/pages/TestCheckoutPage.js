import React, { useState, useEffect } from 'react';
import { createPlanCheckout } from '../services/stripeService';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: #fff;
  min-height: calc(100vh - 200px);
`;

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 20px;
  text-align: center;
  color: #000;
`;

const Subtitle = styled.h2`
  font-size: 24px;
  margin-bottom: 30px;
  text-align: center;
  color: #555;
`;

const ProductCard = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
  border-radius: 10px;
  background-color: #8CDCD9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

const ProductTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 15px;
  color: #000;
`;

const ProductDescription = styled.p`
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 20px;
  color: #333;
`;

const Price = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #000;
`;

const Button = styled.button`
  background-color: #E686D3;
  color: white;
  border: none;
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d06bbe;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const Message = styled.div`
  margin-top: 20px;
  padding: 15px;
  border-radius: 5px;
  text-align: center;
  
  &.success {
    background-color: #d4edda;
    color: #155724;
  }
  
  &.error {
    background-color: #f8d7da;
    color: #721c24;
  }
`;

// Test Checkout Page Component
const TestCheckoutPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);

  // Fetch product data on component mount
  useEffect(() => {
    // For testing purposes, we're using a mock product
    // In a real implementation, you'd fetch this from the API
    setProduct({
      id: 'grocery-guide', // This will be replaced by the actual ID from the database
      title: 'HEALTHY GROCERY SHOPPING GUIDE',
      description: 'A comprehensive list of nutritious food options to keep your pantry stocked with healthy choices.',
      price: 19.99
    });
  }, []);

  // Handle checkout
  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Customer details would typically come from a form
      // For testing, we're hardcoding them
      const customerDetails = {
        name: 'Test Customer',
        email: 'test@example.com'
      };
      
      const result = await createPlanCheckout(product, customerDetails);
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to create checkout session');
      }
      
      // The redirect will happen in the service
    } catch (err) {
      setError(err.message || 'An error occurred during checkout');
      setLoading(false);
    }
  };

  if (!product) {
    return (
      <Container>
        <Title>Loading...</Title>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Test Checkout Page</Title>
      <Subtitle>Testing Stripe Integration with the Grocery Shopping Guide</Subtitle>
      
      <ProductCard>
        <ProductTitle>{product.title}</ProductTitle>
        <ProductDescription>{product.description}</ProductDescription>
        <Price>${product.price.toFixed(2)}</Price>
        <Button 
          onClick={handleCheckout} 
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Buy Now'}
        </Button>
        
        {error && (
          <Message className="error">
            Error: {error}
          </Message>
        )}
      </ProductCard>
    </Container>
  );
};

export default TestCheckoutPage; 