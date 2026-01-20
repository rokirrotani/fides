import { useState, useEffect } from 'react';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="scroll-to-top"
          aria-label="Torna su"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #0066ff, #0052c8)',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(0, 102, 255, 0.4)',
            zIndex: 1000,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            animation: 'fadeInUp 0.4s ease-out',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 102, 255, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 102, 255, 0.4)';
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>
      )}

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .scroll-to-top:active {
          transform: scale(0.95) !important;
        }

        @media (max-width: 768px) {
          .scroll-to-top {
            width: 52px !important;
            height: 52px !important;
            bottom: 20px !important;
            right: 20px !important;
          }

          .scroll-to-top svg {
            width: 20px;
            height: 20px;
          }
        }

        @media (max-width: 480px) {
          .scroll-to-top {
            width: 48px !important;
            height: 48px !important;
            bottom: 16px !important;
            right: 16px !important;
          }

          .scroll-to-top svg {
            width: 18px;
            height: 18px;
          }
        }

        /* Touch device optimizations */
        @media (hover: none) and (pointer: coarse) {
          .scroll-to-top:hover {
            transform: none !important;
          }
        }

        /* Safe area for notched devices */
        @supports (padding: max(0px)) {
          .scroll-to-top {
            bottom: max(24px, calc(24px + env(safe-area-inset-bottom))) !important;
            right: max(24px, calc(24px + env(safe-area-inset-right))) !important;
          }
        }
      `}</style>
    </>
  );
}
