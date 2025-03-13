import React from 'react';
import styled from 'styled-components';
import Section from '../components/Section';
import Button from '../components/Button';

const CancelContainer = styled.div`
  text-align: center;
  padding: 5rem 0;
`;

const CancelIcon = styled.div`
  font-size: 5rem;
  color: var(--pink);
  margin-bottom: 2rem;
`;

const CheckoutCancelPage = () => {
  return (
    <Section background="light-gray">
      <CancelContainer>
        <CancelIcon>✕</CancelIcon>
        <Section.Title align="center">Your Purchase Was Canceled</Section.Title>
        <p>Your payment was not processed. No charges were made to your account.</p>
        <p>If you encountered any issues during checkout, please don't hesitate to contact us.</p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
          <Button to="/">Return to Home</Button>
          <Button to="/contact" variant="secondary">Contact Support</Button>
        </div>
      </CancelContainer>
    </Section>
  );
};

export default CheckoutCancelPage; 