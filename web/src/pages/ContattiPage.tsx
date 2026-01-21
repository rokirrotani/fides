import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export function ContattiPage() {
  const [hoveredOffice, setHoveredOffice] = useState<string | null>(null);

  const offices = [
    {
      name: 'Immobiliare Fides - Paesana',
      subtitle: 'Valle Po - Piemonte',
      address: 'Via Po, 1, 12034 Paesana CN',
      phone: '011 428 2544',
      email: 'paesana@fidesimmobiliare.it',
      rating: '4.9',
      reviews: '39 recensioni',
      hours: ['Lunedì - Giovedì: 09:00 - 13:00, 14:00 - 19:30', 'Venerdì: 09:00 - 13:00, 14:00 - 19:30', 'Sabato: 09:00 - 18:00', 'Domenica: Chiuso'],
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2845.9!2d7.2744!3d44.6872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12cd4f6c0d0a0001%3A0x1234567890abcdef!2sVia%20Po%2C%201%2C%2012034%20Paesana%20CN!5e0!3m2!1sit!2sit!4v1234567890'
    },
    {
      name: 'Immobiliare Fides - Torino',
      subtitle: 'Centro Città',
      address: 'Via Paolo Sacchi, 32, 10128 Torino TO',
      phone: '011 428 2544',
      email: 'torino@fidesimmobiliare.it',
      rating: '5.0',
      reviews: '62 recensioni',
      hours: ['Lunedì: 09:00 - 13:00, 14:00 - 19:30', 'Martedì - Giovedì: 09:00 - 13:00, 14:00 - 19:30', 'Venerdì: 09:00 - 13:00, 14:00 - 19:30', 'Sabato: 09:00 - 18:00', 'Domenica: Chiuso'],
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2818.2!2d7.6857!3d45.0646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47886d71a4b6d0a1%3A0x1234567890fedcba!2sVia%20Paolo%20Sacchi%2C%2032%2C%2010128%20Torino%20TO!5e0!3m2!1sit!2sit!4v1234567890'
    }
  ];

  return (
    <>
      <Navbar />
      
      <main style={{ marginTop: '56px', minHeight: 'calc(100vh - 56px)', background: '#f8fafc' }}>
        
        {/* Header Section */}
        <section style={{ 
          padding: '64px 24px', 
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          color: 'white',
          textAlign: 'center',
          borderBottom: '1px solid #e2e8f0'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '80px',
              height: '80px',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.1)',
              marginBottom: '24px',
              border: '2px solid rgba(255, 255, 255, 0.2)'
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              marginBottom: '16px',
              letterSpacing: '-0.5px'
            }}>
              Le Nostre Sedi
            </h1>
            <p style={{
              fontSize: '1.1rem',
              opacity: 0.9,
              lineHeight: '1.8',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Visita i nostri uffici per una consulenza personalizzata. I nostri esperti sono a tua disposizione per trovare la soluzione immobiliare perfetta.
            </p>
          </div>
        </section>

        {/* Offices Section */}
        <section style={{ padding: '64px 24px' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            {offices.map((office, index) => (
              <div
                key={office.name}
                style={{
                  marginBottom: index === offices.length - 1 ? 0 : '48px',
                  background: '#ffffff',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid #e2e8f0',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: hoveredOffice === office.name
                    ? '0 12px 32px rgba(15, 23, 42, 0.15)'
                    : '0 2px 12px rgba(0, 0, 0, 0.08)',
                  transform: hoveredOffice === office.name ? 'translateY(-4px)' : 'translateY(0)'
                }}
                onMouseEnter={() => setHoveredOffice(office.name)}
                onMouseLeave={() => setHoveredOffice(null)}
              >
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 0
                }}>
                  
                  {/* Info Panel */}
                  <div style={{
                    padding: '56px 48px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    background: '#ffffff'
                  }}>
                    
                    {/* Header */}
                    <div style={{ marginBottom: '32px' }}>
                      <h2 style={{
                        fontSize: '2rem',
                        fontWeight: '800',
                        margin: '0 0 8px 0',
                        color: '#0f172a',
                        letterSpacing: '-0.5px'
                      }}>
                        {office.name}
                      </h2>
                      <p style={{
                        margin: 0,
                        color: '#64748b',
                        fontSize: '1rem',
                        fontWeight: '500'
                      }}>
                        {office.subtitle}
                      </p>
                    </div>

                    {/* Rating */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '32px',
                      paddingBottom: '24px',
                      borderBottom: '2px solid #e2e8f0'
                    }}>
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        background: '#fef3c7',
                        padding: '6px 12px',
                        borderRadius: '8px'
                      }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b" stroke="none">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                        <span style={{ fontWeight: '700', color: '#92400e' }}>
                          {office.rating}
                        </span>
                      </div>
                      <span style={{
                        color: '#64748b',
                        fontSize: '0.95rem',
                        fontWeight: '600'
                      }}>
                        {office.reviews}
                      </span>
                    </div>

                    {/* Contact Details */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                      
                      {/* Address */}
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                        <div style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '10px',
                          background: '#f1f5f9',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                          </svg>
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{
                            margin: '0 0 6px 0',
                            fontSize: '0.85rem',
                            fontWeight: '700',
                            color: '#475569',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            Indirizzo
                          </p>
                          <p style={{
                            margin: 0,
                            fontSize: '1rem',
                            color: '#1e293b',
                            fontWeight: '600',
                            lineHeight: '1.6'
                          }}>
                            {office.address}
                          </p>
                        </div>
                      </div>

                      {/* Phone */}
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                        <div style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '10px',
                          background: '#f1f5f9',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                          </svg>
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{
                            margin: '0 0 6px 0',
                            fontSize: '0.85rem',
                            fontWeight: '700',
                            color: '#475569',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            Telefono
                          </p>
                          <a
                            href={`tel:${office.phone.replace(/\s/g, '')}`}
                            style={{
                              margin: 0,
                              fontSize: '1rem',
                              color: '#0f172a',
                              fontWeight: '600',
                              textDecoration: 'none',
                              transition: 'color 0.3s',
                              display: 'inline-block'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.color = '#3b82f6'}
                            onMouseLeave={(e) => e.currentTarget.style.color = '#0f172a'}
                          >
                            {office.phone}
                          </a>
                        </div>
                      </div>

                      {/* Email */}
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                        <div style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '10px',
                          background: '#f1f5f9',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2">
                            <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                          </svg>
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{
                            margin: '0 0 6px 0',
                            fontSize: '0.85rem',
                            fontWeight: '700',
                            color: '#475569',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            Email
                          </p>
                          <a
                            href={`mailto:${office.email}`}
                            style={{
                              margin: 0,
                              fontSize: '1rem',
                              color: '#64748b',
                              fontWeight: '600',
                              textDecoration: 'none',
                              transition: 'color 0.3s',
                              wordBreak: 'break-all'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.color = '#0f172a'}
                            onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
                          >
                            {office.email}
                          </a>
                        </div>
                      </div>

                      {/* Hours */}
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                        <div style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '10px',
                          background: '#f1f5f9',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{
                            margin: '0 0 8px 0',
                            fontSize: '0.85rem',
                            fontWeight: '700',
                            color: '#475569',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            Orari di Apertura
                          </p>
                          <ul style={{
                            margin: 0,
                            padding: 0,
                            listStyle: 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px'
                          }}>
                            {office.hours.map((hour, i) => (
                              <li key={i} style={{
                                fontSize: '0.95rem',
                                color: '#1e293b',
                                fontWeight: '500'
                              }}>
                                {hour}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                    </div>

                    {/* CTA Button */}
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        marginTop: '32px',
                        padding: '14px 28px',
                        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        fontSize: '0.95rem',
                        fontWeight: '600',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: '0 4px 12px rgba(15, 23, 42, 0.2)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        width: '100%'
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
                      <span>Apri in Google Maps</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </a>
                  </div>

                  {/* Map Panel */}
                  <div style={{
                    position: 'relative',
                    overflow: 'hidden',
                    minHeight: '600px'
                  }}>
                    <iframe
                      src={office.mapUrl}
                      width="100%"
                      height="100%"
                      style={{
                        border: 'none',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%'
                      }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Mappa ${office.name}`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Additional Info Section */}
        <section style={{
          padding: '64px 24px',
          background: '#ffffff',
          borderTop: '1px solid #e2e8f0'
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '800',
                marginBottom: '16px',
                color: '#0f172a',
                letterSpacing: '-0.5px'
              }}>
                Hai Domande?
              </h2>
              <p style={{
                fontSize: '1.05rem',
                color: '#64748b',
                lineHeight: '1.7'
              }}>
                Contattaci via telefono, email o vieni a trovarci di persona. Il nostro team è disponibile per aiutarti a trovare la soluzione immobiliare perfetta per le tue esigenze.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              marginTop: '32px'
            }}>
              
              <a href="tel:0114282544" style={{ textDecoration: 'none' }}>
                <div style={{
                  padding: '32px 24px',
                  background: '#f8fafc',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '56px',
                    height: '56px',
                    borderRadius: '12px',
                    background: '#dbeafe',
                    marginBottom: '16px'
                  }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    color: '#0f172a',
                    marginBottom: '8px',
                    margin: 0
                  }}>
                    Telefonici
                  </h3>
                  <p style={{
                    fontSize: '0.95rem',
                    color: '#64748b',
                    marginBottom: '12px',
                    margin: '8px 0 12px'
                  }}>
                    Risposta rapida e professionale
                  </p>
                  <span style={{
                    color: '#0f172a',
                    fontWeight: '700',
                    fontSize: '1.1rem'
                  }}>
                    011 428 2544
                  </span>
                </div>
              </a>

              <a href="mailto:info@fidesimmobiliare.it" style={{ textDecoration: 'none' }}>
                <div style={{
                  padding: '32px 24px',
                  background: '#f8fafc',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '56px',
                    height: '56px',
                    borderRadius: '12px',
                    background: '#dbeafe',
                    marginBottom: '16px'
                  }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="2">
                      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                  </div>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    color: '#0f172a',
                    marginBottom: '8px',
                    margin: 0
                  }}>
                    Email
                  </h3>
                  <p style={{
                    fontSize: '0.95rem',
                    color: '#64748b',
                    marginBottom: '12px',
                    margin: '8px 0 12px'
                  }}>
                    Scrivi i tuoi dettagli
                  </p>
                  <span style={{
                    color: '#0f172a',
                    fontWeight: '700',
                    fontSize: '0.95rem',
                    wordBreak: 'break-all'
                  }}>
                    info@fidesimmobiliare.it
                  </span>
                </div>
              </a>

              <div
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                style={{
                  padding: '32px 24px',
                  background: '#f8fafc',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '56px',
                  height: '56px',
                  borderRadius: '12px',
                  background: '#dbeafe',
                  marginBottom: '16px'
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: '#0f172a',
                  marginBottom: '8px',
                  margin: 0
                }}>
                  Visita le Sedi
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  color: '#64748b',
                  marginBottom: '12px',
                  margin: '8px 0 12px'
                }}>
                  Consulenza di persona
                </p>
                <span style={{
                  color: '#0f172a',
                  fontWeight: '700',
                  fontSize: '0.95rem'
                }}>
                  Vedi orari sopra
                </span>
              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 1024px) {
          /* Office cards grid */
          section > div > div > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 768px) {
          h1 { font-size: 2rem !important; }
          
          section {
            padding: 48px 16px !important;
          }

          /* Office info panel padding */
          section > div > div > div:first-child > div:first-child {
            padding: 40px 28px !important;
          }
        }

        @media (max-width: 600px) {
          h1 { font-size: 1.75rem !important; }
          
          section {
            padding: 32px 14px !important;
          }

          section > div > div > div:first-child > div:first-child {
            padding: 32px 20px !important;
          }
        }

        @media (max-width: 480px) {
          section { padding: 24px 12px !important; }
          h1 { font-size: 1.6rem !important; }
        }
      `}</style>
    </>
  );
}