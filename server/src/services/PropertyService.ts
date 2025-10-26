import { PropertyDAO } from '../dao/PropertyDAO';
import { Property } from '../models/Property';
import { CreatePropertyRequest, UpdatePropertyRequest } from '../dto/PropertyDTO';

export class PropertyService {
  private propertyDAO: PropertyDAO;

  constructor() {
    this.propertyDAO = new PropertyDAO();
  }

  async getAllProperties(): Promise<Property[]> {
    return this.propertyDAO.findAll();
  }

  async getPropertyById(id: string): Promise<Property | null> {
    return this.propertyDAO.findById(id);
  }

  async createProperty(data: CreatePropertyRequest): Promise<Property> {
    return this.propertyDAO.create(data);
  }

  async updateProperty(id: string, updates: UpdatePropertyRequest): Promise<Property | null> {
    return this.propertyDAO.update(id, updates);
  }

  async deleteProperty(id: string): Promise<boolean> {
    return this.propertyDAO.delete(id);
  }

  async searchProperties(filters: {
    type?: 'sale' | 'rent';
    category?: 'apartment' | 'house' | 'commercial';
    minPrice?: number;
    maxPrice?: number;
    city?: string;
  }): Promise<Property[]> {
    const properties = await this.getAllProperties();
    
    return properties.filter(property => {
      if (filters.type && property.type !== filters.type) return false;
      if (filters.category && property.category !== filters.category) return false;
      if (filters.minPrice !== undefined && property.price < filters.minPrice) return false;
      if (filters.maxPrice !== undefined && property.price > filters.maxPrice) return false;
      if (filters.city && !property.location.city.toLowerCase().includes(filters.city.toLowerCase())) return false;
      return true;
    });
  }
}