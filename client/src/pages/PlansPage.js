import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Section from '../components/Section';
import Button from '../components/Button';
import { getIndependentPlans, subscribeToNewsletter } from '../services/supabaseClient';
import { useForm } from 'react-hook-form';

// Create a component for white text with pink shadow
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

const CategoryNav = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const CategoryButton = styled.button`
  background: ${props => props.active ? 'var(--pink)' : 'transparent'};
  color: ${props => props.active ? 'white' : 'var(--black)'};
  border: 2px solid ${props => props.active ? 'var(--pink)' : 'var(--teal)'};
  padding: 0.75rem 1.5rem;
  margin: 0 0.5rem 1rem;
  border-radius: 4px;
  font-family: 'Georgia', serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? 'var(--pink)' : 'var(--teal)'};
    color: white;
  }
  
  @media (max-width: 768px) {
    width: 80%;
    margin-bottom: 0.5rem;
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
  border-top: 5px solid ${props => 
    props.category === 'grocery' ? '#4CAF50' : 
    props.category === 'macro' ? '#2196F3' : 
    props.category === 'nutrition' ? '#FF9800' : 'var(--pink)'};
  
  &:hover {
    transform: translateY(-10px);
  }
`;

const CategoryLabel = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${props => 
    props.category === 'grocery' ? '#4CAF50' : 
    props.category === 'macro' ? '#2196F3' : 
    props.category === 'nutrition' ? '#FF9800' : 'var(--pink)'};
  color: white;
  padding: 0.25rem 0.75rem;
  font-size: 0.8rem;
  border-radius: 0 0 0 4px;
  font-weight: bold;
  text-transform: uppercase;
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

const CategoryTitle = styled.h2`
  font-family: 'Georgia', serif;
  font-weight: 600;
  color: ${props => 
    props.category === 'grocery' ? '#4CAF50' : 
    props.category === 'macro' ? '#2196F3' : 
    props.category === 'nutrition' ? '#FF9800' : 'var(--black)'};
  margin: 3rem 0 1rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::before, &::after {
    content: '';
    flex: 1;
    border-bottom: 2px solid ${props => 
      props.category === 'grocery' ? '#4CAF50' : 
      props.category === 'macro' ? '#2196F3' : 
      props.category === 'nutrition' ? '#FF9800' : 'var(--pink)'};
    margin: 0 1rem;
  }
  
  @media (max-width: 768px) {
    &::before, &::after {
      display: none;
    }
  }
`;

const CategoryDescription = styled.p`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 2rem;
  font-family: 'Georgia', serif;
`;

