import React, { useState } from 'react';
import styled from 'styled-components';
import Section from '../components/Section';
import Button from '../components/Button';
import { useForm } from 'react-hook-form';
import { submitContactForm } from '../services/supabaseClient';

const HeaderSection = styled.div`
  background-color: var(--black);
  color: var(--white);
  padding: 5rem 0;
  text-align: center;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-top: 3rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const FormContainer = styled.div``;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 150px;
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

const ContactInfoContainer = styled.div``;

const ContactInfoItem = styled.div`
  margin-bottom: 2rem;
`;

const ContactInfoTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--pink);
`;

const ContactPage = () => {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const result = await submitContactForm(data);
      
      if (result.success) {
        setSubmitSuccess(true);
        reset();
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      } else {
        setSubmitError('There was an error submitting your message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitError('There was an error submitting your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <>
      <HeaderSection>
        <div className="container">
          <Section.Title align="center" color="white">
            get in <span className="italic">touch</span>
          </Section.Title>
          <Section.Subtitle align="center" color="white" uppercase={true}>
            I'D LOVE TO HEAR FROM YOU
          </Section.Subtitle>
        </div>
      </HeaderSection>
      
      <Section>
        <div className="container">
          <ContactGrid>
            <FormContainer>
              <Section.Title>Send Me a Message</Section.Title>
              
              {submitSuccess && (
                <SuccessMessage>
                  Your message has been sent successfully! I'll get back to you soon.
                </SuccessMessage>
              )}
              
              {submitError && (
                <ErrorMessage>{submitError}</ErrorMessage>
              )}
              
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                  <Label htmlFor="name">NAME</Label>
                  <Input 
                    id="name"
                    type="text" 
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="email">EMAIL</Label>
                  <Input 
                    id="email"
                    type="email" 
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
                
                <FormGroup>
                  <Label htmlFor="subject">SUBJECT</Label>
                  <Input 
                    id="subject"
                    type="text" 
                    {...register("subject", { required: "Subject is required" })}
                  />
                  {errors.subject && <ErrorMessage>{errors.subject.message}</ErrorMessage>}
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="message">MESSAGE</Label>
                  <TextArea 
                    id="message"
                    {...register("message", { 
                      required: "Message is required",
                      minLength: {
                        value: 10,
                        message: "Message should be at least 10 characters"
                      }
                    })}
                  />
                  {errors.message && <ErrorMessage>{errors.message.message}</ErrorMessage>}
                </FormGroup>
                
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                </Button>
              </form>
            </FormContainer>
            
            <ContactInfoContainer>
              <Section.Title>Contact Information</Section.Title>
              
              <ContactInfoItem>
                <ContactInfoTitle>PHONE</ContactInfoTitle>
                <p>(123) 456-7890</p>
              </ContactInfoItem>
              
              <ContactInfoItem>
                <ContactInfoTitle>EMAIL</ContactInfoTitle>
                <p>info@danisdiscipline.com</p>
              </ContactInfoItem>
              
              <ContactInfoItem>
                <ContactInfoTitle>ADDRESS</ContactInfoTitle>
                <p>123 Fitness Street</p>
                <p>Miami, FL 33101</p>
              </ContactInfoItem>
              
              <ContactInfoItem>
                <ContactInfoTitle>SOCIAL MEDIA</ContactInfoTitle>
                <p>Instagram: @danisdiscipline</p>
                <p>Facebook: DanisDiscipline</p>
              </ContactInfoItem>
            </ContactInfoContainer>
          </ContactGrid>
        </div>
      </Section>
    </>
  );
};

export default ContactPage; 