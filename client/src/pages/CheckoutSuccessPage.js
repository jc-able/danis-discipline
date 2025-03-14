import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Section from '../components/Section';
import Button from '../components/Button';
import { FiCheckCircle } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';
import { getOrderDetails } from '../services/supabaseClient';

// Create a component for black text with teal shadow (like "together")
const PinkTealEffect = styled.span`
  position: relative;
  display: inline-block;
  color: var(--black);
  font-style: italic;
  font-family: 'Georgia', serif;
  font-weight: 700;
  z-index: 2;
  
  &::before {
    content: attr(data-text);
    position: absolute;
    left: -3px;
    top: 3px;
    color: var(--teal);
    z-index: -1;
    font-family: 'Georgia', serif;
    font-weight: 700;
    text-shadow: 0 0 10px var(--teal);
  }
`;

const SuccessSection = styled.div`
  padding: 5rem 0;
  text-align: center;
  background-color: var(--teal);
  color: var(--black);
  position: relative;
  overflow: hidden;
`;

const SuccessIcon = styled.div`
  font-size: 5rem;
  color: var(--white);
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

const SuccessTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  font-family: 'Georgia', serif;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const SuccessMessage = styled.p`
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto 2rem;
  font-family: 'Arial', sans-serif;
`;

const OrderDetailsCard = styled.div`
  background-color: var(--white);
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  margin: 2rem auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: left;
`;

const OrderDetailTitle = styled.h2`
  font-family: 'Georgia', serif;
  font-weight: 600;
  color: var(--black);
  margin-bottom: 1.5rem;
`;

const OrderDetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
`;

const OrderDetailLabel = styled.div`
  font-weight: bold;
  font-family: 'Arial', sans-serif;
`;

const OrderDetailValue = styled.div`
  font-family: 'Arial', sans-serif;
`;

const CheckoutSuccessPage = () => {
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    
    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                // In a real app, you would extract the session_id from the URL
                // and use it to fetch the order details from your backend
                const searchParams = new URLSearchParams(location.search);
                const sessionId = searchParams.get('session_id');
                
                if (sessionId) {
                    const details = await getOrderDetails(sessionId);
                    setOrderDetails(details);
                } else {
                    // Fallback for demo purposes
                    setOrderDetails({
                        id: 'ord_' + Math.random().toString(36).substring(2, 10),
                        productName: 'Coaching Package - Premium',
                        amount: '$199.00',
                        date: new Date().toLocaleDateString(),
                        email: 'customer@example.com'
                    });
                }
            } catch (error) {
                console.error('Error fetching order details:', error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchOrderDetails();
    }, [location]);
    
    return (
        <>
            <SuccessSection>
                <div className="container">
                    <SuccessIcon>
                        <FiCheckCircle />
                    </SuccessIcon>
                    <SuccessTitle>
                        PAYMENT <PinkTealEffect data-text="successful!">successful!</PinkTealEffect>
                    </SuccessTitle>
                    <SuccessMessage>
                        Thank you for your purchase. Your order has been processed successfully. 
                        A confirmation email has been sent to your email address.
                    </SuccessMessage>
                    
                    {loading ? (
                        <p>Loading order details...</p>
                    ) : (
                        <OrderDetailsCard>
                            <OrderDetailTitle>Order Details</OrderDetailTitle>
                            <OrderDetailRow>
                                <OrderDetailLabel>Order ID:</OrderDetailLabel>
                                <OrderDetailValue>{orderDetails.id}</OrderDetailValue>
                            </OrderDetailRow>
                            <OrderDetailRow>
                                <OrderDetailLabel>Product:</OrderDetailLabel>
                                <OrderDetailValue>{orderDetails.productName}</OrderDetailValue>
                            </OrderDetailRow>
                            <OrderDetailRow>
                                <OrderDetailLabel>Amount:</OrderDetailLabel>
                                <OrderDetailValue>{orderDetails.amount}</OrderDetailValue>
                            </OrderDetailRow>
                            <OrderDetailRow>
                                <OrderDetailLabel>Date:</OrderDetailLabel>
                                <OrderDetailValue>{orderDetails.date}</OrderDetailValue>
                            </OrderDetailRow>
                            <OrderDetailRow>
                                <OrderDetailLabel>Email:</OrderDetailLabel>
                                <OrderDetailValue>{orderDetails.email}</OrderDetailValue>
                            </OrderDetailRow>
                        </OrderDetailsCard>
                    )}
                    
                    <div>
                        <Button to="/" variant="primary">Return to Home</Button>
                    </div>
                </div>
            </SuccessSection>
            
            <Section>
                <div className="container text-center">
                    <h2 style={{ fontFamily: 'Georgia, serif', marginBottom: '1.5rem' }}>What's Next?</h2>
                    <p style={{ maxWidth: '800px', margin: '0 auto 2rem' }}>
                        I'll be in touch with you shortly to schedule our first session or provide access to your purchased plan.
                        Please check your email for further instructions.
                    </p>
                    <Button to="/contact" variant="secondary">Have Questions?</Button>
                </div>
            </Section>
        </>
    );
};

export default CheckoutSuccessPage; 