# AURA Wellness Platform - Chingu Voyage Project

A comprehensive Next.js wellness platform connecting clients with professional massage therapists and wellness services. Built with modern web development practices including BEM methodology, SCSS preprocessing, Firebase authentication, and Material UI components. Designed for Chingu Voyage learning experience.

## 🚀 Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up Firebase** (optional for demo mode)
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication with Email/Password
   - Copy your config to `.env.local`

3. **Run the app**
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
V56-tier3-team-37/
├── .gitignore                 # Git ignore rules
├── .env.local.example         # Environment variables template
├── package.json               # Dependencies and scripts
├── tailwind.config.js         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
├── next.config.ts             # Next.js configuration
├── README.md                  # This file
├── SETUP.md                   # Detailed setup guide
└── src/
    ├── app/                   # Next.js App Router pages
    │   ├── layout.tsx         # Root layout with AuthProvider
    │   ├── page.tsx           # Home page with service discovery (/)
    │   ├── globals.scss       # BEM + SCSS styles
    │   ├── auth/
    │   │   └── page.tsx       # Authentication page (/auth)
    │   ├── onboarding/
    │   │   └── page.tsx       # Partner onboarding flow (/onboarding)
    │   ├── dashboard/
    │   │   └── page.tsx       # Partner dashboard (/dashboard)
    │   ├── services/
    │   │   └── page.tsx       # Service catalog (/services)
    │   ├── book-appointment/
    │   │   └── page.tsx       # Booking flow (/book-appointment)
    │   ├── manage-services/
    │   │   └── page.tsx       # Service management (/manage-services)
    │   └── chatbot-demo/
    │       └── page.tsx       # AI assistant demo (/chatbot-demo)
    ├── components/            # Reusable UI components
    │   ├── Header.tsx         # Navigation header (BEM)
    │   ├── MobileMenu.tsx     # Mobile navigation with animated hamburger
    │   ├── Footer.tsx         # Footer component (BEM)
    │   ├── BeautifulCard.tsx  # Glassmorphism card component
    │   ├── BrandButton.tsx    # Custom branded button component
    │   ├── BrandLoader.tsx    # Branded loading component
    │   ├── OnboardingStepper.tsx # Multi-step onboarding flow
    │   └── FloatingChat.tsx   # AI assistant chat widget
    └── lib/                   # Utility libraries
        ├── firebase.ts        # Firebase configuration
        ├── auth-context.tsx   # Authentication context
        ├── massage-types.ts   # Standardized massage service types
        ├── partner-service.ts # Partner data management
        ├── appointment-service.ts # Booking and appointment management
        └── language-context.tsx # Multi-language support
