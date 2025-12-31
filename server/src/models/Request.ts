export interface SellRequest {
  id: string;
  ownerName: string;
  email: string;
  phone: string;
  propertyType: 'apartment' | 'house' | 'commercial' | 'land';
  address: string;
  city: string;
  province: string;
  rooms?: number;
  sqm?: number;
  price?: number;
  description?: string;
  urgency: 'low' | 'medium' | 'high';
  status: 'pending' | 'contacted' | 'evaluated' | 'closed';
  createdAt: Date;
  notifyZani?: boolean;
}

export interface BuyRequest {
  id: string;
  buyerName: string;
  email: string;
  phone: string;
  propertyType: 'apartment' | 'house' | 'commercial' | 'any';
  preferredCity: string;
  minPrice?: number;
  maxPrice?: number;
  minRooms?: number;
  minSqm?: number;
  urgency: 'low' | 'medium' | 'high';
  notes?: string;
  status: 'pending' | 'contacted' | 'matched' | 'closed';
  createdAt: Date;
}
