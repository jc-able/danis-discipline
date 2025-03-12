# Dani's Discipline

A modern fitness and nutrition coaching website with a distinctive Miami Vice theme (teal and pink), offering personalized coaching services, independent fitness plans, and nutrition guidance.

## Project Overview

Dani's Discipline is a fitness coaching business website designed to:
- Showcase personalized coaching services and independent plans
- Enable purchases via Stripe integration
- Provide contact forms for inquiries
- Allow newsletter signups
- Display coach certifications and credentials

## Technology Stack

- **Frontend**: React.js with JavaScript
- **Backend**: Node.js with Express
- **Database & Storage**: Supabase (including image storage)
- **Payment Processing**: Stripe
- **Form Handling**: React Hook Form
- **Hosting**: Vercel

## Key Features

- Modern, responsive design with Miami Vice theme (teal and pink)
- E-commerce functionality for purchasing coaching packages
- Independent plans showcase
- Contact form and newsletter signup
- Coach profile and certifications showcase

## Documentation

For detailed specifications, see the [Product Requirements Document](docs/PRD.md).

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

## License

[MIT](LICENSE)

## Contact

For questions or inquiries, please open an issue in this repository.