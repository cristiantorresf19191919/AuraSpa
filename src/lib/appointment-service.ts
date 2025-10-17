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
import { Appointment, AppointmentStatus, TimeSlot, DaySchedule } from './appointment-types';
import { MassageService } from './massage-types';

export interface CreateAppointmentData {
  customerId: string;
  providerId: string;
  serviceId: string;
  serviceName: string;
  serviceDuration: number;
  servicePrice: number;
  appointmentDate: Date;
  startTime: string;
  endTime: string;
  customerNotes?: string;
  totalPrice: number;
}

export interface BookingRequest {
  serviceId: string;
  appointmentDate: Date;
  startTime: string;
  customerNotes?: string;
}

class AppointmentService {
  private collectionName = 'appointments';

  // Book a new appointment
  async bookAppointment(bookingData: CreateAppointmentData): Promise<string> {
    try {
      const now = Timestamp.now();
      
      const docRef = await addDoc(collection(db, this.collectionName), {
        ...bookingData,
        status: AppointmentStatus.PENDING,
        createdAt: now,
        updatedAt: now,
      });
      return docRef.id;
    } catch (error) {
      console.error('Error booking appointment:', error);
      throw new Error('Failed to book appointment');
    }
  }

  // Get all appointments
  async getAppointments(): Promise<Appointment[]> {
    try {
      const q = query(
        collection(db, this.collectionName),
        orderBy('appointmentDate', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        appointmentDate: doc.data().appointmentDate.toDate(),
        createdAt: doc.data().createdAt.toDate(),
        updatedAt: doc.data().updatedAt.toDate(),
      })) as Appointment[];
    } catch (error) {
      console.error('Error getting appointments:', error);
      throw new Error('Failed to get appointments');
    }
  }

  // Get appointments by customer
  async getCustomerAppointments(customerId: string): Promise<Appointment[]> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('customerId', '==', customerId),
        orderBy('appointmentDate', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        appointmentDate: doc.data().appointmentDate.toDate(),
        createdAt: doc.data().createdAt.toDate(),
        updatedAt: doc.data().updatedAt.toDate(),
      })) as Appointment[];
    } catch (error) {
      console.error('Error getting customer appointments:', error);
      throw new Error('Failed to get customer appointments');
    }
  }

  // Get appointments by provider
  async getProviderAppointments(providerId: string): Promise<Appointment[]> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('providerId', '==', providerId),
        orderBy('appointmentDate', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        appointmentDate: doc.data().appointmentDate.toDate(),
        createdAt: doc.data().createdAt.toDate(),
        updatedAt: doc.data().updatedAt.toDate(),
      })) as Appointment[];
    } catch (error) {
      console.error('Error getting provider appointments:', error);
      throw new Error('Failed to get provider appointments');
    }
  }

  // Get appointments by date
  async getAppointmentsByDate(date: Date): Promise<Appointment[]> {
    try {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      
      const q = query(
        collection(db, this.collectionName),
        where('appointmentDate', '>=', startOfDay),
        where('appointmentDate', '<=', endOfDay),
        orderBy('startTime', 'asc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        appointmentDate: doc.data().appointmentDate.toDate(),
        createdAt: doc.data().createdAt.toDate(),
        updatedAt: doc.data().updatedAt.toDate(),
      })) as Appointment[];
    } catch (error) {
      console.error('Error getting appointments by date:', error);
      throw new Error('Failed to get appointments by date');
    }
  }

  // Get a single appointment by ID
  async getAppointmentById(appointmentId: string): Promise<Appointment | null> {
    try {
      const docSnap = await getDocs(collection(db, this.collectionName));
      
      const appointmentDoc = docSnap.docs.find(doc => doc.id === appointmentId);
      if (!appointmentDoc) return null;
      
      return {
        id: appointmentDoc.id,
        ...appointmentDoc.data(),
        appointmentDate: appointmentDoc.data().appointmentDate.toDate(),
        createdAt: appointmentDoc.data().createdAt.toDate(),
        updatedAt: appointmentDoc.data().updatedAt.toDate(),
      } as Appointment;
    } catch (error) {
      console.error('Error getting appointment by ID:', error);
      throw new Error('Failed to get appointment');
    }
  }

  // Update appointment status
  async updateAppointmentStatus(appointmentId: string, status: AppointmentStatus, providerNotes?: string): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, appointmentId);
      await updateDoc(docRef, {
        status,
        providerNotes,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error updating appointment status:', error);
      throw new Error('Failed to update appointment status');
    }
  }

  // Update appointment details
  async updateAppointment(appointmentId: string, updates: Partial<CreateAppointmentData>): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, appointmentId);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error updating appointment:', error);
      throw new Error('Failed to update appointment');
    }
  }

  // Cancel appointment
  async cancelAppointment(appointmentId: string): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, appointmentId);
      await updateDoc(docRef, {
        status: AppointmentStatus.CANCELLED,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      throw new Error('Failed to cancel appointment');
    }
  }

  // Delete appointment (hard delete)
  async deleteAppointment(appointmentId: string): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, appointmentId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting appointment:', error);
      throw new Error('Failed to delete appointment');
    }
  }

  // Check availability for a specific time slot
  async checkAvailability(providerId: string, date: Date, startTime: string, endTime: string): Promise<boolean> {
    try {
      const appointments = await this.getProviderAppointments(providerId);
      const dateAppointments = appointments.filter(apt => 
        apt.appointmentDate.toDateString() === date.toDateString() &&
        apt.status !== AppointmentStatus.CANCELLED &&
        apt.status !== AppointmentStatus.NO_SHOW
      );

      // Check for time conflicts
      return !dateAppointments.some(apt => {
        const aptStart = apt.startTime;
        const aptEnd = apt.endTime;
        
        return (
          (startTime >= aptStart && startTime < aptEnd) ||
          (endTime > aptStart && endTime <= aptEnd) ||
          (startTime <= aptStart && endTime >= aptEnd)
        );
      });
    } catch (error) {
      console.error('Error checking availability:', error);
      throw new Error('Failed to check availability');
    }
  }

  // Generate available time slots for a provider on a specific date
  async getAvailableTimeSlots(providerId: string, date: Date, serviceDuration: number = 60): Promise<TimeSlot[]> {
    try {
      const appointments = await this.getProviderAppointments(providerId);
      const dateAppointments = appointments.filter(apt => 
        apt.appointmentDate.toDateString() === date.toDateString() &&
        apt.status !== AppointmentStatus.CANCELLED &&
        apt.status !== AppointmentStatus.NO_SHOW
      );

      // Generate all possible time slots (9 AM to 6 PM)
      const allSlots: TimeSlot[] = [];
      for (let hour = 9; hour < 18; hour++) {
        const startTime = `${hour.toString().padStart(2, '0')}:00`;
        const endTime = `${(hour + serviceDuration / 60).toString().padStart(2, '0')}:00`;
        
        if (hour + serviceDuration / 60 <= 18) {
          allSlots.push({
            startTime,
            endTime,
            isAvailable: true
          });
        }
      }

      // Mark conflicting slots as unavailable
      allSlots.forEach(slot => {
        const hasConflict = dateAppointments.some(apt => {
          const aptStart = apt.startTime;
          const aptEnd = apt.endTime;
          
          return (
            (slot.startTime >= aptStart && slot.startTime < aptEnd) ||
            (slot.endTime > aptStart && slot.endTime <= aptEnd) ||
            (slot.startTime <= aptStart && slot.endTime >= aptEnd)
          );
        });
        
        if (hasConflict) {
          slot.isAvailable = false;
        }
      });

      return allSlots;
    } catch (error) {
      console.error('Error generating time slots:', error);
      throw new Error('Failed to generate time slots');
    }
  }
}

export const appointmentService = new AppointmentService();
