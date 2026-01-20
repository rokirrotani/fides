import { RequestService } from '../services/RequestService';

describe('RequestService', () => {
  let service: RequestService;

  beforeEach(() => {
    service = new RequestService();
  });

  describe('getAllBuyRequests', () => {
    it('📋 Dovrebbe avere il metodo getAllBuyRequests', () => {
      expect(service.getAllBuyRequests).toBeDefined();
      expect(typeof service.getAllBuyRequests).toBe('function');
    });
  });

  describe('getAllSellRequests', () => {
    it('📋 Dovrebbe avere il metodo getAllSellRequests', () => {
      expect(service.getAllSellRequests).toBeDefined();
      expect(typeof service.getAllSellRequests).toBe('function');
    });
  });

  describe('Metodi CRUD', () => {
    it('✅ Dovrebbe avere metodi per creare richieste', () => {
      expect(service.createBuyRequest).toBeDefined();
      expect(service.createSellRequest).toBeDefined();
    });

    it('🗑️ Dovrebbe avere metodi per eliminare richieste', () => {
      expect(service.deleteBuyRequest).toBeDefined();
      expect(service.deleteSellRequest).toBeDefined();
    });
  });
});
