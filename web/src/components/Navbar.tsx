import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export function Navbar() {
  const location = useLocation();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;
  
  const linkStyle = (path: string) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 14px',
    color: isActive(path) ? '#ffffff' : 'rgba(255, 255, 255, 0.85)',
    textDecoration: 'none',
    fontSize: '0.875rem',
    fontWeight: isActive(path) ? 600 : 500,
    borderRadius: '6px',
    transition: 'all 0.3s ease',
    background: isActive(path) ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
    transform: hoveredLink === path ? 'translateY(-2px)' : 'translateY(0)',
    boxShadow: hoveredLink === path ? '0 4px 12px rgba(0, 0, 0, 0.3)' : 'none'
  });
  
  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '56px',
      padding: '0 16px',
      background: '#0f172a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      zIndex: 100,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
    }}>
      <Link to="/" style={{ 
        textDecoration: 'none', 
        color: '#ffffff',
        fontWeight: 700,
        fontSize: '1.1rem',
        letterSpacing: '0.05em',
        textTransform: 'uppercase'
      }}>
        FIDES
      </Link>

      {/* Hamburger button for mobile */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        style={{
          display: 'none',
          background: 'transparent',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          padding: '8px',
          zIndex: 102
        }}
        className="mobile-menu-toggle"
      >
        {mobileMenuOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        )}
      </button>

      {/* Desktop Navigation */}
      <nav 
        className="desktop-nav"
        style={{ display: 'flex', gap: '4px', alignItems: 'center' }}
      >
        <Link 
          to="/" 
          style={linkStyle('/')}
          onMouseEnter={() => setHoveredLink('/')}
          onMouseLeave={() => setHoveredLink(null)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          Home
        </Link>
        
        <Link 
          to="/chi-siamo"
          style={linkStyle('/chi-siamo')}
          onMouseEnter={() => setHoveredLink('/chi-siamo')}
          onMouseLeave={() => setHoveredLink(null)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          Chi Siamo
        </Link>
        
        <Link 
          to="/vendi-casa" 
          style={linkStyle('/vendi-casa')}
          onMouseEnter={() => setHoveredLink('/vendi-casa')}
          onMouseLeave={() => setHoveredLink(null)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          Vendi Immobile
        </Link>
        
        <Link 
          to="/compra-casa" 
          style={linkStyle('/compra-casa')}
          onMouseEnter={() => setHoveredLink('/compra-casa')}
          onMouseLeave={() => setHoveredLink(null)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          Cerca Immobile
        </Link>
        
        <Link 
          to="/contatti"
          style={linkStyle('/contatti')}
          onMouseEnter={() => setHoveredLink('/contatti')}
          onMouseLeave={() => setHoveredLink(null)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          Contatti
        </Link>
        
        <Link 
          to="/admin"
          style={linkStyle('/admin')}
          onMouseEnter={() => setHoveredLink('/admin')}
          onMouseLeave={() => setHoveredLink(null)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          Admin
        </Link>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav 
          className="mobile-nav"
          style={{
            position: 'fixed',
            top: '56px',
            left: 0,
            right: 0,
            bottom: 0,
            background: '#0f172a',
            display: 'flex',
            flexDirection: 'column',
            padding: '24px 16px',
            gap: '8px',
            zIndex: 101,
            animation: 'fadeIn 0.3s ease-out'
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <Link 
            to="/" 
            style={{
              ...linkStyle('/'),
              width: '100%',
              padding: '14px 16px',
              fontSize: '1rem'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            Home
          </Link>
          
          <Link 
            to="/chi-siamo"
            style={{
              ...linkStyle('/chi-siamo'),
              width: '100%',
              padding: '14px 16px',
              fontSize: '1rem'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            Chi Siamo
          </Link>
          
          <Link 
            to="/vendi-casa" 
            style={{
              ...linkStyle('/vendi-casa'),
              width: '100%',
              padding: '14px 16px',
              fontSize: '1rem'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            Vendi Immobile
          </Link>
          
          <Link 
            to="/compra-casa" 
            style={{
              ...linkStyle('/compra-casa'),
              width: '100%',
              padding: '14px 16px',
              fontSize: '1rem'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            Cerca Immobile
          </Link>
          
          <Link 
            to="/contatti"
            style={{
              ...linkStyle('/contatti'),
              width: '100%',
              padding: '14px 16px',
              fontSize: '1rem'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            Contatti
          </Link>
          
          <Link 
            to="/admin"
            style={{
              ...linkStyle('/admin'),
              width: '100%',
              padding: '14px 16px',
              fontSize: '1rem'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            Admin
          </Link>
        </nav>
      )}
    </header>
  );
}