# Dani's Discipline - Product Requirements Document (PRD)

## 1. Project Overview

### 1.1 Introduction
Dani's Discipline is a fitness and nutrition coaching website designed to provide personalized coaching services, independent fitness plans, and nutrition guidance. The website will feature a modern, visually appealing interface with a distinctive "Miami Vice" theme characterized by teal and pink color schemes.

### 1.2 Project Goals
- Create a responsive, modern website for a fitness and nutrition coaching business
- Allow potential clients to learn about coaching services and independent plans
- Enable clients to purchase coaching packages via Stripe integration
- Provide a contact form for inquiries
- Allow users to sign up for a newsletter
- Display coach certifications and credentials
- Showcase the coach's philosophy and background

### 1.3 Target Audience
- Individuals seeking personalized fitness coaching
- People looking for self-guided fitness and nutrition plans
- Those interested in nutrition guidance and sustainable fitness habits

### 1.4 Success Metrics
- **Functional Purchase Flow**: Complete purchase process with confirmations
- **Visual Implementation**: Website matches design specifications with proper theme implementation
- **Image Handling**: All images properly displayed and connected to Supabase storage
- **Responsive Design**: Website functions correctly across all device sizes

## 2. Technical Requirements

### 2.1 Technology Stack
- **Frontend**: React.js with JavaScript
- **Backend**: Node.js with Express
- **Database & Storage**: Supabase (including image storage)
- **Payment Processing**: Stripe
- **Form Handling**: React Hook Form
- **Hosting**: Vercel
- **Version Control**: Git

### 2.2 Project Structure
```
project/
├── client/          # React frontend
│   ├── public/      # Static assets
│   ├── src/         # Source code
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── assets/      # Images, fonts, etc.
│   │   ├── styles/      # CSS/SCSS files
│   │   ├── utils/       # Utility functions
│   │   ├── services/    # API service connections
│   │   ├── App.js       # Main app component
│   │   └── index.js     # Entry point
│   ├── package.json  # Frontend dependencies
│   └── ...
├── server/          # Node.js backend
│   ├── config/      # Configuration files
│   ├── controllers/ # Request handlers
│   ├── models/      # Data models
│   ├── routes/      # API endpoints
│   ├── services/    # Third-party service integrations
│   ├── utils/       # Utility functions
│   ├── server.js    # Main server file
│   ├── package.json # Backend dependencies
│   └── ...
├── .gitignore       # Git ignore file
├── README.md        # Project documentation
└── ...
```

### 2.3 Administration Considerations
- Admin panel/dashboard is planned as a separate future project
- Current implementation should be built with future admin capabilities in mind
- Backend structure should support future content management for:
  - Coaching packages (prices, descriptions, etc.)
  - Independent plans
  - Images and media content
  - Contact form submissions
  - Newsletter subscribers

## 3. Page Descriptions

### 3.1 Common Elements
All pages will include:
- **Header** with:
  - Logo ("DD")
  - Navigation menu (HOME, 1:1 COACHING, INDEPENDENT PLANS, TRAINING, ABOUT ME, CONTACT)
  - Shopping cart icon
- **Responsive design** for mobile compatibility
- **Miami Vice theme** colors (teal and pink)
- **Consistent typography** across all pages

### 3.2 Home Page
- **Hero Section**:
  - "Dani's Discipline" main heading
  - "ACHIEVE GOALS WITHOUT LIMITS" subheading
  - Down arrow for navigation
- **Main Content**:
  - "LET'S WORK together" section with explanation text
  - Three service option cards (1:1 COACHING, INDEPENDENT PLANS, WORKOUT PROGRAMS)
  - Each card has image placeholder and link to respective page
- **Call-to-Action Section**:
  - "WHERE DO I start?" heading
  - Explanation text
  - "START NOW" button
- **Service Details Section**:
  - "1:1 COACHING" details with image
  - "What's included..." list (12 WEEKS LONG, 1:1 PERSONAL COACH, etc.)
  - "LEARN MORE" button

### 3.3 1:1 Coaching Page
- **Header Section**:
  - "1:1 coaching" heading
  - "PERSONALIZED FITNESS & NUTRITION GUIDANCE" subheading
  - Description text
- **Pricing Cards**:
  - Option 1: "1:1 COACHING SESSION" ($50)
    - Description text
    - "BUY NOW" button (Stripe integration)
  - Option 2: "4-WEEK COACHING PACKAGE" ($180)
    - Description text
    - "BUY NOW" button (Stripe integration)
  - Option 3: "12-WEEK TRANSFORMATION" ($500)
    - Description text
    - "BUY NOW" button (Stripe integration)
