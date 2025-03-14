import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Section from '../components/Section';
import Button from '../components/Button';
import { getCoachingPackages } from '../services/supabaseClient';

// Create a component for white text with pink shadow (like "training")
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

const HeaderSection = styled.div`
  background-color: var(--teal);
  color: var(--black);
  padding: 5rem 0;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const HeaderTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  font-family: 'Georgia', serif;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeaderSubtitle = styled.p`
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-family: 'Georgia', serif;
  font-weight: 700;
  color: var(--white);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
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
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
  }
`;

const PackageTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-family: 'Georgia', serif;
  font-weight: 600;
`;

const PackagePrice = styled.div`
  font-size: 2.5rem;
  margin: 1rem 0;
  font-weight: bold;
  font-family: 'Georgia', serif;
  color: ${props => props.featured ? 'var(--white)' : 'var(--pink)'};
  text-shadow: ${props => props.featured ? '1px 1px 2px rgba(0, 0, 0, 0.2)' : 'none'};
`;

const PackageDescription = styled.p`
  margin-bottom: 1.5rem;
  font-family: 'Arial', sans-serif;
`;

const SectionTitle = styled.h2`
  font-family: 'Georgia', serif;
  font-weight: 600;
  color: var(--black);
  margin-bottom: 1.5rem;
  text-align: center;
`;

const FeatureList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 2rem 0;
  text-align: left;
  flex-grow: 1;
  font-family: 'Arial', sans-serif;
`;

const FeatureItem = styled.li`
  margin-bottom: 0.75rem;
  padding-left: 2rem;
  position: relative;
  
  &::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: ${props => props.featured ? 'var(--white)' : 'var(--pink)'};
  }
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
      featured: false,
      features: [
        "Initial fitness assessment",
        "Personalized guidance",
        "Goal setting session",
        "Exercise technique review"
      ]
    },
    {
      id: 2,
      title: "4-WEEK COACHING PACKAGE",
      description: "Four weeks of personalized coaching, including workout plans, nutrition guidance, and weekly check-ins.",
      price: 180,
      duration: "4 Weeks",
      featured: true,
      features: [
        "Personalized workout program",
        "Nutrition guidance",
        "Weekly check-ins",
        "Progress tracking",
        "Email support"
      ]
    },
    {
      id: 3,
      title: "12-WEEK TRANSFORMATION",
      description: "Complete 12-week transformation program with comprehensive coaching, detailed workout and nutrition plans, and regular progress tracking.",
      price: 500,
      duration: "12 Weeks",
      featured: false,
      features: [
        "Complete personalized program",
        "Weekly check-ins",
        "Detailed nutrition plan",
        "Exercise technique coaching",
        "Progress reports",
        "24/7 chat support"
      ]
    }
  ];
  
  const displayPackages = packages.length > 0 ? packages : fallbackPackages;
  
  return (
    <>
      <HeaderSection>
        <div className="container">
          <HeaderTitle>
            1:1 <TealPinkEffect data-text="coaching">coaching</TealPinkEffect>
          </HeaderTitle>
          <HeaderSubtitle>Personalized plans for your success</HeaderSubtitle>
        </div>
      </HeaderSection>
      
      <Section>
        <div className="container">
          <SectionTitle>Choose Your Coaching Package</SectionTitle>
          <p style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 2rem' }}>
            All coaching packages include personalized plans, regular check-ins, 
            and adjustments based on your progress and feedback.
          </p>
          
          {loading ? (
            <p>Loading packages...</p>
          ) : (
            <PackagesGrid>
              {displayPackages.map((pkg) => (
                <PackageCard key={pkg.id} featured={pkg.featured}>
                  <PackageTitle>{pkg.title}</PackageTitle>
                  <PackageDescription>{pkg.description}</PackageDescription>
                  <PackagePrice featured={pkg.featured}>${pkg.price}</PackagePrice>
                  <p>{pkg.duration}</p>
                  
                  <FeatureList>
                    {(pkg.features || []).map((feature, index) => (
                      <FeatureItem key={index} featured={pkg.featured}>
                        {feature}
                      </FeatureItem>
                    ))}
                  </FeatureList>
                  
                  <Button 
                    to={`/checkout?package=${pkg.id}`} 
                    variant={pkg.featured ? 'secondary' : 'primary'}
                    fullWidth
                  >
                    Select Package
                  </Button>
                </PackageCard>
              ))}
            </PackagesGrid>
          )}
        </div>
      </Section>
      
      <Section backgroundColor="var(--teal)">
        <div className="container text-center">
          <SectionTitle>Not Sure Which Package Is Right For You?</SectionTitle>
          <p style={{ maxWidth: '800px', margin: '0 auto 2rem' }}>
            Schedule a free 15-minute consultation call to discuss your goals, 
            and I'll recommend the best option for your needs.
          </p>
          <Button to="/contact" variant="primary">Book a Consultation</Button>
        </div>
      </Section>
    </>
  );
};

export default CoachingPage; 