import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

// Common button styles
const buttonStyles = css`
  display: inline-block;
  padding: ${props => props.small ? '0.5rem 1rem' : '0.75rem 1.5rem'};
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
  font-size: ${props => props.small ? '0.8rem' : '1rem'};
  text-align: center;
  transition: all 0.3s ease;
  background-color: ${props => {
    if (props.secondary) return 'var(--teal)';
    return 'var(--pink)';
  }};
  color: ${props => {
    if (props.secondary) return 'var(--black)';
    return 'var(--white)';
  }};
  
  &:hover {
    background-color: ${props => {
      if (props.secondary) return '#7ac7c4'; // Darker teal
      return '#d371be'; // Darker pink
    }};
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    width: ${props => props.fullWidth ? '100%' : 'auto'};
  }
`;

// Styled button for regular button element
const StyledButton = styled.button`
  ${buttonStyles}
`;

// Styled Link for router links
const StyledLink = styled(Link)`
  ${buttonStyles}
  text-decoration: none;
`;

// Styled anchor for external links
const StyledAnchor = styled.a`
  ${buttonStyles}
  text-decoration: none;
`;

/**
 * Button component that can render as a button, Link, or anchor
 * @param {string} variant - 'primary' (default) or 'secondary'
 * @param {boolean} small - If true, renders a smaller button
 * @param {boolean} fullWidth - If true, button takes full width on mobile
 * @param {string} to - If provided, renders as a Link (for internal routing)
 * @param {string} href - If provided, renders as an anchor (for external links)
 */
const Button = ({ 
  children, 
  variant = 'primary', 
  small = false, 
  fullWidth = false,
  to, 
  href, 
  ...props 
}) => {
  const isSecondary = variant === 'secondary';
  
  // Render as Link if 'to' prop is provided
  if (to) {
    return (
      <StyledLink 
        to={to} 
        secondary={isSecondary} 
        small={small} 
        fullWidth={fullWidth} 
        {...props}
      >
        {children}
      </StyledLink>
    );
  }
  
  // Render as anchor if 'href' prop is provided
  if (href) {
    return (
      <StyledAnchor 
        href={href} 
        secondary={isSecondary} 
        small={small} 
        fullWidth={fullWidth} 
        {...props}
      >
        {children}
      </StyledAnchor>
    );
  }
  
  // Default: render as button
  return (
    <StyledButton 
      secondary={isSecondary} 
      small={small} 
      fullWidth={fullWidth} 
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button; 