- **Benefits Section**:
  - "Why Choose 1:1 Coaching" heading
  - List of benefits (Personalized approach, Experienced coaches, etc.)
- **Call-to-Action Section**:
  - "Ready to transform your life?" heading
  - Description text
  - "START NOW" button

### 3.4 Independent Plans Page
- **Header Section**:
  - "independent plans" heading
  - "CUSTOMIZED PLANS FOR SELF-GUIDED FITNESS" subheading
  - Description text
- **Plans Grid**:
  - Six plan options with icons and titles (CUSTOM REVERSE DIETING PLAN, POST REVERSE CARB CYCLING CUT, etc.)
  - Arrow icon for each plan
  - Numbered (01-06)
- **Newsletter Signup**:
  - "GET ON the list" heading
  - "SIGN UP FOR MY EMAIL LIST AND ALWAYS STAY UP TO DATE WITH MACROHABITS" text
  - Name and email input fields
  - "SIGN UP" button

### 3.5 About Me Page
- **Header Section**:
  - "about me" heading
  - "CERTIFIED FITNESS & NUTRITION COACH" subheading
- **Personal Story Section**:
  - "01" numbered section
  - "My Story" heading
  - Paragraphs about personal journey and experience
- **Philosophy Section**:
  - "02" numbered section
  - "My Philosophy" heading
  - Description text
  - Bullet points of coaching methodology
- **Certifications Section**:
  - "Certifications" heading
  - Four certification cards with titles and issuing organizations
- **Call-to-Action Section**:
  - "Ready to work together?" heading
  - Description text
  - "START COACHING" button

### 3.6 Contact Page
- **Header Section**:
  - "get in touch" heading
  - "I'D LOVE TO HEAR FROM YOU" subheading
- **Contact Form**:
  - "Send Me a Message" heading
  - Form fields: NAME, EMAIL, SUBJECT, MESSAGE
  - "SEND MESSAGE" button
- **Contact Information**:
  - PHONE section with phone number
  - EMAIL section with email address
  - ADDRESS section with physical address

## 4. Data Models

### 4.1 Coaching Packages
```javascript
{
  id: String,                // Unique identifier (REQUIRED, auto-generated UUID)
  title: String,             // Package title (REQUIRED, 3-100 chars)
  description: String,       // Package description (REQUIRED, 10-1000 chars)
  price: Number,             // Package price (REQUIRED, positive value)
  duration: String,          // Duration (REQUIRED, e.g., "Single Session", "4-Week", "12-Week")
  features: Array<String>,   // List of features (REQUIRED, at least 1 feature)
  stripeProductId: String,   // Stripe product ID for checkout (REQUIRED after creation in Stripe)
  imageUrl: String,          // URL to image in Supabase storage (OPTIONAL)
  active: Boolean,           // Whether package is active (REQUIRED, default: true)
  createdAt: Date,           // Creation date (REQUIRED, auto-generated)
  updatedAt: Date            // Last update date (REQUIRED, auto-updated)
}
```

### 4.2 Independent Plans
```javascript
{
  id: String,                // Unique identifier (REQUIRED, auto-generated UUID)
  title: String,             // Plan title (REQUIRED, 3-100 chars)
  description: String,       // Plan description (REQUIRED, 10-1000 chars)
  icon: String,              // Icon reference (REQUIRED)
  order: Number,             // Display order (REQUIRED, 1-99)
  stripeProductId: String,   // Stripe product ID for checkout (REQUIRED after creation in Stripe)
  price: Number,             // Plan price (REQUIRED, positive value)
  active: Boolean,           // Whether plan is active (REQUIRED, default: true)
  createdAt: Date,           // Creation date (REQUIRED, auto-generated)
  updatedAt: Date            // Last update date (REQUIRED, auto-updated)
}
```

### 4.3 Certifications
```javascript
{
  id: String,                // Unique identifier (REQUIRED, auto-generated UUID)
  title: String,             // Certification title (REQUIRED, 3-100 chars)
  organization: String,      // Issuing organization (REQUIRED, 2-100 chars)
  year: Number,              // Year obtained (REQUIRED, valid year format)
  imageUrl: String,          // URL to image in Supabase storage (OPTIONAL)
  createdAt: Date,           // Creation date (REQUIRED, auto-generated)
  updatedAt: Date            // Last update date (REQUIRED, auto-updated)
}
```

