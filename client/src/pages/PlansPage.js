import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Section from '../components/Section';
import Button from '../components/Button';
import { getIndependentPlans } from '../services/supabaseClient';
import { createPlanCheckout } from '../services/stripeService';
// Import Font Awesome components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShoppingBasket, faShoppingCart, faStore, 
  faCalculator, faChartPie, faChartLine, 
  faUtensils, faAppleAlt, faCarrot,
  faLeaf, faDumbbell, faCocktail
} from '@fortawesome/free-solid-svg-icons';

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
  background: var(--teal);
  color: var(--black);
  padding: 5rem 0;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: none;
  }
`;

const HeaderTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  font-family: 'Georgia', serif;
  font-weight: 700;
  letter-spacing: 1px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  
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
  position: sticky;
  top: 70px;
  z-index: 90;
  background-color: var(--white);
  padding: 1rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  width: 100%;
  left: 0;
  right: 0;
  
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
  border-radius: 50px;
  font-family: 'Georgia', serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.active ? '0 4px 10px rgba(0, 0, 0, 0.15)' : 'none'};
  
  &:hover {
    background: ${props => props.active ? 'var(--pink)' : 'var(--teal)'};
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
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
  padding: 2.5rem;
  border-radius: 12px;
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: ${props => 
      props.category === 'grocery' 
        ? '#40E0D0' 
        : props.category === 'macro' 
        ? '#FF69B4' 
        : '#9370DB'};
  }
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`;

const CategoryLabel = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: ${props => 
    props.category === 'grocery' 
      ? '#40E0D0' 
      : props.category === 'macro' 
      ? '#FF69B4' 
      : '#9370DB'};
  color: white;
  padding: 0.25rem 0.75rem;
  font-size: 0.8rem;
  border-radius: 50px;
  font-weight: bold;
  text-transform: uppercase;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  font-size: 1.8rem;
  color: ${props => 
    props.category === 'grocery' 
      ? '#40E0D0' 
      : props.category === 'macro' 
      ? '#FF69B4' 
      : '#9370DB'};
  opacity: 0.9;
  transition: all 0.3s ease;
  
  ${PlanCard}:hover & {
    transform: scale(1.1);
  }
`;

const PlanTitle = styled.h3`
  font-size: 1.5rem;
  margin: 2.5rem 0 1rem;
  font-family: 'Georgia', serif;
  font-weight: 600;
  color: var(--black);
  padding-bottom: 0.5rem;
  border-bottom: 2px solid rgba(0, 0, 0, 0.05);
`;

const PlanDescription = styled.p`
  color: #555;
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex-grow: 1;
`;

const PlanPrice = styled.div`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  font-weight: bold;
  color: var(--pink);
  font-family: 'Georgia', serif;
  display: flex;
  align-items: center;
  
  &::before {
    content: '';
    display: block;
    width: 30px;
    height: 2px;
    background-color: var(--pink);
    margin-right: 10px;
    opacity: 0.5;
  }
`;

const SectionTitle = styled.h2`
  font-family: 'Georgia', serif;
  font-weight: 600;
  color: var(--black);
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 2.2rem;
  letter-spacing: 1px;
`;

const CategoryTitle = styled.h2`
  font-family: 'Georgia', serif;
  font-weight: 600;
  color: ${props => 
    props.category === 'grocery' ? '#20C0B0' : 
    props.category === 'macro' ? '#FF1493' : 
    props.category === 'nutrition' ? '#8A2BE2' : 'var(--black)'};
  margin: 4rem 0 1rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  letter-spacing: 1px;
  
  &::before, &::after {
    content: '';
    flex: 1;
    height: 2px;
    background: ${props => 
      props.category === 'grocery' 
        ? '#40E0D0'
        : props.category === 'macro' 
        ? '#FF69B4'
        : '#9370DB'};
    margin: 0 1rem;
  }
  
  @media (max-width: 768px) {
    &::before, &::after {
      width: 30px;
    }
  }
