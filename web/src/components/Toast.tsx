import { useState, useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  onClose?: () => void;
}

export function Toast({ message, type = 'info', duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose?.(), 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const backgrounds = {
    success: 'linear-gradient(135deg, #10b981, #059669)',
    error: 'linear-gradient(135deg, #ef4444, #dc2626)',
    warning: 'linear-gradient(135deg, #f59e0b, #d97706)',
    info: 'linear-gradient(135deg, #0066ff, #0052c8)'
  };

  const icons = {
    success: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    ),
    error: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
    ),
    warning: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
    ),
    info: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
    )
  };

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: isVisible ? '24px' : '-100px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: backgrounds[type],
          color: 'white',
          padding: '16px 24px',
          borderRadius: '12px',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          zIndex: 10000,
          maxWidth: '90vw',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          opacity: isVisible ? 1 : 0,
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          {icons[type]}
        </div>
        <div style={{ 
          fontSize: '0.95rem', 
          fontWeight: 500,
          lineHeight: 1.4
        }}>
          {message}
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => onClose?.(), 300);
          }}
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            borderRadius: '6px',
            color: 'white',
            cursor: 'pointer',
            padding: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            flexShrink: 0,
            marginLeft: '8px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          [style*="position: fixed"][style*="top:"] > div {
            padding: 14px 20px !important;
            font-size: 0.9rem !important;
          }
        }

        @media (max-width: 480px) {
          [style*="position: fixed"][style*="top:"] {
            max-width: calc(100vw - 32px) !important;
          }
        }

        /* Safe area for notched devices */
        @supports (padding: max(0px)) {
          [style*="position: fixed"][style*="top:"] {
            top: max(24px, env(safe-area-inset-top)) !important;
          }
        }
      `}</style>
    </>
  );
}
