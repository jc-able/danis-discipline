import React from 'react';
import styled from 'styled-components';
import Section from '../components/Section';
import Button from '../components/Button';

const HeaderSection = styled.div`
  background-color: var(--black);
  color: var(--white);
  padding: 5rem 0;
  text-align: center;
`;

const ContentSection = styled.div`
  padding: 4rem 0;
`;

const TrainingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  margin-top: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TrainingCard = styled.div`
  background-color: var(--light-gray);
  border-radius: 8px;
  overflow: hidden;
`;

const TrainingImage = styled.div`
  height: 250px;
  background-color: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

const TrainingContent = styled.div`
  padding: 2rem;
`;

const TrainingTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--black);
`;

const CTASection = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: var(--teal);
  border-radius: 8px;
  margin-top: 4rem;
`;

const TrainingPage = () => {
  return (
    <>
      <HeaderSection>
        <div className="container">
          <Section.Title align="center" color="white">
            <span className="italic">training</span> programs
          </Section.Title>
          <Section.Subtitle align="center" color="white" uppercase={true}>
            EFFECTIVE WORKOUTS FOR EVERY FITNESS LEVEL
          </Section.Subtitle>
          <p style={{ maxWidth: '800px', margin: '0 auto' }}>
            Discover our range of training programs designed to help you build strength, 
            endurance, and overall fitness regardless of your starting point.
          </p>
        </div>
      </HeaderSection>
      
      <Section>
        <ContentSection>
          <Section.Title align="center">
            Our Training <span className="italic">Programs</span>
          </Section.Title>
          
          <TrainingGrid>
            <TrainingCard>
              <TrainingImage>IMAGE PLACEHOLDER</TrainingImage>
              <TrainingContent>
                <TrainingTitle>Strength Building</TrainingTitle>
                <p>
                  Comprehensive strength training program designed to build muscle, 
                  increase power, and improve overall physical performance.
                </p>
                <Button style={{ marginTop: '1rem' }}>LEARN MORE</Button>
              </TrainingContent>
            </TrainingCard>
            
            <TrainingCard>
              <TrainingImage>IMAGE PLACEHOLDER</TrainingImage>
              <TrainingContent>
                <TrainingTitle>Fat Loss</TrainingTitle>
                <p>
                  Effective program combining high-intensity interval training and 
                  strength work to maximize fat loss while preserving muscle.
                </p>
                <Button style={{ marginTop: '1rem' }}>LEARN MORE</Button>
              </TrainingContent>
            </TrainingCard>
            
            <TrainingCard>
              <TrainingImage>IMAGE PLACEHOLDER</TrainingImage>
              <TrainingContent>
                <TrainingTitle>Functional Fitness</TrainingTitle>
                <p>
                  Training focused on movement patterns that improve everyday activities, 
                  prevent injuries, and enhance overall mobility and stability.
                </p>
                <Button style={{ marginTop: '1rem' }}>LEARN MORE</Button>
              </TrainingContent>
            </TrainingCard>
            
            <TrainingCard>
              <TrainingImage>IMAGE PLACEHOLDER</TrainingImage>
              <TrainingContent>
                <TrainingTitle>Athletic Performance</TrainingTitle>
                <p>
                  Specialized program for athletes looking to improve sport-specific 
                  performance, power, speed, agility, and recovery.
                </p>
                <Button style={{ marginTop: '1rem' }}>LEARN MORE</Button>
              </TrainingContent>
            </TrainingCard>
          </TrainingGrid>
          
          <CTASection>
            <Section.Title align="center">
              Find the Right Program for You
            </Section.Title>
            <p style={{ maxWidth: '800px', margin: '0 auto 2rem' }}>
              Not sure which program is best for your goals? Contact us for a 
              free consultation to discuss your needs and find the perfect fit.
            </p>
            <Button to="/contact">CONTACT US</Button>
          </CTASection>
        </ContentSection>
      </Section>
    </>
  );
};

export default TrainingPage; 