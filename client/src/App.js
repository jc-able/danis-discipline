import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import styled from 'styled-components';

// Pages
import HomePage from './pages/HomePage';
import CoachingPage from './pages/CoachingPage';
import PlansPage from './pages/PlansPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CheckoutSuccessPage from './pages/CheckoutSuccessPage';
import CheckoutCancelPage from './pages/CheckoutCancelPage';
import NotFoundPage from './pages/NotFoundPage';

const MainContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.main`
  flex: 1;
`;

function App() {
  return (
    <MainContainer>
      <Header />
      
      <ContentWrapper>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Coaching page temporarily hidden */}
          {/* <Route path="/coaching" element={<CoachingPage />} /> */}
          <Route path="/plans" element={<PlansPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/checkout-success" element={<CheckoutSuccessPage />} />
          <Route path="/checkout-cancel" element={<CheckoutCancelPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ContentWrapper>
      
      <Footer />
    </MainContainer>
  );
}

export default App;
