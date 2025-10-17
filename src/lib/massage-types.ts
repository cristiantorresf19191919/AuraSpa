export interface MassageService {
  id?: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
  category: MassageCategory;
  imageUrl?: string;
  isActive: boolean;
  providerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum MassageCategory {
  BARBERIA = 'barberia',
  MASAJES = 'masajes',
  REFLEXOLOGIA = 'reflexologia',
  PIEDRAS_CALIENTES = 'piedras-calientes'
}

export const MASSAGE_CATEGORIES = [
  { value: MassageCategory.BARBERIA, label: 'Barbería', description: 'Servicios de barbería profesional', icon: '✂️' },
  { value: MassageCategory.MASAJES, label: 'Masajes', description: 'Servicios de masajes terapéuticos', icon: '💆‍♀️' },
  { value: MassageCategory.REFLEXOLOGIA, label: 'Reflexología', description: 'Terapia de reflexología podal', icon: '🦶' },
  { value: MassageCategory.PIEDRAS_CALIENTES, label: 'Piedras Calientes', description: 'Terapia con piedras calientes', icon: '🔥' }
];

export const getCategoryLabel = (category: MassageCategory): string => {
  return MASSAGE_CATEGORIES.find(cat => cat.value === category)?.label || category;
};

export const getCategoryDescription = (category: MassageCategory): string => {
  return MASSAGE_CATEGORIES.find(cat => cat.value === category)?.description || '';
};
