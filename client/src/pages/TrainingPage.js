import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Section from '../components/Section';
import Button from '../components/Button';
import { getTrainingSessions } from '../services/supabaseClient';

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

const SessionsGrid = styled.div`
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

const SessionCard = styled.div`
  background-color: var(--light-gray);
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
  }
`;

const SessionTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-family: 'Georgia', serif;
  font-weight: 600;
`;

const SessionTime = styled.div`
  display: inline-block;
  background-color: var(--pink);
  color: var(--white);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
`;

const SectionTitle = styled.h2`
  font-family: 'Georgia', serif;
  font-weight: 600;
  color: var(--black);
  margin-bottom: 1.5rem;
  text-align: center;
`;

const TrainingPage = () => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const sessionsData = await getTrainingSessions();
                setSessions(sessionsData);
            } catch (error) {
                console.error('Error fetching training sessions:', error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchSessions();
    }, []);
    
    return (
        <>
            <HeaderSection>
                <div className="container">
                    <HeaderTitle>
                        GROUP <TealPinkEffect data-text="training">training</TealPinkEffect>
                    </HeaderTitle>
                    <HeaderSubtitle>Join our transformative sessions</HeaderSubtitle>
                </div>
            </HeaderSection>
            
            <Section>
                <div className="container">
                    <SectionTitle>Upcoming Training Sessions</SectionTitle>
                    <p style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 2rem' }}>
                        Join our energetic group training sessions led by expert trainers.
                        All fitness levels are welcome!
                    </p>
                    
                    {loading ? (
                        <p style={{ textAlign: 'center' }}>Loading sessions...</p>
                    ) : (
                        <SessionsGrid>
                            {sessions.map((session) => (
                                <SessionCard key={session.id}>
                                    <SessionTitle>{session.title}</SessionTitle>
                                    <SessionTime>{session.time}</SessionTime>
                                    <p>{session.description}</p>
                                    <p>
                                        <strong>Instructor:</strong> {session.instructor}<br />
                                        <strong>Location:</strong> {session.location}
                                    </p>
                                    <p style={{ marginTop: '1.5rem' }}>
                                        <Button 
                                            to={`/checkout?session=${session.id}`} 
                                            variant="primary"
                                        >
                                            Book Session
                                        </Button>
                                    </p>
                                </SessionCard>
                            ))}
                        </SessionsGrid>
                    )}
                </div>
            </Section>
            
            <Section backgroundColor="var(--teal)">
                <div className="container text-center">
                    <SectionTitle>Benefits of Group Training</SectionTitle>
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '2rem',
                        maxWidth: '1000px',
                        margin: '0 auto'
                    }}>
                        <div>
                            <h3 style={{ fontFamily: 'Georgia, serif', marginBottom: '0.5rem' }}>Motivation</h3>
                            <p>Train in a supportive environment that will push you to your limits.</p>
                        </div>
                        <div>
                            <h3 style={{ fontFamily: 'Georgia, serif', marginBottom: '0.5rem' }}>Community</h3>
                            <p>Connect with like-minded individuals on their fitness journey.</p>
                        </div>
                        <div>
                            <h3 style={{ fontFamily: 'Georgia, serif', marginBottom: '0.5rem' }}>Accountability</h3>
                            <p>Regular sessions help you stay committed to your fitness goals.</p>
                        </div>
                    </div>
                    <div style={{ marginTop: '2rem' }}>
                        <Button to="/contact" variant="primary">Contact For Details</Button>
                    </div>
                </div>
            </Section>
        </>
    );
};

export default TrainingPage; 