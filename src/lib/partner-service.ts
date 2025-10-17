import { 
    doc, 
    setDoc, 
    getDoc, 
    updateDoc, 
    deleteDoc, 
    collection, 
    query, 
    where, 
    orderBy, 
    getDocs, 
    Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { UserRole } from './user-roles';
import { MassageCategory } from './massage-types';

export interface PartnerProfile {
    uid: string;
    email: string;
    fullName: string;
    phone: string;
    professionalTitle: string;
    aboutMe: string;
    servicesOffered: MassageCategory[];
    primaryServiceCity: string;
    serviceAreas: string[];
    pricing: {
        [key in MassageCategory]?: number;
    };
    availability: {
        [key: string]: {
            morning: boolean;
            afternoon: boolean;
            evening: boolean;
        };
    };
    role: UserRole;
    profilePictureUrl?: string;
    isActive: boolean;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface CreatePartnerData {
    uid: string;
    email: string;
    fullName: string;
    phone: string;
    professionalTitle: string;
    aboutMe: string;
    servicesOffered: MassageCategory[];
    primaryServiceCity: string;
    serviceAreas: string[];
    pricing: {
        [key in MassageCategory]?: number;
    };
    availability: {
        [key: string]: {
            morning: boolean;
            afternoon: boolean;
            evening: boolean;
        };
    };
    role: UserRole;
    profilePictureUrl?: string;
}

class PartnerServiceManager {
    private collectionName = 'partners';

    async createPartner(data: CreatePartnerData): Promise<void> {
        const partnerDoc: PartnerProfile = {
            ...data,
            isActive: true,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now()
        };

        await setDoc(doc(db, this.collectionName, data.uid), partnerDoc);
    }

    async getPartner(uid: string): Promise<PartnerProfile | null> {
        const docRef = doc(db, this.collectionName, uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data() as PartnerProfile;
        }
        return null;
    }

    async updatePartner(uid: string, data: Partial<PartnerProfile>): Promise<void> {
        const docRef = doc(db, this.collectionName, uid);
        await updateDoc(docRef, {
            ...data,
            updatedAt: Timestamp.now()
        });
    }

    async deactivatePartner(uid: string): Promise<void> {
        const docRef = doc(db, this.collectionName, uid);
        await updateDoc(docRef, {
            isActive: false,
            updatedAt: Timestamp.now()
        });
    }

    async deletePartner(uid: string): Promise<void> {
        const docRef = doc(db, this.collectionName, uid);
        await deleteDoc(docRef);
    }

    async getAllPartners(): Promise<PartnerProfile[]> {
        const q = query(
            collection(db, this.collectionName),
            where('isActive', '==', true),
            orderBy('createdAt', 'desc')
        );
        
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => doc.data() as PartnerProfile);
    }

    async getPartnersByCity(city: string): Promise<PartnerProfile[]> {
        const q = query(
            collection(db, this.collectionName),
            where('primaryServiceCity', '==', city),
            where('isActive', '==', true),
            orderBy('createdAt', 'desc')
        );
        
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => doc.data() as PartnerProfile);
    }

    async getPartnersByService(service: MassageCategory): Promise<PartnerProfile[]> {
        const q = query(
            collection(db, this.collectionName),
            where('servicesOffered', 'array-contains', service),
            where('isActive', '==', true),
            orderBy('createdAt', 'desc')
        );
        
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => doc.data() as PartnerProfile);
    }
}

export const partnerService = new PartnerServiceManager();
