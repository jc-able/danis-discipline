import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Section from '../components/Section';
import Button from '../components/Button';
import { getIndependentPlans, subscribeToNewsletter } from '../services/supabaseClient';
import { useForm } from 'react-hook-form';

// Create a component for black text with teal shadow (like "together")
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

const PlansContainer = styled.div`
  margin-top: 3rem;
`;

const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PlanCard = styled.div`
  padding: 2rem;
  border-radius: 4px;
  background-color: var(--light-gray);
  display: flex;
  flex-direction: column;
  position: relative;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-10px);
  }
`;

const PlanNumber = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--pink);
  font-family: 'Georgia', serif;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
`;

const PlanTitle = styled.h3`
  font-size: 1.5rem;
  margin: 1.5rem 0 1rem;
  font-family: 'Georgia', serif;
  font-weight: 600;
`;

const PlanPrice = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: bold;
  color: var(--pink);
  font-family: 'Georgia', serif;
`;

const SectionTitle = styled.h2`
  font-family: 'Georgia', serif;
  font-weight: 600;
  color: var(--black);
  margin-bottom: 1.5rem;
  text-align: center;
`;

const SubscriptionForm = styled.form`
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const SubscriptionInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: 'Arial', sans-serif;
`;

const FormMessage = styled.div`
  margin-top: 1rem;
  padding: 0.5rem;
  text-align: center;
  border-radius: 4px;
  color: ${props => props.error ? '#e74c3c' : '#2ecc71'};
  background-color: ${props => props.error ? '#fadbd8' : '#d5f5e3'};
  font-family: 'Arial', sans-serif;
`;

const PlansPage = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await getIndependentPlans();
        setPlans(data);
      } catch (error) {
        console.error('Error fetching independent plans:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPlans();
  }, []);
  
  // Fallback plans if fetching fails or none exist in database
  const fallbackPlans = [
    { id: 1, title: "CUSTOM REVERSE DIETING PLAN", order: 1, icon: "📈" },
    { id: 2, title: "POST REVERSE CARB CYCLING CUT", order: 2, icon: "🍎" },
    { id: 3, title: "MACRO CALCULATION", order: 3, icon: "🔢" },
    { id: 4, title: "WORKOUT PLAN", order: 4, icon: "💪" },
    { id: 5, title: "MEAL GUIDES", order: 5, icon: "🍽️" },
    { id: 6, title: "PERSONALIZED NUTRITION PLAN", order: 6, icon: "🥗" }
  ];
  
  const displayPlans = plans.length > 0 ? plans : fallbackPlans;
  
  const onSubscribe = async (data) => {
    try {
      const result = await subscribeToNewsletter(data.name, data.email);
      if (result.success) {
        setSubmitSuccess(true);
        reset();
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      }
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
    }
  };
  
  return (
    <>
      <HeaderSection>
        <div className="container">
          <HeaderTitle>
            INDEPENDENT <PinkTealEffect data-text="plans">plans</PinkTealEffect>
          </HeaderTitle>
          <HeaderSubtitle>Self-guided programs for your journey</HeaderSubtitle>
        </div>
      </HeaderSection>
      
      <Section>
        <div className="container">
          <SectionTitle>Available Training Plans</SectionTitle>
          <p style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 2rem' }}>
            These self-guided plans provide detailed instructions and resources
            to help you achieve your fitness goals on your own schedule.
          </p>
          
          {loading ? (
            <p>Loading plans...</p>
          ) : (
            <PlansContainer>
              <PlansGrid>
                {displayPlans.map((plan, index) => (
                  <PlanCard key={plan.id}>
                    <PlanNumber>{`${index + 1}`.padStart(2, '0')}</PlanNumber>
                    <PlanTitle>{plan.title}</PlanTitle>
                    <p>{plan.description || "Customized plan to help you achieve your specific fitness and nutrition goals."}</p>
                    <PlanPrice>${plan.price || "Price not available"}</PlanPrice>
                    <p>Duration: {plan.duration || "Duration not available"}</p>
                    <p style={{ marginTop: 'auto' }}>
                      <Button 
                        to={`/checkout?plan=${plan.id}`} 
                        variant="primary"
                        fullWidth
                      >
                        Purchase Plan
                      </Button>
                    </p>
                  </PlanCard>
                ))}
              </PlansGrid>
            </PlansContainer>
          )}
        </div>
      </Section>
      
      <Section backgroundColor="var(--teal)">
        <div className="container">
          <SectionTitle>Subscribe for Free Resources</SectionTitle>
          <p style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 2rem' }}>
            Join our newsletter to receive free workout tips, nutrition advice, and exclusive discounts.
          </p>
          
          <SubscriptionForm onSubmit={handleSubmit(onSubscribe)}>
            <SubscriptionInput 
              type="text" 
              placeholder="Your Name" 
              {...register('name', { required: true })}
            />
            {errors.name && <span style={{ color: 'red' }}>Name is required</span>}
            
            <SubscriptionInput 
              type="email" 
              placeholder="Your Email" 
              {...register('email', { 
                required: true, 
                pattern: /^\S+@\S+$/i 
              })}
            />
            {errors.email?.type === 'required' && <span style={{ color: 'red' }}>Email is required</span>}
            {errors.email?.type === 'pattern' && <span style={{ color: 'red' }}>Please enter a valid email</span>}
            
            <Button type="submit" variant="primary" fullWidth disabled={submitSuccess}>
              {submitSuccess ? 'Subscribed!' : 'Subscribe Now'}
            </Button>
            
            {submitSuccess && (
              <FormMessage>
                Thank you for subscribing to our newsletter!
              </FormMessage>
            )}
          </SubscriptionForm>
        </div>
      </Section>
    </>
  );
};

export default PlansPage; 