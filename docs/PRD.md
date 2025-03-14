# Dani's Discipline - Product Requirements Document (PRD)

## 1. Project Overview

### 1.1 Introduction
Dani's Discipline is a fitness and nutrition coaching website designed to provide independent fitness plans and nutrition guidance. The website will feature a modern, visually appealing interface with a distinctive "Miami Vice" theme characterized by teal and pink color schemes. Personalized coaching services will be planned for future phases of the project.

### 1.2 Project Goals
- Create a responsive, modern website for a fitness and nutrition business
- Allow potential clients to learn about independent plans
- Enable clients to purchase plans via Stripe integration
- Provide links to social media platforms for communication
- Display coach certifications and credentials
- Showcase the coach's philosophy and background
- *(Future Phase)* Implement personalized coaching services

### 1.3 Target Audience
- People looking for self-guided fitness and nutrition plans
- Those interested in nutrition guidance and sustainable fitness habits
- *(Future Phase)* Individuals seeking personalized fitness coaching

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
  - Service option cards (INDEPENDENT PLANS, WORKOUT PROGRAMS)
  - Each card has image placeholder and link to respective page
  - *(Future Phase)* Add 1:1 COACHING card
- **Call-to-Action Section**:
  - "WHERE DO I start?" heading
  - Explanation text
  - "START NOW" button
- **Service Details Section**:
  - *(Hidden for initial release)* "1:1 COACHING" details with image
  - *(Hidden for initial release)* "What's included..." list (12 WEEKS LONG, 1:1 PERSONAL COACH, etc.)
  - *(Hidden for initial release)* "LEARN MORE" button

### 3.3 1:1 Coaching Page
*(Note: This page will be hidden in the initial release and implemented in a future phase)*

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
  - "LET'S CONNECT THROUGH SOCIAL MEDIA" subheading
- **Social Media Link Tree**:
  - Various platform links styled as cards (Instagram, Facebook, TikTok, etc.)
  - Email contact option
  - Each card has a platform icon and description
  - Consistent Miami Vice styling with platform-specific colors

## 4. Data Models

### 4.1 Coaching Packages
*(Note: This table exists but will not be utilized in the initial release - reserved for future phases)*

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
  display_order: Number,     // Display order (REQUIRED, 1-99) - Note: named display_order in database
  stripeProductId: String,   // Stripe product ID for checkout (REQUIRED after creation in Stripe)
  price: Number,             // Plan price (REQUIRED, positive value)
  active: Boolean,           // Whether plan is active (REQUIRED, default: true)
  createdAt: Date,           // Creation date (REQUIRED, auto-generated)
  updatedAt: Date            // Last update date (REQUIRED, auto-updated)
}
```

### 4.3 Certifications
*(Note: This table has been removed. Certifications are now stored as static data in the AboutPage component)*

```javascript
// Static certifications data structure:
[
  { 
    id: Number,              // Unique identifier
    title: String,           // Certification title 
    organization: String,    // Issuing organization
    year: Number             // Year obtained
  }
]
```

### 4.4 Contact Messages
*(Note: This table has been removed. Contact functionality has been replaced with a social media link tree)*

### 4.5 Display Orders
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

### 4.6 Home Polaroids
*(Note: This table remains in the database, but the polaroids functionality has been simplified)*

```javascript
{
  id: String,                    // Unique identifier (REQUIRED, auto-generated UUID)
  name: String,                  // Name/title of the polaroid (REQUIRED)
  image_path: String,            // Path to image (REQUIRED)
  position: String,              // Position of polaroid (REQUIRED)
  rotation: String,              // Rotation angle (REQUIRED)
  tape_top: String,              // Tape position top (OPTIONAL)
  tape_left: String,             // Tape position left (OPTIONAL)
  tape_bottom: String,           // Tape position bottom (OPTIONAL)
  tape_right: String,            // Tape position right (OPTIONAL)
  tape_rotation: String,         // Tape rotation (OPTIONAL)
  second_tape_rotation: String,  // Second tape rotation (OPTIONAL)
  position_top: String,          // Detailed position top (OPTIONAL)
  position_left: String,         // Detailed position left (OPTIONAL)
  position_right: String,        // Detailed position right (OPTIONAL)
  position_bottom: String,       // Detailed position bottom (OPTIONAL)
  display_order: Number,         // Display order (REQUIRED)
  hide_on_mobile: Boolean,       // Whether to hide on mobile (OPTIONAL)
  active: Boolean,               // Whether polaroid is active (REQUIRED)
  image_full_url: String,        // Complete image URL (OPTIONAL)
  image_content_type: String,    // Image MIME type (OPTIONAL)
  image_original_filename: String, // Original filename (OPTIONAL)
  image_storage_path: String,    // Storage path in Supabase (OPTIONAL)
  image_uploaded_at: Date,       // Upload timestamp (OPTIONAL)
  createdAt: Date,               // Creation date (OPTIONAL)
  updatedAt: Date                // Last update date (OPTIONAL)
}
```

### 4.7 Homepage Settings
*(Note: This table has been removed)*

## 5. API Endpoints

### 5.1 Coaching Packages
*(Note: These endpoints exist but will not be utilized in the initial release - reserved for future phases)*
- `GET /api/coaching-packages` - Retrieve all coaching packages
- `GET /api/coaching-packages/:id` - Retrieve a specific coaching package

### 5.2 Independent Plans
- `GET /api/independent-plans` - Retrieve all independent plans
- `GET /api/independent-plans/:id` - Retrieve a specific independent plan

### 5.3 Contact Form
*(Note: This endpoint has been removed. Contact functionality has been replaced with a social media link tree)*

### 5.4 Stripe Integration
- `POST /api/create-checkout-session` - Create a Stripe checkout session
- `GET /api/checkout-success` - Handle successful checkout
- `GET /api/checkout-cancel` - Handle canceled checkout

### 5.5 Image Retrieval
- `GET /api/images/:category/:id` - Retrieve images from Supabase storage

### 5.6 Display Orders
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

## 12. Recent Changes

### 12.1 Database Simplification (April 2024)
- **Contact Form Removal**:
  - Replaced contact form functionality with social media link tree
  - Removed `contact_messages` table and related endpoints
  - Updated ContactPage component to display social media links
  
- **Certifications Table Removal**:
  - Moved certifications to static data in the AboutPage component
  - Removed `certifications` table and related endpoints
  
- **Polaroids Simplification**:
  - Simplified polaroids functionality
  - Removed polaroids routes from API
  
- **Homepage Settings Removal**:
  - Removed `homepage_settings` table
  - Moved content to static components

### 12.2 Potential Enhancements
- User authentication for client portal
- Blog or content section
- Online booking system for coaching sessions
- Progress tracking features
- E-commerce expansion for more products
- Admin panel for content management

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