# Vercel Deployment Guide for Dani's Discipline

This document provides step-by-step instructions for deploying the Dani's Discipline website to Vercel.

## Prerequisites

- A [Vercel](https://vercel.com) account
- A [Supabase](https://supabase.com) account with your project set up
- A [Stripe](https://stripe.com) account with API keys

## Deployment Steps

### 1. Connect Your GitHub Repository

1. Log in to Vercel
2. Click "Add New..." → "Project"
3. Select the GitHub repository "jc-able/danis-discipline"
4. Choose the "client" directory as the Root Directory
5. Framework preset should be set to "Create React App"

### 2. Configure Environment Variables

Add the following environment variables in the Vercel project settings:

#### Required Environment Variables

```
REACT_APP_SUPABASE_URL=<your-supabase-url>
REACT_APP_SUPABASE_ANON_KEY=<your-supabase-anon-key>
REACT_APP_STRIPE_PUBLIC_KEY=<your-stripe-publishable-key>
STRIPE_SECRET_KEY=<your-stripe-secret-key>
STRIPE_WEBHOOK_SECRET=<your-stripe-webhook-signing-secret>
SUPABASE_SERVICE_KEY=<your-supabase-service-role-key>
SUPABASE_URL=<your-supabase-url>
```

> Note: REACT_APP_* variables are used in the React frontend, while the others are used in the serverless API functions.

### 3. Set Up Stripe Webhook

1. In the Stripe dashboard, go to Developers → Webhooks
2. Click "Add Endpoint"
3. Use your Vercel deployment URL + `/api/webhook` as the endpoint URL (e.g., `https://your-app.vercel.app/api/webhook`)
4. Select the following events to listen for:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy the signing secret and add it as the `STRIPE_WEBHOOK_SECRET` environment variable in Vercel

### 4. Set Up Database Permissions in Supabase

1. In the Supabase dashboard, go to Settings → API
2. Add your Vercel deployment URL to the allowed origins
3. Make sure Row Level Security (RLS) policies are properly configured for your tables
4. Set up storage policies for accessing images

### 5. Deploy Your Application

1. Click "Deploy" in the Vercel interface
2. Wait for the build and deployment to complete
3. Once deployed, Vercel will provide you with a URL for your application

### 6. Test Your Deployment

1. Visit your deployed application URL
2. Test the following functionality:
   - View independent plans
   - Select a plan for purchase
   - Complete checkout with a test card (4242 4242 4242 4242)
   - Verify webhook processing
   - Check order data in Supabase

### 7. Set Up Custom Domain (Optional)

1. In Vercel project settings, go to "Domains"
2. Add your custom domain
3. Follow Vercel's instructions to configure DNS settings

## Troubleshooting

- **Webhook Errors**: Check the webhook logs in Stripe dashboard and Vercel function logs
- **Missing Environment Variables**: Verify all required environment variables are set correctly
- **CORS Errors**: Ensure your Supabase project has the correct CORS origins set
- **Build Failures**: Check the build logs in Vercel for any errors

## Maintenance

- Monitor API requests and errors in the Vercel dashboard
- Set up monitoring and logging for your application
- Regularly update dependencies to maintain security and performance

For any other issues, refer to the Vercel documentation or contact support. 