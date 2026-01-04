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
    // Carica l'immobile dal localStorage
    const savedProperties = localStorage.getItem('fides_properties');
    if (savedProperties && id) {
      try {
        const allProperties = JSON.parse(savedProperties);
        const foundProperty = allProperties.find((p: any) => p.id === id);
        if (foundProperty) {
          setProperty(foundProperty);
        } else {
          // Fallback mock se non trovato
          const mockProperty: Property = {
            id: id!,
            title: 'Immobile non trovato',
            description: 'L\'immobile richiesto non è più disponibile.',
            price: 0,
            type: 'sale',
            category: 'house',
            location: { address: '', city: '', province: '' },
            details: { rooms: 0, bathrooms: 0, sqm: 0 },
            images: ['/placeholder.jpg']
          };
          setProperty(mockProperty);
        }
      } catch (e) {
        console.error('Error loading property:', e);
      }
    }
  }, [id]);

  if (!property) return <div>Caricamento...</div>;

  return (
    <>
      <Navbar />
      
      <main style={{ marginTop: '64px', padding: '32px 24px', maxWidth: '1200px', margin: '64px auto 0' }}>
        <button onClick={() => navigate(-1)} className="btn btn--secondary" style={{ marginBottom: '24px' }}>
          ← Indietro
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }} className="property-detail-grid">
          {/* Gallery */}
          <div>
            <div style={{ position: 'relative' }}>
              <img src={property.images[0]} alt={property.title} style={{ width: '100%', borderRadius: '16px', marginBottom: '16px' }} />
              {(property as any).status === 'sold' && (
                <>
                  {/* Overlay sfumato elegante */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.9) 100%)',
                    backdropFilter: 'blur(3px)',
                    borderRadius: '16px',
                    pointerEvents: 'none',
                    zIndex: 10
                  }}></div>
                  
                  {/* Badge VENDUTO moderno */}
                  <div style={{
                    position: 'absolute',
                    top: '32px',
                    right: '32px',
                    background: 'linear-gradient(135deg, #991b1b 0%, #dc2626 100%)',
                    color: 'white',
                    padding: '14px 32px',
                    fontSize: '1rem',
                    fontWeight: '700',
                    letterSpacing: '2.5px',
                    borderRadius: '8px',
                    boxShadow: '0 8px 24px rgba(220, 38, 38, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.2)',
                    zIndex: 11,
                    pointerEvents: 'none',
                    textTransform: 'uppercase'
                  }}>
                    Venduto
                  </div>

                  {/* Messaggio centrale professionale */}
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    zIndex: 11,
                    pointerEvents: 'none'
                  }}>
                    <div style={{
                      color: 'rgba(255, 255, 255, 0.95)',
                      fontSize: '1.75rem',
                      fontWeight: '600',
                      letterSpacing: '0.5px',
                      marginBottom: '8px',
                      textShadow: '0 2px 8px rgba(0, 0, 0, 0.6)'
                    }}>
                      Immobile non disponibile
                    </div>
                    <div style={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: '1rem',
                      fontWeight: '400',
                      letterSpacing: '0.5px',
                      textShadow: '0 2px 8px rgba(0, 0, 0, 0.6)'
                    }}>
                      Questo immobile è stato venduto
                    </div>
                  </div>
                </>
              )}
            </div>
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

            <div style={{ fontSize: '2.5rem', color: '#dc2626', fontWeight: 'bold', marginBottom: '24px' }}>
              € {property.price.toLocaleString('it-IT')}
              {property.type === 'rent' && <span style={{ fontSize: '1rem' }}>/mese</span>}
            </div>

            {/* Caratteristiche principali */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px', padding: '20px', background: '#f8fafc', borderRadius: '12px', border: '2px solid #e2e8f0' }} className="property-detail-main-info">
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '4px' }}>Locali</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e293b' }}>{property.details.rooms}</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '4px' }}>Bagni</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e293b' }}>{property.details.bathrooms}</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '4px' }}>m²</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e293b' }}>{property.details.sqm}</div>
              </div>
            </div>

            {/* Altre caratteristiche */}
            {(property as any).details && (
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ marginBottom: '16px', fontSize: '1.3rem', color: '#1e293b' }}>🏠 Caratteristiche</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }} className="property-detail-characteristics">
                  {(property as any).details.floor !== undefined && (
                    <div style={{ padding: '12px', background: '#f1f5f9', borderRadius: '8px' }}>
                      <span style={{ color: '#64748b', fontSize: '0.9rem' }}>Piano:</span>
                      <span style={{ marginLeft: '8px', fontWeight: '600' }}>{(property as any).details.floor === 0 ? 'Terra' : (property as any).details.floor}</span>
                    </div>
                  )}
                  {(property as any).details.energyClass && (
                    <div style={{ padding: '12px', background: '#f1f5f9', borderRadius: '8px' }}>
                      <span style={{ color: '#64748b', fontSize: '0.9rem' }}>Classe Energetica:</span>
                      <span style={{ marginLeft: '8px', fontWeight: '600' }}>{(property as any).details.energyClass}</span>
                    </div>
                  )}
                  {(property as any).details.balcony && (
                    <div style={{ padding: '12px', background: '#dbeafe', borderRadius: '8px', color: '#1e40af', fontWeight: '600' }}>
                      ✓ Balcone
                    </div>
                  )}
                  {(property as any).details.garage && (
                    <div style={{ padding: '12px', background: '#dbeafe', borderRadius: '8px', color: '#1e40af', fontWeight: '600' }}>
                      ✓ Box/Garage
                    </div>
                  )}
                  {(property as any).details.elevator && (
                    <div style={{ padding: '12px', background: '#dbeafe', borderRadius: '8px', color: '#1e40af', fontWeight: '600' }}>
                      ✓ Ascensore
                    </div>
                  )}
                  {(property as any).details.furnished && (
                    <div style={{ padding: '12px', background: '#dbeafe', borderRadius: '8px', color: '#1e40af', fontWeight: '600' }}>
                      ✓ Arredato
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Spese */}
            {(property as any).costs && ((property as any).costs.condominiumFees || (property as any).costs.heatingCosts) && (
              <div style={{ marginBottom: '24px', padding: '16px', background: '#fef3c7', borderRadius: '12px' }}>
                <h3 style={{ marginBottom: '12px', fontSize: '1.1rem', color: '#92400e' }}>💶 Spese</h3>
                {(property as any).costs.condominiumFees > 0 && (
                  <p style={{ marginBottom: '8px' }}>
                    <strong>Condominio:</strong> € {(property as any).costs.condominiumFees}/mese
                  </p>
                )}
                {(property as any).costs.heatingCosts > 0 && (
                  <p>
                    <strong>Riscaldamento:</strong> € {(property as any).costs.heatingCosts}/anno
                  </p>
                )}
              </div>
            )}

            <h3 style={{ marginBottom: '12px', fontSize: '1.3rem', color: '#1e293b' }}>📄 Descrizione</h3>
            <p style={{ lineHeight: '1.8', color: '#475569', marginBottom: '24px', whiteSpace: 'pre-wrap' }}>
              {property.description}
            </p>

            <button 
              className="btn btn--primary" 
              style={{ 
                width: '100%', 
                padding: '16px', 
                fontSize: '1.1rem',
                background: '#dc2626',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontWeight: '600',
                cursor: 'pointer'
              }}
              onClick={() => window.location.href = '/contatti'}
            >
              📞 Contatta l'agenzia
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}