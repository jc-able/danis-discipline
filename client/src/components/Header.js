import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: var(--black);
  color: var(--white);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-family: 'Georgia', serif;
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--white);
  text-decoration: none;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    background-color: var(--black);
    padding: 1rem 0;
    z-index: 99;
  }
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

const NavItem = styled.li`
  margin-left: 1.5rem;
  
  @media (max-width: 768px) {
    margin: 0.5rem 0;
    text-align: center;
    width: 100%;
  }
`;

const NavLinkStyled = styled(NavLink)`
  color: var(--white);
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.9rem;
  transition: color 0.3s ease;
  
  &:hover, &.active {
    color: var(--teal);
  }
`;

const CartIcon = styled(Link)`
  margin-left: 1.5rem;
  color: var(--white);
  font-size: 1.2rem;
  
  &:hover {
    color: var(--teal);
  }
  
  @media (max-width: 768px) {
    margin: 1rem 0;
  }
`;

const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: var(--white);
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <HeaderContainer>
      <div className="container">
        <HeaderContent>
          <Logo to="/">DD</Logo>
          
          <HamburgerButton onClick={toggleMenu}>
            {isMenuOpen ? '✕' : '☰'}
          </HamburgerButton>
          
          <Nav isOpen={isMenuOpen}>
            <NavList>
              <NavItem>
                <NavLinkStyled to="/">Home</NavLinkStyled>
              </NavItem>
              <NavItem>
                <NavLinkStyled to="/coaching">1:1 Coaching</NavLinkStyled>
              </NavItem>
              <NavItem>
                <NavLinkStyled to="/plans">Independent Plans</NavLinkStyled>
              </NavItem>
              <NavItem>
                <NavLinkStyled to="/training">Training</NavLinkStyled>
              </NavItem>
              <NavItem>
                <NavLinkStyled to="/about">About Me</NavLinkStyled>
              </NavItem>
              <NavItem>
                <NavLinkStyled to="/contact">Contact</NavLinkStyled>
              </NavItem>
            </NavList>
            
            <CartIcon to="/cart">🛒</CartIcon>
          </Nav>
        </HeaderContent>
      </div>
    </HeaderContainer>
  );
};

export default Header; 