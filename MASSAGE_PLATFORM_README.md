# Massage Scheduling Platform

A beautiful and modern web application for scheduling massage appointments, built with Next.js, Material-UI, and Firebase.

## 🎯 Overview

This platform transforms the existing patient management system into a comprehensive massage scheduling solution where:

- **Massage Therapists** can publish and manage their services
- **Customers** can browse services and book appointments
- **Real-time scheduling** with conflict detection
- **Beautiful, responsive UI** with smooth animations

## ✨ Features

### For Customers
- Browse available massage services by category
- Search and filter services
- Book appointments with date/time selection
- View appointment history and status
- Cancel pending appointments
- Add special requests and notes

### For Massage Therapists
- Create and manage massage services
- Set pricing, duration, and descriptions
- Upload service images
- View and manage appointments
- Update appointment statuses (confirm, start, complete)
- Track completed sessions

### For Administrators
- Full access to all features
- Manage providers and customers
- View system-wide analytics
- Monitor platform usage

## 🏗️ Architecture

### Frontend
- **Next.js 14** with App Router
- **Material-UI (MUI)** for components
- **Framer Motion** for animations
- **TypeScript** for type safety
- **Responsive design** for all devices

### Backend
- **Firebase Firestore** for data storage
- **Firebase Authentication** for user management
- **Real-time updates** and data synchronization

### Key Components
- `MassageService` - Service management and CRUD operations
- `AppointmentService` - Booking and appointment management
- `UserRole` system with role-based access control
- Responsive UI components with consistent styling

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Firebase project with Firestore enabled
- Environment variables configured

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd V56-tier3-team-37
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env.local` file with your Firebase configuration:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔐 User Roles & Authentication

### Default Users
The platform comes with pre-configured test accounts:

- **Admin**: `admin@mail.com` - Full access to all features
- **Massage Therapist**: `provider1@mail.com` - Can manage services and appointments
- **Customer**: `customer1@mail.com` - Can book appointments and view history

### Role Permissions
- **Customer**: Book appointments, view history, cancel bookings
- **Massage Provider**: Manage services, view appointments, update statuses
- **Admin**: Full system access, manage users and services

## 📱 Pages & Routes

### Public Pages
- `/` - Homepage with service browsing and search
- `/auth` - Authentication (login/signup)

### Protected Pages
- `/dashboard` - User dashboard with appointments and services
- `/manage-services` - Service management for providers
- `/book-appointment/[id]` - Booking flow for specific services

## 🎨 UI Components

### Core Components
- `BrandButton` - Consistent button styling with brand colors
- `BrandLoader` - Loading states with brand theming
- `RoleGuard` - Route protection based on user roles
- `AnimatedAlert` - Beautiful alert notifications

### Design System
- **Color Palette**: Primary teal (#07BEB8) with complementary colors
- **Typography**: Roboto font family for consistency
- **Spacing**: Consistent 8px grid system
- **Animations**: Smooth transitions and micro-interactions

## 🔧 Configuration

### Firebase Setup
1. Create a new Firebase project
2. Enable Firestore Database
3. Enable Authentication (Email/Password)
4. Set up security rules for Firestore
5. Add your web app and get configuration

### Firestore Collections
- `massageServices` - Service information and pricing
- `appointments` - Booking details and status
- `users` - User profiles and roles

## 📊 Data Models

### MassageService
```typescript
interface MassageService {
  id?: string;
  name: string;
  description: string;
  duration: number; // minutes
  price: number;
  category: MassageCategory;
  imageUrl?: string;
  isActive: boolean;
  providerId: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Appointment
```typescript
interface Appointment {
  id?: string;
  customerId: string;
  providerId: string;
  serviceId: string;
  serviceName: string;
  serviceDuration: number;
  servicePrice: number;
  appointmentDate: Date;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  customerNotes?: string;
  providerNotes?: string;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}
```

## 🚀 Deployment

### Netlify Deployment
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `out`
4. Configure environment variables
5. Deploy!

### Build Commands
```bash
# Build for production
npm run build

# Export static files
npm run export

# Start production server
npm start
```

## 🧪 Testing

### Manual Testing
1. **Customer Flow**: Browse services → Book appointment → View dashboard
2. **Provider Flow**: Add service → Manage appointments → Update statuses
3. **Admin Flow**: Access all features and manage users

### Test Scenarios
- Service creation and management
- Appointment booking with conflict detection
- Role-based access control
- Responsive design on different devices

## 🔒 Security Features

- **Role-based access control** for all routes
- **Firebase security rules** for data protection
- **Input validation** and sanitization
- **Authentication state management**

## 🎯 Future Enhancements

- **Payment integration** (Stripe, PayPal)
- **Calendar integration** (Google Calendar, Outlook)
- **Push notifications** for appointment reminders
- **Review and rating system**
- **Advanced analytics** and reporting
- **Multi-language support**
- **Mobile app** (React Native)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the existing issues
- Create a new issue with detailed description
- Contact the development team

---

**Built with ❤️ using Next.js, Material-UI, and Firebase**
