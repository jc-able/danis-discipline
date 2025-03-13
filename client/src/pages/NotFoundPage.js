import React from 'react';
import styled from 'styled-components';
import Section from '../components/Section';
import Button from '../components/Button';

const NotFoundContainer = styled.div`
  text-align: center;
  padding: 5rem 0;
`;

const NotFoundTitle = styled.h1`
  font-size: 5rem;
  margin-bottom: 1rem;
  color: var(--pink);
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const NotFoundSubtitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const NotFoundPage = () => {
  return (
    <Section background="teal">
      <NotFoundContainer>
        <NotFoundTitle>404</NotFoundTitle>
        <NotFoundSubtitle>Page Not Found</NotFoundSubtitle>
        <p>Sorry, the page you are looking for doesn't exist or has been moved.</p>
        <Button to="/" style={{ marginTop: '2rem' }}>
          Back to Home
        </Button>
      </NotFoundContainer>
    </Section>
  );
};

export default NotFoundPage; 