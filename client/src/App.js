import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import styled from 'styled-components';

// Pages
import HomePage from './pages/HomePage';
// eslint-disable-next-line no-unused-vars
import CoachingPage from './pages/CoachingPage';
import PlansPage from './pages/PlansPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CheckoutSuccessPage from './pages/CheckoutSuccessPage';
import CheckoutCancelPage from './pages/CheckoutCancelPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';

// Auth
import ProtectedRoute from './components/ProtectedRoute';

const MainContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.main`
  flex: 1;
`;

const ProtectedLayout = ({ children }) => {
  return (
    <>
      <Header />
      <ContentWrapper>
        {children}
      </ContentWrapper>
      <Footer />
    </>
  );
};

function App() {
  return (
    <MainContainer>
      <Routes>
        {/* Public route - Login page */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <ProtectedLayout>
              <HomePage />
            </ProtectedLayout>
          </ProtectedRoute>
        } />
        <Route path="/plans" element={
          <ProtectedRoute>
            <ProtectedLayout>
              <PlansPage />
            </ProtectedLayout>
          </ProtectedRoute>
        } />
        <Route path="/about" element={
          <ProtectedRoute>
            <ProtectedLayout>
              <AboutPage />
            </ProtectedLayout>
          </ProtectedRoute>
        } />
        <Route path="/contact" element={
          <ProtectedRoute>
            <ProtectedLayout>
              <ContactPage />
            </ProtectedLayout>
          </ProtectedRoute>
        } />
        <Route path="/checkout-success" element={
          <ProtectedRoute>
            <ProtectedLayout>
              <CheckoutSuccessPage />
            </ProtectedLayout>
          </ProtectedRoute>
        } />
        <Route path="/checkout-cancel" element={
          <ProtectedRoute>
            <ProtectedLayout>
              <CheckoutCancelPage />
            </ProtectedLayout>
          </ProtectedRoute>
        } />
        <Route path="*" element={
          <ProtectedRoute>
            <ProtectedLayout>
              <NotFoundPage />
            </ProtectedLayout>
          </ProtectedRoute>
        } />
      </Routes>
    </MainContainer>
  );
}

export default App;
