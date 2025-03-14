import React from 'react';
import styled from 'styled-components';
import Section from '../components/Section';
import { FiMail, FiPhone, FiInstagram } from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaFacebook, FaYoutube, FaTiktok } from 'react-icons/fa';

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

const SectionTitle = styled.h2`
  font-family: 'Georgia', serif;
  font-weight: 600;
  color: var(--black);
  margin-bottom: 1.5rem;
  text-align: center;
`;

// Link tree styled components
const LinkTreeContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
`;

const LinkCard = styled.a`
  display: flex;
  align-items: center;
  padding: 1.2rem 1.5rem;
  background-color: ${props => props.bgColor || 'var(--teal)'};
  color: ${props => props.textColor || 'white'};
  border-radius: 12px;
  margin-bottom: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 7px 12px rgba(0, 0, 0, 0.15);
  }
  
  svg {
    font-size: 1.5rem;
    margin-right: 1rem;
  }
`;

const LinkIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
`;

const LinkText = styled.div`
  flex: 1;
  
  h3 {
    margin: 0 0 0.25rem 0;
    font-size: 1.1rem;
  }
  
  p {
    margin: 0;
    font-size: 0.9rem;
    opacity: 0.9;
  }
`;

const ContactPage = () => {
    // Social media and contact links
    const links = [
        {
            name: 'Email',
            description: 'Send me an email directly',
            icon: <FiMail />,
            url: 'mailto:info@danisdiscipline.com',
            bgColor: 'var(--pink)'
        },
        {
            name: 'Instagram',
            description: '@danisdiscipline',
            icon: <FiInstagram />,
            url: 'https://instagram.com/danisdiscipline',
            bgColor: '#E1306C'
        },
        {
            name: 'Facebook',
            description: 'Connect with me on Facebook',
            icon: <FaFacebook />,
            url: 'https://facebook.com/danisdiscipline',
            bgColor: '#4267B2'
        },
        {
            name: 'TikTok',
            description: 'Follow my fitness content',
            icon: <FaTiktok />,
            url: 'https://tiktok.com/@danisdiscipline',
            bgColor: '#000000'
        },
        {
            name: 'YouTube',
            description: 'Watch my workout tutorials',
            icon: <FaYoutube />,
            url: 'https://youtube.com/c/danisdiscipline',
            bgColor: '#FF0000'
        },
        {
            name: 'LinkedIn',
            description: 'Connect professionally',
            icon: <FaLinkedin />,
            url: 'https://linkedin.com/in/danisdiscipline',
            bgColor: '#0077B5'
        }
    ];
    
    return (
        <>
            <HeaderSection>
                <div className="container">
                    <HeaderTitle>
                        GET IN <TealPinkEffect data-text="touch">touch</TealPinkEffect>
                    </HeaderTitle>
                    <HeaderSubtitle>Let's connect through social media</HeaderSubtitle>
                </div>
            </HeaderSection>
            
            <Section>
                <div className="container">
                    <SectionTitle>Connect With Me</SectionTitle>
                    <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        Follow me on social media for updates, tips, and to get in touch!
                    </p>
                    
                    <LinkTreeContainer>
                        {links.map((link, index) => (
                            <LinkCard 
                                key={index} 
                                href={link.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                bgColor={link.bgColor}
                            >
                                <LinkIcon>{link.icon}</LinkIcon>
                                <LinkText>
                                    <h3>{link.name}</h3>
                                    <p>{link.description}</p>
                                </LinkText>
                            </LinkCard>
                        ))}
                    </LinkTreeContainer>
                </div>
            </Section>
        </>
    );
};

export default ContactPage; 