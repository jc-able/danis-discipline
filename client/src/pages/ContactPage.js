import React, { useState } from 'react';
import styled from 'styled-components';
import Section from '../components/Section';
import Button from '../components/Button';
import { FiMail, FiPhone, FiInstagram } from 'react-icons/fi';
import { sendContactForm } from '../services/supabaseClient';
import { useForm } from 'react-hook-form';

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

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled.div`
  background-color: var(--pink);
  color: var(--white);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  
  svg {
    font-size: 1.5rem;
    margin-right: 1rem;
  }
`;

const ContactForm = styled.form`
  background-color: var(--light-gray);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: 'Arial', sans-serif;
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 150px;
  font-family: 'Arial', sans-serif;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  font-family: 'Georgia', serif;
`;

const SectionTitle = styled.h2`
  font-family: 'Georgia', serif;
  font-weight: 600;
  color: var(--black);
  margin-bottom: 1.5rem;
`;

const FormMessage = styled.div`
  margin-top: 1rem;
  padding: 0.5rem;
  text-align: center;
  border-radius: 4px;
  color: ${props => props.error ? '#e74c3c' : '#2ecc71'};
  background-color: ${props => props.error ? '#fadbd8' : '#d5f5e3'};
`;

const ContactPage = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [submitting, setSubmitting] = useState(false);
    const [formMessage, setFormMessage] = useState('');
    const [formError, setFormError] = useState(false);
    
    const onSubmit = async (data) => {
        setSubmitting(true);
        setFormMessage('');
        setFormError(false);
        
        try {
            await sendContactForm(data);
            setFormMessage('Thank you for your message! We will get back to you soon.');
            reset();
        } catch (error) {
            setFormError(true);
            setFormMessage('There was an error sending your message. Please try again.');
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };
    
    return (
        <>
            <HeaderSection>
                <div className="container">
                    <HeaderTitle>
                        GET IN <TealPinkEffect data-text="touch">touch</TealPinkEffect>
                    </HeaderTitle>
                    <HeaderSubtitle>Let's start the conversation</HeaderSubtitle>
                </div>
            </HeaderSection>
            
            <Section>
                <div className="container">
                    <ContactGrid>
                        <ContactInfo>
                            <SectionTitle style={{ color: 'white' }}>Get In Touch</SectionTitle>
                            <p style={{ marginBottom: '2rem' }}>
                                Have questions about my coaching services or training plans? 
                                Reach out and I'll get back to you as soon as possible.
                            </p>
                            
                            <InfoItem>
                                <FiMail />
                                <div>
                                    <strong>Email</strong>
                                    <p>info@danisdiscipline.com</p>
                                </div>
                            </InfoItem>
                            
                            <InfoItem>
                                <FiPhone />
                                <div>
                                    <strong>Phone</strong>
                                    <p>(123) 456-7890</p>
                                </div>
                            </InfoItem>
                            
                            <InfoItem>
                                <FiInstagram />
                                <div>
                                    <strong>Instagram</strong>
                                    <p>@danisdiscipline</p>
                                </div>
                            </InfoItem>
                        </ContactInfo>
                        
                        <ContactForm onSubmit={handleSubmit(onSubmit)}>
                            <SectionTitle>Send a Message</SectionTitle>
                            
                            <div>
                                <FormLabel>Name</FormLabel>
                                <FormInput 
                                    type="text" 
                                    placeholder="Your Name" 
                                    {...register('name', { required: true })}
                                />
                                {errors.name && <span style={{ color: 'red' }}>Name is required</span>}
                            </div>
                            
                            <div>
                                <FormLabel>Email</FormLabel>
                                <FormInput 
                                    type="email" 
                                    placeholder="Your Email" 
                                    {...register('email', { 
                                        required: true, 
                                        pattern: /^\S+@\S+$/i 
                                    })}
                                />
                                {errors.email?.type === 'required' && <span style={{ color: 'red' }}>Email is required</span>}
                                {errors.email?.type === 'pattern' && <span style={{ color: 'red' }}>Please enter a valid email</span>}
                            </div>
                            
                            <div>
                                <FormLabel>Subject</FormLabel>
                                <FormInput 
                                    type="text" 
                                    placeholder="Subject" 
                                    {...register('subject', { required: true })}
                                />
                                {errors.subject && <span style={{ color: 'red' }}>Subject is required</span>}
                            </div>
                            
                            <div>
                                <FormLabel>Message</FormLabel>
                                <FormTextarea 
                                    placeholder="Your Message" 
                                    {...register('message', { required: true })}
                                />
                                {errors.message && <span style={{ color: 'red' }}>Message is required</span>}
                            </div>
                            
                            <Button type="submit" variant="primary" disabled={submitting}>
                                {submitting ? 'Sending...' : 'Send Message'}
                            </Button>
                            
                            {formMessage && (
                                <FormMessage error={formError}>{formMessage}</FormMessage>
                            )}
                        </ContactForm>
                    </ContactGrid>
                </div>
            </Section>
        </>
    );
};

export default ContactPage; 