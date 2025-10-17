export enum UserRole {
  GUEST = 'guest',
  ADMIN = 'admin',
  MASSAGE_PROVIDER = 'massage-provider',
  CUSTOMER = 'customer'
}

export interface UserWithRole {
  email: string;
  role: UserRole;
  name: string;
}

// Static list of authenticated users with their roles
export const AUTHENTICATED_USERS: UserWithRole[] = [
  {
    email: 'admin@mail.com',
    role: UserRole.ADMIN,
    name: 'Administrator'
  },
  {
    email: 'provider1@mail.com',
    role: UserRole.MASSAGE_PROVIDER,
    name: 'Sarah Johnson - Massage Therapist'
  },
  {
    email: 'provider2@mail.com',
    role: UserRole.MASSAGE_PROVIDER,
    name: 'Mike Chen - Massage Therapist'
  },
  {
    email: 'customer1@mail.com',
    role: UserRole.CUSTOMER,
    name: 'John Smith'
  },
  {
    email: 'customer2@mail.com',
    role: UserRole.CUSTOMER,
    name: 'Emily Davis'
  }
];

export function getUserRole(email: string): UserRole {
  const user = AUTHENTICATED_USERS.find(u => u.email === email);
  return user ? user.role : UserRole.GUEST;
}

export function getUserInfo(email: string): UserWithRole | null {
  return AUTHENTICATED_USERS.find(u => u.email === email) || null;
}

export function hasPermission(userRole: UserRole, requiredRole: UserRole): boolean {
  const roleHierarchy: Record<UserRole, number> = {
    [UserRole.GUEST]: 0,
    [UserRole.CUSTOMER]: 1,
    [UserRole.MASSAGE_PROVIDER]: 2,
    [UserRole.ADMIN]: 3
  };
  
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}

// Massage-specific permissions
export function canManageServices(userRole: UserRole): boolean {
  return userRole === UserRole.ADMIN || userRole === UserRole.MASSAGE_PROVIDER;
}

export function canBookAppointments(userRole: UserRole): boolean {
  return userRole === UserRole.CUSTOMER || userRole === UserRole.ADMIN;
}

export function canManageAppointments(userRole: UserRole): boolean {
  return userRole === UserRole.ADMIN || userRole === UserRole.MASSAGE_PROVIDER;
}

export function canViewAllAppointments(userRole: UserRole): boolean {
  return userRole === UserRole.ADMIN;
}

export function canManageProviders(userRole: UserRole): boolean {
  return userRole === UserRole.ADMIN;
}

export function canManageCustomers(userRole: UserRole): boolean {
  return userRole === UserRole.ADMIN;
} 