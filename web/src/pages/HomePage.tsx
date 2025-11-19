import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function HomePage() {
  const navigate = useNavigate();
  const [hoveredSide, setHoveredSide] = useState<'paesana' | 'torino' | null>(null);

  return (
    <>
      <Navbar />
      
      <main style={{ marginTop: '64px' }}>
        {/* Full Screen Split Hero */}
        <section style={{
          height: 'calc(100vh - 64px)',
          display: 'flex',
          overflow: 'hidden',
          position: 'relative'
        }}>
          {/* Paesana - Left Side */}
          <div 
            onClick={() => navigate('/paesana')}
            onMouseEnter={() => setHoveredSide('paesana')}
            onMouseLeave={() => setHoveredSide(null)}
            style={{
              flex: hoveredSide === 'paesana' ? '1.2' : hoveredSide === 'torino' ? '0.8' : '1',
              backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.2), rgba(15, 23, 42, 0.5)), url(/zani1.jpeg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              cursor: 'pointer',
              transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Overlay on hover */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: hoveredSide === 'paesana' 
                ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.1), rgba(15, 23, 42, 0.3))' 
                : 'transparent',
              transition: 'background 0.6s ease'
            }} />
            
            <div style={{
              textAlign: 'center',
              color: 'white',
              zIndex: 2,
              transform: hoveredSide === 'paesana' ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              padding: '40px'
            }}>
              <h2 style={{ 
                fontSize: hoveredSide === 'paesana' ? '4.5rem' : '3.5rem',
                fontWeight: 'bold',
                marginBottom: '16px',
                textShadow: '0 4px 20px rgba(0,0,0,0.6)',
                transition: 'font-size 0.6s ease',
                letterSpacing: '2px'
              }}>
                PAESANA
              </h2>
              <p style={{ 
                fontSize: hoveredSide === 'paesana' ? '1.8rem' : '1.4rem',
                textShadow: '0 2px 10px rgba(0,0,0,0.6)',
                transition: 'font-size 0.6s ease',
                fontWeight: '300',
                letterSpacing: '1px'
              }}>
                Valle Po e dintorni
              </p>
              {hoveredSide === 'paesana' && (
                <div style={{
                  marginTop: '32px',
                  fontSize: '1rem',
                  opacity: 1,
                  animation: 'fadeIn 0.4s ease-in-out',
                  textTransform: 'uppercase',
                  letterSpacing: '3px',
                  fontWeight: '600'
                }}>
                  CLICCA PER ESPLORARE →
                </div>
              )}
            </div>

            {/* Divider Line */}
            <div style={{
              position: 'absolute',
              right: 0,
              top: '20%',
              bottom: '20%',
              width: '2px',
              background: 'linear-gradient(to bottom, transparent, white, transparent)',
              opacity: 0.5
            }} />
          </div>

          {/* Torino - Right Side */}
          <div 
            onClick={() => navigate('/torino')}
            onMouseEnter={() => setHoveredSide('torino')}
            onMouseLeave={() => setHoveredSide(null)}
            style={{
              flex: hoveredSide === 'torino' ? '1.2' : hoveredSide === 'paesana' ? '0.8' : '1',
              backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.2), rgba(15, 23, 42, 0.5)), url(/torino.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              cursor: 'pointer',
              transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Overlay on hover */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: hoveredSide === 'torino' 
                ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.1), rgba(15, 23, 42, 0.3))' 
                : 'transparent',
              transition: 'background 0.6s ease'
            }} />
            
            <div style={{
              textAlign: 'center',
              color: 'white',
              zIndex: 2,
              transform: hoveredSide === 'torino' ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              padding: '40px'
            }}>
              <h2 style={{ 
                fontSize: hoveredSide === 'torino' ? '4.5rem' : '3.5rem',
                fontWeight: 'bold',
                marginBottom: '16px',
                textShadow: '0 4px 20px rgba(0,0,0,0.6)',
                transition: 'font-size 0.6s ease',
                letterSpacing: '2px'
              }}>
                TORINO
              </h2>
              <p style={{ 
                fontSize: hoveredSide === 'torino' ? '1.8rem' : '1.4rem',
                textShadow: '0 2px 10px rgba(0,0,0,0.6)',
                transition: 'font-size 0.6s ease',
                fontWeight: '300',
                letterSpacing: '1px'
              }}>
                Centro città e provincia
              </p>
              {hoveredSide === 'torino' && (
                <div style={{
                  marginTop: '32px',
                  fontSize: '1rem',
                  opacity: 1,
                  animation: 'fadeIn 0.4s ease-in-out',
                  textTransform: 'uppercase',
                  letterSpacing: '3px',
                  fontWeight: '600'
                }}>
                  CLICCA PER ESPLORARE →
                </div>
              )}
            </div>
          </div>

          {/* Logo centrale opzionale */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
            pointerEvents: 'none',
            opacity: hoveredSide ? 0 : 1,
            transition: 'opacity 0.6s ease'
          }}>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: 'white',
              textShadow: '0 4px 30px rgba(0,0,0,0.8)',
              backgroundColor: 'rgba(15, 23, 42, 0.8)',
              padding: '20px 40px',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)',
              letterSpacing: '3px'
            }}>
              FIDES IMMOBILIARE
            </h1>
          </div>
        </section>

        {/* About Section */}
        <section style={{
          padding: '100px 24px',
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center',
          background: 'linear-gradient(to bottom, #ffffff, #f8fafc)'
        }}>
          <h2 style={{ 
            fontSize: '3rem', 
            marginBottom: '32px', 
            color: '#1e293b',
            fontWeight: 'bold',
            letterSpacing: '1px'
          }}>
            Chi Siamo
          </h2>
          <p style={{ 
            fontSize: '1.3rem', 
            color: '#475569', 
            lineHeight: '2', 
            maxWidth: '900px', 
            margin: '0 auto',
            fontWeight: '300'
          }}>
            Fides Immobiliare opera con professionalità nel settore immobiliare, 
            offrendo servizi personalizzati sia nella Valle Po che nel capoluogo piemontese. 
            La nostra esperienza e dedizione ci permettono di trovare la soluzione ideale per ogni esigenza.
          </p>
        </section>
      </main>

      <Footer />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}