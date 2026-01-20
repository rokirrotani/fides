import { useState, useMemo } from 'react';
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

  // Stati per i filtri
  const [filters, setFilters] = useState({
    type: 'all',
    propertyType: 'all',
    priceMin: 0,
    priceMax: 1000000,
    sqmMin: 20,
    sqmMax: 500
  });

  // Ordinamento
  const [sortBy, setSortBy] = useState('recent'); // recent, price_asc, price_desc, sqm_asc, sqm_desc

  if (!branch) return null;

  const title =
    branch === 'paesana'
      ? 'Immobili in vendita - Fides Paesana'
      : 'Immobili in vendita - Fides Torino';

  const subtitle = `Sono stati trovati ${properties.length} immobili`;

  // Filtra immobili
  const filteredProperties = useMemo(() => {
    let filtered = properties.filter(property => {
      if (property.status === 'sold') return false;
      if (filters.type !== 'all' && property.type !== filters.type) return false;
      if (filters.propertyType !== 'all' && property.propertyType !== filters.propertyType) return false;
      if (property.price < filters.priceMin || property.price > filters.priceMax) return false;
      if (property.details.sqm < filters.sqmMin || property.details.sqm > filters.sqmMax) return false;
      return true;
    });

    // Ordina
    switch (sortBy) {
      case 'recent':
        // Assumiamo che ci sia un campo createdAt
        filtered.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
        break;
      case 'price_asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'sqm_asc':
        filtered.sort((a, b) => a.details.sqm - b.details.sqm);
        break;
      case 'sqm_desc':
        filtered.sort((a, b) => b.details.sqm - a.details.sqm);
        break;
    }

    return filtered;
  }, [properties, filters, sortBy]);

  const selectStyle = {
    padding: '11px 35px 11px 14px',
    borderRadius: '8px',
    border: '1px solid rgba(209, 213, 219, 0.3)',
    background: 'rgba(249, 250, 251, 0.05)',
    color: '#ffffff',
    fontSize: '0.9rem',
    cursor: 'pointer',
    outline: 'none',
    appearance: 'none' as const,
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%239ca3af' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
    minWidth: '140px'
  };

  const rangeStyle = {
    width: '100%',
    height: '6px',
    borderRadius: '3px',
    background: 'rgba(209, 213, 219, 0.3)',
    outline: 'none',
    WebkitAppearance: 'none' as const,
    appearance: 'none' as const
  };

  return (
    <section id="properties" className="properties fade-in">
      {/* BARRA FILTRI ORIZZONTALE */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(10px)',
        padding: '20px 24px',
        marginBottom: '32px',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          flexWrap: 'wrap'
        }}>
          {/* Contratto */}
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '6px', 
              fontSize: '0.8rem',
              color: 'rgba(255, 255, 255, 0.6)',
              fontWeight: '500'
            }}>
              Contratto
            </label>
            <select
              style={selectStyle}
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            >
              <option value="all">Tutti</option>
              <option value="sale">Vendita</option>
              <option value="rent">Affitto</option>
            </select>
          </div>

          {/* Tipologia */}
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '6px', 
              fontSize: '0.8rem',
              color: 'rgba(255, 255, 255, 0.6)',
              fontWeight: '500'
            }}>
              Tipologia
            </label>
            <select
              style={selectStyle}
              value={filters.propertyType}
              onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
            >
              <option value="all">Tutti</option>
              <option value="apartment">Appartamento</option>
              <option value="villa">Villa</option>
              <option value="house">Casa indipendente</option>
              <option value="rustico">Rustico/Casale</option>
              <option value="attico">Attico</option>
              <option value="loft">Loft</option>
            </select>
          </div>

          {/* Prezzo - Slider */}
          <div style={{ flex: '1', minWidth: '280px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '6px', 
              fontSize: '0.8rem',
              color: 'rgba(255, 255, 255, 0.6)',
              fontWeight: '500'
            }}>
              Prezzo
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginBottom: '8px',
                fontSize: '0.85rem',
                color: 'rgba(255, 255, 255, 0.8)'
              }}>
                <span>{formatPrice(filters.priceMin)}</span>
                <span>{formatPrice(filters.priceMax)}</span>
              </div>
              <div style={{ position: 'relative', height: '6px' }}>
                <input
                  type="range"
                  min="0"
                  max="1000000"
                  step="10000"
                  value={filters.priceMin}
                  onChange={(e) => setFilters({ ...filters, priceMin: parseInt(e.target.value) })}
                  style={{
                    ...rangeStyle,
                    position: 'absolute',
                    pointerEvents: 'none',
                    zIndex: 3
                  }}
                />
                <input
                  type="range"
                  min="0"
                  max="1000000"
                  step="10000"
                  value={filters.priceMax}
                  onChange={(e) => setFilters({ ...filters, priceMax: parseInt(e.target.value) })}
                  style={{
                    ...rangeStyle,
                    position: 'absolute',
                    zIndex: 4
                  }}
                />
                {/* Barra riempimento */}
                <div style={{
                  position: 'absolute',
                  height: '6px',
                  background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
                  borderRadius: '3px',
                  left: `${(filters.priceMin / 1000000) * 100}%`,
                  right: `${100 - (filters.priceMax / 1000000) * 100}%`,
                  zIndex: 2
                }}></div>
              </div>
            </div>
          </div>

          {/* Superficie - Slider */}
          <div style={{ flex: '1', minWidth: '280px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '6px', 
              fontSize: '0.8rem',
              color: 'rgba(255, 255, 255, 0.6)',
              fontWeight: '500'
            }}>
              Superficie
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginBottom: '8px',
                fontSize: '0.85rem',
                color: 'rgba(255, 255, 255, 0.8)'
              }}>
                <span>{filters.sqmMin} m²</span>
                <span>{filters.sqmMax} m²</span>
              </div>
              <div style={{ position: 'relative', height: '6px' }}>
                <input
                  type="range"
                  min="20"
                  max="500"
                  step="5"
                  value={filters.sqmMin}
                  onChange={(e) => setFilters({ ...filters, sqmMin: parseInt(e.target.value) })}
                  style={{
                    ...rangeStyle,
                    position: 'absolute',
                    pointerEvents: 'none',
                    zIndex: 3
                  }}
                />
                <input
                  type="range"
                  min="20"
                  max="500"
                  step="5"
                  value={filters.sqmMax}
                  onChange={(e) => setFilters({ ...filters, sqmMax: parseInt(e.target.value) })}
                  style={{
                    ...rangeStyle,
                    position: 'absolute',
                    zIndex: 4
                  }}
                />
                {/* Barra riempimento */}
                <div style={{
                  position: 'absolute',
                  height: '6px',
                  background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
                  borderRadius: '3px',
                  left: `${((filters.sqmMin - 20) / 480) * 100}%`,
                  right: `${100 - ((filters.sqmMax - 20) / 480) * 100}%`,
                  zIndex: 2
                }}></div>
              </div>
            </div>
          </div>

          {/* Pulsante CERCA */}
          <button
            style={{
              padding: '12px 32px',
              borderRadius: '8px',
              border: 'none',
              background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
              color: 'white',
              fontSize: '0.95rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)',
              marginTop: '20px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(5, 150, 105, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(5, 150, 105, 0.3)';
            }}
          >
            CERCA
          </button>
        </div>
      </div>

      {/* HEADER CON TITOLO E ORDINAMENTO */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h2 style={{ 
            fontSize: '1.8rem', 
            fontWeight: '700',
            marginBottom: '8px',
            color: '#ffffff'
          }}>
            {title}
          </h2>
          <p style={{ 
            fontSize: '1rem',
            color: 'rgba(255, 255, 255, 0.7)'
          }}>
            {subtitle}
          </p>
        </div>

        {/* Ordinamento */}
        <div>
          <select
            style={{
              ...selectStyle,
              minWidth: '180px'
            }}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="recent">Più recenti</option>
            <option value="price_asc">Prezzo crescente</option>
            <option value="price_desc">Prezzo decrescente</option>
            <option value="sqm_asc">Superficie crescente</option>
            <option value="sqm_desc">Superficie decrescente</option>
          </select>
        </div>
      </div>

      {/* GRIGLIA IMMOBILI */}
      <div className="properties__grid">
        {filteredProperties.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            width: '100%', 
            padding: '60px 24px',
            animation: 'fadeIn 0.6s ease-out'
          }}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1.5" style={{ margin: '0 auto 16px' }}>
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <p style={{ 
              fontSize: '1.1rem', 
              color: 'rgba(255, 255, 255, 0.7)',
              marginBottom: '8px'
            }}>
              Nessun immobile trovato
            </p>
            <p style={{ 
              fontSize: '0.9rem', 
              color: 'rgba(255, 255, 255, 0.5)'
            }}>
              Prova a modificare i filtri di ricerca
            </p>
          </div>
        )}

        {filteredProperties.map((property, index) => {
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
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                background: 'rgba(15, 23, 42, 0.6)',
                boxShadow: hoveredCard === property.id 
                  ? '0 12px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(16, 185, 129, 0.2)' 
                  : '0 4px 20px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: hoveredCard === property.id ? 'translateY(-4px)' : 'translateY(0)'
              }}
              onMouseEnter={() => setHoveredCard(property.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => navigate(`/immobile/${property.id}`)}
            >
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <div
                  className="property-card__image"
                  style={{ 
                    backgroundImage: `url('${imageUrl}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '220px',
                    transform: hoveredCard === property.id ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 0.6s ease'
                  }}
                >
                </div>

                {/* Badge Prezzo */}
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                  color: 'white',
                  padding: '8px 16px',
                  fontSize: '1rem',
                  fontWeight: '700',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
                  zIndex: 5
                }}>
                  {formatPrice(property.price)}
                </div>

                {/* Badge Tipo */}
                {property.features?.virtualTour && (
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: 'rgba(239, 68, 68, 0.95)',
                    color: 'white',
                    padding: '6px 12px',
                    fontSize: '0.7rem',
                    fontWeight: '700',
                    borderRadius: '6px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    zIndex: 5
                  }}>
                    Virtual Tour
                  </div>
                )}
              </div>

              <div style={{ padding: '20px' }}>
                <h3 style={{ 
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#ffffff'
                }}>
                  {property.title}
                </h3>

                <p style={{
                  fontSize: '0.85rem',
                  color: 'rgba(255, 255, 255, 0.6)',
                  marginBottom: '16px'
                }}>
                  {property.location.city}, {property.location.address}
                </p>

                <div style={{ 
                  display: 'flex', 
                  gap: '20px',
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <span style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '6px',
                    fontSize: '0.85rem',
                    color: 'rgba(255, 255, 255, 0.7)'
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="7" height="7"></rect>
                      <rect x="14" y="3" width="7" height="7"></rect>
                      <rect x="14" y="14" width="7" height="7"></rect>
                      <rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
                    {property.details.rooms} locali
                  </span>

                  <span style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '6px',
                    fontSize: '0.85rem',
                    color: 'rgba(255, 255, 255, 0.7)'
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    </svg>
                    {property.details.sqm} m²
                  </span>

                  {property.details.bathrooms && (
                    <span style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '6px',
                      fontSize: '0.85rem',
                      color: 'rgba(255, 255, 255, 0.7)'
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"></path>
                        <line x1="10" x2="8" y1="5" y2="7"></line>
                        <line x1="2" x2="22" y1="12" y2="12"></line>
                        <line x1="7" x2="7" y1="19" y2="21"></line>
                        <line x1="17" x2="17" y1="19" y2="21"></line>
                      </svg>
                      {property.details.bathrooms} bagni
                    </span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* CSS per slider e select */}
      <style>{`
        select option {
          background: #1e293b;
          color: #ffffff;
          padding: 8px;
        }
        
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
          cursor: pointer;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(16, 185, 129, 0.4);
          pointer-events: all;
          position: relative;
          z-index: 100;
        }

        input[type="range"]::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(16, 185, 129, 0.4);
          border: none;
          pointer-events: all;
        }

        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.6);
        }
      `}</style>
    </section>
  );
}