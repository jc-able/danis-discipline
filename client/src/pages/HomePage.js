import React from 'react';
import styled from 'styled-components';
import Section from '../components/Section';
import Button from '../components/Button';

// Styled components for the home page
const HeroSection = styled.div`
  height: 85vh;
  background-color: var(--black);
  color: var(--white);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const DownArrow = styled.div`
  position: absolute;
  bottom: 2rem;
  font-size: 2rem;
  animation: bounce 2s infinite;
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-20px);
    }
    60% {
      transform: translateY(-10px);
    }
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled.div`
  background-color: var(--pink);
  padding: 2rem;
  border-radius: 4px;
  text-align: center;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
  }
`;

const ServiceImage = styled.div`
  height: 150px;
  background-color: #d371be; /* Placeholder for image */
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  font-weight: bold;
`;

const ServiceTitle = styled.h3`
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureImage = styled.div`
  height: 400px;
  background-color: #7ac7c4; /* Placeholder for image */
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--black);
  font-weight: bold;
`;

const FeatureContent = styled.div`
  padding: 2rem;
`;

const FeatureList = styled.ul`
  list-style: none;
  margin: 2rem 0;
`;

const FeatureItem = styled.li`
  margin-bottom: 1rem;
  padding-left: 1.5rem;
  position: relative;
  
  &:before {
    content: "✓";
    position: absolute;
    left: 0;
    color: var(--teal);
    font-weight: bold;
  }
`;

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <HeroSection>
        <HeroTitle>Dani's Discipline</HeroTitle>
        <HeroSubtitle>Achieve Goals Without Limits</HeroSubtitle>
        <DownArrow>↓</DownArrow>
      </HeroSection>
      
      {/* Services Section */}
      <Section background="white" padding="5rem 0">
        <Section.Title align="center">
          LET'S WORK <span className="italic">together</span>
        </Section.Title>
        <p style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem' }}>
          Discover personalized coaching and fitness plans designed to help you achieve your goals.
          Whether you're looking for one-on-one guidance or self-directed programs, we have options to fit your needs.
        </p>
        
        <ServicesGrid>
          <ServiceCard>
            <ServiceImage>IMAGE PLACEHOLDER</ServiceImage>
            <ServiceTitle>1:1 COACHING</ServiceTitle>
            <p>Personalized fitness and nutrition guidance tailored to your specific goals and needs.</p>
            <Button to="/coaching" style={{ marginTop: '1rem' }}>Learn More</Button>
          </ServiceCard>
          
          <ServiceCard>
            <ServiceImage>IMAGE PLACEHOLDER</ServiceImage>
            <ServiceTitle>INDEPENDENT PLANS</ServiceTitle>
            <p>Self-guided fitness and nutrition plans for those who prefer to work at their own pace.</p>
            <Button to="/plans" style={{ marginTop: '1rem' }}>Learn More</Button>
          </ServiceCard>
          
          <ServiceCard>
            <ServiceImage>IMAGE PLACEHOLDER</ServiceImage>
            <ServiceTitle>WORKOUT PROGRAMS</ServiceTitle>
            <p>Structured workout programs designed to help you build strength, endurance, and overall fitness.</p>
            <Button to="/training" style={{ marginTop: '1rem' }}>Learn More</Button>
          </ServiceCard>
        </ServicesGrid>
      </Section>
      
      {/* CTA Section */}
      <Section background="teal" padding="4rem 0">
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <Section.Title align="center">
            WHERE DO I <span className="italic">start?</span>
          </Section.Title>
          <p>
            Not sure which option is right for you? Start with a consultation to discuss your goals and find the perfect fit for your fitness journey.
          </p>
          <Button to="/contact" style={{ marginTop: '2rem' }}>START NOW</Button>
        </div>
      </Section>
      
      {/* Feature Section */}
      <Section background="white" padding="5rem 0">
        <FeatureGrid>
          <FeatureImage>IMAGE PLACEHOLDER</FeatureImage>
          <FeatureContent>
            <Section.Title>
              1:1 <span className="italic">COACHING</span>
            </Section.Title>
            <p>
              Work directly with a certified fitness and nutrition coach to create a customized plan that fits your lifestyle and helps you achieve your goals.
            </p>
            
            <FeatureList>
              <FeatureItem>12 WEEKS LONG</FeatureItem>
              <FeatureItem>1:1 PERSONAL COACH</FeatureItem>
              <FeatureItem>PERSONALIZED NUTRITION PLAN</FeatureItem>
              <FeatureItem>CUSTOM WORKOUT ROUTINE</FeatureItem>
              <FeatureItem>WEEKLY CHECK-INS</FeatureItem>
              <FeatureItem>ONGOING SUPPORT</FeatureItem>
            </FeatureList>
            
            <Button to="/coaching">LEARN MORE</Button>
          </FeatureContent>
        </FeatureGrid>
      </Section>
    </>
  );
};

export default HomePage; 