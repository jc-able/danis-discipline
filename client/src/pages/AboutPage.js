import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Section from '../components/Section';
import Button from '../components/Button';
import { getCertifications } from '../services/supabaseClient';

// Create a special component for white text with pink shadow (like "Dani's Discipline")
const WhitePinkEffect = styled.span`
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

const NumberedSection = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 2rem;
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const SectionNumber = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: var(--pink);
  font-family: 'Georgia', serif;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
`;

const SectionContent = styled.div`
  font-family: 'Arial', sans-serif;
`;

const SectionTitle = styled.h2`
  font-family: 'Georgia', serif;
  font-weight: 600;
  color: var(--black);
  margin-bottom: 1rem;
`;

const CertificationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CertificationCard = styled.div`
  background-color: var(--light-gray);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const CertificationTitle = styled.h3`
  font-family: 'Georgia', serif;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const CertificationOrg = styled.p`
  color: var(--pink);
  font-weight: bold;
`;

const CTASection = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: var(--teal);
  border-radius: 8px;
  margin-top: 4rem;
`;

const Loader = styled.div`
  text-align: center;
  padding: 3rem;
`;

const AboutPage = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const data = await getCertifications();
        setCertifications(data);
      } catch (error) {
        console.error('Error fetching certifications:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCertifications();
  }, []);
  
  // Fallback certifications if fetching fails or none exist in database
  const fallbackCertifications = [
    { 
      id: 1, 
      title: "Certified Personal Trainer (CPT)", 
      organization: "National Academy of Sports Medicine",
      year: 2020
    },
    { 
      id: 2, 
      title: "Precision Nutrition Level 1", 
      organization: "Precision Nutrition",
      year: 2021
    },
    { 
      id: 3, 
      title: "Corrective Exercise Specialist (CES)", 
      organization: "National Academy of Sports Medicine",
      year: 2022
    },
    { 
      id: 4, 
      title: "Strength and Conditioning Coach", 
      organization: "National Strength and Conditioning Association",
      year: 2021
    }
  ];
  
  const displayCertifications = certifications.length > 0 ? certifications : fallbackCertifications;
  
  return (
    <>
      <HeaderSection>
        <div className="container">
          <HeaderTitle>
            ABOUT <WhitePinkEffect data-text="me">me</WhitePinkEffect>
          </HeaderTitle>
          <HeaderSubtitle>Learn about my journey and certifications</HeaderSubtitle>
        </div>
      </HeaderSection>
      
      <Section>
        <div className="container">
          <SectionTitle>My Journey</SectionTitle>
          <NumberedSection>
            <SectionNumber>01</SectionNumber>
            <SectionContent>
              <p>I began my fitness journey in 2010 after struggling with my own weight and health issues. After transforming my own body and mind, I realized I could help others do the same.</p>
            </SectionContent>
          </NumberedSection>
          
          <NumberedSection>
            <SectionNumber>02</SectionNumber>
            <SectionContent>
              <p>I pursued multiple certifications in fitness and nutrition to ensure I had the knowledge to support my clients effectively.</p>
            </SectionContent>
          </NumberedSection>
          
          <NumberedSection>
            <SectionNumber>03</SectionNumber>
            <SectionContent>
              <p>Today, I've worked with over 500 clients, helping them achieve their fitness goals while maintaining a balanced lifestyle.</p>
            </SectionContent>
          </NumberedSection>
        </div>
      </Section>
      
      <Section backgroundColor="var(--teal)">
        <div className="container">
          <SectionTitle>My Certifications</SectionTitle>
          <CertificationsGrid>
            {displayCertifications.map((cert) => (
              <CertificationCard key={cert.id}>
                <CertificationTitle>{cert.title}</CertificationTitle>
                <CertificationOrg>{cert.organization}</CertificationOrg>
                <p>{cert.year}</p>
              </CertificationCard>
            ))}
          </CertificationsGrid>
        </div>
      </Section>
      
      <Section>
        <div className="container text-center">
          <SectionTitle>Ready to Start Your Journey?</SectionTitle>
          <p>I'd love to help you achieve your fitness and discipline goals.</p>
          <Button to="/contact" variant="primary">Contact Me Today</Button>
        </div>
      </Section>
    </>
  );
};

export default AboutPage; 