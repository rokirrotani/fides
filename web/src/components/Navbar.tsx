import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function Navbar() {
  const location = useLocation();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const isActive = (path: string) => location.pathname === path;
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const linkStyle = (path: string) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '16px 28px',
    color: isActive(path) ? '#0066ff' : 'rgba(0, 0, 0, 0.75)',
    textDecoration: 'none',
    fontSize: '1.05rem',
    fontWeight: isActive(path) ? 700 : 600,
    borderRadius: '14px',
    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
    background: isActive(path) 
      ? 'linear-gradient(135deg, rgba(0, 102, 255, 0.15), rgba(0, 80, 200, 0.15))' 
      : hoveredLink === path
        ? 'rgba(0, 102, 255, 0.1)'
        : 'transparent',
    transform: hoveredLink === path ? 'translateY(-2px)' : 'translateY(0)',
    boxShadow: hoveredLink === path 
      ? '0 6px 20px rgba(0, 102, 255, 0.3), 0 0 30px rgba(0, 102, 255, 0.15)' 
      : isActive(path)
        ? '0 0 25px rgba(0, 102, 255, 0.3), inset 0 0 20px rgba(0, 102, 255, 0.1)'
        : 'none',
    position: 'relative' as const,
    letterSpacing: '0.02em',
  });
  
  return (
    <>
      {/* TOP BAR - BLU ELETTRICO */}
      <div 
        className="top-bar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '44px',
          background: 'linear-gradient(135deg, #0052c8 0%, #0066ff 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 56px',
          zIndex: 101,
          boxShadow: '0 2px 12px rgba(0, 102, 255, 0.3)',
          fontSize: '0.875rem',
          color: '#ffffff',
          borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
          willChange: 'transform',
          backfaceVisibility: 'hidden' as const,
          perspective: 1000,
        }}
      >
        <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
          <a href="tel:+39011428254" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: 'rgba(255, 255, 255, 0.95)',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            padding: '6px 12px',
            borderRadius: '8px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#ffffff';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.95)';
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span style={{ fontWeight: 500 }}>+39 011 428 2544</span>
          </a>
          
          <a href="mailto:info@fidesimmobiliare.it" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: 'rgba(255, 255, 255, 0.95)',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            padding: '6px 12px',
            borderRadius: '8px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#ffffff';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.95)';
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <rect x="2" y="4" width="20" height="16" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </svg>
            <span style={{ fontWeight: 500 }}>info@fidesimmobiliare.it</span>
          </a>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: '#ffffff',
            padding: '6px 12px',
            borderRadius: '8px',
            background: 'rgba(255, 255, 255, 0.12)'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span style={{ fontWeight: 500 }}>Piemonte, Italia</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{
            color: 'rgba(255, 255, 255, 0.9)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px',
            borderRadius: '8px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#ffffff';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{
            color: 'rgba(255, 255, 255, 0.9)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px',
            borderRadius: '8px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#ffffff';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <circle cx="17.5" cy="6.5" r="1.5"></circle>
            </svg>
          </a>
        </div>
      </div>

      {/* MAIN NAVBAR - BIANCA */}
      <header 
        className="main-navbar"
        style={{
          position: 'fixed',
          top: '44px',
          left: 0,
          right: 0,
          height: '100px',
          padding: '0 56px',
          background: '#ffffff',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 100,
          boxShadow: scrolled
            ? '0 8px 40px rgba(0, 102, 255, 0.25), 0 2px 16px rgba(0, 0, 0, 0.1)'
            : '0 4px 24px rgba(0, 102, 255, 0.15)',
          transition: 'box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          borderBottom: '2px solid rgba(0, 102, 255, 0.15)',
          willChange: 'box-shadow',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden' as const,
          perspective: 1000,
          contain: 'layout style paint' as any
        }}>

        {/* LOGO */}
        <Link
          to="/"
          onClick={(e) => {
            if (location.pathname === '/') {
              e.preventDefault();
              scrollToTop();
            }
          }}
          style={{ 
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            transition: 'all 0.35s ease',
            transform: hoveredLink === 'logo' ? 'scale(1.05)' : 'scale(1)',
            filter: hoveredLink === 'logo' 
              ? 'drop-shadow(0 8px 20px rgba(0, 102, 255, 0.5))' 
              : 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15))',
            textDecoration: 'none',
            willChange: 'transform, filter',
            backfaceVisibility: 'hidden' as const
          }}
          onMouseEnter={() => setHoveredLink('logo')}
          onMouseLeave={() => setHoveredLink(null)}
        >
          <img 
            src="/logo.png" 
            alt="Fides Logo"
            style={{
              height: '64px',
              width: 'auto',
              willChange: 'transform'
            }}
            loading="lazy"
          />
        </Link>

        {/* Hamburger button for mobile */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'none',
            background: 'rgba(0, 102, 255, 0.15)',
            border: '2px solid rgba(0, 102, 255, 0.3)',
            borderRadius: '12px',
            color: '#0066ff',
            cursor: 'pointer',
            padding: '12px',
            zIndex: 102,
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            backfaceVisibility: 'hidden' as const
          }}
          className="mobile-menu-toggle"
        >
          {mobileMenuOpen ? (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>

        {/* Desktop Navigation */}
        <nav 
          className="desktop-nav"
          style={{ 
            display: 'flex', 
            gap: '8px', 
            alignItems: 'center',
            backfaceVisibility: 'hidden' as const
          }}
        >
          <Link 
            to="/" 
            style={linkStyle('/')}
            onMouseEnter={() => setHoveredLink('/')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="5" width="18" height="14" rx="2"></rect>
              <polyline points="3 7 12 13 21 7"></polyline>
            </svg>
            Contatti
          </Link>

          <Link 
            to="/admin"
            style={{
              ...linkStyle('/admin'),
              marginLeft: '16px',
              background: isActive('/admin')
                ? 'linear-gradient(135deg, rgba(0, 102, 255, 0.2), rgba(0, 80, 200, 0.2))'
                : hoveredLink === '/admin'
                  ? 'rgba(0, 102, 255, 0.12)'
                  : 'rgba(0, 102, 255, 0.08)',
              border: '1.5px solid rgba(0, 102, 255, 0.4)',
            }}
            onMouseEnter={() => setHoveredLink('/admin')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
              <polyline points="10 17 15 12 10 7"></polyline>
              <line x1="15" y1="12" x2="3" y2="12"></line>
            </svg>
            Accedi
          </Link>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav 
            className="mobile-nav"
            style={{
              position: 'fixed',
              top: '80px',
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)',
              display: 'flex',
              flexDirection: 'column',
              padding: '32px 24px',
              gap: '14px',
              zIndex: 101,
              animation: 'slideDown 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              borderTop: '2px solid rgba(0, 102, 255, 0.15)',
              overflowY: 'auto',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              backfaceVisibility: 'hidden' as const
            }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Link to="/" style={{...linkStyle('/'), justifyContent: 'center', fontSize: '1.15rem'}}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              </svg>
              Home
            </Link>
            <Link to="/chi-siamo" style={{...linkStyle('/chi-siamo'), justifyContent: 'center', fontSize: '1.15rem'}}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
              </svg>
              Chi Siamo
            </Link>
            <Link to="/vendi-casa" style={{...linkStyle('/vendi-casa'), justifyContent: 'center', fontSize: '1.15rem'}}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              </svg>
              Vendi Immobile
            </Link>
            <Link to="/compra-casa" style={{...linkStyle('/compra-casa'), justifyContent: 'center', fontSize: '1.15rem'}}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"></circle>
              </svg>
              Cerca Immobile
            </Link>
            <Link to="/contatti" style={{...linkStyle('/contatti'), justifyContent: 'center', fontSize: '1.15rem'}}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                <polyline points="3 7 12 13 21 7"></polyline>
              </svg>
              Contatti
            </Link>
            <Link to="/admin" style={{...linkStyle('/admin'), justifyContent: 'center', fontSize: '1.15rem', border: '1.5px solid rgba(0, 102, 255, 0.4)', marginTop: '12px'}}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                <polyline points="10 17 15 12 10 7"></polyline>
                <line x1="15" y1="12" x2="3" y2="12"></line>
              </svg>
              Accedi
            </Link>
          </nav>
        )}
      </header>

      {/* CSS per le animazioni */}
      <style>{`
        body {
          padding-top: 144px;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Tablet and smaller desktop */
        @media (max-width: 1100px) {
          body {
            padding-top: 80px !important;
          }

          .desktop-nav {
            display: none !important;
          }
          
          .mobile-menu-toggle {
            display: block !important;
          }

          .top-bar {
            display: none !important;
          }

          .main-navbar {
            top: 0 !important;
            height: 80px !important;
            padding: 0 24px !important;
            background: #ffffff !important;
            backdrop-filter: blur(20px) !important;
            -webkit-backdrop-filter: blur(20px) !important;
          }

          .main-navbar img {
            height: 52px !important;
          }
        }

        /* Mobile phones */
        @media (max-width: 768px) {
          body {
            padding-top: 70px !important;
          }

          .main-navbar {
            height: 70px !important;
            padding: 0 20px !important;
          }

          .main-navbar img {
            height: 46px !important;
          }

          .mobile-nav {
            top: 70px !important;
          }
        }

        /* Very small phones */
        @media (max-width: 480px) {
          body {
            padding-top: 64px !important;
          }

          .main-navbar {
            height: 64px !important;
            padding: 0 16px !important;
          }

          .main-navbar img {
            height: 42px !important;
          }

          .mobile-nav {
            top: 64px !important;
          }
        }

        /* Smooth transitions */
        .main-navbar {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          will-change: box-shadow;
          contain: layout style paint;
        }

        .desktop-nav {
          will-change: auto;
        }
      `}</style>
    </>
  );
}