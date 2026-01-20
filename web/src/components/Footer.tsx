export function Footer() {
  return (
    <>
      <footer id="contacts" className="footer" style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: '#e5e7eb',
        padding: '64px 32px 32px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '40px',
        borderTop: '3px solid rgba(0, 102, 255, 0.3)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background decorative element */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(0, 102, 255, 0.05) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }} />

        <div className="footer__column" style={{ position: 'relative', zIndex: 1 }}>
          <h4 style={{ 
            fontWeight: '700', 
            marginBottom: '16px', 
            fontSize: '1.25rem',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            </svg>
            Fides Immobiliare
          </h4>
          <p style={{ 
            opacity: 0.9, 
            fontSize: '1rem', 
            marginBottom: '20px',
            lineHeight: 1.6
          }}>
            Soluzioni immobiliari su misura a Paesana e Torino. La tua casa dei sogni ti aspetta.
          </p>
          
          {/* Social Links */}
          <div style={{ 
            display: 'flex', 
            gap: '12px',
            marginTop: '24px',
            marginBottom: '24px'
          }}>
            {[
              { icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z', label: 'Facebook' },
              { icon: 'M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z', label: 'Instagram' }
            ].map((social, idx) => (
              <a
                key={idx}
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1.5px solid rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  color: '#ffffff'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 102, 255, 0.8)';
                  e.currentTarget.style.borderColor = 'rgba(0, 102, 255, 1)';
                  e.currentTarget.style.transform = 'translateY(-4px) scale(1.1)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 102, 255, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                aria-label={social.label}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d={social.icon} />
                </svg>
              </a>
            ))}
          </div>
          
          {/* Link Legali iubenda */}
          <div style={{ 
            marginTop: '28px', 
            paddingTop: '24px', 
            borderTop: '1px solid rgba(255,255,255,0.15)' 
          }}>
            <p style={{ 
              fontSize: '0.9rem', 
              opacity: 0.95, 
              marginBottom: '12px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              Informazioni Legali
            </p>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '10px', 
              fontSize: '0.9rem' 
            }}>
              {[
                { text: 'Privacy Policy', href: 'https://www.iubenda.com/privacy-policy/12345678' },
                { text: 'Cookie Policy', href: 'https://www.iubenda.com/privacy-policy/12345678/cookie-policy' },
                { text: '🍪 Preferenze Cookie', href: '#', class: 'iubenda-cs-preferences-link' }
              ].map((link, idx) => (
                <a 
                  key={idx}
                  href={link.href}
                  className={link.class || 'iubenda-white iubenda-noiframe iubenda-embed iubenda-noiframe'}
                  title={link.text}
                  style={{ 
                    color: 'rgba(255,255,255,0.8)', 
                    textDecoration: 'none', 
                    borderBottom: '1px solid transparent', 
                    transition: 'all 0.3s', 
                    display: 'inline-block',
                    padding: '4px 0'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.borderBottomColor = 'rgba(0, 102, 255, 0.7)';
                    e.currentTarget.style.paddingLeft = '8px';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
                    e.currentTarget.style.borderBottomColor = 'transparent';
                    e.currentTarget.style.paddingLeft = '0';
                  }}
                >
                  {link.text}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer__column" style={{ position: 'relative', zIndex: 1 }}>
          <h4 style={{ 
            fontWeight: '600', 
            marginBottom: '16px', 
            fontSize: '1.05rem',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            Fides Paesana
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p style={{ fontSize: '0.95rem', opacity: 0.85, lineHeight: 1.6 }}>
              📍 Via Po, 1<br/>12034 Paesana (CN)
            </p>
            <p style={{ fontSize: '0.95rem', opacity: 0.85 }}>
              📞 <a href="tel:011 428 2544" style={{ 
                color: 'rgba(255, 255, 255, 0.9)', 
                textDecoration: 'none', 
                borderBottom: '1px dotted rgba(255,255,255,0.4)',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.borderBottomColor = 'rgba(0, 102, 255, 0.7)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.4)';
              }}
              >011 428 2544</a>
            </p>
            <p style={{ fontSize: '0.95rem', opacity: 0.85 }}>
              🕒 Lun-Gio: 09:00-13:00, 14:00-19:30
            </p>
          </div>
        </div>

        <div className="footer__column" style={{ position: 'relative', zIndex: 1 }}>
          <h4 style={{ 
            fontWeight: '600', 
            marginBottom: '16px', 
            fontSize: '1.05rem',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            Fides Torino
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p style={{ fontSize: '0.95rem', opacity: 0.85, lineHeight: 1.6 }}>
              📍 Via Paolo Sacchi, 32<br/>10128 Torino (TO)
            </p>
            <p style={{ fontSize: '0.95rem', opacity: 0.85 }}>
              📞 <a href="tel:011 428 2544" style={{ 
                color: 'rgba(255, 255, 255, 0.9)', 
                textDecoration: 'none', 
                borderBottom: '1px dotted rgba(255,255,255,0.4)',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.borderBottomColor = 'rgba(0, 102, 255, 0.7)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.4)';
              }}
              >011 428 2544</a>
            </p>
            <p style={{ fontSize: '0.95rem', opacity: 0.85 }}>
              ✉️ <a href="mailto:info@fidesimmobiliare.it" style={{ 
                color: 'rgba(255, 255, 255, 0.9)', 
                textDecoration: 'none', 
                borderBottom: '1px dotted rgba(255,255,255,0.4)',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.borderBottomColor = 'rgba(0, 102, 255, 0.7)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.4)';
              }}
              >info@fidesimmobiliare.it</a>
            </p>
          </div>
        </div>
      </footer>

      {/* Copyright bar */}
      <div style={{
        background: '#0a0f1a',
        color: 'rgba(255, 255, 255, 0.6)',
        textAlign: 'center',
        padding: '20px 24px',
        fontSize: '0.85rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <p style={{ margin: 0 }}>
          © {new Date().getFullYear()} <strong style={{ color: '#ffffff' }}>Fides Immobiliare</strong>. Tutti i diritti riservati.
        </p>
      </div>

      <style>{`
        /* Footer responsive styles */
        @media (max-width: 768px) {
          .footer {
            grid-template-columns: 1fr !important;
            padding: 48px 24px 24px !important;
            gap: 36px !important;
          }

          .footer__column h4 {
            font-size: 1.15rem !important;
            margin-bottom: 14px !important;
          }

          .footer__column p {
            font-size: 0.9rem !important;
          }

          .footer__column a {
            font-size: 0.9rem !important;
          }
        }

        @media (max-width: 480px) {
          .footer {
            padding: 40px 20px 20px !important;
            gap: 32px !important;
          }

          .footer__column h4 {
            font-size: 1.1rem !important;
          }

          .footer__column svg {
            width: 16px !important;
            height: 16px !important;
          }
        }

        /* Touch device optimizations */
        @media (hover: none) and (pointer: coarse) {
          .footer a:hover {
            transform: none !important;
          }

          .footer a:active {
            opacity: 0.7;
          }
        }

        /* Safe area insets */
        @supports (padding: max(0px)) {
          .footer {
            padding-left: max(32px, env(safe-area-inset-left)) !important;
            padding-right: max(32px, env(safe-area-inset-right)) !important;
            padding-bottom: max(32px, env(safe-area-inset-bottom)) !important;
          }
        }
      `}</style>
    </>
  );
}