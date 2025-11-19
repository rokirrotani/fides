export interface PropertyDetails {
  rooms: number;
  bathrooms: number;
  sqm: number;
  floor?: number;
}

export interface PropertyLocation {
  address: string;
  city: string;
  province: string;
}

export interface Property {
  id: string;
  title: string;
  description?: string;
  price: number;
  type: 'sale' | 'rent';
  category: 'apartment' | 'house' | 'commercial';
  location: PropertyLocation;
  details: PropertyDetails;
  images: string[];
}

const API_BASE_URL = 'http://localhost:4000';

export async function fetchPropertiesByBranch(branch: 'paesana' | 'torino'): Promise<Property[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/properties?city=${branch}`);
    if (!res.ok) throw new Error('Network error');
    return res.json();
  } catch (error) {
    console.warn('Usando dati mock:', error);
    return getMockProperties(branch);
  }
}

export async function loginOwner(email: string, password: string) {
  if (email === 'admin@fides.it' && password === 'password') {
    return { token: 'fake-token', name: 'Admin Fides' };
  }
  throw new Error('Credenziali non valide');
}

function getMockProperties(branch: 'paesana' | 'torino'): Property[] {
  const paesana: Property[] = [
    {
      id: '1',
      title: 'Baita Montana Vista Monviso',
      description: 'Splendida baita ristrutturata con vista panoramica',
      price: 185000,
      type: 'sale',
      category: 'house',
      location: { address: 'Via Monviso 12', city: 'Paesana', province: 'CN' },
      details: { rooms: 3, bathrooms: 2, sqm: 110, floor: 0 },
      images: ['/images/zani1.jpeg']
    },
    {
      id: '2',
      title: 'Casa Rustica Valle Po',
      description: 'Casale con terreno vista montagne',
      price: 145000,
      type: 'sale',
      category: 'house',
      location: { address: 'Borgata Sant\'Anna 8', city: 'Paesana', province: 'CN' },
      details: { rooms: 4, bathrooms: 1, sqm: 130 },
      images: ['/images/zani1.jpeg']
    }
  ];

  const torino: Property[] = [
    {
      id: '3',
      title: 'Attico Vista Mole Antonelliana',
      description: 'Prestigioso attico con terrazza panoramica',
      price: 450000,
      type: 'sale',
      category: 'apartment',
      location: { address: 'Via Po 100', city: 'Torino', province: 'TO' },
      details: { rooms: 4, bathrooms: 2, sqm: 140, floor: 5 },
      images: ['/images/torino-mole.jpg']
    },
    {
      id: '4',
      title: 'Trilocale Centro Storico',
      description: 'Appartamento ristrutturato vicino Piazza Castello',
      price: 1200,
      type: 'rent',
      category: 'apartment',
      location: { address: 'Via Garibaldi 45', city: 'Torino', province: 'TO' },
      details: { rooms: 3, bathrooms: 1, sqm: 80, floor: 3 },
      images: ['/images/torino-mole.jpg']
    }
  ];

  return branch === 'paesana' ? paesana : torino;
}