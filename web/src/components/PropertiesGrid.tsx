import { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Property } from '../services/api';

interface PropertiesGridProps {
  properties: Property[];
  title?: string;
  subtitle?: string;
  branch?: 'paesana' | 'torino' | 'all';
}

export function PropertiesGrid({ properties, title = "Le nostre proposte", subtitle = "Scopri tutti gli immobili disponibili" }: PropertiesGridProps) {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  // STATO FILTRI
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [sortBy, setSortBy] = useState('recent');
  const [isMobileCarousel, setIsMobileCarousel] = useState(false);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobileCarousel(window.innerWidth <= 900);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calcola prezzo massimo dinamicamente
  const absoluteMaxPrice = useMemo(() => {
    if (properties.length === 0) return 1000000;
    const max = Math.max(...properties.map(p => p.price));
    return Math.ceil(max / 100000) * 100000;
  }, [properties]);

  const [filters, setFilters] = useState({
    type: 'all',
    propertyType: 'all',
    priceMin: 0,
    priceMax: absoluteMaxPrice,
    sqmMin: 20,
    sqmMax: 500
  });

  // Aggiorna priceMax quando cambiano le properties
  useMemo(() => {
    if (filters.priceMax < absoluteMaxPrice) {
      setFilters(prev => ({ ...prev, priceMax: absoluteMaxPrice }));
    }
  }, [absoluteMaxPrice, filters.priceMax]);

  // LOGICA FILTRAGGIO
  const filteredProperties = useMemo(() => {
    let result = properties.filter(property => {
      if (filters.type !== 'all' && property.type !== filters.type) return false;
      if (filters.propertyType !== 'all' && property.propertyType !== filters.propertyType) return false;
      if (property.price < filters.priceMin || property.price > filters.priceMax) return false;
      if (property.details.sqm < filters.sqmMin || property.details.sqm > filters.sqmMax) return false;
      return true;
    });

    // Ordinamento
    switch (sortBy) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'sqm_asc':
        result.sort((a, b) => a.details.sqm - b.details.sqm);
        break;
      case 'sqm_desc':
        result.sort((a, b) => b.details.sqm - a.details.sqm);
        break;
      default:
        // recent - nessun ordinamento, mantiene ordine originale
        break;
    }

    return result;
  }, [properties, filters, sortBy]);

  const formatPrice = (price: number) => {
    return `€ ${price.toLocaleString('it-IT')}`;
  };

  const resetFilters = () => {
    setFilters({
      type: 'all',
      propertyType: 'all',
      priceMin: 0,
      priceMax: absoluteMaxPrice,
      sqmMin: 20,
      sqmMax: 500
    });
    setSortBy('recent');
  };

  const scrollCards = (direction: 'left' | 'right') => {
    if (!cardsRef.current) return;
    const firstCard = cardsRef.current.querySelector('.property-card') as HTMLElement | null;
    const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : 300;
    const gap = 16;
    const delta = (cardWidth + gap) * (direction === 'left' ? -1 : 1);
    cardsRef.current.scrollBy({ left: delta, behavior: 'smooth' });
  };

  return (
    <section id="properties" className="properties fade-in" style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 24px' }}>
      {/* HEADER CON TITOLO E CONTEGGIO */}
      <div style={{ marginBottom: '32px', textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '2rem', 
          fontWeight: '800', 
          color: '#0f172a',
          marginBottom: '8px',
          letterSpacing: '-0.5px'
        }}>
          {title}
        </h2>
        <p style={{ fontSize: '1rem', color: '#64748b', fontWeight: '500' }}>
          {subtitle} • <strong style={{ color: '#0066ff' }}>{filteredProperties.length}</strong> risultati trovati
        </p>
      </div>

      {/* BARRA FILTRI MODERNA E PROFESSIONALE */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        marginBottom: '40px',
        borderRadius: '16px',
        border: '1px solid rgba(0, 102, 255, 0.2)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
        overflow: 'hidden'
      }}>
        {/* Header collassabile */}
        <div
          onClick={() => setFiltersOpen(!filtersOpen)}
          style={{
            padding: '24px 32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            userSelect: 'none',
            borderBottom: filtersOpen ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
            transition: 'all 0.3s ease',
            background: filtersOpen ? 'rgba(0, 0, 0, 0.2)' : 'transparent'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="2.5">
              <line x1="4" y1="21" x2="4" y2="14"></line>
              <line x1="4" y1="10" x2="4" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12" y2="3"></line>
              <line x1="20" y1="21" x2="20" y2="16"></line>
              <line x1="20" y1="12" x2="20" y2="3"></line>
              <line x1="1" y1="14" x2="7" y2="14"></line>
              <line x1="9" y1="8" x2="15" y2="8"></line>
              <line x1="17" y1="16" x2="23" y2="16"></line>
            </svg>
            <h3 style={{
              fontSize: '1.1rem',
              fontWeight: '700',
              color: '#ffffff',
              margin: 0,
              letterSpacing: '0.3px'
            }}>
              Filtri di Ricerca Avanzati
            </h3>
          </div>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0066ff"
            strokeWidth="2.5"
            style={{
              transform: filtersOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease'
            }}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>

        {/* Contenuto filtri collassabile */}
        <div
          style={{
            maxHeight: filtersOpen ? '1500px' : '0',
            opacity: filtersOpen ? 1 : 0,
            transition: 'all 0.4s ease',
            overflow: 'hidden'
          }}
        >
          <div style={{ padding: '32px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px',
              marginBottom: '28px'
            }}>
              {/* Contratto */}
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '10px', 
                  fontSize: '0.85rem',
                  color: '#ffffff',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px'
                }}>
                  Tipo Contratto
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '10px',
                    border: '2px solid rgba(0, 102, 255, 0.3)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    fontSize: '16px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    minHeight: '48px',
                    WebkitAppearance: 'none',
                    appearance: 'none'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#0066ff';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0, 102, 255, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0, 102, 255, 0.3)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                  }}
                >
                  <option value="all" style={{ background: '#1e293b', color: '#ffffff' }}>Tutti i Contratti</option>
                  <option value="sale" style={{ background: '#1e293b', color: '#ffffff' }}>Vendita</option>
                  <option value="rent" style={{ background: '#1e293b', color: '#ffffff' }}>Affitto</option>
                </select>
              </div>

              {/* Tipologia */}
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '10px', 
                  fontSize: '0.85rem',
                  color: '#ffffff',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px'
                }}>
                  Tipologia Immobile
                </label>
                <select
                  value={filters.propertyType}
                  onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '10px',
                    border: '2px solid rgba(0, 102, 255, 0.3)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    fontSize: '16px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    minHeight: '48px',
                    WebkitAppearance: 'none',
                    appearance: 'none'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#0066ff';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0, 102, 255, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0, 102, 255, 0.3)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                  }}
                >
                  <option value="all" style={{ background: '#1e293b', color: '#ffffff' }}>Tutte le Tipologie</option>
                  <option value="apartment" style={{ background: '#1e293b', color: '#ffffff' }}>Appartamento</option>
                  <option value="villa" style={{ background: '#1e293b', color: '#ffffff' }}>Villa</option>
                  <option value="house" style={{ background: '#1e293b', color: '#ffffff' }}>Casa Indipendente</option>
                  <option value="rustico" style={{ background: '#1e293b', color: '#ffffff' }}>Rustico/Casale</option>
                  <option value="attico" style={{ background: '#1e293b', color: '#ffffff' }}>Attico</option>
                  <option value="loft" style={{ background: '#1e293b', color: '#ffffff' }}>Loft</option>
                </select>
              </div>

              {/* Ordinamento */}
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '10px', 
                  fontSize: '0.85rem',
                  color: '#ffffff',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px'
                }}>
                  Ordina Per
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '10px',
                    border: '2px solid rgba(0, 102, 255, 0.3)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    fontSize: '16px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    minHeight: '48px',
                    WebkitAppearance: 'none',
                    appearance: 'none'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#0066ff';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0, 102, 255, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0, 102, 255, 0.3)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                  }}
                >
                  <option value="recent" style={{ background: '#1e293b', color: '#ffffff' }}>Più Recenti</option>
                  <option value="price_asc" style={{ background: '#1e293b', color: '#ffffff' }}>Prezzo Crescente</option>
                  <option value="price_desc" style={{ background: '#1e293b', color: '#ffffff' }}>Prezzo Decrescente</option>
                  <option value="sqm_asc" style={{ background: '#1e293b', color: '#ffffff' }}>Superficie Crescente</option>
                  <option value="sqm_desc" style={{ background: '#1e293b', color: '#ffffff' }}>Superficie Decrescente</option>
                </select>
              </div>
            </div>

            {/* RANGE SLIDERS PREZZO E SUPERFICIE */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '32px',
              marginBottom: '24px'
            }}>
              {/* Prezzo Range */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '24px',
                borderRadius: '12px',
                border: '1px solid rgba(0, 102, 255, 0.2)'
              }}>
                <label style={{
                  display: 'block',
                  marginBottom: '16px',
                  fontSize: '0.85rem',
                  color: '#ffffff',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px'
                }}>
                  Range di Prezzo
                </label>

                <div style={{ marginBottom: '20px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '12px',
                    fontSize: '0.9rem'
                  }}>
                    <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Minimo</span>
                    <span style={{ color: '#0066ff', fontWeight: '700' }}>
                      {formatPrice(filters.priceMin)}
                    </span>
                  </div>
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
                      width: '100%',
                      height: '8px',
                      borderRadius: '4px',
                      outline: 'none',
                      background: 'linear-gradient(to right, #0066ff, rgba(255, 255, 255, 0.2))',
                      WebkitAppearance: 'none',
                      appearance: 'none',
                      cursor: 'pointer'
                    }}
                  />
                </div>

                <div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '12px',
                    fontSize: '0.9rem'
                  }}>
                    <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Massimo</span>
                    <span style={{ color: '#0066ff', fontWeight: '700' }}>
                      {formatPrice(filters.priceMax)}
                    </span>
                  </div>
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
                      width: '100%',
                      height: '8px',
                      borderRadius: '4px',
                      outline: 'none',
                      background: 'linear-gradient(to right, #0066ff, rgba(255, 255, 255, 0.2))',
                      WebkitAppearance: 'none',
                      appearance: 'none',
                      cursor: 'pointer'
                    }}
                  />
                </div>
              </div>

              {/* Superficie Range */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '24px',
                borderRadius: '12px',
                border: '1px solid rgba(0, 102, 255, 0.2)'
              }}>
                <label style={{
                  display: 'block',
                  marginBottom: '16px',
                  fontSize: '0.85rem',
                  color: '#ffffff',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px'
                }}>
                  Range Superficie (m²)
                </label>

                <div style={{ marginBottom: '20px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '12px',
                    fontSize: '0.9rem'
                  }}>
                    <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Minima</span>
                    <span style={{ color: '#0066ff', fontWeight: '700' }}>
                      {filters.sqmMin} m²
                    </span>
                  </div>
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
                      width: '100%',
                      height: '8px',
                      borderRadius: '4px',
                      outline: 'none',
                      background: 'linear-gradient(to right, #0066ff, rgba(255, 255, 255, 0.2))',
                      WebkitAppearance: 'none',
                      appearance: 'none',
                      cursor: 'pointer'
                    }}
                  />
                </div>

                <div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '12px',
                    fontSize: '0.9rem'
                  }}>
                    <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Massima</span>
                    <span style={{ color: '#0066ff', fontWeight: '700' }}>
                      {filters.sqmMax} m²
                    </span>
                  </div>
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
                      width: '100%',
                      height: '8px',
                      borderRadius: '4px',
                      outline: 'none',
                      background: 'linear-gradient(to right, #0066ff, rgba(255, 255, 255, 0.2))',
                      WebkitAppearance: 'none',
                      appearance: 'none',
                      cursor: 'pointer'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Bottone Reset */}
            <div style={{ textAlign: 'center' }}>
              <button
                onClick={resetFilters}
                style={{
                  padding: '14px 32px',
                  background: 'linear-gradient(135deg, #0066ff 0%, #0052cc 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '0.95rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(0, 102, 255, 0.3)',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 102, 255, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 102, 255, 0.3)';
                }}
              >
                Resetta Tutti i Filtri
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* GRIGLIA PROPRIETÀ */}
      {filteredProperties.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '80px 24px',
          background: 'rgba(0, 102, 255, 0.05)',
          borderRadius: '16px',
          border: '2px dashed rgba(0, 102, 255, 0.2)'
        }}>
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(0, 102, 255, 0.3)"
            strokeWidth="2"
            style={{ margin: '0 auto 24px' }}
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0f172a', marginBottom: '12px' }}>
            Nessun risultato trovato
          </h3>
          <p style={{ color: '#64748b', marginBottom: '24px' }}>
            Prova a modificare i filtri di ricerca
          </p>
          <button
            onClick={resetFilters}
            style={{
              padding: '12px 28px',
              background: '#0066ff',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Resetta Filtri
          </button>
        </div>
      ) : (
        <div className="property-carousel" style={{ position: 'relative' }}>
          {isMobileCarousel && (
            <>
              <button
                className="scroll-btn scroll-btn-left"
                aria-label="Scorri a sinistra"
                onClick={() => scrollCards('left')}
              >
                ‹
              </button>
              <button
                className="scroll-btn scroll-btn-right"
                aria-label="Scorri a destra"
                onClick={() => scrollCards('right')}
              >
                ›
              </button>
            </>
          )}

          <div 
            ref={cardsRef}
            className={`property-cards-container ${isMobileCarousel ? 'mobile-scroll' : ''}`}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '32px',
              scrollBehavior: 'smooth'
            }}
          >
          {filteredProperties.map((property) => {
            const imageUrl = property.images && property.images.length > 0
              ? property.images[0]
              : 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800';

            return (
              <article
                key={property.id}
                className="property-card"
                style={{
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  background: '#ffffff',
                  boxShadow: hoveredCard === property.id
                    ? '0 12px 40px rgba(0, 102, 255, 0.2)'
                    : '0 4px 20px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: hoveredCard === property.id ? 'translateY(-4px)' : 'translateY(0)'
                }}
                onMouseEnter={() => setHoveredCard(property.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => {
                  navigate(`/immobile/${property.id}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <div
                    style={{
                      backgroundImage: `url('${imageUrl}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      height: '220px',
                      transform: hoveredCard === property.id ? 'scale(1.05)' : 'scale(1)',
                      transition: 'transform 0.6s ease'
                    }}
                  />

                  {/* Badge Prezzo */}
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    background: 'linear-gradient(135deg, #0066ff 0%, #0052cc 100%)',
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

                  {/* Badge Virtual Tour */}
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
                    color: '#0f172a'
                  }}>
                    {property.title}
                  </h3>

                  <p style={{
                    fontSize: '0.85rem',
                    color: '#64748b',
                    marginBottom: '16px'
                  }}>
                    {property.location.city}, {property.location.address}
                  </p>

                  <div style={{
                    display: 'flex',
                    gap: '20px',
                    paddingTop: '16px',
                    borderTop: '1px solid #e2e8f0'
                  }}>
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.85rem',
                      color: '#64748b'
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
                      color: '#64748b'
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
                        color: '#64748b'
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
        </div>
      )}

      {/* CSS MOBILE OTTIMIZZATO */}
      <style>{`
        /* Filtri compatti su mobile */
        @media (max-width: 768px) {
          section[id="properties"] > div:first-child > div:first-child {
            padding: 20px 20px !important;
          }

          section[id="properties"] > div:first-child > div:first-child > div > div {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
            margin-bottom: 20px !important;
          }

          section[id="properties"] > div:first-child > div:first-child > div > div:last-of-type {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }

          section[id="properties"] select {
            font-size: 15px !important;
            padding: 12px 14px !important;
            min-height: 44px !important;
          }

          section[id="properties"] label {
            font-size: 0.8rem !important;
            margin-bottom: 8px !important;
          }

          section[id="properties"] input[type="range"] {
            height: 6px !important;
          }

          section[id="properties"] button {
            padding: 12px 24px !important;
            font-size: 0.9rem !important;
          }
        }

        @media (max-width: 480px) {
          section[id="properties"] > div:first-child {
            padding: 16px 16px !important;
          }

          section[id="properties"] > div:first-child > div:first-child {
            padding: 16px 16px !important;
          }

          section[id="properties"] > div:first-child > div:first-child > div > div {
            gap: 14px !important;
          }

          section[id="properties"] select {
            font-size: 14px !important;
            padding: 10px 12px !important;
          }

          section[id="properties"] label {
            font-size: 0.75rem !important;
          }

          section[id="properties"] h2 {
            font-size: 1.6rem !important;
          }

          section[id="properties"] > div:first-child > p {
            font-size: 0.9rem !important;
          }
        }

        /* Slider touch-friendly */
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
          cursor: pointer;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #0066ff;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 102, 255, 0.4);
          border: 2px solid #ffffff;
        }

        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #0066ff;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 102, 255, 0.4);
          border: 2px solid #ffffff;
        }

        input[type="range"]::-webkit-slider-runnable-track {
          width: 100%;
          height: 8px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }

        input[type="range"]::-moz-range-track {
          width: 100%;
          height: 8px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }

        /* Touch device ottimizzazioni */
        @media (hover: none) and (pointer: coarse) {
          section[id="properties"] select:hover {
            background: rgba(255, 255, 255, 0.1) !important;
          }

          section[id="properties"] button:hover {
            transform: none !important;
          }

          section[id="properties"] button:active {
            transform: scale(0.98) !important;
            opacity: 0.9;
          }
        }

      `}</style>
      <style>{`
        @media (max-width: 900px) {
          .property-cards-container.mobile-scroll {
            display: flex !important;
            overflow-x: auto;
            gap: 16px;
            padding: 8px 6px 4px;
            scroll-snap-type: x mandatory;
          }

          .property-cards-container.mobile-scroll .property-card {
            flex: 0 0 78vw;
            max-width: 320px;
            min-width: 260px;
            scroll-snap-align: start;
          }

          .property-carousel .scroll-btn {
            position: absolute;
            top: 42%;
            transform: translateY(-50%);
            width: 46px;
            height: 46px;
            border-radius: 14px;
            border: 1px solid rgba(0, 102, 255, 0.25);
            background: linear-gradient(135deg, #ffffff, #f5f8ff);
            box-shadow: 0 12px 28px rgba(0, 102, 255, 0.18);
            color: #0052c8;
            font-size: 24px;
            font-weight: 700;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 5;
            backdrop-filter: blur(6px);
          }

          .property-carousel .scroll-btn-left { left: -4px; }
          .property-carousel .scroll-btn-right { right: -4px; }

          .property-cards-container.mobile-scroll::-webkit-scrollbar {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
