import { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { PropertiesGrid } from '../components/PropertiesGrid';
import { fetchPropertiesByBranch, type Property } from '../services/api';

export function PaesanaPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carica immobili dal localStorage (creati dall'admin)
    const savedProperties = localStorage.getItem('fides_properties');
    if (savedProperties) {
      try {
        const allProperties = JSON.parse(savedProperties);
        // Aggiungi status: 'available' alle proprietà esistenti che non ce l'hanno
        const migratedProperties = allProperties.map((p: any) => ({
          ...p,
          status: p.status || 'available'
        }));
        // Filtra solo per Paesana
        const paesanaProperties = migratedProperties.filter((p: any) => p.branch === 'paesana');
        setProperties(paesanaProperties);
        setLoading(false);
      } catch (e) {
        console.error('Error loading properties:', e);
        // Fallback API
        fetchPropertiesByBranch('paesana')
          .then(setProperties)
          .finally(() => setLoading(false));
      }
    } else {
      // Nessun immobile salvato, usa API mock
      fetchPropertiesByBranch('paesana')
        .then(setProperties)
        .finally(() => setLoading(false));
    }
  }, []);

  return (
    <>
      <Navbar />
      
      <main style={{ marginTop: '56px', minHeight: 'calc(100vh - 56px)', background: '#f8fafc' }}>
        
        {/* Hero Section */}
        <section className="hero fade-in" style={{
          backgroundImage: 'linear-gradient(135deg, rgba(15, 23, 42, 0.4), rgba(30, 41, 59, 0.6)), url(/zani1.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          height: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          
          {/* Animated Background Elements */}
          <div style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.05,
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            pointerEvents: 'none'
          }} />

          <div className="scale-in" style={{ position: 'relative', zIndex: 2 }}>
            
            {/* Icon */}
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              width: '100px',
              height: '100px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))',
              backdropFilter: 'blur(20px)',
              marginBottom: '32px',
              boxShadow: '0 12px 36px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              animation: 'float 3s ease-in-out infinite'
            }} className="float">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>

            {/* Main Heading */}
            <h1 style={{ 
              fontSize: '3.5rem', 
              marginBottom: '16px', 
              fontWeight: '800',
              textShadow: '0 4px 24px rgba(0,0,0,0.5)',
              letterSpacing: '-1px',
              lineHeight: '1.2'
            }}>
              Paesana
            </h1>

            {/* Subheading */}
            <p style={{ 
              fontSize: '1.3rem', 
              textShadow: '0 2px 12px rgba(0,0,0,0.4)',
              opacity: 0.95,
              marginBottom: '32px',
              fontWeight: '400',
              letterSpacing: '0.3px'
            }}>
              Immobili Esclusivi nella Valle Po
            </p>

            {/* Badge */}
            <div style={{
              display: 'inline-block',
              padding: '8px 20px',
              background: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)',
              borderRadius: '30px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white',
              fontSize: '0.85rem',
              fontWeight: '600',
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}>
              Scopri la Nostra Selezione
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section style={{
          padding: '64px 24px',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          borderBottom: '1px solid #e2e8f0'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '32px'
            }}>
              
              {/* Feature 1 */}
              <div style={{
                padding: '32px',
                background: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '12px',
                  background: '#dbeafe',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px'
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="2">
                    <path d="M21 21H3V7c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v14z"></path>
                    <path d="M3 13h18M7 17h6"></path>
                  </svg>
                </div>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  marginBottom: '8px',
                  color: '#0f172a'
                }}>
                  Dati Verificati
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  color: '#64748b',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  Ogni proprietà è stata accuratamente controllata e documentata con informazioni aggiornate.
                </p>
              </div>

              {/* Feature 2 */}
              <div style={{
                padding: '32px',
                background: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '12px',
                  background: '#dbeafe',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px'
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="2">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                  </svg>
                </div>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  marginBottom: '8px',
                  color: '#0f172a'
                }}>
                  Pronta Disponibilità
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  color: '#64748b',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  Siamo pronti ad organizzare visite e trattative in tempi brevi per le proprietà di tuo interesse.
                </p>
              </div>

              {/* Feature 3 */}
              <div style={{
                padding: '32px',
                background: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '12px',
                  background: '#dbeafe',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px'
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="2">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8m3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"></path>
                  </svg>
                </div>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  marginBottom: '8px',
                  color: '#0f172a'
                }}>
                  Esperienza Locale
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  color: '#64748b',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  Conosciamo il territorio e le dinamiche del mercato immobiliare della Valle Po come nessun altro.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Properties Grid Section */}
        <section style={{
          padding: '64px 24px',
          background: '#f8fafc'
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            
            {/* Section Header */}
            <div style={{ marginBottom: '56px', textAlign: 'center' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                marginBottom: '16px'
              }}>
                <div style={{
                  width: '5px',
                  height: '24px',
                  background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
                  borderRadius: '3px'
                }} />
                <h2 style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: '#475569',
                  margin: 0,
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Immobili Disponibili
                </h2>
              </div>
              <p style={{
                fontSize: '1.8rem',
                fontWeight: '800',
                color: '#0f172a',
                margin: '0 0 8px 0',
                letterSpacing: '-0.5px'
              }}>
                Le Nostre Proprietà
              </p>
              <p style={{
                fontSize: '1rem',
                color: '#64748b',
                maxWidth: '600px',
                margin: '0 auto',
                lineHeight: '1.6'
              }}>
                Scopri la selezione esclusiva di immobili disponibili a Paesana e nella Valle Po
              </p>
            </div>

            {/* Loading State */}
            {loading && (
              <div style={{ 
                textAlign: 'center', 
                padding: '72px 24px',
                background: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  border: '3px solid #e2e8f0',
                  borderTopColor: '#0f172a',
                  borderRadius: '50%',
                  margin: '0 auto 24px',
                  animation: 'spin 1s linear infinite'
                }} />
                <p style={{ 
                  color: '#64748b',
                  fontSize: '1.05rem',
                  fontWeight: '600',
                  margin: 0
                }}>
                  Caricamento immobili...
                </p>
              </div>
            )}

            {/* Properties Grid */}
            {!loading && properties.length > 0 && (
              <PropertiesGrid branch="paesana" properties={properties} />
            )}

            {/* Empty State */}
            {!loading && properties.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '72px 24px',
                background: '#ffffff',
                borderRadius: '16px',
                border: '2px dashed #e2e8f0'
              }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '80px',
                  height: '80px',
                  borderRadius: '16px',
                  background: '#f1f5f9',
                  marginBottom: '24px'
                }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </div>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  color: '#475569',
                  marginBottom: '8px'
                }}>
                  Nessun immobile disponibile al momento
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  color: '#64748b',
                  maxWidth: '400px',
                  margin: '0 auto 24px'
                }}>
                  I nostri immobili sono in rapida evoluzione. Ti invitiamo a tornare presto per scoprire le nuove proprietà o a contattarci per ricevere notifiche sulle nuove inserzioni.
                </p>
                <a
                  href="/contatti"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 28px',
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    boxShadow: '0 4px 12px rgba(15, 23, 42, 0.2)'
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
                  <span>Contattaci</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </a>
              </div>
            )}

          </div>
        </section>

      </main>

      <Footer />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero { animation: fadeIn 0.8s ease-out; }
        .scale-in { animation: slideUp 0.8s ease-out; }
        .float { animation: float 3s ease-in-out infinite; }

        @media (max-width: 768px) {
          h1 { font-size: 2.5rem !important; }
          p { font-size: 0.95rem !important; }
        }
      `}</style>
    </>
  );
}