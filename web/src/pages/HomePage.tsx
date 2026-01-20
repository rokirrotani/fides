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
        <section
          style={{
            height: '100vh',
            display: 'flex',
            overflow: 'hidden',
            position: 'relative'
          }}
          className="split-layout"
        >

          {/* Paesana - Left Side */}
          <div
            onClick={() => navigate('/paesana')}
            onMouseEnter={() => setHoveredSide('paesana')}
            onMouseLeave={() => setHoveredSide(null)}
            className="split-panel"
            style={{
              flex: hoveredSide === 'paesana' ? '1.2' : hoveredSide === 'torino' ? '0.8' : '1',
              backgroundImage:
                'linear-gradient(135deg, rgba(15, 23, 42, 0.3), rgba(30, 41, 59, 0.4)), url(/zani1.jpeg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              cursor: 'pointer',
              transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Background Overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  hoveredSide === 'paesana'
                    ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.15), rgba(30, 41, 59, 0.25))'
                    : 'transparent',
                transition: 'background 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            />

            {/* Content */}
            <div
              style={{
                textAlign: 'center',
                color: 'white',
                zIndex: 2,
                transform: hoveredSide === 'paesana' ? 'scale(1.05) translateY(-10px)' : 'scale(1) translateY(0)',
                transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                padding: '40px'
              }}
            >
              {/* Badge */}
              <div
                style={{
                  display: 'inline-block',
                  marginBottom: '20px',
                  opacity: hoveredSide === 'paesana' ? 1 : 0.7,
                  transition: 'opacity 0.7s ease',
                  padding: '8px 16px',
                  background: 'rgba(255, 255, 255, 0.12)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '24px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  letterSpacing: '1px',
                  textTransform: 'uppercase'
                }}
              >
                Valle Po
              </div>

              <h2
                style={{
                  fontSize: hoveredSide === 'paesana' ? '4rem' : '3rem',
                  fontWeight: '800',
                  marginBottom: '12px',
                  textShadow: '0 4px 24px rgba(0,0,0,0.5)',
                  transition: 'font-size 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                  letterSpacing: '-1px'
                }}
              >
                PAESANA
              </h2>

              <p
                style={{
                  fontSize: hoveredSide === 'paesana' ? '1.4rem' : '1.1rem',
                  textShadow: '0 2px 12px rgba(0,0,0,0.5)',
                  transition: 'font-size 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                  fontWeight: '300',
                  letterSpacing: '0.03em',
                  opacity: 0.95,
                  marginBottom: 0
                }}
              >
                Immobili in Valle Po e dintorni
              </p>

              {/* CTA Button */}
              <div
                style={{
                  marginTop: '32px',
                  opacity: hoveredSide === 'paesana' ? 1 : 0,
                  transform: hoveredSide === 'paesana' ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.9)',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  pointerEvents: hoveredSide === 'paesana' ? 'auto' : 'none'
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '14px 32px',
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)',
                    border: '1.5px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '10px',
                    color: 'white',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                  }}
                >
                  <span>Scopri gli immobili</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </div>
            </div>

            {/* Divider Line */}
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: '15%',
                bottom: '15%',
                width: '1px',
                background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.4), transparent)',
                opacity: hoveredSide ? 0.2 : 0.5,
                transition: 'opacity 0.7s ease'
              }}
            />
          </div>

          {/* Torino - Right Side */}
          <div
            onClick={() => navigate('/torino')}
            onMouseEnter={() => setHoveredSide('torino')}
            onMouseLeave={() => setHoveredSide(null)}
            className="split-panel"
            style={{
              flex: hoveredSide === 'torino' ? '1.2' : hoveredSide === 'paesana' ? '0.8' : '1',
              backgroundImage:
                'linear-gradient(135deg, rgba(15, 23, 42, 0.3), rgba(30, 41, 59, 0.4)), url(https://images.unsplash.com/photo-1559564689-5f26e5f43d38?q=80&w=2000)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              cursor: 'pointer',
              transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Background Overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  hoveredSide === 'torino'
                    ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.15), rgba(30, 41, 59, 0.25))'
                    : 'transparent',
                transition: 'background 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            />

            {/* Content */}
            <div
              style={{
                textAlign: 'center',
                color: 'white',
                zIndex: 2,
                transform: hoveredSide === 'torino' ? 'scale(1.05) translateY(-10px)' : 'scale(1) translateY(0)',
                transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                padding: '40px'
              }}
            >
              {/* Badge */}
              <div
                style={{
                  display: 'inline-block',
                  marginBottom: '20px',
                  opacity: hoveredSide === 'torino' ? 1 : 0.7,
                  transition: 'opacity 0.7s ease',
                  padding: '8px 16px',
                  background: 'rgba(255, 255, 255, 0.12)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '24px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  letterSpacing: '1px',
                  textTransform: 'uppercase'
                }}
              >
                Centro città
              </div>

              <h2
                style={{
                  fontSize: hoveredSide === 'torino' ? '4rem' : '3rem',
                  fontWeight: '800',
                  marginBottom: '12px',
                  textShadow: '0 4px 24px rgba(0,0,0,0.5)',
                  transition: 'font-size 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                  letterSpacing: '-1px'
                }}
              >
                TORINO
              </h2>

              <p
                style={{
                  fontSize: hoveredSide === 'torino' ? '1.4rem' : '1.1rem',
                  textShadow: '0 2px 12px rgba(0,0,0,0.5)',
                  transition: 'font-size 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                  fontWeight: '300',
                  letterSpacing: '0.03em',
                  opacity: 0.95,
                  marginBottom: 0
                }}
              >
                Immobili in centro città e provincia
              </p>

              {/* CTA Button */}
              <div
                style={{
                  marginTop: '32px',
                  opacity: hoveredSide === 'torino' ? 1 : 0,
                  transform: hoveredSide === 'torino' ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.9)',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  pointerEvents: hoveredSide === 'torino' ? 'auto' : 'none'
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '14px 32px',
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)',
                    border: '1.5px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '10px',
                    color: 'white',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                  }}
                >
                  <span>Scopri gli immobili</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* LOGO CENTRALE */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
              pointerEvents: 'none',
              opacity: hoveredSide ? 0 : 1,
              transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              filter: 'drop-shadow(0 8px 20px rgba(0, 0, 0, 0.5))'
            }}
          >
            <img
              src="/logo.png"
              alt="Logo Fides Immobiliare"
              style={{
                width: '280px',
                height: 'auto',
                animation: 'logoFloat 3s ease-in-out infinite'
              }}
            />
          </div>

          {/* Bottom Hint */}
          <div
            style={{
              position: 'absolute',
              bottom: '32px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 5,
              color: 'white',
              fontSize: '0.85rem',
              fontWeight: '500',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              opacity: hoveredSide ? 0 : 0.7,
              transition: 'opacity 0.6s ease',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
              pointerEvents: 'none'
            }}
          >
            Scorri per esplorare
          </div>

        </section>
      </main>

      <Footer />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes logoFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .split-layout {
          background: #f8fafc;
        }

        .split-panel {
          will-change: flex;
        }

        @media (max-width: 768px) {
          .split-panel h2 {
            font-size: 2.5rem !important;
          }
          
          .split-panel p {
            font-size: 1rem !important;
          }
        }
      `}</style>
    </>
  );
}