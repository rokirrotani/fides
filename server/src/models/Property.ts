export interface Property {
  id: string;
  title: string;
  description?: string;
  price: number;
  type: 'sale' | 'rent';
  category: 'apartment' | 'house' | 'commercial';
  location: {
    address: string;
    city: string;
    province: string;
  };
  details: {
    rooms: number;
    bathrooms: number;
    sqm: number;
    floor?: number;
  };
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PropertyDB {
  id: string;
  title: string;
  description?: string;
  price: number;
  type: 'sale' | 'rent';
  category: 'apartment' | 'house' | 'commercial';
  address: string;
  city: string;
  province: string;
  rooms: number;
  bathrooms: number;
  sqm: number;
  floor?: number;
  images: string;
  created_at: string;
  updated_at: string;
}