const EmptyCategory = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin: 2rem 0;
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
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Refs for scrolling to categories
  const groceryRef = useRef(null);
  const macroRef = useRef(null);
  const nutritionRef = useRef(null);
  
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
  
  // Fallback plans organized by category
  const fallbackPlans = [
    // Grocery Guides
    { id: 1, title: "HEALTHY GROCERY SHOPPING GUIDE", category: "grocery", price: 19.99, description: "A comprehensive list of nutritious food options to keep your pantry stocked with healthy choices.", order: 1, icon: "🛒" },
    { id: 2, title: "BUDGET-FRIENDLY MEAL ESSENTIALS", category: "grocery", price: 14.99, description: "Learn how to shop for nutritious foods without breaking the bank.", order: 2, icon: "💰" },
    { id: 3, title: "SEASONAL PRODUCE GUIDE", category: "grocery", price: 12.99, description: "Make the most of in-season fruits and vegetables for maximum nutrition and flavor.", order: 3, icon: "🍎" },
    
    // Macro Guides
    { id: 4, title: "MACRO CALCULATION BASICS", category: "macro", price: 24.99, description: "Learn how to calculate your ideal macronutrients for your specific goals.", order: 4, icon: "🔢" },
    { id: 5, title: "CUSTOM MACRO TRACKING GUIDE", category: "macro", price: 29.99, description: "Personalized macro recommendations with tracking templates and tools.", order: 5, icon: "📊" },
    { id: 6, title: "MACRO CYCLING FOR WEIGHT LOSS", category: "macro", price: 34.99, description: "Advanced techniques for breaking through plateaus with strategic macro cycling.", order: 6, icon: "⚖️" },
    
    // Custom Nutrition Plans
    { id: 7, title: "PERSONALIZED NUTRITION ASSESSMENT", category: "nutrition", price: 49.99, description: "Custom nutrition evaluation with personalized recommendations for your goals.", order: 7, icon: "📋" },
    { id: 8, title: "RESTAURANT DINING GUIDE", category: "nutrition", price: 19.99, description: "How to make healthy choices when eating out at various types of restaurants.", order: 8, icon: "🍽️" },
    { id: 9, title: "NUTRITION PLAN FOR BUSY LIFESTYLES", category: "nutrition", price: 39.99, description: "Quick and easy nutrition strategies for those with hectic schedules.", order: 9, icon: "⏱️" }
  ];
  
  // Function to categorize plans from API (temporary until backend is updated)
  const categorizePlans = (plansArray) => {
    if (!plansArray || plansArray.length === 0) return fallbackPlans;
    
    return plansArray.map(plan => {
      const title = plan.title ? plan.title.toLowerCase() : '';
      let category = 'nutrition'; // Default category
      
      if (title.includes('grocery') || title.includes('shopping') || title.includes('meal') || title.includes('food')) {
        category = 'grocery';
      } else if (title.includes('macro') || title.includes('calculation') || title.includes('tracking')) {
        category = 'macro';
      }
      
      return { ...plan, category };
    });
  };
  
  const displayPlans = plans.length > 0 ? categorizePlans(plans) : fallbackPlans;
  
  // Filter plans by category
  const getFilteredPlans = (category) => {
    if (category === 'all') return displayPlans;
    return displayPlans.filter(plan => plan.category === category);
  };
  
  // Get plans for specific categories
  const groceryPlans = displayPlans.filter(plan => plan.category === 'grocery');
  const macroPlans = displayPlans.filter(plan => plan.category === 'macro');
  const nutritionPlans = displayPlans.filter(plan => plan.category === 'nutrition');
  
  const scrollToCategory = (category) => {
    setActiveCategory(category);
    
    if (category === 'grocery' && groceryRef.current) {
      groceryRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (category === 'macro' && macroRef.current) {
      macroRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (category === 'nutrition' && nutritionRef.current) {
      nutritionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
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
            NUTRITION <TealPinkEffect data-text="guides">guides</TealPinkEffect>
          </HeaderTitle>
          <HeaderSubtitle>Fuel your body, transform your life</HeaderSubtitle>
        </div>
      </HeaderSection>
      
      <Section>
        <div className="container">
          <p style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 2rem' }}>
            Explore our collection of nutrition guides designed to help you make informed food choices,
            understand macronutrients, and develop sustainable eating habits that support your health and fitness goals.
          </p>
          
          <CategoryNav>
            <CategoryButton 
              active={activeCategory === 'all'} 
              onClick={() => setActiveCategory('all')}
            >
              All Guides
            </CategoryButton>
            <CategoryButton 
              active={activeCategory === 'grocery'} 
              onClick={() => scrollToCategory('grocery')}
            >
              Grocery Guides
            </CategoryButton>
            <CategoryButton 
              active={activeCategory === 'macro'} 
              onClick={() => scrollToCategory('macro')}
            >
              Macro Guides
            </CategoryButton>
            <CategoryButton 
              active={activeCategory === 'nutrition'} 
              onClick={() => scrollToCategory('nutrition')}
            >
              Custom Nutrition
            </CategoryButton>
          </CategoryNav>
          
          {loading ? (
            <p style={{ textAlign: 'center' }}>Loading guides...</p>
          ) : (
            <>
              {/* Grocery Guides Section */}
              <div ref={groceryRef}>
                <CategoryTitle category="grocery">Grocery Guides</CategoryTitle>
                <CategoryDescription>
                  Simplify your shopping experience with our comprehensive grocery guides. 
                  Learn how to select nutritious foods, shop on a budget, and make healthier choices at the store.
                </CategoryDescription>
                
                {groceryPlans.length > 0 ? (
                  <PlansGrid>
                    {groceryPlans.map((plan, index) => (
                      <PlanCard key={plan.id} category="grocery">
                        <CategoryLabel category="grocery">Grocery</CategoryLabel>
                        <PlanNumber>{plan.icon || '🛒'}</PlanNumber>
                        <PlanTitle>{plan.title}</PlanTitle>
                        <p>{plan.description || "A comprehensive grocery guide to help you make healthier food choices."}</p>
                        <PlanPrice>${plan.price || 19.99}</PlanPrice>
                        <p style={{ marginTop: 'auto' }}>
                          <Button 
                            to={`/checkout?plan=${plan.id}`} 
                            variant="primary"
                            fullWidth
                          >
                            Purchase Guide
                          </Button>
                        </p>
                      </PlanCard>
                    ))}
                  </PlansGrid>
                ) : (
                  <EmptyCategory>
                    <h3>Coming Soon!</h3>
                    <p>We're currently developing our grocery guides. Check back soon!</p>
                  </EmptyCategory>
                )}
              </div>
              
              {/* Macro Guides Section */}
              <div ref={macroRef}>
                <CategoryTitle category="macro">Macro Guides</CategoryTitle>
                <CategoryDescription>
                  Master the science of macronutrients with our detailed macro guides. 
                  Learn how to calculate, track, and optimize your protein, carbs, and fats for your specific goals.
                </CategoryDescription>
                
                {macroPlans.length > 0 ? (
                  <PlansGrid>
                    {macroPlans.map((plan, index) => (
                      <PlanCard key={plan.id} category="macro">
                        <CategoryLabel category="macro">Macro</CategoryLabel>
                        <PlanNumber>{plan.icon || '📊'}</PlanNumber>
                        <PlanTitle>{plan.title}</PlanTitle>
                        <p>{plan.description || "Learn how to track and optimize your macronutrients for your specific fitness and health goals."}</p>
                        <PlanPrice>${plan.price || 24.99}</PlanPrice>
                        <p style={{ marginTop: 'auto' }}>
                          <Button 
                            to={`/checkout?plan=${plan.id}`} 
                            variant="primary"
                            fullWidth
                          >
                            Purchase Guide
                          </Button>
                        </p>
                      </PlanCard>
                    ))}
                  </PlansGrid>
                ) : (
                  <EmptyCategory>
                    <h3>Coming Soon!</h3>
                    <p>Our macro guides are in development. Check back soon!</p>
                  </EmptyCategory>
                )}
              </div>
              
              {/* Custom Nutrition Plans Section */}
              <div ref={nutritionRef}>
                <CategoryTitle category="nutrition">Custom Nutrition Plans</CategoryTitle>
                <CategoryDescription>
                  Discover personalized nutrition strategies that fit your lifestyle and dietary preferences.
                  From restaurant dining guides to busy lifestyle meal plans, we've got you covered.
                </CategoryDescription>
                
                {nutritionPlans.length > 0 ? (
                  <PlansGrid>
                    {nutritionPlans.map((plan, index) => (
                      <PlanCard key={plan.id} category="nutrition">
                        <CategoryLabel category="nutrition">Nutrition</CategoryLabel>
                        <PlanNumber>{plan.icon || '🥗'}</PlanNumber>
                        <PlanTitle>{plan.title}</PlanTitle>
                        <p>{plan.description || "Personalized nutrition strategies that fit your lifestyle and dietary preferences."}</p>
                        <PlanPrice>${plan.price || 39.99}</PlanPrice>
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
                ) : (
                  <EmptyCategory>
                    <h3>Coming Soon!</h3>
                    <p>Our custom nutrition plans are being finalized. Check back soon!</p>
                  </EmptyCategory>
                )}
              </div>
            </>
          )}
        </div>
      </Section>
      
      <Section backgroundColor="var(--teal)">
        <div className="container">
          <SectionTitle>Subscribe for Nutrition Tips</SectionTitle>
          <p style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 2rem', color: 'white' }}>
            Join our newsletter to receive free nutrition tips, healthy recipes, and exclusive discounts on our guides.
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