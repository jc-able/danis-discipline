import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Section from '../components/Section';
import Button from '../components/Button';
import { FiArrowDown } from 'react-icons/fi';

// Styled components for the home page
const HeroSection = styled.div`
  height: 85vh;
  background-color: var(--teal);
  color: var(--black);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden; /* Ensure polaroids don't cause scrollbars */
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  margin-bottom: 1rem;
  font-family: 'Georgia', serif;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 3rem;
    margin-top: 3rem; /* Add space above the title on mobile */
  }
`;

const HeroSubtitle = styled.p`
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

const DownArrow = styled.div`
  position: absolute;
  bottom: 2rem;
  font-size: 2rem;
  animation: bounce 2s infinite;
  color: var(--white);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  
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

// Polaroid styled components
const Polaroid = styled.div`
  background: white;
  padding: 10px 10px 30px 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: absolute;
  transform: ${props => props.rotation || 'rotate(0deg)'};
  z-index: 1;
  width: 200px;
  
  /* First tape piece */
  &::before {
    content: '';
    position: absolute;
    width: 40px;
    height: 15px;
    background-color: rgba(255, 255, 255, 0.7);
    top: ${props => props.tapeTop || '-5px'};
    left: ${props => props.tapeLeft || '80px'};
    transform: ${props => props.tapeRotation || 'rotate(0deg)'};
    z-index: 2;
    opacity: 0.8;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }
  
  /* Second tape piece for more realism */
  &::after {
    content: '';
    position: absolute;
    width: 30px;
    height: 15px;
    background-color: rgba(255, 255, 255, 0.7);
    bottom: ${props => props.tapeBottom || '30px'};
    right: ${props => props.tapeRight || '-5px'};
    transform: ${props => props.secondTapeRotation || 'rotate(45deg)'};
    z-index: 2;
    opacity: 0.8;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }
  
  @media (max-width: 768px) {
    width: 120px;
    display: ${props => props.hideOnMobile ? 'none' : 'block'};
  }
`;

const PolaroidImage = styled.div`
  width: 100%;
  height: 180px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  font-size: 0.9rem;
  text-align: center;
  
  @media (max-width: 768px) {
    height: 100px;
    font-size: 0.7rem;
  }
`;

// Mobile-specific container for polaroids
const MobilePolaroidContainer = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 10px;
    position: absolute;
    top: 10px;
    left: 0;
    z-index: 1;
  }
`;

const MobilePolaroid = styled.div`
  background: white;
  padding: 5px 5px 15px 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100px;
  margin: 0 5px;
  transform: ${props => props.rotation || 'rotate(0deg)'};
  
  &::before {
    content: '';
    position: absolute;
    width: 30px;
    height: 10px;
    background-color: rgba(255, 255, 255, 0.7);
    top: -5px;
    left: 35px;
    z-index: 2;
    opacity: 0.8;
  }
`;

const MobilePolaroidImage = styled.div`
  width: 100%;
  height: 80px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  font-size: 0.6rem;
  text-align: center;
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
  font-family: 'Georgia', serif;
  font-weight: 700;
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

// Create a new component for black text with teal shadow
const PinkTealEffect = styled.span`
  position: relative;
  display: inline-block;
  color: var(--black);
  font-style: italic;
  font-family: 'Georgia', serif;
  font-weight: 700;
  z-index: 2;
  
  &::before {
    content: attr(data-text);
    position: absolute;
    left: -3px;
    top: 3px;
    color: var(--teal);
    z-index: -1;
    font-family: 'Georgia', serif;
    font-weight: 700;
    text-shadow: 0 0 10px var(--teal);
  }
`;

// Create a new component for white text with pink shadow
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

// Create a special component for "Dani's Discipline" - white with pink shadow
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

