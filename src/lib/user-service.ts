import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc,
  setDoc,
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy,
  where,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { UserRole } from './user-roles';
import { MassageCategory } from './massage-types';

export interface UserProfile {
  uid: string;
  email: string;
  fullName: string;
  phone: string;
  professionalTitle?: string;
  aboutMe?: string;
  servicesOffered?: MassageCategory[];
  primaryServiceCity?: string;
  serviceAreas?: string[];
  pricing?: {
    [key in MassageCategory]?: number;
  };
  availability?: {
    [key: string]: {
      morning: boolean;
      afternoon: boolean;
      evening: boolean;
    };
  };
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  profilePictureUrl?: string;
}

export interface CreateUserData {
  uid: string;
  email: string;
  fullName: string;
  phone: string;
  professionalTitle?: string;
  aboutMe?: string;
  servicesOffered?: MassageCategory[];
  primaryServiceCity?: string;
  serviceAreas?: string[];
  pricing?: {
    [key in MassageCategory]?: number;
  };
  availability?: {
    [key: string]: {
      morning: boolean;
      afternoon: boolean;
      evening: boolean;
    };
  };
  role: UserRole;
  profilePictureUrl?: string;
}

class UserServiceManager {
  private collectionName = 'users';

  // Create a new user profile
  async createUser(userData: CreateUserData): Promise<string> {
    try {
      const now = Timestamp.now();
      
      const userDoc = {
        ...userData,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      };

      await setDoc(doc(db, this.collectionName, userData.uid), userDoc);
      return userData.uid;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user profile');
    }
  }

  // Get user profile by UID
  async getUserProfile(uid: string): Promise<UserProfile | null> {
    try {
      const docRef = doc(db, this.collectionName, uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          ...data,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
        } as UserProfile;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw new Error('Failed to get user profile');
    }
  }

  // Update user profile
  async updateUserProfile(uid: string, updates: Partial<UserProfile>): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, uid);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw new Error('Failed to update user profile');
    }
  }

  // Get all active users
  async getActiveUsers(): Promise<UserProfile[]> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('isActive', '==', true),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
        updatedAt: doc.data().updatedAt.toDate(),
      })) as UserProfile[];
    } catch (error) {
      console.error('Error getting active users:', error);
      throw new Error('Failed to get active users');
    }
  }

  // Get users by role
  async getUsersByRole(role: UserRole): Promise<UserProfile[]> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('role', '==', role),
        where('isActive', '==', true),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
        updatedAt: doc.data().updatedAt.toDate(),
      })) as UserProfile[];
    } catch (error) {
      console.error('Error getting users by role:', error);
      throw new Error('Failed to get users by role');
    }
  }

  // Get massage providers
  async getMassageProviders(): Promise<UserProfile[]> {
    return this.getUsersByRole(UserRole.MASSAGE_PROVIDER);
  }

  // Deactivate user (soft delete)
  async deactivateUser(uid: string): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, uid);
      await updateDoc(docRef, {
        isActive: false,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error deactivating user:', error);
      throw new Error('Failed to deactivate user');
    }
  }

  // Delete user (hard delete)
  async deleteUser(uid: string): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, uid);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('Failed to delete user');
    }
  }

  // Check if email already exists
  async checkEmailExists(email: string): Promise<boolean> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('email', '==', email),
        where('isActive', '==', true)
      );
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error('Error checking email existence:', error);
      throw new Error('Failed to check email existence');
    }
  }

  // Update user availability
  async updateUserAvailability(uid: string, availability: UserProfile['availability']): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, uid);
      await updateDoc(docRef, {
        availability,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error updating user availability:', error);
      throw new Error('Failed to update user availability');
    }
  }

  // Update user pricing
  async updateUserPricing(uid: string, pricing: UserProfile['pricing']): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, uid);
      await updateDoc(docRef, {
        pricing,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error updating user pricing:', error);
      throw new Error('Failed to update user pricing');
    }
  }

  // Update user services
  async updateUserServices(uid: string, servicesOffered: MassageCategory[]): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, uid);
      await updateDoc(docRef, {
        servicesOffered,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error updating user services:', error);
      throw new Error('Failed to update user services');
    }
  }
}

export const userService = new UserServiceManager();
