import { Request, Response } from 'express';
import { PropertyService } from '../services/PropertyService';
import { CreatePropertyDTO, UpdatePropertyDTO } from '../dto/PropertyDTO';

export class PropertyController {
  private propertyService: PropertyService;

  constructor() {
    this.propertyService = new PropertyService();
  }

  getAllProperties = async (req: Request, res: Response) => {
    try {
      const properties = await this.propertyService.getAllProperties();
      res.json(properties);
    } catch (error) {
      console.error('Error getting properties:', error);
      res.status(500).json({ error: 'Failed to fetch properties' });
    }
  };

  getPropertyById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const property = await this.propertyService.getPropertyById(id);
      
      if (!property) {
        res.status(404).json({ error: 'Property not found' });
        return;
      }
      
      res.json(property);
    } catch (error) {
      console.error('Error getting property:', error);
      res.status(500).json({ error: 'Failed to fetch property' });
    }
  };

  createProperty = async (req: Request, res: Response) => {
    try {
      const validatedData = CreatePropertyDTO.parse(req.body);
      const property = await this.propertyService.createProperty(validatedData);
      res.status(201).json(property);
    } catch (error) {
      console.error('Error creating property:', error);
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Failed to create property' });
      }
    }
  };

  updateProperty = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const validatedData = UpdatePropertyDTO.parse(req.body);
      
      const property = await this.propertyService.updateProperty(id, validatedData);
      
      if (!property) {
        res.status(404).json({ error: 'Property not found' });
        return;
      }
      
      res.json(property);
    } catch (error) {
      console.error('Error updating property:', error);
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Failed to update property' });
      }
    }
  };

  deleteProperty = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const deleted = await this.propertyService.deleteProperty(id);
      
      if (!deleted) {
        res.status(404).json({ error: 'Property not found' });
        return;
      }
      
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting property:', error);
      res.status(500).json({ error: 'Failed to delete property' });
    }
  };

  searchProperties = async (req: Request, res: Response) => {
    try {
      const { type, category, minPrice, maxPrice, city } = req.query;
      
      const properties = await this.propertyService.searchProperties({
        type: type as 'sale' | 'rent' | undefined,
        category: category as 'apartment' | 'house' | 'commercial' | undefined,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        city: city as string | undefined
      });
      
      res.json(properties);
    } catch (error) {
      console.error('Error searching properties:', error);
      res.status(500).json({ error: 'Failed to search properties' });
    }
  };
}