### 4.4 Newsletter Subscribers
```javascript
{
  id: String,                // Unique identifier (REQUIRED, auto-generated UUID)
  name: String,              // Subscriber name (REQUIRED, 2-100 chars)
  email: String,             // Subscriber email (REQUIRED, valid email format, unique)
  subscriptionDate: Date,    // Date of subscription (REQUIRED, auto-generated)
  active: Boolean,           // Subscription status (REQUIRED, default: true)
  unsubscribeToken: String   // Token for unsubscribing (REQUIRED, auto-generated)
}
```

### 4.5 Contact Messages
```javascript
{
  id: String,                // Unique identifier (REQUIRED, auto-generated UUID)
  name: String,              // Sender name (REQUIRED, 2-100 chars)
  email: String,             // Sender email (REQUIRED, valid email format)
  subject: String,           // Message subject (REQUIRED, 2-200 chars)
  message: String,           // Message content (REQUIRED, 10-5000 chars)
  date: Date,                // Submission date (REQUIRED, auto-generated)
  isRead: Boolean            // Read status (REQUIRED, default: false)
}
```

### 4.6 Display Orders
```javascript
{
  id: String,                // Unique identifier (REQUIRED, auto-generated UUID)
  customerEmail: String,     // Customer email (REQUIRED, valid email format)
  customerName: String,      // Customer name (REQUIRED, 2-100 chars)
  productType: String,       // Type of product ("coaching" or "plan") (REQUIRED)
  productId: String,         // Reference to product ID (REQUIRED)
  amount: Number,            // Purchase amount (REQUIRED, positive value)
  stripeSessionId: String,   // Stripe checkout session ID (REQUIRED)
  stripePaymentId: String,   // Stripe payment ID (REQUIRED when payment completed)
  status: String,            // Order status (REQUIRED: "pending", "completed", "failed", default: "pending")
  purchaseDate: Date,        // Purchase date (REQUIRED, auto-generated)
  updatedAt: Date            // Last update date (REQUIRED, auto-updated)
}
```

## 5. API Endpoints

### 5.1 Coaching Packages
- `GET /api/coaching-packages` - Retrieve all coaching packages
- `GET /api/coaching-packages/:id` - Retrieve a specific coaching package

### 5.2 Independent Plans
- `GET /api/independent-plans` - Retrieve all independent plans
- `GET /api/independent-plans/:id` - Retrieve a specific independent plan

### 5.3 Contact Form
- `POST /api/contact` - Submit a contact form message

### 5.4 Newsletter
- `POST /api/subscribe` - Subscribe to the newsletter

### 5.5 Stripe Integration
- `POST /api/create-checkout-session` - Create a Stripe checkout session
- `GET /api/checkout-success` - Handle successful checkout
- `GET /api/checkout-cancel` - Handle canceled checkout

### 5.6 Image Retrieval
- `GET /api/images/:category/:id` - Retrieve images from Supabase storage

### 5.7 Display Orders
- `GET /api/display-orders/:id` - Retrieve order status (for confirmation pages)

## 6. UI/UX Guidelines

### 6.1 Color Scheme
- **Primary Colors**:
  - Teal: #8CDCD9 (background sections)
  - Pink: #E686D3 (buttons, accents, card backgrounds)
- **Secondary Colors**:
  - Black: #000000 (text, header background)
  - White: #FFFFFF (text on dark backgrounds)
  - Light Gray: #F5F5F5 (form backgrounds)

### 6.2 Typography
- **Headings**: Serif font (similar to the designs)
- **Body Text**: Sans-serif font (clean, modern)
- **Special Elements**: Italic styling for accent words (e.g., "together", "plans", "coaching")

### 6.3 Responsive Design
- **Desktop**: Full layout as shown in designs
- **Tablet**: Adjusted layouts with preserved structure
- **Mobile**:
  - Stacked elements for better readability
  - Hamburger menu for navigation
  - Adjusted image sizes
  - Single-column layouts
  - Proper button sizing for touch interfaces
  - Prevention of text/image overlapping
  - Careful attention to spacing and margins
  - Font size adjustments for readability

### 6.4 Buttons
- **Primary Button**: Pink background with white text
- **Secondary Button**: Teal background with black or white text
- **Hover Effects**: Slight darkening of button color
- **Active States**: Visible feedback on click
- **Mobile Considerations**: 
  - Minimum touch target size of 44x44px
  - Clear visual feedback on tap

