import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Section from '../components/Section';
import Button from '../components/Button';
import { getCertifications } from '../services/supabaseClient';

const HeaderSection = styled.div`
  background-color: var(--black);
  color: var(--white);
  padding: 5rem 0;
  text-align: center;
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
`;

const SectionContent = styled.div``;

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
`;

const CertificationTitle = styled.h4`
  font-size: 1.2rem;
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
          <Section.Title align="center" color="white">
            about <span className="italic">me</span>
          </Section.Title>
          <Section.Subtitle align="center" color="white" uppercase={true}>
            CERTIFIED FITNESS & NUTRITION COACH
          </Section.Subtitle>
        </div>
      </HeaderSection>
      
      <Section>
        <div className="container">
          <NumberedSection>
            <SectionNumber>01</SectionNumber>
            <SectionContent>
              <Section.Title>My Story</Section.Title>
              <p>
                My journey into fitness and nutrition coaching began with my own personal transformation. 
                After struggling with my own health and fitness goals, I discovered the power of 
                personalized training and nutrition guidance. This experience inspired me to become a 
                certified coach to help others achieve their own transformations.
              </p>
              <p>
                With over 5 years of experience in the fitness industry, I've worked with clients of all 
                ages and fitness levels, helping them build sustainable habits that lead to lasting results. 
                My approach combines evidence-based methods with practical strategies that fit into real life.
              </p>
              <p>
                I believe that fitness should be accessible to everyone, regardless of their starting point. 
                My mission is to empower you with the knowledge, tools, and support you need to reach your 
                goals and maintain your results long-term.
              </p>
            </SectionContent>
          </NumberedSection>
          
          <NumberedSection>
            <SectionNumber>02</SectionNumber>
            <SectionContent>
              <Section.Title>My Philosophy</Section.Title>
              <p>
                I believe in a holistic approach to fitness and nutrition that focuses on sustainable, 
                long-term changes rather than quick fixes. My coaching methodology centers on:
              </p>
              <ul style={{ marginLeft: '2rem', marginTop: '1rem', marginBottom: '1rem' }}>
                <li>Personalization over one-size-fits-all approaches</li>
                <li>Building sustainable habits that become a lifestyle</li>
                <li>Finding balance between discipline and flexibility</li>
                <li>Education and empowerment rather than dependency</li>
                <li>Progress over perfection</li>
                <li>Evidence-based methods adapted to individual needs</li>
              </ul>
              <p>
                My goal is not just to help you achieve temporary results, but to equip you with the 
                knowledge and skills to maintain your progress and continue improving long after our 
                coaching relationship ends.
              </p>
            </SectionContent>
          </NumberedSection>
          
          <Section.Title>Certifications</Section.Title>
          
          {loading ? (
            <Loader>Loading certifications...</Loader>
          ) : (
            <CertificationsGrid>
              {displayCertifications.map((cert) => (
                <CertificationCard key={cert.id}>
                  <CertificationTitle>{cert.title}</CertificationTitle>
                  <CertificationOrg>{cert.organization}</CertificationOrg>
                  <p>{cert.year}</p>
                </CertificationCard>
              ))}
            </CertificationsGrid>
          )}
          
          <CTASection>
            <Section.Title align="center">
              Ready to work together?
            </Section.Title>
            <p style={{ maxWidth: '800px', margin: '0 auto 2rem' }}>
              Let's create a personalized plan that will help you achieve your fitness and nutrition goals 
              through expert guidance, accountability, and support.
            </p>
            <Button to="/coaching">START COACHING</Button>
          </CTASection>
        </div>
      </Section>
    </>
  );
};

export default AboutPage; 