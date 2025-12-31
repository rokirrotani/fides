import { SellRequest, BuyRequest } from '../models/Request';

export class RequestDAO {
  private sellRequests: SellRequest[] = [];
  private buyRequests: BuyRequest[] = [];

  // Sell Requests
  async createSellRequest(data: Omit<SellRequest, 'id' | 'status' | 'createdAt'>): Promise<SellRequest> {
    const request: SellRequest = {
      ...data,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date()
    };
    
    this.sellRequests.push(request);
    return request;
  }

  async getAllSellRequests(): Promise<SellRequest[]> {
    return this.sellRequests;
  }

  async getSellRequestById(id: string): Promise<SellRequest | null> {
    return this.sellRequests.find(req => req.id === id) || null;
  }

  async updateSellRequestStatus(id: string, status: SellRequest['status']): Promise<SellRequest | null> {
    const request = this.sellRequests.find(req => req.id === id);
    if (request) {
      request.status = status;
      return request;
    }
    return null;
  }

  async deleteSellRequest(id: string): Promise<boolean> {
    const index = this.sellRequests.findIndex(req => req.id === id);
    if (index !== -1) {
      this.sellRequests.splice(index, 1);
      return true;
    }
    return false;
  }

  // Buy Requests
  async createBuyRequest(data: Omit<BuyRequest, 'id' | 'status' | 'createdAt'>): Promise<BuyRequest> {
    const request: BuyRequest = {
      ...data,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date()
    };
    
    this.buyRequests.push(request);
    return request;
  }

  async getAllBuyRequests(): Promise<BuyRequest[]> {
    return this.buyRequests;
  }

  async getBuyRequestById(id: string): Promise<BuyRequest | null> {
    return this.buyRequests.find(req => req.id === id) || null;
  }

  async updateBuyRequestStatus(id: string, status: BuyRequest['status']): Promise<BuyRequest | null> {
    const request = this.buyRequests.find(req => req.id === id);
    if (request) {
      request.status = status;
      return request;
    }
    return null;
  }

  async deleteBuyRequest(id: string): Promise<boolean> {
    const index = this.buyRequests.findIndex(req => req.id === id);
    if (index !== -1) {
      this.buyRequests.splice(index, 1);
      return true;
    }
    return false;
  }
}
