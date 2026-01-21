import { Request, Response } from 'express';
import { PropertyController } from '../controllers/PropertyController';
import { PropertyService } from '../services/PropertyService';

// Mock PropertyService
jest.mock('../services/PropertyService');

describe('PropertyController', () => {
  let controller: PropertyController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockPropertyService: jest.Mocked<PropertyService>;

  beforeEach(() => {
    mockPropertyService = new PropertyService() as jest.Mocked<PropertyService>;
    controller = new PropertyController();
    (controller as any).propertyService = mockPropertyService;

    mockRequest = {
      params: {},
      body: {},
      query: {}
    };

    mockResponse = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    };
  });

  describe('getAllProperties', () => {
    it('✅ Dovrebbe restituire tutte le proprietà', async () => {
      const mockProperties = [
        { id: '1', title: 'Casa 1', price: 100000 },
        { id: '2', title: 'Casa 2', price: 200000 }
      ];

      mockPropertyService.getAllProperties = jest.fn().mockResolvedValue(mockProperties);

      await controller.getAllProperties(mockRequest as Request, mockResponse as Response);

      expect(mockPropertyService.getAllProperties).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(mockProperties);
    });

    it('❌ Dovrebbe gestire errori', async () => {
      mockPropertyService.getAllProperties = jest.fn().mockRejectedValue(new Error('DB Error'));

      await controller.getAllProperties(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Failed to fetch properties' });
    });
  });

  describe('getPropertyById', () => {
    it('✅ Dovrebbe restituire una proprietà per ID', async () => {
      const mockProperty = { id: '123', title: 'Casa Test', price: 150000 };
      mockRequest.params = { id: '123' };

      mockPropertyService.getPropertyById = jest.fn().mockResolvedValue(mockProperty);

      await controller.getPropertyById(mockRequest as Request, mockResponse as Response);

      expect(mockPropertyService.getPropertyById).toHaveBeenCalledWith('123');
      expect(mockResponse.json).toHaveBeenCalledWith(mockProperty);
    });

    it('❌ Dovrebbe restituire 404 se non trovata', async () => {
      mockRequest.params = { id: '999' };

      mockPropertyService.getPropertyById = jest.fn().mockResolvedValue(null);

      await controller.getPropertyById(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Property not found' });
    });
  });

  describe('createProperty', () => {
    it('✅ Dovrebbe creare una nuova proprietà', async () => {
      const newProperty = {
        title: 'Nuova Casa',
        price: 180000,
        type: 'sale' as const,
        category: 'house' as const,
        location: {
          address: 'Via Test 1',
          city: 'Torino',
          province: 'TO'
        },
        details: {
          rooms: 3,
          bathrooms: 2,
          sqm: 100
        },
        images: []
      };

      const createdProperty = { id: '123', ...newProperty };
      mockRequest.body = newProperty;

      mockPropertyService.createProperty = jest.fn().mockResolvedValue(createdProperty);

      await controller.createProperty(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(createdProperty);
    });

    it('❌ Dovrebbe gestire errori di validazione', async () => {
      mockRequest.body = { title: '' }; // Dati invalidi

      await controller.createProperty(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
    });
  });

  describe('updateProperty', () => {
    it('✅ Dovrebbe aggiornare una proprietà', async () => {
      const updateData = { price: 175000 };
      const updatedProperty = { id: '123', title: 'Casa', price: 175000 };

      mockRequest.params = { id: '123' };
      mockRequest.body = updateData;

      mockPropertyService.updateProperty = jest.fn().mockResolvedValue(updatedProperty);

      await controller.updateProperty(mockRequest as Request, mockResponse as Response);

      expect(mockPropertyService.updateProperty).toHaveBeenCalledWith('123', updateData);
      expect(mockResponse.json).toHaveBeenCalledWith(updatedProperty);
    });

    it('❌ Dovrebbe restituire 404 se non trovata', async () => {
      mockRequest.params = { id: '999' };
      mockRequest.body = { price: 100000 };

      mockPropertyService.updateProperty = jest.fn().mockResolvedValue(null);

      await controller.updateProperty(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });
  });

  describe('deleteProperty', () => {
    it('✅ Dovrebbe eliminare una proprietà', async () => {
      mockRequest.params = { id: '123' };

      mockPropertyService.deleteProperty = jest.fn().mockResolvedValue(true);

      await controller.deleteProperty(mockRequest as Request, mockResponse as Response);

      expect(mockPropertyService.deleteProperty).toHaveBeenCalledWith('123');
      expect(mockResponse.status).toHaveBeenCalledWith(204);
    });

    it('❌ Dovrebbe restituire 404 se non trovata', async () => {
      mockRequest.params = { id: '999' };

      mockPropertyService.deleteProperty = jest.fn().mockResolvedValue(false);

      await controller.deleteProperty(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });
  });
});
