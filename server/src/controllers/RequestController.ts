import { Request, Response } from 'express';
import { RequestService } from '../services/RequestService';
import { CreateSellRequestDTO, CreateBuyRequestDTO } from '../dto/RequestDTO';

export class RequestController {
  private requestService: RequestService;

  constructor() {
    this.requestService = new RequestService();
  }

  // Sell Requests
  createSellRequest = async (req: Request, res: Response) => {
    try {
      const validatedData = CreateSellRequestDTO.parse(req.body);
      const request = await this.requestService.createSellRequest(validatedData);
      res.status(201).json(request);
    } catch (error) {
      console.error('Error creating sell request:', error);
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Failed to create sell request' });
      }
    }
  };

  getAllSellRequests = async (req: Request, res: Response) => {
    try {
      const requests = await this.requestService.getAllSellRequests();
      res.json(requests);
    } catch (error) {
      console.error('Error getting sell requests:', error);
      res.status(500).json({ error: 'Failed to fetch sell requests' });
    }
  };

  getSellRequestById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const request = await this.requestService.getSellRequestById(id);
      
      if (!request) {
        res.status(404).json({ error: 'Sell request not found' });
        return;
      }
      
      res.json(request);
    } catch (error) {
      console.error('Error getting sell request:', error);
      res.status(500).json({ error: 'Failed to fetch sell request' });
    }
  };

  updateSellRequestStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      const request = await this.requestService.updateSellRequestStatus(id, status);
      
      if (!request) {
        res.status(404).json({ error: 'Sell request not found' });
        return;
      }
      
      res.json(request);
    } catch (error) {
      console.error('Error updating sell request:', error);
      res.status(500).json({ error: 'Failed to update sell request' });
    }
  };

  deleteSellRequest = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const deleted = await this.requestService.deleteSellRequest(id);
      
      if (!deleted) {
        res.status(404).json({ error: 'Sell request not found' });
        return;
      }
      
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting sell request:', error);
      res.status(500).json({ error: 'Failed to delete sell request' });
    }
  };

  // Buy Requests
  createBuyRequest = async (req: Request, res: Response) => {
    try {
      const validatedData = CreateBuyRequestDTO.parse(req.body);
      const request = await this.requestService.createBuyRequest(validatedData);
      res.status(201).json(request);
    } catch (error) {
      console.error('Error creating buy request:', error);
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Failed to create buy request' });
      }
    }
  };

  getAllBuyRequests = async (req: Request, res: Response) => {
    try {
      const requests = await this.requestService.getAllBuyRequests();
      res.json(requests);
    } catch (error) {
      console.error('Error getting buy requests:', error);
      res.status(500).json({ error: 'Failed to fetch buy requests' });
    }
  };

  getBuyRequestById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const request = await this.requestService.getBuyRequestById(id);
      
      if (!request) {
        res.status(404).json({ error: 'Buy request not found' });
        return;
      }
      
      res.json(request);
    } catch (error) {
      console.error('Error getting buy request:', error);
      res.status(500).json({ error: 'Failed to fetch buy request' });
    }
  };

  updateBuyRequestStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      const request = await this.requestService.updateBuyRequestStatus(id, status);
      
      if (!request) {
        res.status(404).json({ error: 'Buy request not found' });
        return;
      }
      
      res.json(request);
    } catch (error) {
      console.error('Error updating buy request:', error);
      res.status(500).json({ error: 'Failed to update buy request' });
    }
  };

  deleteBuyRequest = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const deleted = await this.requestService.deleteBuyRequest(id);
      
      if (!deleted) {
        res.status(404).json({ error: 'Buy request not found' });
        return;
      }
      
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting buy request:', error);
      res.status(500).json({ error: 'Failed to delete buy request' });
    }
  };
}