```

## 🤖 AI Wellness Assistant

### Overview
The AURA AI assistant provides intelligent support for both clients and wellness partners, offering personalized recommendations, booking assistance, and wellness guidance.

### Features
- **Service Discovery**: AI helps clients find the perfect massage or wellness service
- **Booking Assistance**: Intelligent scheduling recommendations based on availability
- **Partner Support**: AI assists wellness professionals with client management
- **Wellness Guidance**: Provides tips and recommendations for optimal wellness
- **Multi-language Support**: Available in English and Spanish
- **Role-Based Responses**: Tailored assistance based on user type (client vs partner)

### User Experience

#### 👤 Clients
- ✅ Get personalized service recommendations
- ✅ Receive booking assistance and scheduling help
- ✅ Access wellness tips and guidance
- ✅ Find nearby wellness professionals
- 👋 Greeting: "Hello! I'm your AI wellness assistant..."

#### 🤝 Partners
- ✅ Manage client bookings and appointments
- ✅ Get business insights and recommendations
- ✅ Access client communication tools
- ✅ Receive marketing and growth tips
- 👋 Greeting: "Hello Partner! I'm your AI business assistant..."

### How It Works
1. **Intelligent Matching**: AI analyzes client preferences and matches them with suitable services
2. **Availability Checking**: Real-time availability checking for optimal booking times
3. **Personalized Recommendations**: Based on client history and preferences
4. **Business Intelligence**: Partners receive insights on client patterns and preferences

### Demo Page
Visit `/chatbot-demo` to experience the AI assistant with different user roles and scenarios.

---

## 💆‍♀️ Standardized Wellness Services

### Overview
This application implements a comprehensive standardized wellness services system to ensure service consistency, improve client experience, and help partners maximize their earnings.

### Features
- **15+ Massage Categories**: Comprehensive coverage across all major massage and wellness specialties
- **Smart Icon System**: Category-level icons with service indicators for clean UX
- **Autocomplete Functionality**: Real-time search with category grouping and descriptions
- **Category Organization**: Logical grouping by wellness specialty (Relaxation, Therapeutic, Sports, etc.)
- **Service Descriptions**: Detailed descriptions for each service type
- **Pricing Integration**: Built-in pricing structure for partner earnings

### Available Service Categories
- **💆‍♀️ Swedish Massage**: Classic relaxation massage with long, flowing strokes
- **💪 Deep Tissue**: Targeted pressure to release chronic muscle tension
- **🏃‍♂️ Sports Massage**: Pre/post workout massage for athletes
- **🔥 Hot Stone Therapy**: Heated stones for deep muscle relaxation
- **🌸 Aromatherapy**: Essential oils combined with massage techniques
- **🦶 Reflexology**: Foot and hand pressure point therapy
- **🙏 Thai Massage**: Traditional stretching and compression techniques
- **👐 Shiatsu**: Japanese pressure point massage
- **💕 Couples Massage**: Side-by-side massage for partners
- **🤱 Prenatal Massage**: Specialized massage for expecting mothers
- **🏥 Therapeutic Massage**: Medical-grade massage for injury recovery
- **😌 Relaxation Massage**: Gentle, stress-relief focused massage
- **✂️ Barberia Services**: Hair and grooming services
- **🦶 Reflexología**: Traditional foot reflexology therapy
- **🔥 Piedras Calientes**: Hot stone therapy in Spanish

### Implementation
The service selection is integrated into:
- Partner onboarding flow (`/onboarding`)
- Service management (`/manage-services`)
- Booking system (`/book-appointment`)
- Service catalog (`/services`)

### Benefits
✅ **Eliminates Confusion**: Clear, standardized service descriptions  
✅ **Ensures Consistency**: Uniform service offerings across all partners  
✅ **Improves Client Experience**: Better service matching and expectations  
✅ **Saves Time**: Reduces manual service setup with intelligent selection  
✅ **Enhances Safety**: Clear service boundaries and contraindications  
✅ **Clean UX Design**: Category-level icons prevent visual clutter  
✅ **Professional Appearance**: Wellness-grade interface following UX best practices  
✅ **Maximizes Earnings**: Optimized service categories for partner revenue  

## 🎨 Material UI Theme & BEM Methodology

### Material UI Theme Configuration

This project includes a comprehensive Material UI theme using a custom teal color palette:

#### **Wellness Color Palette**
```typescript
const wellnessPalette = {
  primary: '#8B5CF6',        // Primary purple (brand color)
  secondary: '#EC4899',      // Secondary pink (accent color)
  teal: '#07BEB8',           // Wellness teal
  mediumTeal: '#3DCCC7',     // Medium teal
  lightAqua: '#68d8D6',      // Light aqua
  lightBlue: '#9CEAEF',      // Light blue
  veryLightAqua: '#C4FFF9',  // Very light aqua
  black: '#000000',          // Black
};
```

#### **Theme Features**
- **Custom Color Palette**: Wellness-focused theme with purple/pink/teal colors
- **Typography**: Roboto font integration with proper font weights
- **Component Customization**: Buttons, cards, forms, and more styled with wellness theme
- **Responsive Design**: Mobile-first approach with proper breakpoints
- **Accessibility**: High contrast ratios and proper color usage
- **Glassmorphism Effects**: Modern frosted glass styling for premium feel

#### **Theme Demo**
Visit `/theme-demo` to see all Material UI components styled with the custom wellness theme.

#### **Using Material UI Components**
```tsx
import { Button, Card, Typography } from '@mui/material';

