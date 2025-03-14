# Dani's Discipline

A modern fitness and nutrition website with a distinctive Miami Vice theme (teal and pink), offering independent fitness plans and nutrition guidance. Personalized coaching services are planned for future development.

## Project Overview

Dani's Discipline is a fitness business website designed to:
- Showcase independent plans
- Enable purchases via Stripe integration
- Connect with clients through social media platforms
- Display coach certifications and credentials
- *(Future Phase)* Add personalized coaching services

## Technology Stack

- **Frontend**: React.js with JavaScript
- **Backend**: Node.js with Express
- **Database & Storage**: Supabase (including image storage)
- **Payment Processing**: Stripe
- **Form Handling**: React Hook Form
- **Hosting**: Vercel

## Key Features

- Modern, responsive design with Miami Vice theme (teal and pink)
- E-commerce functionality for purchasing plans
- Independent plans showcase
- Social media link tree for client connections
- Coach profile and certifications showcase
- *(Future Phase)* Personalized coaching packages

## Documentation

For detailed specifications, see the [Product Requirements Document](docs/PRD.md).

## Current Status

### Completed
- ✅ Environment configuration (Supabase, Stripe)
- ✅ Client-side React app setup
- ✅ Component library with Miami Vice theme
- ✅ Responsive layout with mobile-friendly design
- ✅ All page components (Home, Plans, Training, About, Contact)
- ✅ Checkout success and cancel pages
- ✅ Integration with Supabase client for data fetching
- ✅ React Hook Form implementation for forms
- ✅ Stripe checkout flow interface
- ✅ Backend API implementation for core features

### In Progress / Remaining Tasks
- ⏳ Actual image assets (currently using placeholders)
- ⏳ Supabase database table setup:
  - `independent_plans` table
  - `display_orders` table
  - `home_polaroids` table
  - *(Future Phase)* `coaching_packages` table
- ⏳ Complete Stripe integration on backend
- ⏳ Email confirmation for purchases
- ⏳ Testing across different browsers and devices
- ⏳ Deployment to Vercel

## Recent Changes

### April 2024
- **Database Simplification**:
  - Replaced contact form with social media link tree
  - Removed `contact_messages` table and related functionality
  - Moved certifications to static data in the AboutPage component
  - Removed `certifications` table
  - Removed `homepage_settings` table
  - Simplified polaroids functionality
  - Updated PRD to reflect these changes

### March 2024
- Set up environment files for client and server
- Created the complete client-side application with:
  - Reusable components (Header, Footer, Button, Section)
  - Page components for all required pages
  - Supabase client service with API functions
  - Stripe service for handling payments
  - Form handling with validation
  - Miami Vice theme using CSS variables
  - Responsive design for all screen sizes
- Implemented backend API with endpoints for:
  - Independent plans
  - Coaching packages (future implementation)
  - Orders and payments via Stripe
  - Image serving
- **Removed newsletter subscription feature** (March 14, 2024):
  - Removed newsletter subscription endpoints
  - Updated PRD to exclude newsletter functionality
  - Any frontend components related to newsletter will need to be removed

## Development Setup

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Supabase account
- Stripe account

### Installation
1. Clone the repository
```bash
git clone https://github.com/jc-able/danis-discipline.git
cd danis-discipline
```

2. Install dependencies for both frontend and backend
```bash
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

3. Set up environment variables (create .env files based on .env.example)

4. Start development servers
```bash
# Start backend server
cd server
npm run dev

# Start frontend in another terminal
cd client
npm start
```

## Next Steps for Developers
If you're picking up this project, here's what you should focus on next:

1. **Backend Implementation**:
   - Connect Stripe for actual payment processing
   - Set up webhook handlers for Stripe events

2. **Supabase Setup**:
   - Create the database tables as defined in the PRD
   - Configure storage buckets for images
   - Set up row-level security policies

3. **Image Assets**:
   - Replace placeholder images with actual assets
   - Add logo files (favicon.ico, logo192.png, logo512.png)

4. **Frontend Updates**:
   - Ensure all components are consistent with database changes
   - Verify the social media link tree on the contact page
   - Test static certification display

5. **Testing**:
   - Test form submissions
   - Test Stripe checkout flow
   - Ensure mobile responsiveness
   - Cross-browser testing

## License

[MIT](LICENSE)

## Contact

For questions or inquiries, please open an issue in this repository.