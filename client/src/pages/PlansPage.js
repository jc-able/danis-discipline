import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Section from '../components/Section';
import Button from '../components/Button';
import { getIndependentPlans, subscribeToNewsletter } from '../services/supabaseClient';
import { useForm } from 'react-hook-form';

const HeaderSection = styled.div`
  background-color: var(--black);
  color: var(--white);
  padding: 5rem 0;
  text-align: center;
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
  
  &:hover {
    transform: translateY(-10px);
  }
`;

const PlanNumber = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  font-size: 0.9rem;
  font-weight: bold;
  color: var(--pink);
`;

const PlanTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--teal);
`;

const ArrowIcon = styled.div`
  font-size: 1.5rem;
  margin-top: auto;
  align-self: flex-end;
  color: var(--pink);
`;

const NewsletterSection = styled.div`
  margin-top: 5rem;
  padding: 3rem;
  background-color: var(--pink);
  border-radius: 8px;
  text-align: center;
`;

const FormContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto 0;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const SuccessMessage = styled.div`
  background-color: #d4edda;
  color: #155724;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const Loader = styled.div`
  text-align: center;
  padding: 3rem;
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
          <Section.Title align="center" color="white">
            independent <span className="italic">plans</span>
          </Section.Title>
          <Section.Subtitle align="center" color="white" uppercase={true}>
            CUSTOMIZED PLANS FOR SELF-GUIDED FITNESS
          </Section.Subtitle>
          <p style={{ maxWidth: '800px', margin: '0 auto' }}>
            Take control of your fitness journey with our self-guided plans. These comprehensive 
            programs provide the structure and guidance you need to achieve your goals on your own terms.
          </p>
        </div>
      </HeaderSection>
      
      <Section>
        <PlansContainer>
          {loading ? (
            <Loader>Loading plans...</Loader>
          ) : (
            <PlansGrid>
              {displayPlans.map((plan) => (
                <PlanCard key={plan.id}>
                  <PlanNumber>{plan.order < 10 ? `0${plan.order}` : plan.order}</PlanNumber>
                  <PlanTitle>{plan.title}</PlanTitle>
                  <p>{plan.description || "Customized plan to help you achieve your specific fitness and nutrition goals."}</p>
                  <ArrowIcon>{plan.icon || "→"}</ArrowIcon>
                </PlanCard>
              ))}
            </PlansGrid>
          )}
          
          <NewsletterSection>
            <Section.Title align="center">
              GET ON <span className="italic">the list</span>
            </Section.Title>
            <p>SIGN UP FOR MY EMAIL LIST AND ALWAYS STAY UP TO DATE WITH MACROHABITS</p>
            
            <FormContainer>
              {submitSuccess && (
                <SuccessMessage>
                  Thank you for subscribing to our newsletter!
                </SuccessMessage>
              )}
              
              <form onSubmit={handleSubmit(onSubscribe)}>
                <InputGroup>
                  <FormGroup>
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                  </FormGroup>
                  
                  <FormGroup>
                    <input 
                      type="email" 
                      placeholder="Your Email" 
                      {...register("email", { 
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address"
                        }
                      })}
                    />
                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                  </FormGroup>
                </InputGroup>
                
                <Button type="submit">SIGN UP</Button>
              </form>
            </FormContainer>
          </NewsletterSection>
        </PlansContainer>
      </Section>
    </>
  );
};

export default PlansPage; 