const HomePage = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return (
    <>
      {/* Hero Section with Polaroids */}
      <HeroSection>
        {!isMobile && (
          <>
            {/* Polaroid 1 - Left side - move back to original position */}
            <Polaroid 
              rotation="rotate(-8deg)" 
              tapeTop="-5px" 
              tapeLeft="80px" 
              tapeBottom="40px"
              tapeRight="-15px"
              tapeRotation="rotate(0deg)"
              secondTapeRotation="rotate(90deg)"
              style={{ top: '20%', left: '5%' }}
            >
              <PolaroidImage>
                No documents found in Photo1 collection
              </PolaroidImage>
            </Polaroid>
            
            {/* Polaroid 2 - Top right */}
            <Polaroid 
              rotation="rotate(5deg)" 
              tapeTop="-5px" 
              tapeLeft="80px" 
              tapeBottom="50px"
              tapeRight="-15px"
              tapeRotation="rotate(-5deg)"
              secondTapeRotation="rotate(90deg)"
              style={{ top: '8%', right: '8%' }}
            >
              <PolaroidImage>
                Photo 2
              </PolaroidImage>
            </Polaroid>
            
            {/* Polaroid 3 - Bottom right - lower it */}
            <Polaroid 
              rotation="rotate(-5deg)" 
              tapeTop="-5px" 
              tapeLeft="60px" 
              tapeBottom="40px"
              tapeRight="-10px"
              tapeRotation="rotate(5deg)"
              secondTapeRotation="rotate(85deg)"
              style={{ bottom: '10%', right: '10%' }}
            >
              <PolaroidImage>
                Photo 3
              </PolaroidImage>
            </Polaroid>
          </>
        )}
        
        {isMobile && (
          <MobilePolaroidContainer>
            <MobilePolaroid rotation="rotate(-3deg)">
              <MobilePolaroidImage>
                Photo 1
              </MobilePolaroidImage>
            </MobilePolaroid>
            <MobilePolaroid rotation="rotate(2deg)">
              <MobilePolaroidImage>
                Photo 2
              </MobilePolaroidImage>
            </MobilePolaroid>
          </MobilePolaroidContainer>
        )}
        
        <HeroTitle>
          <WhitePinkEffect data-text="Dani's Discipline">Dani's Discipline</WhitePinkEffect>
        </HeroTitle>
        <HeroSubtitle>
          Achieve Goals Without Limits
        </HeroSubtitle>
        <DownArrow><FiArrowDown /></DownArrow>
      </HeroSection>
      
      {/* Services Section - White Background */}
      <Section background="white" padding="5rem 0">
        <Section.Title align="center" style={{ fontFamily: "'Georgia', serif", fontWeight: "700" }}>
          LET'S WORK <PinkTealEffect data-text="together">together</PinkTealEffect>
        </Section.Title>
        <p style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem', fontFamily: "'Georgia', serif", fontWeight: "700" }}>
          WHETHER YOU ARE LOOKING FOR COMPLETE 1:1 COACHING, A CUSTOM
          INDEPENDENT PLAN, OR A WORKOUT PROGRAM TO PERFORM, I'VE GOT YOU
          COVERED.
        </p>
        
        <ServicesGrid>
          <ServiceCard>
            <ServiceImage>IMAGE PLACEHOLDER</ServiceImage>
            <ServiceTitle>1:1 COACHING</ServiceTitle>
            <p>Personalized fitness and nutrition guidance tailored to your specific goals and needs.</p>
            <Button to="/coaching" style={{ marginTop: '1rem', fontFamily: "'Georgia', serif", fontWeight: "700" }}>Learn More</Button>
          </ServiceCard>
          
          <ServiceCard>
            <ServiceImage>IMAGE PLACEHOLDER</ServiceImage>
            <ServiceTitle>INDEPENDENT PLANS</ServiceTitle>
            <p>Self-guided fitness and nutrition plans for those who prefer to work at their own pace.</p>
            <Button to="/plans" style={{ marginTop: '1rem', fontFamily: "'Georgia', serif", fontWeight: "700" }}>Learn More</Button>
          </ServiceCard>
          
          <ServiceCard>
            <ServiceImage>IMAGE PLACEHOLDER</ServiceImage>
            <ServiceTitle>WORKOUT PROGRAMS</ServiceTitle>
            <p>Structured workout programs designed to help you build strength, endurance, and overall fitness.</p>
            <Button to="/training" style={{ marginTop: '1rem', fontFamily: "'Georgia', serif", fontWeight: "700" }}>Learn More</Button>
          </ServiceCard>
        </ServicesGrid>
      </Section>
      
      {/* CTA Section - Update background from teal to black */}
      <Section background="black" padding="4rem 0">
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <Section.Title align="center" style={{ 
            fontFamily: "'Georgia', serif", 
            fontWeight: "700", 
            backgroundColor: "var(--black)", 
            color: "var(--white)",
            display: "inline-block",
            padding: "0.5rem 1rem"
          }}>
            WHERE DO I <TealPinkEffect data-text="start?">start?</TealPinkEffect>
          </Section.Title>
          <p style={{ fontFamily: "'Georgia', serif" }}>
            Not sure which option is right for you? Start with a consultation to discuss your goals and find the perfect fit for your fitness journey.
          </p>
          <Button to="/contact" style={{ marginTop: '2rem', fontFamily: "'Georgia', serif", fontWeight: "700" }}>START NOW</Button>
        </div>
      </Section>
      
      {/* Feature Section - White Background */}
      <Section background="white" padding="5rem 0">
        <FeatureGrid>
          <FeatureImage>IMAGE PLACEHOLDER</FeatureImage>
          <FeatureContent>
            <Section.Title style={{ fontFamily: "'Georgia', serif", fontWeight: "700" }}>
              1:1 <PinkTealEffect data-text="coaching">coaching</PinkTealEffect>
            </Section.Title>
            <p style={{ fontFamily: "'Georgia', serif" }}>
              Work directly with a certified fitness and nutrition coach to create a customized plan that fits your lifestyle and helps you achieve your goals.
            </p>
            
            <FeatureList style={{ fontFamily: "'Georgia', serif", fontWeight: "700" }}>
              <FeatureItem>12 WEEKS LONG</FeatureItem>
              <FeatureItem>1:1 PERSONAL COACH</FeatureItem>
              <FeatureItem>PERSONALIZED NUTRITION PLAN</FeatureItem>
              <FeatureItem>CUSTOM WORKOUT ROUTINE</FeatureItem>
              <FeatureItem>WEEKLY CHECK-INS</FeatureItem>
              <FeatureItem>ONGOING SUPPORT</FeatureItem>
            </FeatureList>
            
            <Button to="/coaching" style={{ fontFamily: "'Georgia', serif", fontWeight: "700" }}>LEARN MORE</Button>
          </FeatureContent>
        </FeatureGrid>
      </Section>
    </>
  );
};

export default HomePage; 