`;

const CategoryDescription = styled.p`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 2.5rem;
  font-family: 'Arial', sans-serif;
  line-height: 1.8;
  color: #555;
  font-size: 1.1rem;
`;

const EmptyCategory = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: #f9f9f9;
  border-radius: 12px;
  margin: 2rem 0;
  border: 1px dashed #ddd;
  
  h3 {
    font-family: 'Georgia', serif;
    margin-bottom: 1rem;
    color: var(--teal);
  }
  
  p {
    color: #666;
    font-family: 'Arial', sans-serif;
  }
`;

const FormMessage = styled.div`
  margin-top: 1rem;
  padding: 0.8rem;
  text-align: center;
  border-radius: 8px;
  color: ${props => props.error ? '#e74c3c' : '#2ecc71'};
  background-color: ${props => props.error ? '#fadbd8' : '#d5f5e3'};
  font-family: 'Arial', sans-serif;
  animation: fadeIn 0.5s ease;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

// Helper function to get appropriate icon for each plan
const getCategoryIcon = (category, title) => {
  if (category === 'grocery') {
    if (title.toLowerCase().includes('budget')) return faShoppingCart;
    if (title.toLowerCase().includes('seasonal')) return faLeaf;
    return faShoppingBasket;
  } else if (category === 'macro') {
    if (title.toLowerCase().includes('tracking')) return faChartLine;
    if (title.toLowerCase().includes('cycling')) return faDumbbell;
    return faCalculator;
  } else { // nutrition
    if (title.toLowerCase().includes('restaurant')) return faUtensils;
    if (title.toLowerCase().includes('busy')) return faCocktail;
    return faAppleAlt;
  }
};

const PlansPage = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [buyButtonLoading, setBuyButtonLoading] = useState(false);
  
  // Refs for scrolling to categories
  const groceryRef = useRef(null);
  const macroRef = useRef(null);
  const nutritionRef = useRef(null);
  
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
  
  // Handle direct checkout for Healthy Grocery Shopping Guide
  const handleBuyGroceryGuide = async (plan) => {
    try {
      setBuyButtonLoading(true);
      
      // Send user directly to Stripe checkout
      // Stripe will collect customer information, no need to collect it here
      await createPlanCheckout(
        plan,
        { email: '', name: '' } // Stripe will collect this information
      );
      
    } catch (error) {
      console.error('Error initiating checkout:', error);
      alert('There was an error processing your request. Please try again.');
    } finally {
      setBuyButtonLoading(false);
    }
  };
  
  // Fallback plans organized by category
  const fallbackPlans = [
    // Grocery Guides
    { id: 1, title: "HEALTHY GROCERY SHOPPING GUIDE", category: "grocery", price: 19.99, description: "A comprehensive list of nutritious food options to keep your pantry stocked with healthy choices.", order: 1 },
    { id: 2, title: "BUDGET-FRIENDLY MEAL ESSENTIALS", category: "grocery", price: 14.99, description: "Learn how to shop for nutritious foods without breaking the bank.", order: 2 },
    { id: 3, title: "SEASONAL PRODUCE GUIDE", category: "grocery", price: 12.99, description: "Make the most of in-season fruits and vegetables for maximum nutrition and flavor.", order: 3 },
    
    // Macro Guides
    { id: 4, title: "MACRO CALCULATION BASICS", category: "macro", price: 24.99, description: "Learn how to calculate your ideal macronutrients for your specific goals.", order: 4 },
    { id: 5, title: "CUSTOM MACRO TRACKING GUIDE", category: "macro", price: 29.99, description: "Personalized macro recommendations with tracking templates and tools.", order: 5 },
    { id: 6, title: "MACRO CYCLING FOR WEIGHT LOSS", category: "macro", price: 34.99, description: "Advanced techniques for breaking through plateaus with strategic macro cycling.", order: 6 },
    
    // Custom Nutrition Plans
    { id: 7, title: "PERSONALIZED NUTRITION ASSESSMENT", category: "nutrition", price: 49.99, description: "Custom nutrition evaluation with personalized recommendations for your goals.", order: 7 },
    { id: 8, title: "RESTAURANT DINING GUIDE", category: "nutrition", price: 19.99, description: "How to make healthy choices when eating out at various types of restaurants.", order: 8 },
    { id: 9, title: "NUTRITION PLAN FOR BUSY LIFESTYLES", category: "nutrition", price: 39.99, description: "Quick and easy nutrition strategies for those with hectic schedules.", order: 9 }
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
      groceryRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (category === 'macro' && macroRef.current) {
      macroRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (category === 'nutrition' && nutritionRef.current) {
      nutritionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
          <p style={{ 
            textAlign: 'center', 
            maxWidth: '800px', 
            margin: '0 auto 2rem',
            fontSize: '1.1rem',
            lineHeight: '1.8',
            color: '#555'
          }}>
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
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <p style={{ fontSize: '1.1rem', color: '#555' }}>Loading guides...</p>
            </div>
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
                    {groceryPlans.map((plan) => (
                      <PlanCard key={plan.id} category="grocery">
                        <CategoryLabel category="grocery">Grocery</CategoryLabel>
                        <IconWrapper category="grocery">
                          <FontAwesomeIcon icon={getCategoryIcon('grocery', plan.title)} />
                        </IconWrapper>
                        <PlanTitle>{plan.title}</PlanTitle>
                        <PlanDescription>
                          {plan.description || "A comprehensive grocery guide to help you make healthier food choices."}
                        </PlanDescription>
                        <PlanPrice>${plan.price || 19.99}</PlanPrice>
                        {/* Check if this is the Healthy Grocery Shopping Guide */}
                        {plan.title.includes("HEALTHY GROCERY SHOPPING GUIDE") ? (
                          // Direct Buy Now button for Healthy Grocery Shopping Guide
                          <Button 
                            onClick={() => handleBuyGroceryGuide(plan)}
                            variant="primary"
                            fullWidth
                            disabled={buyButtonLoading}
                          >
                            {buyButtonLoading ? 'Processing...' : 'Buy Now'}
                          </Button>
                        ) : (
                          // Regular Purchase Guide button for other plans
                          <Button 
                            to={`/checkout?plan=${plan.id}`} 
                            variant="primary"
                            fullWidth
                          >
                            Purchase Guide
                          </Button>
                        )}
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
                    {macroPlans.map((plan) => (
                      <PlanCard key={plan.id} category="macro">
                        <CategoryLabel category="macro">Macro</CategoryLabel>
                        <IconWrapper category="macro">
                          <FontAwesomeIcon icon={getCategoryIcon('macro', plan.title)} />
                        </IconWrapper>
                        <PlanTitle>{plan.title}</PlanTitle>
                        <PlanDescription>
                          {plan.description || "Learn how to track and optimize your macronutrients for your specific fitness and health goals."}
                        </PlanDescription>
                        <PlanPrice>${plan.price || 24.99}</PlanPrice>
                        <Button 
                          to={`/checkout?plan=${plan.id}`} 
                          variant="primary"
                          fullWidth
                        >
                          Purchase Guide
                        </Button>
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
                    {nutritionPlans.map((plan) => (
                      <PlanCard key={plan.id} category="nutrition">
                        <CategoryLabel category="nutrition">Nutrition</CategoryLabel>
                        <IconWrapper category="nutrition">
                          <FontAwesomeIcon icon={getCategoryIcon('nutrition', plan.title)} />
                        </IconWrapper>
                        <PlanTitle>{plan.title}</PlanTitle>
                        <PlanDescription>
                          {plan.description || "Personalized nutrition strategies that fit your lifestyle and dietary preferences."}
                        </PlanDescription>
                        <PlanPrice>${plan.price || 39.99}</PlanPrice>
                        <Button 
                          to={`/checkout?plan=${plan.id}`} 
                          variant="primary"
                          fullWidth
                        >
                          Purchase Plan
                        </Button>
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
    </>
  );
};

export default PlansPage; 