// Components automatically use the wellness theme
<Button variant="contained">Book Service</Button>
<Card>Service Card</Card>
<Typography variant="h4">Wellness Services</Typography>
```

### BEM Methodology & SCSS Implementation

This project demonstrates **BEM (Block Element Modifier)** methodology combined with **SCSS preprocessing** for maintainable and scalable CSS architecture.

### BEM Structure

```
.block {}                    // Main component
.block__element {}           // Child element
.block__element--modifier {} // Element variant
.block--modifier {}          // Component variant
```

### SCSS Architecture

#### **Variables & Mixins**
```scss
// Colors
$color-primary: #3b82f6;
$color-secondary: #64748b;

// Spacing
$spacing-md: 1rem;
$spacing-lg: 1.5rem;

// Mixins
@mixin respond-to($breakpoint) {
  @media (min-width: $breakpoint) { @content; }
}

@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

#### **Component Examples**

**Service Card Component:**
```scss
.service-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  
  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  &__header {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  &__icon {
    font-size: 2rem;
    margin-right: 1rem;
  }
  
  &__title {
    color: white;
    font-weight: 600;
  }
  
  &__description {
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.5;
  }
  
  &--featured {
    border: 2px solid var(--color-primary);
    box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
  }
}
```

**Booking Form Components:**
```scss
.booking-form {
  &__group {
    margin-bottom: $spacing-lg;
  }
  
  &__input {
    width: 100%;
    padding: $spacing-sm $spacing-md;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    color: white;
    
    &:focus {
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
    }
    
    &--error {
      border-color: var(--color-error);
    }
  }
  
  &__button {
    background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%);
    border: none;
    border-radius: 12px;
    padding: 1rem 2rem;
    color: white;
    font-weight: 600;
    
    &--loading {
      position: relative;
      color: transparent;
      
      &::after {
        content: '';
        animation: spin 1s linear infinite;
      }
    }
  }
}
```

### Key SCSS Features Used

- **Variables**: Colors, spacing, typography, breakpoints
- **Mixins**: Responsive design, flexbox utilities, shadows, glassmorphism effects
- **Nesting**: BEM structure with SCSS nesting
- **Extends**: Shared styles between components
- **Functions**: Color manipulation (darken, rgba)
- **Media Queries**: Responsive breakpoints
- **Animations**: Loading spinners, transitions, and micro-interactions
- **Glassmorphism**: Backdrop filters and transparency effects

## 📱 Mobile Navigation Component

The project includes a dedicated `MobileMenu` component that provides an enhanced mobile navigation experience with smooth animations and modern UI patterns.

### Features

- **Animated Hamburger Menu**: Smooth 3-line to X transformation animation
- **Circular Reveal Effect**: Menu opens with a circular clip-path animation from the hamburger button
- **Role-Based Navigation**: Dynamic menu items based on user authentication and role
- **Smooth Animations**: Staggered entrance animations for menu items using Framer Motion
- **Responsive Design**: Automatically hidden on desktop (md: breakpoint and above)
- **Wellness-Focused Navigation**: Service discovery, booking, and partner tools

### Animation Details

#### Hamburger Animation
```tsx
const burgerVariants = {
  closed: { rotate: 0 },
  open: { rotate: 180 },
};

const lineVariants = {
  closed: { rotate: 0, y: 0 },
  open: (i: number) => ({
    rotate: i === 0 ? 45 : i === 1 ? -45 : 0,
    y: i === 0 ? 6 : i === 1 ? -6 : 0,
    opacity: i === 2 ? 0 : 1,
  }),
};
```

