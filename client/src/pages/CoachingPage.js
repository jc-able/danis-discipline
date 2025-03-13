import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Section from '../components/Section';
import Button from '../components/Button';
import { getCoachingPackages } from '../services/supabaseClient';

const HeaderSection = styled.div`
  background-color: var(--black);
  color: var(--white);
  padding: 5rem 0;
  text-align: center;
`;

const PackagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 3rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PackageCard = styled.div`
  background-color: ${props => props.featured ? 'var(--pink)' : 'var(--light-gray)'};
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const PackageTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const PackagePrice = styled.div`
  font-size: 2.5rem;
  margin: 1rem 0;
  font-weight: bold;
`;

const PackageDescription = styled.p`
  margin-bottom: 1.5rem;
  flex-grow: 1;
`;

const BenefitsList = styled.ul`
  list-style: none;
  margin: 3rem 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const BenefitItem = styled.li`
  padding-left: 2rem;
  position: relative;
  
  &:before {
    content: "✓";
    position: absolute;
    left: 0;
    color: var(--teal);
    font-weight: bold;
  }
`;

const CTASection = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: var(--teal);
  border-radius: 8px;
`;

const Loader = styled.div`
  text-align: center;
  padding: 3rem;
`;

const CoachingPage = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await getCoachingPackages();
        setPackages(data);
      } catch (error) {
        console.error('Error fetching coaching packages:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPackages();
  }, []);
  
  // Fallback coaching packages if fetching fails or none exist in database
  const fallbackPackages = [
    {
      id: 1,
      title: "1:1 COACHING SESSION",
      description: "A single coaching session to discuss your goals, current fitness level, and get personalized advice.",
      price: 50,
      duration: "Single Session",
      featured: false
    },
    {
      id: 2,
      title: "4-WEEK COACHING PACKAGE",
      description: "Four weeks of personalized coaching, including workout plans, nutrition guidance, and weekly check-ins.",
      price: 180,
      duration: "4 Weeks",
      featured: true
    },
    {
      id: 3,
      title: "12-WEEK TRANSFORMATION",
      description: "Complete 12-week transformation program with comprehensive coaching, detailed workout and nutrition plans, and regular progress tracking.",
      price: 500,
      duration: "12 Weeks",
      featured: false
    }
  ];
  
  const displayPackages = packages.length > 0 ? packages : fallbackPackages;
  
  return (
    <>
      <HeaderSection>
        <div className="container">
          <Section.Title align="center" color="white">
            1:1 <span className="italic">coaching</span>
          </Section.Title>
          <Section.Subtitle align="center" color="white" uppercase={true}>
            PERSONALIZED FITNESS & NUTRITION GUIDANCE
          </Section.Subtitle>
          <p style={{ maxWidth: '800px', margin: '0 auto' }}>
            Work directly with a certified fitness and nutrition coach to create a customized plan 
            that fits your lifestyle and helps you achieve your goals.
          </p>
        </div>
      </HeaderSection>
      
      <Section>
        {loading ? (
          <Loader>Loading packages...</Loader>
        ) : (
          <PackagesGrid>
            {displayPackages.map((pkg) => (
              <PackageCard key={pkg.id} featured={pkg.featured}>
                <PackageTitle>{pkg.title}</PackageTitle>
                <PackagePrice>${pkg.price}</PackagePrice>
                <p>{pkg.duration}</p>
                <PackageDescription>{pkg.description}</PackageDescription>
                <Button>BUY NOW</Button>
              </PackageCard>
            ))}
          </PackagesGrid>
        )}
      </Section>
      
      <Section background="light-gray">
        <div className="container">
          <Section.Title align="center">
            Why Choose 1:1 Coaching
          </Section.Title>
          <BenefitsList>
            <BenefitItem>Personalized approach tailored to your specific needs</BenefitItem>
            <BenefitItem>Expert guidance from certified coaches</BenefitItem>
            <BenefitItem>Accountability and regular check-ins</BenefitItem>
            <BenefitItem>Customized nutrition plans</BenefitItem>
            <BenefitItem>Workout programs designed for your goals</BenefitItem>
            <BenefitItem>Ongoing support and motivation</BenefitItem>
            <BenefitItem>Form corrections and technique advice</BenefitItem>
            <BenefitItem>Adjustments based on your progress</BenefitItem>
          </BenefitsList>
        </div>
      </Section>
      
      <Section>
        <div className="container">
          <CTASection>
            <Section.Title align="center">
              Ready to transform your life?
            </Section.Title>
            <p style={{ maxWidth: '800px', margin: '0 auto 2rem' }}>
              Take the first step toward achieving your fitness goals with personalized coaching
              that provides the guidance, support, and accountability you need to succeed.
            </p>
            <Button to="/contact">START NOW</Button>
          </CTASection>
        </div>
      </Section>
    </>
  );
};

export default CoachingPage; 