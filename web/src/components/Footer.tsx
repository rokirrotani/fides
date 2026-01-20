export function Footer() {
  return (
    <footer id="contacts" className="footer">
      <div className="footer__column">
        <h4 style={{ fontWeight: '600', marginBottom: '12px', fontSize: '1.1rem' }}>Fides Immobiliare</h4>
        <p style={{ opacity: 0.85, fontSize: '0.95rem', marginBottom: '16px' }}>Soluzioni su misura a Paesana e Torino.</p>
        
        {/* Link Legali iubenda */}
        <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
          <p style={{ fontSize: '0.85rem', opacity: 0.9, marginBottom: '8px' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '4px', verticalAlign: 'middle' }}>
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            Informazioni Legali
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem' }}>
            <a 
              href="https://www.iubenda.com/privacy-policy/12345678" 
              className="iubenda-white iubenda-noiframe iubenda-embed iubenda-noiframe"
              title="Privacy Policy"
              style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none', borderBottom: '1px solid transparent', transition: 'all 0.3s', display: 'inline-block' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255,255,255,0.85)';
                e.currentTarget.style.borderBottomColor = 'transparent';
              }}
            >
              Privacy Policy
            </a>
            <a 
              href="https://www.iubenda.com/privacy-policy/12345678/cookie-policy" 
              className="iubenda-white iubenda-noiframe iubenda-embed iubenda-noiframe"
              title="Cookie Policy"
              style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none', borderBottom: '1px solid transparent', transition: 'all 0.3s', display: 'inline-block' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255,255,255,0.85)';
                e.currentTarget.style.borderBottomColor = 'transparent';
              }}
            >
              Cookie Policy
            </a>
            <a 
              href="#" 
              className="iubenda-cs-preferences-link"
              style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none', borderBottom: '1px solid transparent', transition: 'all 0.3s', display: 'inline-block', cursor: 'pointer' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255,255,255,0.85)';
                e.currentTarget.style.borderBottomColor = 'transparent';
              }}
            >
              🍪 Preferenze Cookie
            </a>
          </div>
          <p style={{ fontSize: '0.75rem', opacity: 0.6, marginTop: '12px' }}>
            © {new Date().getFullYear()} Fides Immobiliare. Tutti i diritti riservati.
          </p>
        </div>
      </div>

      <div className="footer__column">
        <h4 style={{ fontWeight: '600', marginBottom: '12px', fontSize: '1rem' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px', verticalAlign: 'middle' }}>
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          Fides Paesana
        </h4>
        <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Via Po, 1, 12034 Paesana CN</p>
        <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
          Tel: <a href="tel:011 428 2544" style={{ color: 'inherit', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.3)', transition: 'border-color 0.3s' }}>011 428 2544</a>
        </p>
        <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Orari: Lun-Gio 09-13, 14-19:30</p>
      </div>

      <div className="footer__column">
        <h4 style={{ fontWeight: '600', marginBottom: '12px', fontSize: '1rem' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px', verticalAlign: 'middle' }}>
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          Fides Torino
        </h4>
        <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Via Paolo Sacchi, 32, 10128 Torino TO</p>
        <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
          Tel: <a href="tel:011 428 2544" style={{ color: 'inherit', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.3)', transition: 'border-color 0.3s' }}>011 428 2544</a>
        </p>
        <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
          Email: <a href="mailto:info@fidesimmobiliare.it" style={{ color: 'inherit', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.3)', transition: 'border-color 0.3s' }}>info@fidesimmobiliare.it</a>
        </p>
      </div>
    </footer>
  );
}