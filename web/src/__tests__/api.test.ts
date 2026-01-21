import { fetchPropertiesByBranch, submitSellRequest, submitBuyRequest } from '../services/api';

describe('API Service', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  describe('fetchPropertiesByBranch', () => {
    it('📥 Dovrebbe recuperare gli immobili di Paesana', async () => {
      const mockProperties = [
        { id: '1', title: 'Casa 1', price: 200000 },
        { id: '2', title: 'Casa 2', price: 150000 }
      ];

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProperties
      });

      const result = await fetchPropertiesByBranch('paesana');

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:4000/api/properties?city=paesana'
      );
      expect(result).toEqual(mockProperties);
    });

    it('❌ Dovrebbe gestire errori di fetch', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error('Network error')
      );

      const result = await fetchPropertiesByBranch('torino');
      // When fetch fails, it should return mock data
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('submitSellRequest', () => {
    it('📤 Dovrebbe inviare una richiesta di vendita', async () => {
      const sellRequest = { 
        ownerName: 'Mario Rossi',
        email: 'mario@test.com',
        phone: '1234567890',
        propertyType: 'apartment' as const,
        address: 'Via Test 1',
        city: 'Torino',
        province: 'TO',
        urgency: 'medium' as const
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true })
      });

      const result = await submitSellRequest(sellRequest);

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:4000/api/requests/sell',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sellRequest)
        })
      );
      expect(result).toEqual({ success: true });
    });
  });

  describe('submitBuyRequest', () => {
    it('🛒 Dovrebbe inviare una richiesta di acquisto', async () => {
      const buyRequest = {
        buyerName: 'Luigi Verdi',
        email: 'luigi@test.com',
        phone: '0987654321',
        propertyType: 'house' as const,
        preferredCity: 'Paesana',
        urgency: 'high' as const
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true })
      });

      const result = await submitBuyRequest(buyRequest);

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:4000/api/requests/buy',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(buyRequest)
        })
      );
      expect(result).toEqual({ success: true });
    });
  });
});
