import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import type { Property } from '../services/api';

export function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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

  if (!property) {
    return (
      <>
        <Navbar />
        <main style={{ marginTop: '64px', minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', padding: '32px' }}>
            <div style={{
              width: '56px',
              height: '56px',
              border: '3px solid #e2e8f0',
              borderTopColor: '#0f172a',
              borderRadius: '50%',
              margin: '0 auto 24px',
              animation: 'spin 1s linear infinite'
            }} />
            <p style={{ color: '#64748b', fontSize: '1.05rem', fontWeight: '600' }}>
              Caricamento immobile...
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const isSold = (property as any).status === 'sold';

  return (
    <>
      <Navbar />
      
      <main style={{ marginTop: '64px', minHeight: 'calc(100vh - 64px)', background: '#f8fafc', paddingBottom: '64px' }}>
        
        {/* Header with Back Button */}
        <div style={{ borderBottom: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              onClick={() => navigate(-1)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                background: 'transparent',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                color: '#0f172a',
                fontSize: '0.95rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f1f5f9';
                e.currentTarget.style.borderColor = '#cbd5e1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = '#e2e8f0';
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              <span>Indietro</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 24px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }} className="property-detail-grid">
            
            {/* Gallery Section */}
            <div>
              {/* Main Image */}
              <div style={{ position: 'relative', marginBottom: '16px', borderRadius: '16px', overflow: 'hidden', aspectRatio: '4/3', background: '#e2e8f0' }}>
                <img 
                  src={property.images[selectedImageIndex]} 
                  alt={property.title} 
                  style={{ 
                    width: '100%', 
                    height: '100%',
                    objectFit: 'cover'
                  }} 
                />

                {/* Navigation Arrows */}
                {property.images.length > 1 && (
                  <>
                    {/* Left Arrow */}
                    <button
                      onClick={() => setSelectedImageIndex(prev => prev === 0 ? property.images.length - 1 : prev - 1)}
                      style={{
                        position: 'absolute',
                        left: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '44px',
                        height: '44px',
                        background: 'rgba(0, 0, 0, 0.5)',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '50%',
                        color: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s',
                        zIndex: 5,
                        backdropFilter: 'blur(10px)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(0, 0, 0, 0.8)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.6)';
                        e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(0, 0, 0, 0.5)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                        e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                      }}
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="15 18 9 12 15 6"></polyline>
                      </svg>
                    </button>

                    {/* Right Arrow */}
                    <button
                      onClick={() => setSelectedImageIndex(prev => prev === property.images.length - 1 ? 0 : prev + 1)}
                      style={{
                        position: 'absolute',
                        right: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '44px',
                        height: '44px',
                        background: 'rgba(0, 0, 0, 0.5)',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '50%',
                        color: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s',
                        zIndex: 5,
                        backdropFilter: 'blur(10px)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(0, 0, 0, 0.8)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.6)';
                        e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(0, 0, 0, 0.5)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                        e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                      }}
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </button>
                  </>
                )}
                
                {isSold && (
                  <>
                    {/* Overlay */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.95) 100%)',
                      backdropFilter: 'blur(2px)',
                      pointerEvents: 'none',
                      zIndex: 10
                    }} />
                    
                    {/* Badge */}
                    <div style={{
                      position: 'absolute',
                      top: '24px',
                      right: '24px',
                      background: 'linear-gradient(135deg, #991b1b 0%, #dc2626 100%)',
                      color: 'white',
                      padding: '12px 24px',
                      fontSize: '0.9rem',
                      fontWeight: '700',
                      letterSpacing: '1.5px',
                      borderRadius: '8px',
                      boxShadow: '0 8px 24px rgba(220, 38, 38, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.2)',
                      zIndex: 11,
                      textTransform: 'uppercase'
                    }}>
                      Venduto
                    </div>

                    {/* Message */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 11,
                      textAlign: 'center',
                      padding: '32px'
                    }}>
                      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" style={{ marginBottom: '16px', opacity: 0.8 }}>
                        <path d="M9 12l2 2 4-4m7 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <div style={{
                        color: 'rgba(255, 255, 255, 0.95)',
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        letterSpacing: '0.3px',
                        marginBottom: '6px'
                      }}>
                        Immobile Venduto
                      </div>
                      <div style={{
                        color: 'rgba(255, 255, 255, 0.75)',
                        fontSize: '0.95rem',
                        fontWeight: '400'
                      }}>
                        Questa proprietà non è più disponibile
                      </div>
                    </div>
                  </>
                )}

                {/* Image Counter */}
                {property.images.length > 1 && (
                  <div style={{
                    position: 'absolute',
                    bottom: '16px',
                    right: '16px',
                    background: 'rgba(0, 0, 0, 0.6)',
                    backdropFilter: 'blur(10px)',
                    color: 'white',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    zIndex: 5
                  }}>
                    {selectedImageIndex + 1} / {property.images.length}
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {property.images.length > 1 && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${Math.min(4, property.images.length)}, 1fr)`,
                  gap: '8px'
                }}>
                  {property.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImageIndex(i)}
                      style={{
                        width: '100%',
                        aspectRatio: '1',
                        border: selectedImageIndex === i ? '3px solid #0f172a' : '2px solid #e2e8f0',
                        borderRadius: '8px',
                        padding: 0,
                        cursor: 'pointer',
                        overflow: 'hidden',
                        transition: 'all 0.3s',
                        background: '#f1f5f9'
                      }}
                      onMouseEnter={(e) => {
                        if (selectedImageIndex !== i) {
                          e.currentTarget.style.borderColor = '#cbd5e1';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedImageIndex !== i) {
                          e.currentTarget.style.borderColor = '#e2e8f0';
                        }
                      }}
                    >
                      <img 
                        src={img} 
                        alt="" 
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info Section */}
            <div>
              
              {/* Title & Location */}
              <div style={{ marginBottom: '24px' }}>
                <h1 style={{
                  fontSize: '2.5rem',
                  fontWeight: '800',
                  marginBottom: '12px',
                  color: '#0f172a',
                  letterSpacing: '-0.5px'
                }}>
                  {property.title}
                </h1>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#64748b',
                  fontSize: '1rem',
                  fontWeight: '500'
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>{property.location.address}, {property.location.city} ({property.location.province})</span>
                </div>
              </div>

              {/* Price */}
              <div style={{
                paddingBottom: '24px',
                borderBottom: '2px solid #e2e8f0',
                marginBottom: '24px'
              }}>
                <p style={{
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  color: '#475569',
                  margin: '0 0 8px 0',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Prezzo
                </p>
                <div style={{
                  fontSize: '3rem',
                  fontWeight: '800',
                  color: '#0f172a',
                  letterSpacing: '-1px'
                }}>
                  € {property.price.toLocaleString('it-IT')}
                  {property.type === 'rent' && (
                    <span style={{ fontSize: '1rem', color: '#64748b', fontWeight: '600' }}>/mese</span>
                  )}
                </div>
              </div>

              {/* Key Features Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
                marginBottom: '32px'
              }}>
                <div style={{
                  padding: '20px',
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  textAlign: 'center',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#cbd5e1';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    background: '#dbeafe',
                    marginBottom: '8px'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="2">
                      <path d="M3 12h18M9 3v18M3 9h18M3 15h18"></path>
                    </svg>
                  </div>
                  <p style={{
                    fontSize: '0.85rem',
                    color: '#64748b',
                    margin: '0 0 6px 0',
                    fontWeight: '600'
                  }}>
                    Locali
                  </p>
                  <p style={{
                    fontSize: '1.8rem',
                    fontWeight: '800',
                    color: '#0f172a',
                    margin: 0
                  }}>
                    {property.details.rooms}
                  </p>
                </div>

                <div style={{
                  padding: '20px',
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  textAlign: 'center',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#cbd5e1';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    background: '#dbeafe',
                    marginBottom: '8px'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="2">
                      <path d="M2 7h20M2 7v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7M9 3v4M15 3v4"></path>
                    </svg>
                  </div>
                  <p style={{
                    fontSize: '0.85rem',
                    color: '#64748b',
                    margin: '0 0 6px 0',
                    fontWeight: '600'
                  }}>
                    Bagni
                  </p>
                  <p style={{
                    fontSize: '1.8rem',
                    fontWeight: '800',
                    color: '#0f172a',
                    margin: 0
                  }}>
                    {property.details.bathrooms}
                  </p>
                </div>

                <div style={{
                  padding: '20px',
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  textAlign: 'center',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#cbd5e1';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    background: '#dbeafe',
                    marginBottom: '8px'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                    </svg>
                  </div>
                  <p style={{
                    fontSize: '0.85rem',
                    color: '#64748b',
                    margin: '0 0 6px 0',
                    fontWeight: '600'
                  }}>
                    Superficie
                  </p>
                  <p style={{
                    fontSize: '1.8rem',
                    fontWeight: '800',
                    color: '#0f172a',
                    margin: 0
                  }}>
                    {property.details.sqm} m²
                  </p>
                </div>
              </div>

              {/* Characteristics */}
              {(property as any).details && (
                <div style={{ marginBottom: '32px' }}>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    marginBottom: '16px',
                    color: '#0f172a',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Caratteristiche
                  </h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '12px'
                  }}>
                    {(property as any).details.floor !== undefined && (
                      <div style={{
                        padding: '12px 16px',
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        fontSize: '0.95rem'
                      }}>
                        <span style={{ color: '#64748b', fontWeight: '500' }}>Piano:</span>
                        <span style={{ marginLeft: '8px', fontWeight: '600', color: '#0f172a' }}>
                          {(property as any).details.floor === 0 ? 'Terra' : `${(property as any).details.floor}°`}
                        </span>
                      </div>
                    )}
                    {(property as any).details.energyClass && (
                      <div style={{
                        padding: '12px 16px',
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        fontSize: '0.95rem'
                      }}>
                        <span style={{ color: '#64748b', fontWeight: '500' }}>Classe Energetica:</span>
                        <span style={{
                          marginLeft: '8px',
                          fontWeight: '700',
                          color: '#0f172a',
                          padding: '2px 6px',
                          background: '#fef3c7',
                          borderRadius: '4px'
                        }}>
                          {(property as any).details.energyClass}
                        </span>
                      </div>
                    )}
                    {(property as any).details.balcony && (
                      <div style={{
                        padding: '12px 16px',
                        background: '#dbeafe',
                        border: '1px solid #bfdbfe',
                        borderRadius: '8px',
                        color: '#1e40af',
                        fontWeight: '600',
                        fontSize: '0.95rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 12l2 2 4-4m7 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Balcone
                      </div>
                    )}
                    {(property as any).details.garage && (
                      <div style={{
                        padding: '12px 16px',
                        background: '#dbeafe',
                        border: '1px solid #bfdbfe',
                        borderRadius: '8px',
                        color: '#1e40af',
                        fontWeight: '600',
                        fontSize: '0.95rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 12l2 2 4-4m7 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Box/Garage
                      </div>
                    )}
                    {(property as any).details.elevator && (
                      <div style={{
                        padding: '12px 16px',
                        background: '#dbeafe',
                        border: '1px solid #bfdbfe',
                        borderRadius: '8px',
                        color: '#1e40af',
                        fontWeight: '600',
                        fontSize: '0.95rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 12l2 2 4-4m7 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Ascensore
                      </div>
                    )}
                    {(property as any).details.furnished && (
                      <div style={{
                        padding: '12px 16px',
                        background: '#dbeafe',
                        border: '1px solid #bfdbfe',
                        borderRadius: '8px',
                        color: '#1e40af',
                        fontWeight: '600',
                        fontSize: '0.95rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 12l2 2 4-4m7 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Arredato
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Costs */}
              {(property as any).costs && ((property as any).costs.condominiumFees || (property as any).costs.heatingCosts) && (
                <div style={{
                  padding: '20px',
                  background: 'linear-gradient(135deg, #fef3c7 0%, #fef08a 100%)',
                  border: '1px solid #fcd34d',
                  borderRadius: '12px',
                  marginBottom: '32px'
                }}>
                  <h3 style={{
                    marginBottom: '12px',
                    fontSize: '1rem',
                    fontWeight: '700',
                    color: '#92400e'
                  }}>
                    Spese Mensili
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {(property as any).costs.condominiumFees > 0 && (
                      <p style={{ margin: 0, fontSize: '0.95rem', color: '#92400e' }}>
                        <strong>Condominio:</strong> € {(property as any).costs.condominiumFees}/mese
                      </p>
                    )}
                    {(property as any).costs.heatingCosts > 0 && (
                      <p style={{ margin: 0, fontSize: '0.95rem', color: '#92400e' }}>
                        <strong>Riscaldamento:</strong> € {(property as any).costs.heatingCosts}/anno
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Description */}
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  marginBottom: '12px',
                  color: '#0f172a',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Descrizione
                </h3>
                <p style={{
                  lineHeight: '1.8',
                  color: '#475569',
                  margin: 0,
                  whiteSpace: 'pre-wrap',
                  fontSize: '0.95rem'
                }}>
                  {property.description}
                </p>
              </div>

              {/* CTA Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <button 
                  onClick={() => window.location.href = '/contatti'}
                  style={{
                    padding: '16px 24px',
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    boxShadow: '0 4px 12px rgba(15, 23, 42, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(15, 23, 42, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(15, 23, 42, 0.2)';
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  Contatta
                </button>
                <button 
                  onClick={() => window.location.href = `mailto:info@fidesimmobiliare.it?subject=Richiesta%20Info%20-%20${property.title}`}
                  style={{
                    padding: '16px 24px',
                    background: '#ffffff',
                    color: '#0f172a',
                    border: '2px solid #0f172a',
                    borderRadius: '10px',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f1f5f9';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#ffffff';
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                  Email
                </button>
              </div>

            </div>
          </div>
        </div>

      </main>

      <Footer />

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (max-width: 1024px) {
          .property-detail-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }

          main {
            padding: 24px 20px !important;
          }
        }

        @media (max-width: 768px) {
          main {
            padding: 20px 16px !important;
          }

          .property-detail-grid {
            gap: 24px !important;
          }
        }

        @media (max-width: 480px) {
          main {
            padding: 16px 12px !important;
          }
        }
      `}</style>
    </>
  );
}