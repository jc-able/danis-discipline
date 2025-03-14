import React from 'react';
import styled from 'styled-components';
import Section from '../components/Section';
import Button from '../components/Button';
import { FiX } from 'react-icons/fi';

// Create a component for white text with pink shadow (like "start?")
const TealPinkEffect = styled.span`
  position: relative;
  display: inline-block;
  color: var(--white);
  font-style: italic;
  font-family: 'Georgia', serif;
  font-weight: 700;
  z-index: 2;
  
  &::before {
    content: attr(data-text);
    position: absolute;
    left: -3px;
    top: 3px;
    color: var(--pink);
    z-index: -1;
    font-family: 'Georgia', serif;
    font-weight: 700;
    text-shadow: 0 0 10px var(--pink);
  }
`;

const CancelSection = styled.div`
  padding: 5rem 0;
  text-align: center;
  background-color: var(--teal);
  color: var(--black);
  position: relative;
  overflow: hidden;
`;

const CancelIcon = styled.div`
  font-size: 5rem;
  color: var(--white);
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

const CancelTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  font-family: 'Georgia', serif;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const CancelMessage = styled.p`
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto 2rem;
  font-family: 'Arial', sans-serif;
`;

const CheckoutCancelPage = () => {
    return (
        <>
            <CancelSection>
                <div className="container">
                    <CancelIcon>
                        <FiX />
                    </CancelIcon>
                    <CancelTitle>
                        PAYMENT <TealPinkEffect data-text="cancelled">cancelled</TealPinkEffect>
                    </CancelTitle>
                    <CancelMessage>
                        Your payment has been cancelled. No charges have been made to your account.
                    </CancelMessage>
                    <div>
                        <Button to="/" variant="primary" style={{ marginRight: '1rem' }}>Return to Home</Button>
                        <Button to="/contact" variant="secondary">Contact Support</Button>
                    </div>
                </div>
            </CancelSection>
            
            <Section>
                <div className="container text-center">
                    <h2 style={{ fontFamily: 'Georgia, serif', marginBottom: '1.5rem' }}>Still Interested?</h2>
                    <p style={{ maxWidth: '800px', margin: '0 auto 2rem' }}>
                        If you have any questions about our services or encountered any issues during checkout, 
                        please don't hesitate to reach out. We're here to help!
                    </p>
                    <Button to="/contact" variant="primary">Get in Touch</Button>
                </div>
            </Section>
        </>
    );
};

export default CheckoutCancelPage; 