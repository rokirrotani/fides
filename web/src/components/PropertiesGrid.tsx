import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Property } from '../services/api';

interface PropertiesGridProps {
  branch: 'paesana' | 'torino' | null;
  properties: Property[];
}

function formatPrice(value: number): string {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

export function PropertiesGrid({ branch, properties }: PropertiesGridProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const navigate = useNavigate();

  if (!branch) return null;

  const title =
    branch === 'paesana'
      ? 'Immobili disponibili - Fides Paesana'
      : 'Immobili disponibili - Fides Torino';

  const subtitle =
    branch === 'paesana'
      ? 'Case, appartamenti e soluzioni in valle Po e dintorni.'
      : 'Appartamenti, attici e investimenti nel torinese.';

  return (
    <section id="properties" className="properties fade-in">
      <div className="properties__header">
        <h2 className="slide-in-left">{title}</h2>
        <p className="slide-in-right">{subtitle}</p>
      </div>

      <div className="properties__grid">
        {properties.length === 0 && (
          <p style={{ textAlign: 'center', width: '100%', padding: '24px', animation: 'fadeIn 0.6s ease-out' }}>
            Nessun immobile disponibile al momento.
          </p>
        )}

        {properties.map((property, index) => {
          const imageUrl =
            property.images && property.images.length > 0
              ? property.images[0]
              : 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800';

          return (
            <article 
              key={property.id} 
              className="property-card scale-in"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                cursor: 'pointer'
              }}
              onMouseEnter={() => setHoveredCard(property.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => navigate(`/immobile/${property.id}`)}
            >
              <div style={{ position: 'relative' }}>
                <div
                  className="property-card__image"
                  style={{ 
                    backgroundImage: `url('${imageUrl}')`,
                    transform: hoveredCard === property.id ? 'scale(1.1)' : 'scale(1)'
                  }}
                >
                </div>
                {/* Overlay VENDUTO elegante */}
                {property.status === 'sold' && (
                  <>
                    {/* Overlay semitrasparente */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.75) 0%, rgba(30, 41, 59, 0.85) 100%)',
                      backdropFilter: 'blur(2px)',
                      zIndex: 10,
                      pointerEvents: 'none',
                      borderRadius: '12px'
                    }}></div>
                    
                    {/* Badge VENDUTO angolo in alto a destra */}
                    <div style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      background: 'linear-gradient(135deg, #991b1b 0%, #dc2626 100%)',
                      color: 'white',
                      padding: '10px 24px',
                      fontSize: '0.875rem',
                      fontWeight: '700',
                      letterSpacing: '2px',
                      borderRadius: '6px',
                      boxShadow: '0 4px 16px rgba(220, 38, 38, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.15)',
                      zIndex: 11,
                      pointerEvents: 'none',
                      textTransform: 'uppercase'
                    }}>
                      Venduto
                    </div>

                    {/* Testo centrale discreto */}
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      color: 'rgba(255, 255, 255, 0.95)',
                      fontSize: '1.25rem',
                      fontWeight: '600',
                      letterSpacing: '1px',
                      textAlign: 'center',
                      zIndex: 11,
                      pointerEvents: 'none',
                      textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)'
                    }}>
                      Immobile non disponibile
                    </div>
                  </>
                )}
              </div>
              <div className="property-card__body">
                <h3 className="property-card__title">{property.title}</h3>
                <div className="property-card__meta" style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  flexWrap: 'wrap'
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    {property.location.city}
                  </span>
                  <span>•</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="7" height="7"></rect>
                      <rect x="14" y="3" width="7" height="7"></rect>
                      <rect x="14" y="14" width="7" height="7"></rect>
                      <rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
                    {property.details.rooms} locali
                  </span>
                  <span>•</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                    {property.details.sqm} m²
                  </span>
                </div>
                <div className="property-card__price">
                  {formatPrice(property.price)}
                  {property.type === 'rent' && '/mese'}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}