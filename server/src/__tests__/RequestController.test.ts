import { Request, Response } from 'express';
import { RequestController } from '../controllers/RequestController';
import { RequestService } from '../services/RequestService';

// Mock RequestService
jest.mock('../services/RequestService');

describe('RequestController', () => {
  let controller: RequestController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockRequestService: jest.Mocked<RequestService>;

  beforeEach(() => {
    mockRequestService = new RequestService() as jest.Mocked<RequestService>;
    controller = new RequestController();
    (controller as any).requestService = mockRequestService;

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

  describe('createBuyRequest', () => {
    it('✅ Dovrebbe creare una richiesta di acquisto', async () => {
      const newRequest = {
        buyerName: 'Mario Rossi',
        email: 'mario@test.com',
        phone: '1234567890',
        propertyType: 'apartment' as const,
        preferredCity: 'Torino',
        urgency: 'medium' as const
      };

      const createdRequest = { id: '123', ...newRequest, status: 'pending' };
      mockRequest.body = newRequest;

      mockRequestService.createBuyRequest = jest.fn().mockResolvedValue(createdRequest);

      await controller.createBuyRequest(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(createdRequest);
    });

    it('❌ Dovrebbe gestire errori di validazione', async () => {
      mockRequest.body = { buyerName: '' }; // Dati invalidi

      await controller.createBuyRequest(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
    });
  });

  describe('getAllBuyRequests', () => {
    it('✅ Dovrebbe restituire tutte le richieste di acquisto', async () => {
      const mockRequests = [
        { id: '1', buyerName: 'Mario', email: 'mario@test.com' },
        { id: '2', buyerName: 'Luigi', email: 'luigi@test.com' }
      ];

      mockRequestService.getAllBuyRequests = jest.fn().mockResolvedValue(mockRequests);

      await controller.getAllBuyRequests(mockRequest as Request, mockResponse as Response);

      expect(mockRequestService.getAllBuyRequests).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(mockRequests);
    });

    it('❌ Dovrebbe gestire errori', async () => {
      mockRequestService.getAllBuyRequests = jest.fn().mockRejectedValue(new Error('DB Error'));

      await controller.getAllBuyRequests(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
    });
  });

  describe('getBuyRequestById', () => {
    it('✅ Dovrebbe restituire una richiesta per ID', async () => {
      const mockReq = { id: '123', buyerName: 'Mario Rossi', email: 'mario@test.com' };
      mockRequest.params = { id: '123' };

      mockRequestService.getBuyRequestById = jest.fn().mockResolvedValue(mockReq);

      await controller.getBuyRequestById(mockRequest as Request, mockResponse as Response);

      expect(mockRequestService.getBuyRequestById).toHaveBeenCalledWith('123');
      expect(mockResponse.json).toHaveBeenCalledWith(mockReq);
    });

    it('❌ Dovrebbe restituire 404 se non trovata', async () => {
      mockRequest.params = { id: '999' };

      mockRequestService.getBuyRequestById = jest.fn().mockResolvedValue(null);

      await controller.getBuyRequestById(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });
  });

  describe('createSellRequest', () => {
    it('✅ Dovrebbe creare una richiesta di vendita', async () => {
      const newRequest = {
        ownerName: 'Luigi Verdi',
        email: 'luigi@test.com',
        phone: '0987654321',
        propertyType: 'house' as const,
        address: 'Via Roma 1',
        city: 'Paesana',
        province: 'CN',
        urgency: 'low' as const
      };

      const createdRequest = { id: '456', ...newRequest, status: 'pending' };
      mockRequest.body = newRequest;

      mockRequestService.createSellRequest = jest.fn().mockResolvedValue(createdRequest);

      await controller.createSellRequest(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(createdRequest);
    });
  });

  describe('updateBuyRequestStatus', () => {
    it('✅ Dovrebbe aggiornare lo status di una richiesta', async () => {
      const updatedRequest = { id: '123', status: 'completed' };

      mockRequest.params = { id: '123' };
      mockRequest.body = { status: 'completed' };

      mockRequestService.updateBuyRequestStatus = jest.fn().mockResolvedValue(updatedRequest);

      await controller.updateBuyRequestStatus(mockRequest as Request, mockResponse as Response);

      expect(mockRequestService.updateBuyRequestStatus).toHaveBeenCalledWith('123', 'completed');
      expect(mockResponse.json).toHaveBeenCalledWith(updatedRequest);
    });

    it('❌ Dovrebbe restituire 404 se non trovata', async () => {
      mockRequest.params = { id: '999' };
      mockRequest.body = { status: 'completed' };

      mockRequestService.updateBuyRequestStatus = jest.fn().mockResolvedValue(null);

      await controller.updateBuyRequestStatus(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });
  });

  describe('deleteBuyRequest', () => {
    it('✅ Dovrebbe eliminare una richiesta', async () => {
      mockRequest.params = { id: '123' };

      mockRequestService.deleteBuyRequest = jest.fn().mockResolvedValue(true);

      await controller.deleteBuyRequest(mockRequest as Request, mockResponse as Response);

      expect(mockRequestService.deleteBuyRequest).toHaveBeenCalledWith('123');
      expect(mockResponse.status).toHaveBeenCalledWith(204);
    });

    it('❌ Dovrebbe restituire 404 se non trovata', async () => {
      mockRequest.params = { id: '999' };

      mockRequestService.deleteBuyRequest = jest.fn().mockResolvedValue(false);

      await controller.deleteBuyRequest(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });
  });
});
