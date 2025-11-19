import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import type { Property } from '../services/api';

export function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);

  useEffect(() => {
    // TODO: chiamata API reale per caricare immobile per ID
    // Per ora mock
    const mockProperty: Property = {
      id: id!,
      title: 'Baita Montana Vista Monviso',
      description: 'Splendida baita completamente ristrutturata con vista panoramica sul Monviso. La proprietà dispone di ampi spazi interni, finiture di pregio e un giardino privato di 500 mq.',
      price: 185000,
      type: 'sale',
      category: 'house',
      location: { address: 'Via Monviso 12', city: 'Paesana', province: 'CN' },
      details: { rooms: 3, bathrooms: 2, sqm: 110 },
      images: ['/zani1.jpeg', '/zani1.jpeg', '/zani1.jpeg']
    };
    setProperty(mockProperty);
  }, [id]);

  if (!property) return <div>Caricamento...</div>;

  return (
    <>
      <Navbar />
      
      <main style={{ marginTop: '64px', padding: '32px 24px', maxWidth: '1200px', margin: '64px auto 0' }}>
        <button onClick={() => navigate(-1)} className="btn btn--secondary" style={{ marginBottom: '24px' }}>
          ← Indietro
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          {/* Gallery */}
          <div>
            <img src={property.images[0]} alt={property.title} style={{ width: '100%', borderRadius: '16px', marginBottom: '16px' }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {property.images.slice(1).map((img, i) => (
                <img key={i} src={img} alt="" style={{ width: '100%', borderRadius: '8px', aspectRatio: '1' }} />
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>{property.title}</h1>
            <p style={{ color: '#6b7280', marginBottom: '16px' }}>
              📍 {property.location.address}, {property.location.city} ({property.location.province})
            </p>

            <div style={{ fontSize: '2rem', color: '#dc2626', fontWeight: 'bold', marginBottom: '24px' }}>
              {new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(property.price)}
              {property.type === 'rent' && '/mese'}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px', padding: '16px', background: '#f3f4f6', borderRadius: '12px' }}>
              <div>
                <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>Locali</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{property.details.rooms}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>Bagni</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{property.details.bathrooms}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>Superficie</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{property.details.sqm} m²</div>
              </div>
            </div>

            <h3 style={{ marginBottom: '12px' }}>Descrizione</h3>
            <p style={{ lineHeight: '1.6', color: '#374151', marginBottom: '24px' }}>
              {property.description}
            </p>

            <button className="btn btn--primary btn--full">
              📞 Contatta l'agenzia
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}