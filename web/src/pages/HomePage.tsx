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
      
      <main>
        {/* Full Screen Split Hero */}
        <section style={{
          height: '100vh',
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
              backgroundImage: 'linear-gradient(rgba(44, 62, 80, 0.15), rgba(44, 62, 80, 0.35)), url(/zani1.jpeg)',
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
                ? 'linear-gradient(135deg, rgba(44, 62, 80, 0.05), rgba(44, 62, 80, 0.2))' 
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
                fontSize: hoveredSide === 'paesana' ? '3.5rem' : '2.8rem',
                fontWeight: '600',
                marginBottom: '16px',
                textShadow: '0 2px 12px rgba(0,0,0,0.4)',
                transition: 'font-size 0.6s ease',
                letterSpacing: '-0.02em'
              }}>
                PAESANA
              </h2>
              <p style={{ 
                fontSize: hoveredSide === 'paesana' ? '1.3rem' : '1.1rem',
                textShadow: '0 1px 8px rgba(0,0,0,0.4)',
                transition: 'font-size 0.6s ease',
                fontWeight: '400',
                letterSpacing: '0.02em',
                opacity: 0.95
              }}>
                Valle Po e dintorni
              </p>
              {hoveredSide === 'paesana' && (
                <div style={{
                  marginTop: '24px',
                  fontSize: '0.875rem',
                  opacity: 1,
                  animation: 'fadeIn 0.4s ease-in-out',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  fontWeight: '500'
                }}>
                  Esplora →
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
              backgroundImage: 'linear-gradient(rgba(44, 62, 80, 0.15), rgba(44, 62, 80, 0.35)), url(/torino.jpg)',
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
                ? 'linear-gradient(135deg, rgba(44, 62, 80, 0.05), rgba(44, 62, 80, 0.2))' 
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
                fontSize: hoveredSide === 'torino' ? '3.5rem' : '2.8rem',
                fontWeight: '600',
                marginBottom: '16px',
                textShadow: '0 2px 12px rgba(0,0,0,0.4)',
                transition: 'font-size 0.6s ease',
                letterSpacing: '-0.02em'
              }}>
                TORINO
              </h2>
              <p style={{ 
                fontSize: hoveredSide === 'torino' ? '1.3rem' : '1.1rem',
                textShadow: '0 1px 8px rgba(0,0,0,0.4)',
                transition: 'font-size 0.6s ease',
                fontWeight: '400',
                letterSpacing: '0.02em',
                opacity: 0.95
              }}>
                Centro città e provincia
              </p>
              {hoveredSide === 'torino' && (
                <div style={{
                  marginTop: '24px',
                  fontSize: '0.875rem',
                  opacity: 1,
                  animation: 'fadeIn 0.4s ease-in-out',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  fontWeight: '500'
                }}>
                  Esplora →
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
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'white',
              textShadow: '0 2px 16px rgba(0,0,0,0.6)',
              backgroundColor: 'rgba(44, 62, 80, 0.75)',
              padding: '16px 32px',
              borderRadius: '8px',
              backdropFilter: 'blur(12px)',
              letterSpacing: '-0.01em'
            }}>
              FIDES IMMOBILIARE
            </h1>
          </div>
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