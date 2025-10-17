# Enhanced Chatbot Privacy Features

## Overview

The Care Flow AI chatbot has been enhanced with advanced privacy controls and role-based access management to protect patient information while maintaining helpful functionality. This implementation addresses critical privacy concerns in healthcare applications.

## 🔒 Privacy Features Implemented

### 1. Role-Based Access Control
- **Administrators**: Can search patients by name OR patient code, get direct results with names
- **Surgical Team & Guests**: Can ONLY search by patient code
- **Automatic Enforcement**: System automatically restricts capabilities based on user authentication
- **Role-Based Privacy**: Different privacy levels based on user authentication

### 2. Patient Code Protection System
- **Unique Patient Codes**: Each patient gets a 6-character alphanumeric code (e.g., ABC123)
- **Password-Like Security**: Patient codes work like passwords for secure access
- **Anonymous Responses**: AI never reveals patient names, only patient codes

### 3. Name Search Restrictions
- **Admin Only**: Name-based searches restricted to administrators
- **Privacy Protection**: Prevents unauthorized access to patient information
- **Clear Messaging**: Users are informed why name searches are blocked

### 4. Secure Communication
- **Code-Only References**: All patient information shared using "Patient [CODE]" format
- **No Name Exposure**: Example: "Patient ABC123 is in recovery" instead of "John Smith is in recovery"
- **Consistent Privacy**: Maintains privacy across all AI responses

### 5. Personalized User Experience
- **Role-Based Greetings**: Personalized welcome messages for each user role
- **Admin Greeting**: "Hello Admin! I'm your AI assistant..."
- **Surgical Team Greeting**: "Hello Surgical Team! I'm your AI assistant..."
- **Guest Greeting**: "Hello! I'm your AI assistant..." (standard greeting)

### 6. Status Page Integration
- **Role-Based Display**: Different information shown based on user authentication
- **Administrators**: Patient names, codes, surgery details, and chatbot integration tips
- **Surgical Team**: Patient names and codes only (for status updates)
- **Guests**: Patient codes and status only for privacy protection
- **Seamless Workflow**: Patient codes visible for quick AI chatbot queries

## 🏗️ Technical Implementation

### API Changes (`/api/chat/route.ts`)
- **Role Parameter**: Added `userRole` parameter to chat requests
- **Enhanced Search Logic**: Modified `extractPatientQuery()` to respect role restrictions
- **Privacy-Focused Prompts**: Updated system prompts to enforce privacy rules
- **Response Filtering**: Ensures patient names are never included in AI responses

### Component Updates (`FloatingChat.tsx`)
- **Role Integration**: Uses `useAuth()` hook to get current user role
- **Dynamic UI**: Placeholder text and descriptions change based on user role
- **Enhanced Indicators**: Patient query indicators show search restrictions
- **Role-Aware Messaging**: Welcome messages reflect user capabilities

### New Demo Page (`/chatbot-demo`)
- **Interactive Testing**: Test privacy features with different user roles
- **Feature Explanation**: Clear documentation of privacy capabilities
- **Real-Time Demo**: Live chatbot integration for testing
- **Role Visualization**: Visual representation of user permissions

### Enhanced Status Page (`/status`)
- **Role-Based Display**: Different information shown based on user authentication
- **Administrators**: Full access to patient information and codes
- **Surgical Team**: Limited access to names and codes only (for status updates)
- **Guests**: Patient codes and status only for privacy protection
- **Patient Code Integration**: Codes prominently displayed for all authenticated users

## 🔐 How It Works

### 1. User Authentication
```
User logs in → Role determined → Chatbot capabilities set
```

### 2. Search Request Processing
```
User types message → Role checked → Search type validated → Results filtered
```

### 3. Privacy Enforcement
```
Patient found → Name removed → Code-only response → Privacy maintained
```

### 4. Response Generation
```
AI generates response → Patient names replaced with codes → Secure response sent
```

## 📋 Example Scenarios

