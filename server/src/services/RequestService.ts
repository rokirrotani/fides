import { RequestDAO } from '../dao/RequestDAO';
import { SellRequest, BuyRequest } from '../models/Request';

export class RequestService {
  private requestDAO: RequestDAO;

  constructor() {
    this.requestDAO = new RequestDAO();
  }

  // Sell Requests
  async createSellRequest(data: Omit<SellRequest, 'id' | 'status' | 'createdAt'>): Promise<SellRequest> {
    const request = await this.requestDAO.createSellRequest(data);
    
    // Se notifyZani è true, qui si potrebbe implementare l'invio email
    if (request.notifyZani) {
      console.log(`📧 Notifica Zani per richiesta vendita ID: ${request.id}`);
      // TODO: Implementare invio email a Zani
    }
    
    return request;
  }

  async getAllSellRequests(): Promise<SellRequest[]> {
    return this.requestDAO.getAllSellRequests();
  }

  async getSellRequestById(id: string): Promise<SellRequest | null> {
    return this.requestDAO.getSellRequestById(id);
  }

  async updateSellRequestStatus(id: string, status: SellRequest['status']): Promise<SellRequest | null> {
    return this.requestDAO.updateSellRequestStatus(id, status);
  }

  async deleteSellRequest(id: string): Promise<boolean> {
    return this.requestDAO.deleteSellRequest(id);
  }

  // Buy Requests
  async createBuyRequest(data: Omit<BuyRequest, 'id' | 'status' | 'createdAt'>): Promise<BuyRequest> {
    const request = await this.requestDAO.createBuyRequest(data);
    console.log(`📥 Nuova richiesta acquisto da: ${request.buyerName}`);
    return request;
  }

  async getAllBuyRequests(): Promise<BuyRequest[]> {
    return this.requestDAO.getAllBuyRequests();
  }

  async getBuyRequestById(id: string): Promise<BuyRequest | null> {
    return this.requestDAO.getBuyRequestById(id);
  }

  async updateBuyRequestStatus(id: string, status: BuyRequest['status']): Promise<BuyRequest | null> {
    return this.requestDAO.updateBuyRequestStatus(id, status);
  }

  async deleteBuyRequest(id: string): Promise<boolean> {
    return this.requestDAO.deleteBuyRequest(id);
  }
}
