import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy,
  where,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { MassageService, MassageCategory } from './massage-types';

export interface CreateMassageServiceData {
  name: string;
  description: string;
  duration: number;
  price: number;
  category: MassageCategory;
  imageUrl?: string;
  isActive: boolean;
  providerId: string;
}

class MassageServiceManager {
  private collectionName = 'massageServices';

  // Add a new massage service
  async addService(serviceData: CreateMassageServiceData): Promise<string> {
    try {
      const now = Timestamp.now();
      
      const docRef = await addDoc(collection(db, this.collectionName), {
        ...serviceData,
        createdAt: now,
        updatedAt: now,
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding massage service:', error);
      throw new Error('Failed to add massage service');
    }
  }

  // Get all massage services
  async getServices(): Promise<MassageService[]> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('isActive', '==', true),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
        updatedAt: doc.data().updatedAt.toDate(),
      })) as MassageService[];
    } catch (error) {
      console.error('Error getting massage services:', error);
      throw new Error('Failed to get massage services');
    }
  }

  // Get services by provider
  async getServicesByProvider(providerId: string): Promise<MassageService[]> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('providerId', '==', providerId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
        updatedAt: doc.data().updatedAt.toDate(),
      })) as MassageService[];
    } catch (error) {
      console.error('Error getting provider services:', error);
      throw new Error('Failed to get provider services');
    }
  }

  // Get services by category
  async getServicesByCategory(category: MassageCategory): Promise<MassageService[]> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('category', '==', category),
        where('isActive', '==', true),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
        updatedAt: doc.data().updatedAt.toDate(),
      })) as MassageService[];
    } catch (error) {
      console.error('Error getting services by category:', error);
      throw new Error('Failed to get services by category');
    }
  }

  // Get a single service by ID
  async getServiceById(serviceId: string): Promise<MassageService | null> {
    try {
      const docRef = doc(db, this.collectionName, serviceId);
      const docSnap = await getDocs(collection(db, this.collectionName));
      
      const serviceDoc = docSnap.docs.find(doc => doc.id === serviceId);
      if (!serviceDoc) return null;
      
      return {
        id: serviceDoc.id,
        ...serviceDoc.data(),
        createdAt: serviceDoc.data().createdAt.toDate(),
        updatedAt: serviceDoc.data().updatedAt.toDate(),
      } as MassageService;
    } catch (error) {
      console.error('Error getting service by ID:', error);
      throw new Error('Failed to get service');
    }
  }

  // Update a massage service
  async updateService(serviceId: string, updates: Partial<CreateMassageServiceData>): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, serviceId);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error updating massage service:', error);
      throw new Error('Failed to update massage service');
    }
  }

  // Delete a massage service (soft delete by setting isActive to false)
  async deleteService(serviceId: string): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, serviceId);
      await updateDoc(docRef, {
        isActive: false,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error deleting massage service:', error);
      throw new Error('Failed to delete massage service');
    }
  }

  // Search services by name or description
  async searchServices(searchTerm: string): Promise<MassageService[]> {
    try {
      const allServices = await this.getServices();
      const searchLower = searchTerm.toLowerCase();
      
      return allServices.filter(service => 
        service.name.toLowerCase().includes(searchLower) ||
        service.description.toLowerCase().includes(searchLower) ||
        service.category.toLowerCase().includes(searchLower)
      );
    } catch (error) {
      console.error('Error searching services:', error);
      throw new Error('Failed to search services');
    }
  }
}

export const massageServiceManager = new MassageServiceManager();
