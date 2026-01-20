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
  const [filtersOpen, setFiltersOpen] = useState(true);
  const navigate = useNavigate();

  // Calcola il prezzo massimo SOLO UNA VOLTA dalle proprietà originali
  const absoluteMaxPrice = useMemo(() => {
    if (properties.length === 0) return 1000000;
    return Math.max(...properties.map(p => p.price));
  }, [properties]);

  // Stati per i filtri
  const [filters, setFilters] = useState({
    type: 'all',
    propertyType: 'all',
    priceMin: 0,
    priceMax: absoluteMaxPrice,
    sqmMin: 20,
    sqmMax: 500
  });

  // Ordinamento
  const [sortBy, setSortBy] = useState('recent');

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
      if (filters.propertyType !== 'all') {
        const propType = property.propertyType || property.category;
        if (propType !== filters.propertyType) return false;
      }
      if (property.price < filters.priceMin || property.price > filters.priceMax) return false;
      if (property.details.sqm < filters.sqmMin || property.details.sqm > filters.sqmMax) return false;
      return true;
    });

    // Ordina
    switch (sortBy) {
      case 'recent':
        filtered.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
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

  const handleResetFilters = () => {
    setFilters({
      type: 'all',
      propertyType: 'all',
      priceMin: 0,
      priceMax: absoluteMaxPrice,
      sqmMin: 20,
      sqmMax: 500
    });
  };

  return (
    <section id="properties" className="properties fade-in">
      {/* BARRA FILTRI MODERNA CON COLLAPSIBILE */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.9) 100%)',
        backdropFilter: 'blur(20px)',
        marginBottom: '40px',
        borderRadius: '16px',
        border: '2px solid rgba(16, 185, 129, 0.4)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(148, 163, 184, 0.1), 0 0 20px rgba(16, 185, 129, 0.15)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease'
      }}>
        {/* Background gradient animato */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.08) 0%, transparent 50%)',
          pointerEvents: 'none'
        }}></div>

        {/* Header collassabile */}
        <div
          onClick={() => setFiltersOpen(!filtersOpen)}
          style={{
            position: 'relative',
            zIndex: 2,
            padding: '20px 28px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            userSelect: 'none',
            borderBottom: filtersOpen ? '1px solid rgba(16, 185, 129, 0.3)' : 'none',
            transition: 'all 0.3s ease'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              boxShadow: '0 0 12px rgba(16, 185, 129, 0.6)'
            }}></div>
            <h3 style={{
              fontSize: '1.1rem',
              fontWeight: '700',
              color: '#ffffff',
              margin: 0,
              letterSpacing: '0.5px'
            }}>
              Filtri di Ricerca
            </h3>
          </div>
          <div style={{
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.3s ease'
          }}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(16, 185, 129, 0.8)"
              strokeWidth="2.5"
              style={{
                transform: filtersOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
                transition: 'transform 0.3s ease'
              }}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>

        {/* Contenuto filtri collassabile */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            overflow: 'hidden',
            maxHeight: filtersOpen ? '1200px' : '0',
            opacity: filtersOpen ? 1 : 0,
            transition: 'all 0.4s ease',
            paddingLeft: filtersOpen ? '28px' : '0',
            paddingRight: filtersOpen ? '28px' : '0',
            paddingTop: filtersOpen ? '28px' : '0',
            paddingBottom: filtersOpen ? '28px' : '0'
          }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '28px',
            marginBottom: '28px'
          }}>
            {/* Contratto */}
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '12px', 
                fontSize: '0.9rem',
                color: '#ffffff',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.7px'
              }}>
                Contratto
              </label>
              <select
                style={{
                  width: '100%',
                  padding: '13px 16px',
                  borderRadius: '10px',
                  border: '2px solid rgba(16, 185, 129, 0.3)',
                  background: 'rgba(30, 41, 59, 0.7)',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                  fontWeight: '500'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.7)';
                  e.currentTarget.style.background = 'rgba(30, 41, 59, 0.9)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.3)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.3)';
                  e.currentTarget.style.background = 'rgba(30, 41, 59, 0.7)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
                }}
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              >
                <option value="all">Tutti i contratti</option>
                <option value="sale">Vendita</option>
                <option value="rent">Affitto</option>
              </select>
            </div>

            {/* Tipologia */}
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '12px', 
                fontSize: '0.9rem',
                color: '#ffffff',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.7px'
              }}>
                Tipologia
              </label>
              <select
                style={{
                  width: '100%',
                  padding: '13px 16px',
                  borderRadius: '10px',
                  border: '2px solid rgba(16, 185, 129, 0.3)',
                  background: 'rgba(30, 41, 59, 0.7)',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                  fontWeight: '500'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.7)';
                  e.currentTarget.style.background = 'rgba(30, 41, 59, 0.9)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.3)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.3)';
                  e.currentTarget.style.background = 'rgba(30, 41, 59, 0.7)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
                }}
                value={filters.propertyType}
                onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
              >
                <option value="all">Tutte le tipologie</option>
                <option value="apartment">Appartamento</option>
                <option value="villa">Villa</option>
                <option value="house">Casa indipendente</option>
                <option value="rustico">Rustico/Casale</option>
                <option value="attico">Attico</option>
                <option value="loft">Loft</option>
              </select>
            </div>

            {/* Prezzo */}
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '12px', 
                fontSize: '0.9rem',
                color: '#ffffff',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.7px'
              }}>
                Prezzo
              </label>
              <div style={{
                background: 'rgba(30, 41, 59, 0.7)',
                padding: '18px',
                borderRadius: '10px',
                border: '2px solid rgba(16, 185, 129, 0.3)'
              }}>
                <div style={{ marginBottom: '20px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '10px',
                    fontSize: '0.8rem',
                    color: 'rgba(255, 255, 255, 0.8)'
                  }}>
                    <span style={{ fontWeight: '600' }}>Minimo</span>
                    <span style={{ color: '#10b981', fontWeight: '700', fontSize: '0.9rem' }}>
                      {formatPrice(filters.priceMin)}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input
                      type="range"
                      min="0"
                      max={absoluteMaxPrice}
                      step="10000"
                      value={filters.priceMin}
                      onChange={(e) => {
                        const newMin = parseInt(e.target.value);
                        if (newMin <= filters.priceMax) {
                          setFilters({ ...filters, priceMin: newMin });
                        }
                      }}
                      style={{
                        flex: 1,
                        height: '6px',
                        borderRadius: '3px',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '10px',
                    fontSize: '0.8rem',
                    color: 'rgba(255, 255, 255, 0.8)'
                  }}>
                    <span style={{ fontWeight: '600' }}>Massimo</span>
                    <span style={{ color: '#10b981', fontWeight: '700', fontSize: '0.9rem' }}>
                      {formatPrice(filters.priceMax)}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input
                      type="range"
                      min="0"
                      max={absoluteMaxPrice}
                      step="10000"
                      value={filters.priceMax}
                      onChange={(e) => {
                        const newMax = parseInt(e.target.value);
                        if (newMax >= filters.priceMin) {
                          setFilters({ ...filters, priceMax: newMax });
                        }
                      }}
                      style={{
                        flex: 1,
                        height: '6px',
                        borderRadius: '3px',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Superficie */}
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '12px', 
                fontSize: '0.9rem',
                color: '#ffffff',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.7px'
              }}>
                Superficie
              </label>
              <div style={{
                background: 'rgba(30, 41, 59, 0.7)',
                padding: '18px',
                borderRadius: '10px',
                border: '2px solid rgba(16, 185, 129, 0.3)'
              }}>
                <div style={{ marginBottom: '20px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '10px',
                    fontSize: '0.8rem',
                    color: 'rgba(255, 255, 255, 0.8)'
                  }}>
                    <span style={{ fontWeight: '600' }}>Minima</span>
                    <span style={{ color: '#10b981', fontWeight: '700', fontSize: '0.9rem' }}>
                      {filters.sqmMin} m²
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input
                      type="range"
                      min="20"
                      max="500"
                      step="5"
                      value={filters.sqmMin}
                      onChange={(e) => {
                        const newMin = parseInt(e.target.value);
                        if (newMin <= filters.sqmMax) {
                          setFilters({ ...filters, sqmMin: newMin });
                        }
                      }}
                      style={{
                        flex: 1,
                        height: '6px',
                        borderRadius: '3px',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '10px',
                    fontSize: '0.8rem',
                    color: 'rgba(255, 255, 255, 0.8)'
                  }}>
                    <span style={{ fontWeight: '600' }}>Massima</span>
                    <span style={{ color: '#10b981', fontWeight: '700', fontSize: '0.9rem' }}>
                      {filters.sqmMax} m²
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input
                      type="range"
                      min="20"
                      max="500"
                      step="5"
                      value={filters.sqmMax}
                      onChange={(e) => {
                        const newMax = parseInt(e.target.value);
                        if (newMax >= filters.sqmMin) {
                          setFilters({ ...filters, sqmMax: newMax });
                        }
                      }}
                      style={{
                        flex: 1,
                        height: '6px',
                        borderRadius: '3px',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pulsanti CERCA E RIPRISTINA */}
          <div style={{ 
            display: 'flex', 
            gap: '16px', 
            justifyContent: 'center',
            paddingTop: '12px',
            borderTop: '1px solid rgba(16, 185, 129, 0.2)'
          }}>
            <button
              style={{
                padding: '14px 48px',
                borderRadius: '10px',
                border: 'none',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                fontSize: '1rem',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 20px rgba(16, 185, 129, 0.4)',
                textTransform: 'uppercase',
                letterSpacing: '0.9px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 28px rgba(16, 185, 129, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.4)';
              }}
            >
              Cerca Immobili
            </button>

            <button
              onClick={handleResetFilters}
              style={{
                padding: '14px 48px',
                borderRadius: '10px',
                border: '2px solid rgba(16, 185, 129, 0.5)',
                background: 'transparent',
                color: '#10b981',
                fontSize: '1rem',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                letterSpacing: '0.9px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.8)';
                e.currentTarget.style.color = '#10b981';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.5)';
                e.currentTarget.style.color = '#10b981';
              }}
            >
              Ripristina Filtri
            </button>
          </div>
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
              padding: '12px 16px',
              borderRadius: '10px',
              border: '2px solid rgba(16, 185, 129, 0.3)',
              background: 'rgba(30, 41, 59, 0.7)',
              color: '#ffffff',
              fontSize: '0.95rem',
              cursor: 'pointer',
              outline: 'none',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
              minWidth: '220px',
              fontWeight: '500'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.7)';
              e.currentTarget.style.background = 'rgba(30, 41, 59, 0.9)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.3)';
              e.currentTarget.style.background = 'rgba(30, 41, 59, 0.7)';
            }}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="recent">Più recenti</option>
            <option value="price_asc">Prezzo: crescente</option>
            <option value="price_desc">Prezzo: decrescente</option>
            <option value="sqm_asc">Superficie: crescente</option>
            <option value="sqm_desc">Superficie: decrescente</option>
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
          width: 100%;
          vertical-align: middle;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(16, 185, 129, 0.4);
          pointer-events: all;
          position: relative;
          z-index: 100;
          margin-top: -8px;
        }

        input[type="range"]::-moz-range-thumb {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(16, 185, 129, 0.4);
          border: none;
          pointer-events: all;
          margin-top: 0;
        }

        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.6);
        }

        input[type="range"]::-moz-range-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.6);
        }

        input[type="range"]::-webkit-slider-runnable-track {
          background: linear-gradient(90deg, rgba(16, 185, 129, 0.3) 0%, rgba(16, 185, 129, 0.1) 100%);
          height: 6px;
          border-radius: 3px;
        }

        input[type="range"]::-moz-range-track {
          background: transparent;
          border: none;
        }

        input[type="range"]::-moz-range-progress {
          background: linear-gradient(90deg, rgba(16, 185, 129, 0.3) 0%, rgba(16, 185, 129, 0.1) 100%);
          height: 6px;
          border-radius: 3px;
        }
      `}</style>
    </section>
  );
}