### 6.5 Forms
- Clean, minimalist input fields
- Clear labels
- Validation feedback
- Submit buttons following button guidelines
- Implementation using React Hook Form
- Responsive design for all screen sizes

## 7. Development Phases

### 7.1 Phase 1: Setup and Structure
- Set up project repository
- Configure React frontend
- Configure Node.js backend
- Set up Supabase database and storage
- Implement basic routing
- Create reusable components

### 7.2 Phase 2: Core Frontend Development
- Implement header and navigation
- Create all page layouts
- Implement responsive design
- Style components according to UI guidelines
- Set up form structures
- Implement React Hook Form for all forms

### 7.3 Phase 3: Backend Integration
- Set up API endpoints
- Connect to Supabase for data storage
- Implement image retrieval from Supabase
- Set up form handling with React Hook Form
- Implement newsletter subscription functionality

### 7.4 Phase 4: Payment Integration
- Set up Stripe integration
- Implement checkout flow
- Set up email confirmation for purchases
- Create success and cancel pages
- Test payment functionality

### 7.5 Phase 5: Testing and Refinement
- Test all functionality
- Ensure mobile responsiveness
- Fix bugs and issues
- Optimize performance
- Refine UI details

### 7.6 Phase 6: Deployment
- Configure Vercel deployment
- Set up environment variables
- Deploy frontend and backend
- Test live deployment
- Domain setup (if applicable)

## 8. Testing Requirements

### 8.1 Functional Testing
- Verify all navigation links work correctly
- Test form submissions
- Test newsletter signup
- Verify Stripe payment flow
- Test responsiveness on various devices

### 8.2 Browser Compatibility
- Test on Chrome, Firefox, Safari, and Edge
- Ensure consistent appearance and functionality

### 8.3 Mobile Testing
- Test on iOS and Android devices
- Verify touch interactions work properly
- Ensure readability and usability on small screens

### 8.4 Performance Testing
- Check load times
- Optimize image loading
- Verify smooth scrolling and animations

## 9. Deployment Strategy

### 9.1 Vercel Setup
- Connect GitHub repository to Vercel
- Configure build settings
- Set up environment variables

### 9.2 Environment Variables
- Supabase API key and URL
- Stripe API keys
- Other third-party service credentials
- Node.js environment configuration

### 9.3 Deployment Process
- Automatic deployment from main branch
- Preview deployments for pull requests
- Manual promotion to production if needed

### 9.4 Post-Deployment
- Verify all functionality works in production
- Monitor for any issues
- Set up analytics (if applicable)

## 10. Error Handling

### 10.1 Error Page Design
- Maintain Miami Vice theme (teal and pink colors)
- Clear, friendly error messages
- Navigation options back to main site
- Search functionality when appropriate
- Consistent branding with rest of the site

### 10.2 Error Types and Handling
- **404 Not Found**: Custom page for non-existent URLs
- **Server Errors**: Appropriate messaging for 500-level errors
- **Form Validation**: In-line validation using React Hook Form
- **Payment Errors**: Integration with Stripe's error handling system

### 10.3 Technical Implementation
- React error boundaries for component-level errors
- Express middleware for server-side errors
- Form validation with React Hook Form
- Appropriate error logging

## 11. Post-Purchase Flow

### 11.1 Confirmation Email
- Automatic email confirmation of purchase
- Include order details and payment amount
- Thank you message and next steps

### 11.2 Success Page
- Visual confirmation of successful purchase
- Order summary
- Next steps information
- Return to home option

## 12. Future Considerations

### 12.1 Potential Enhancements
- User authentication for client portal
- Blog or content section
- Online booking system for coaching sessions
- Progress tracking features
- E-commerce expansion for more products
- Admin panel for content management

### 12.2 Maintenance Plan
- Regular updates to content
- Security patches and dependency updates
- Performance monitoring
- Backup strategy

---

## Appendix A: Technical Stack Details

### React Frontend
- React Router for navigation
- React Hook Form for form handling
- Styled Components or CSS Modules for styling
- Axios for API requests

### Node.js Backend
- Express.js framework
- Supabase JS client
- Stripe Node.js SDK
- Cors middleware
- Dotenv for environment variables

### Supabase Setup
- Tables for all data models
- Storage buckets for images
- Row-level security policies
- Backup configuration

### Stripe Integration
- Products setup in Stripe dashboard
- Webhook configuration
- Checkout session customization