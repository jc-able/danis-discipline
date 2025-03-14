import React from 'react';
import styled from 'styled-components';
import Button from '../components/Button';

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

const NotFoundSection = styled.div`
  padding: 5rem 0;
  text-align: center;
  background-color: var(--teal);
  color: var(--black);
  position: relative;
  overflow: hidden;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const NotFoundCode = styled.div`
  font-size: 8rem;
  font-weight: bold;
  margin-bottom: 1rem;
  font-family: 'Georgia', serif;
  color: var(--white);
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 6rem;
  }
`;

const NotFoundTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  font-family: 'Georgia', serif;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const NotFoundMessage = styled.p`
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto 2rem;
  font-family: 'Arial', sans-serif;
`;

const NotFoundPage = () => {
    return (
        <NotFoundSection>
            <div className="container">
                <NotFoundCode>404</NotFoundCode>
                <NotFoundTitle>
                    PAGE NOT <TealPinkEffect data-text="found">found</TealPinkEffect>
                </NotFoundTitle>
                <NotFoundMessage>
                    The page you are looking for might have been removed, 
                    had its name changed, or is temporarily unavailable.
                </NotFoundMessage>
                <Button to="/" variant="primary">Return to Home</Button>
            </div>
        </NotFoundSection>
    );
};

export default NotFoundPage; 