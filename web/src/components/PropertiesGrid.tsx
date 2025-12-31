import { useState } from 'react';
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
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredCard(property.id)}
              onMouseLeave={() => setHoveredCard(null)}
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
                {/* Overlay VENDUTO con barra diagonale */}
                {property.status === 'sold' && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10,
                    pointerEvents: 'none'
                  }}>
                    <div style={{
                      background: '#dc2626',
                      color: 'white',
                      padding: '12px 60px',
                      fontSize: '1.5rem',
                      fontWeight: '800',
                      transform: 'rotate(-15deg)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                      letterSpacing: '4px',
                      border: '4px solid white',
                      borderRadius: '4px'
                    }}>
                      VENDUTO
                    </div>
                  </div>
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