#### Circular Reveal Effect
The mobile menu uses CSS `clip-path` with `ellipse()` to create a circular expansion animation:
```tsx
initial={{ clipPath: `ellipse(0px 0px at ${origin.x}px ${origin.y}px)` }}
animate={{ clipPath: `ellipse(100vw 100vh at ${origin.x}px ${origin.y}px)` }}
```

### Usage

The `MobileMenu` is automatically included in the root layout and works alongside the desktop `Header`:

```tsx
// In layout.tsx
<Header />        // Desktop header (hidden on mobile)
<MobileMenu />    // Mobile menu (hidden on desktop)
```

### Navigation Items

The mobile menu dynamically shows navigation items based on user authentication and role:

- **Unauthenticated**: Login link, Services, Book Appointment
- **Clients**: All above + My Appointments, Dashboard
- **Partners**: All above + Manage Services, Partner Dashboard, Onboarding

### Styling

- Uses the wellness color scheme (`#8B5CF6`, `#EC4899`) as the desktop header
- Material-UI icons for consistent visual language
- Tailwind CSS for responsive utilities and animations
- Framer Motion for smooth, performant animations
- Glassmorphism effects for modern premium feel

## 🛠️ Dependencies

### Core Dependencies
```json
{
  "next": "15.4.1",           // React framework with App Router
  "react": "19.1.0",          // React library
  "react-dom": "19.1.0",      // React DOM rendering
  "typescript": "^5"          // Type safety
}
```

### Styling & Preprocessing
```json
{
  "tailwindcss": "^4",        // Utility-first CSS framework
  "daisyui": "latest",        // Component library for Tailwind
  "sass": "latest",           // SCSS preprocessor
  "@mui/material": "^7.2.0",  // Material UI component library
  "@mui/icons-material": "^7.2.0", // Material UI icons
  "@emotion/react": "^11.14.0", // Emotion for Material UI styling
  "@emotion/styled": "^11.14.1"  // Styled components for Material UI
}
```

### Authentication & Database
```json
{
  "firebase": "^11.10.0",           // Firebase SDK
  "react-firebase-hooks": "^5.1.1", // Firebase React hooks
  "@fontsource/roboto": "^5.2.6"    // Roboto font for Material UI
}
```

### Development Dependencies
```json
{
  "@types/node": "^20",       // Node.js TypeScript types
  "@types/react": "^19",      // React TypeScript types
  "@types/react-dom": "^19",  // React DOM TypeScript types
  "eslint": "^9",             // Code linting
  "eslint-config-next": "15.4.1"  // Next.js ESLint config
}
```

## 🗂️ App Routing Explanation

This project uses **Next.js App Router** (introduced in Next.js 13+), which provides file-system based routing.

### How App Router Works

1. **File-based Routing**: Each folder in `src/app/` represents a route segment
2. **Page Files**: `page.tsx` files define the UI for each route
3. **Layout Files**: `layout.tsx` files wrap pages with shared UI
4. **Nested Routes**: Folders can contain other folders for nested routes

### Route Structure

```
src/app/
├── layout.tsx                 # Root layout (applies to all routes)
├── page.tsx                   # Home page (/)
├── auth/
│   └── page.tsx              # /auth
├── patients/
│   └── page.tsx              # /patients
├── add-patient/
│   └── page.tsx              # /add-patient
├── edit-patient/
│   └── [id]/
│     ├── page.tsx            # /edit-patient/[id]
│     └── EditPatientClient.tsx # Edit patient form component
└── surgery-types-demo/
    └── page.tsx              # /surgery-types-demo
```

### Key Routing Concepts

#### 1. **Root Layout** (`src/app/layout.tsx`)
- Wraps all pages with common UI (Header, Footer, AuthProvider)
- Defines metadata and global styles
- Provides authentication context to all child pages

#### 2. **Home Page** (`src/app/page.tsx`)
- Route: `/`
- Public page (no authentication required)
- Landing page with app overview and navigation

#### 3. **Authentication Page** (`src/app/auth/page.tsx`)
- Route: `/auth`
- Public page for login/signup
- Uses Firebase Authentication (when enabled)

