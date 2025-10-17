export interface Appointment {
  id?: string;
  customerId: string;
  providerId: string;
  serviceId: string;
  serviceName: string;
  serviceDuration: number;
  servicePrice: number;
  appointmentDate: Date;
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  status: AppointmentStatus;
  customerNotes?: string;
  providerNotes?: string;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

export enum AppointmentStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  NO_SHOW = 'no-show'
}

export const APPOINTMENT_STATUSES = [
  { value: AppointmentStatus.PENDING, label: 'Pending', color: '#F59E0B' },
  { value: AppointmentStatus.CONFIRMED, label: 'Confirmed', color: '#10B981' },
  { value: AppointmentStatus.IN_PROGRESS, label: 'In Progress', color: '#3B82F6' },
  { value: AppointmentStatus.COMPLETED, label: 'Completed', color: '#059669' },
  { value: AppointmentStatus.CANCELLED, label: 'Cancelled', color: '#EF4444' },
  { value: AppointmentStatus.NO_SHOW, label: 'No Show', color: '#6B7280' }
];

export interface TimeSlot {
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  appointmentId?: string;
}

export interface DaySchedule {
  date: Date;
  timeSlots: TimeSlot[];
  isAvailable: boolean;
}

export const getStatusLabel = (status: AppointmentStatus): string => {
  return APPOINTMENT_STATUSES.find(s => s.value === status)?.label || status;
};

export const getStatusColor = (status: AppointmentStatus): string => {
  return APPOINTMENT_STATUSES.find(s => s.value === status)?.color || '#6B7280';
};

export const generateTimeSlots = (
  startHour: number = 9,
  endHour: number = 18,
  slotDuration: number = 60
): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  
  for (let hour = startHour; hour < endHour; hour++) {
    const startTime = `${hour.toString().padStart(2, '0')}:00`;
    const endTime = `${(hour + slotDuration / 60).toString().padStart(2, '0')}:00`;
    
    slots.push({
      startTime,
      endTime,
      isAvailable: true
    });
  }
  
  return slots;
};
