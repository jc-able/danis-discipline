import React from 'react';
import styled from 'styled-components';

// Section component for consistent section styling
const SectionContainer = styled.section`
  padding: ${props => props.padding || '4rem 0'};
  background-color: ${props => {
    if (props.background === 'teal') return 'var(--teal)';
    if (props.background === 'pink') return 'var(--pink)';
    if (props.background === 'black') return 'var(--black)';
    if (props.background === 'light-gray') return 'var(--light-gray)';
    return 'var(--white)';
  }};
  color: ${props => props.background === 'black' ? 'var(--white)' : 'var(--black)'};
  
  @media (max-width: 768px) {
    padding: ${props => props.mobilePadding || '2rem 0'};
  }
`;

const SectionInner = styled.div`
  width: 100%;
  max-width: ${props => props.fullWidth ? '100%' : '1200px'};
  margin: 0 auto;
  padding: ${props => props.fullWidth ? '0' : '0 1rem'};
`;

const SectionTitle = styled.h2`
  font-size: ${props => props.size || '2.5rem'};
  margin-bottom: ${props => props.marginBottom || '1.5rem'};
  text-align: ${props => props.align || 'left'};
  text-transform: ${props => props.uppercase ? 'uppercase' : 'none'};
  
  @media (max-width: 768px) {
    font-size: ${props => props.mobileSize || '1.8rem'};
  }
`;

const SectionSubtitle = styled.h3`
  font-size: ${props => props.size || '1.5rem'};
  margin-bottom: ${props => props.marginBottom || '1.5rem'};
  text-align: ${props => props.align || 'left'};
  text-transform: ${props => props.uppercase ? 'uppercase' : 'none'};
  
  @media (max-width: 768px) {
    font-size: ${props => props.mobileSize || '1.2rem'};
  }
`;

/**
 * Reusable Section component
 * @param {string} background - Background color ('white', 'teal', 'pink', 'black', 'light-gray')
 * @param {string} padding - CSS padding value
 * @param {string} mobilePadding - CSS padding value for mobile
 * @param {boolean} fullWidth - If true, removes padding and max-width
 * @param {React.ReactNode} children - Section content
 */
const Section = ({ 
  background = 'white',
  padding,
  mobilePadding,
  fullWidth = false,
  children,
  ...props
}) => {
  return (
    <SectionContainer 
      background={background}
      padding={padding}
      mobilePadding={mobilePadding}
      {...props}
    >
      <SectionInner fullWidth={fullWidth}>
        {children}
      </SectionInner>
    </SectionContainer>
  );
};

/**
 * Section.Title component for section titles
 */
Section.Title = ({ children, ...props }) => (
  <SectionTitle {...props}>{children}</SectionTitle>
);

/**
 * Section.Subtitle component for section subtitles
 */
Section.Subtitle = ({ children, ...props }) => (
  <SectionSubtitle {...props}>{children}</SectionSubtitle>
);

export default Section; 