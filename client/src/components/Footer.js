import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: var(--black);
  color: var(--white);
  padding: 3rem 0 2rem;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterHeading = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  color: var(--pink);
`;

const FooterLink = styled(Link)`
  color: var(--white);
  text-decoration: none;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--pink);
  }
`;

const FooterText = styled.p`
  margin-bottom: 0.5rem;
`;

const FooterBottom = styled.div`
  border-top: 1px solid #333;
  margin-top: 2rem;
  padding-top: 1.5rem;
  text-align: center;
`;

const CurrentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <FooterContainer>
      <div className="container">
        <FooterContent>
          <FooterSection>
            <FooterHeading>Dani's Discipline</FooterHeading>
            <FooterText>Personalized fitness & nutrition coaching to help you achieve your goals without limits.</FooterText>
          </FooterSection>
          
          <FooterSection>
            <FooterHeading>Quick Links</FooterHeading>
            <FooterLink to="/">Home</FooterLink>
            <FooterLink to="/coaching">1:1 Coaching</FooterLink>
            <FooterLink to="/plans">Independent Plans</FooterLink>
            <FooterLink to="/training">Training</FooterLink>
            <FooterLink to="/about">About Me</FooterLink>
            <FooterLink to="/contact">Contact</FooterLink>
          </FooterSection>
          
          <FooterSection>
            <FooterHeading>Contact</FooterHeading>
            <FooterText>Email: info@danisdiscipline.com</FooterText>
            <FooterText>Phone: (123) 456-7890</FooterText>
          </FooterSection>
          
          <FooterSection>
            <FooterHeading>Follow Me</FooterHeading>
            <FooterLink to="https://instagram.com" target="_blank">Instagram</FooterLink>
            <FooterLink to="https://facebook.com" target="_blank">Facebook</FooterLink>
            <FooterLink to="https://youtube.com" target="_blank">YouTube</FooterLink>
          </FooterSection>
        </FooterContent>
        
        <FooterBottom>
          <FooterText>© {CurrentYear} Dani's Discipline. All rights reserved.</FooterText>
        </FooterBottom>
      </div>
    </FooterContainer>
  );
};

export default Footer; 