### Administrator User
```
Input: "How is John Smith doing?"
Process: Name search allowed → Patient found → Response: "John Smith is currently in recovery"
Note: Patient name is shown for administrative convenience
Greeting: "Hello Admin! I'm your AI assistant..."
```

### Guest User
```
Input: "How is John Smith doing?"
Process: Name search blocked → Explanation: "For privacy, name searches restricted to administrators. Use patient code instead."
```

### Any User
```
Input: "Check status for ABC123"
Process: Code search allowed → Patient found → Response: "Patient ABC123 is currently in recovery"
```

## 🎯 Privacy Benefits

### 1. **Prevents Unauthorized Access**
- Family members can't search by name
- Visitors can't access patient information
- Maintains HIPAA compliance principles

### 2. **Secure Information Sharing**
- Patient codes act as access keys
- No accidental name exposure
- Controlled information dissemination

### 3. **Role-Based Security**
- Administrators have necessary access
- Limited access for other roles
- Clear permission boundaries

### 4. **Audit Trail**
- All searches logged with user role
- Search restrictions tracked
- Privacy violations prevented

## 🚀 Usage Instructions

### For Administrators
1. Navigate to `/chatbot-demo` or use floating chatbot
2. Search by patient name: "How is John Smith?"
3. Search by patient code: "Check ABC123"
4. Full access to all patient lookup features

### For Guests/Surgical Team
1. Navigate to `/chatbot-demo` or use floating chatbot
2. Search by patient code only: "Check ABC123"
3. Name searches will be blocked with explanation
4. Patient codes required for access

### Testing Different Roles
1. **Admin**: `admin@mail.com` / `password123`
2. **Surgical Team**: `team1@mail.com` / `password123`
3. **Guest**: Not logged in (default role)

## 🔧 Configuration

### Environment Variables
```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

### User Roles (`/lib/user-roles.ts`)
```typescript
export enum UserRole {
  GUEST = 'guest',
  ADMIN = 'admin',
  SURGICAL_TEAM = 'surgical-team'
}
```

### Patient Data Structure
```typescript
interface Patient {
  patientId: string;        // 6-character unique code
  firstName?: string;       // Never exposed in responses
  lastName?: string;        // Never exposed in responses
  status?: string;          // Exposed via patient code
  // ... other fields
}
```

## 📊 Monitoring & Logging

### Console Logs
- User role for each request
- Search query detection
- Patient data found/not found
- Privacy restriction enforcement

### API Response Tracking
- Search type (name vs code)
- Search success/failure
- Privacy restriction applied
- Response generation status

## 🔮 Future Enhancements

### 1. **Advanced Privacy Controls**
- Time-based access restrictions
- Location-based access control
- Audit logging and reporting

### 2. **Enhanced Security**
- Two-factor authentication for admin access
- Session timeout management
- IP-based access restrictions

### 3. **Privacy Analytics**
- Privacy violation detection
- Access pattern analysis
- Compliance reporting tools

## 🧪 Testing

### Manual Testing
1. Test with different user roles
2. Verify name search restrictions
3. Confirm code-only responses
4. Check error handling

### Automated Testing
```bash
# Run type checking
npx tsc --noEmit

# Run development server
npm run dev

# Test chatbot demo page
# Navigate to /chatbot-demo
```

## 📚 Related Documentation

- [README.md](./README.md) - Project overview and setup
- [SETUP.md](./SETUP.md) - Detailed setup instructions
- [User Roles](./src/lib/user-roles.ts) - Role definitions and permissions
- [Chat API](./src/app/api/chat/route.ts) - API implementation details
- [FloatingChat Component](./src/components/FloatingChat.tsx) - Chatbot UI component

## 🎉 Conclusion

The enhanced chatbot privacy features provide a robust, secure, and user-friendly way to access patient information while maintaining strict privacy controls. The role-based access system ensures that only authorized users can perform name-based searches, while the patient code system provides secure access for all users who have the appropriate codes.

This implementation demonstrates best practices for healthcare privacy and can serve as a foundation for additional security enhancements in the future.
