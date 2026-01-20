import { api } from '../../services/api';

describe('API Service', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  describe('fetchProperties', () => {
    it('📥 Dovrebbe recuperare tutti gli immobili', async () => {
      const mockProperties = [
        { id: '1', title: 'Casa 1', price: 200000 },
        { id: '2', title: 'Casa 2', price: 150000 }
      ];

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProperties
      });

      const result = await api.fetchProperties();

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:4000/api/properties'
      );
      expect(result).toEqual(mockProperties);
    });

    it('❌ Dovrebbe gestire errori di fetch', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error('Network error')
      );

      await expect(api.fetchProperties()).rejects.toThrow('Network error');
    });
  });

  describe('fetchPropertyById', () => {
    it('🔍 Dovrebbe recuperare un immobile specifico', async () => {
      const mockProperty = { 
        id: '123', 
        title: 'Casa Specifica', 
        price: 200000 
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProperty
      });

      const result = await api.fetchPropertyById('123');

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:4000/api/properties/123'
      );
      expect(result).toEqual(mockProperty);
    });
  });

  describe('createProperty', () => {
    it('➕ Dovrebbe creare un nuovo immobile', async () => {
      const newProperty = {
        title: 'Nuova Casa',
        price: 180000,
        type: 'sale' as const
      };

      const createdProperty = { id: 'new-1', ...newProperty };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => createdProperty
      });

      const result = await api.createProperty(newProperty as any);

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:4000/api/properties',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProperty)
        })
      );
      expect(result).toEqual(createdProperty);
    });
  });

  describe('submitContactRequest', () => {
    it('📧 Dovrebbe inviare una richiesta di contatto', async () => {
      const requestData = {
        name: 'Mario Rossi',
        email: 'mario@test.com',
        message: 'Sono interessato'
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true })
      });

      const result = await api.submitContactRequest(requestData as any);

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:4000/api/requests',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(requestData)
        })
      );
      expect(result).toEqual({ success: true });
    });
  });
});