#### 4. **Protected Pages**
- **Patients Page** (`src/app/patients/page.tsx`): Route `/patients`
- **Add Patient Page** (`src/app/add-patient/page.tsx`): Route `/add-patient`
- Both require authentication (redirect to `/auth` if not logged in)

### Navigation Flow

```
User visits / → Home page (public)
├── Clicks "Login" → /auth (public)
│   ├── Success → Redirect to /patients (protected)
│   └── Failure → Stay on /auth with error
├── Clicks "View Patients" → /patients (protected)
│   ├── Authenticated → Show patient list
│   └── Not authenticated → Redirect to /auth
└── Clicks "Add Patient" → /add-patient (protected)
    ├── Authenticated → Show form
    └── Not authenticated → Redirect to /auth
```

## 🔐 Firebase Integration

### Firebase Configuration
- **Firebase Setup**: `src/lib/firebase.ts` - Complete Firebase initialization with your credentials
- **Authentication**: `src/lib/auth-context.tsx` - Real Firebase authentication with error handling
- **Database**: `src/lib/patient-service.ts` - Firestore operations for patient data
- **Provider**: Wraps entire app in `layout.tsx`

### Firebase Services Enabled
- ✅ **Authentication**: Email/password sign-in and sign-up
- ✅ **Firestore Database**: Patient data storage and retrieval
- ✅ **Analytics**: Usage tracking (browser-only)
- ✅ **Error Handling**: Comprehensive error messages for users

### Authentication Flow
1. **Loading**: Shows spinner while checking auth state
2. **Authenticated**: User can access protected routes and manage patients
3. **Unauthenticated**: Redirected to `/auth` page with proper error handling

### Database Operations
```typescript
// Patient service examples
import { patientService } from '@/lib/patient-service';

// Add a new patient
await patientService.addPatient(patientData);

// Get all patients
const patients = await patientService.getPatients();

// Get patients by status
const checkedInPatients = await patientService.getPatientsByStatus('checked-in');

// Update patient
await patientService.updatePatient(id, updates);

// Delete patient
await patientService.deletePatient(id);
```

### Protected Route Pattern
```typescript
const { user, loading } = useAuth();

useEffect(() => {
  if (!loading && !user) {
    router.push('/auth');
  }
}, [user, loading, router]);
```

## 🎯 Key Learning Points

### Next.js App Router
- File-system based routing
- Layout composition
- Server and client components
- Route protection patterns

### BEM Methodology
- Block Element Modifier structure
- Maintainable CSS architecture
- Component-based styling
- Scalable naming conventions

### SCSS Preprocessing
- Variables and mixins
- Nested selectors
- Functions and operations
- Responsive design patterns

### Firebase Authentication
- User state management
- Protected routes
- Authentication context
- Error handling

### React Patterns
- Custom hooks
- Context providers
- Controlled forms
- State management

### UI Development
- daisyUI components
- Tailwind CSS utilities
- Responsive design
- Form validation

### Booking Status Workflow
- **Pending**: Appointment request submitted, awaiting confirmation
- **Confirmed**: Appointment confirmed by partner
- **In Progress**: Service session is currently active
- **Completed**: Service session finished successfully
- **Cancelled**: Appointment cancelled by client or partner
- **No Show**: Client didn't arrive for scheduled appointment

## 📱 Pages Overview

### 1. **Home Page** (`/`)
- **Purpose**: Service discovery and platform overview
- **Features**: Video background, service categories, search functionality, glassmorphism cards
- **Access**: Public (no authentication required)
- **BEM Classes**: `.hero`, `.service-card`, `.search-form`

### 2. **Authentication Page** (`/auth`)
- **Purpose**: User login and signup
- **Features**: Toggle between login/signup, form validation, error handling
- **Access**: Public
- **BEM Classes**: `.form`, `.alert`, `.card--form`

