import { PropertyService } from '../services/PropertyService';

describe('PropertyService', () => {
  let service: PropertyService;

  beforeEach(() => {
    service = new PropertyService();
  });

  describe('searchProperties', () => {
    it('🔍 Dovrebbe filtrare per tipo (vendita/affitto)', async () => {
      const mockProperties = [
        {
          id: '1',
          title: 'Casa in vendita',
          type: 'sale' as const,
          category: 'house' as const,
          price: 200000,
          location: { city: 'Paesana', address: 'Via Roma 1', province: 'CN' }
        },
        {
          id: '2',
          title: 'Appartamento in affitto',
          type: 'rent' as const,
          category: 'apartment' as const,
          price: 500,
          location: { city: 'Torino', address: 'Via Milano 2', province: 'TO' }
        }
      ];

      jest.spyOn(service, 'getAllProperties').mockResolvedValue(mockProperties as any);

      const results = await service.searchProperties({ type: 'sale' });
      expect(results).toHaveLength(1);
      expect(results[0].type).toBe('sale');
    });

    it('🏠 Dovrebbe filtrare per categoria', async () => {
      const mockProperties = [
        {
          id: '1',
          type: 'sale' as const,
          category: 'house' as const,
          price: 200000,
          location: { city: 'Paesana', address: '', province: 'CN' }
        },
        {
          id: '2',
          type: 'sale' as const,
          category: 'apartment' as const,
          price: 150000,
          location: { city: 'Torino', address: '', province: 'TO' }
        }
      ];

      jest.spyOn(service, 'getAllProperties').mockResolvedValue(mockProperties as any);

      const results = await service.searchProperties({ category: 'apartment' });
      expect(results).toHaveLength(1);
      expect(results[0].category).toBe('apartment');
    });

    it('💰 Dovrebbe filtrare per range di prezzo', async () => {
      const mockProperties = [
        {
          id: '1',
          type: 'sale' as const,
          category: 'house' as const,
          price: 100000,
          location: { city: 'Paesana', address: '', province: 'CN' }
        },
        {
          id: '2',
          type: 'sale' as const,
          category: 'house' as const,
          price: 200000,
          location: { city: 'Torino', address: '', province: 'TO' }
        },
        {
          id: '3',
          type: 'sale' as const,
          category: 'house' as const,
          price: 300000,
          location: { city: 'Torino', address: '', province: 'TO' }
        }
      ];

      jest.spyOn(service, 'getAllProperties').mockResolvedValue(mockProperties as any);

      const results = await service.searchProperties({ 
        minPrice: 150000, 
        maxPrice: 250000 
      });
      
      expect(results).toHaveLength(1);
      expect(results[0].price).toBe(200000);
    });

    it('🏙️ Dovrebbe filtrare per città (case-insensitive)', async () => {
      const mockProperties = [
        {
          id: '1',
          type: 'sale' as const,
          category: 'house' as const,
          price: 200000,
          location: { city: 'Paesana', address: '', province: 'CN' }
        },
        {
          id: '2',
          type: 'sale' as const,
          category: 'apartment' as const,
          price: 150000,
          location: { city: 'Torino', address: '', province: 'TO' }
        }
      ];

      jest.spyOn(service, 'getAllProperties').mockResolvedValue(mockProperties as any);

      const results = await service.searchProperties({ city: 'torino' });
      expect(results).toHaveLength(1);
      expect(results[0].location.city).toBe('Torino');
    });

    it('🎯 Dovrebbe applicare filtri multipli', async () => {
      const mockProperties = [
        {
          id: '1',
          type: 'sale' as const,
          category: 'apartment' as const,
          price: 150000,
          location: { city: 'Torino', address: '', province: 'TO' }
        },
        {
          id: '2',
          type: 'rent' as const,
          category: 'apartment' as const,
          price: 500,
          location: { city: 'Torino', address: '', province: 'TO' }
        },
        {
          id: '3',
          type: 'sale' as const,
          category: 'house' as const,
          price: 200000,
          location: { city: 'Paesana', address: '', province: 'CN' }
        }
      ];

      jest.spyOn(service, 'getAllProperties').mockResolvedValue(mockProperties as any);

      const results = await service.searchProperties({
        type: 'sale',
        category: 'apartment',
        city: 'Torino'
      });
      
      expect(results).toHaveLength(1);
      expect(results[0].id).toBe('1');
    });
  });
});