### 3. **Onboarding Page** (`/onboarding`)
- **Purpose**: Partner registration and profile setup
- **Features**: Multi-step form, service selection, pricing setup, availability configuration
- **Access**: Public (for new partners)
- **BEM Classes**: `.onboarding-form`, `.stepper`, `.service-selection`

### 4. **Services Page** (`/services`)
- **Purpose**: Browse available wellness services
- **Features**: Service catalog, filtering, search, partner profiles
- **Access**: Public
- **BEM Classes**: `.service-grid`, `.filter-panel`, `.service-card`

### 5. **Book Appointment Page** (`/book-appointment`)
- **Purpose**: Schedule wellness sessions
- **Features**: Date/time selection, service booking, payment integration
- **Access**: Public (requires authentication for booking)
- **BEM Classes**: `.booking-form`, `.calendar`, `.time-slots`

### 6. **Dashboard Page** (`/dashboard`)
- **Purpose**: Partner business management
- **Features**: Appointment management, earnings overview, client communication
- **Access**: Protected (partners only)
- **BEM Classes**: `.dashboard-grid`, `.stats-card`, `.appointment-list`

### 7. **Manage Services Page** (`/manage-services`)
- **Purpose**: Partner service management
- **Features**: Add/edit services, pricing management, availability settings
- **Access**: Protected (partners only)
- **BEM Classes**: `.service-form`, `.pricing-grid`, `.availability-calendar`

## 🔧 Development Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 📝 Environment Variables

Create `.env.local` in the root directory with your Firebase configuration:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBoN20mks1zHWbPeh9k6reAXSmejwmKQ78
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=careflow-72c2a.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=careflow-72c2a
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=careflow-72c2a.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=960916398964
NEXT_PUBLIC_FIREBASE_APP_ID=1:960916398964:web:f66b89c0574b1bbf214221
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-Z4DTS7J9JJ
```

### Environment Variable Setup

1. **Create `.env.local` file** in the project root
2. **Copy the configuration above** into the file
3. **Restart your development server** after creating the file
4. **Never commit `.env.local`** to version control (it's already in `.gitignore`)

### Security Notes

- ✅ **Environment variables are secure** - they're not exposed in client-side code
- ✅ **`.env.local` is gitignored** - your secrets won't be committed
- ✅ **Validation included** - app will show clear error if variables are missing
- ⚠️ **Keep your Firebase keys private** - don't share them publicly

## 🚀 Deployment

This app is ready for deployment on:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Railway**
- Any platform supporting Node.js

## 📖 Additional Resources

- [SETUP.md](./SETUP.md) - Detailed setup instructions
- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [daisyUI Documentation](https://daisyui.com/)
- [BEM Methodology](http://getbem.com/)
- [SCSS Documentation](https://sass-lang.com/)

## 👥 Chingu Voyage Team

This project was built as part of Chingu Voyage, a collaborative learning experience.

### Team Members
- **Cristian Torres** - [GitHub](https://github.com/cristiantorresf19191919)
- **Ruth Igwe-Oruta** - [GitHub](https://github.com/Xondacc) / [LinkedIn](https://www.linkedin.com/in/ruthigwe-oruta)
- **Jessica Hackett** - [GitHub](https://github.com/mooglemoxie0018) / [LinkedIn](https://www.linkedin.com/in/jessica-hackett/)
- **Vincent Bui** - [GitHub](https://github.com/VincentBui0) / [LinkedIn](https://www.linkedin.com/in/vincent-bui0/)
- **Dorene St.Marthe** - [GitHub](https://github.com/Dorene-StMarthe) / [LinkedIn](https://www.linkedin.com/in/dorenestmarthe/)


### Project Goals
- Demonstrate modern React/Next.js development practices
- Implement BEM methodology with SCSS preprocessing
- Show Firebase authentication integration
- Create a scalable wellness platform for service booking
- Enable partners to earn money through therapeutic services
- Provide learning resources for fellow developers
- Showcase glassmorphism and modern UI/UX design patterns


