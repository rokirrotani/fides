import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  fullScreen?: boolean;
}

export function LoadingSpinner({ 
  size = 'medium', 
  color = '#0066ff',
  fullScreen = false 
}: LoadingSpinnerProps) {
  const sizes = {
    small: 24,
    medium: 48,
    large: 72
  };

  const spinnerSize = sizes[size];

  const spinnerStyle: React.CSSProperties = {
    width: `${spinnerSize}px`,
    height: `${spinnerSize}px`,
    border: `${spinnerSize / 12}px solid rgba(0, 102, 255, 0.1)`,
    borderTop: `${spinnerSize / 12}px solid ${color}`,
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite'
  };

  const containerStyle: React.CSSProperties = fullScreen ? {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(8px)',
    zIndex: 9999
  } : {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  };

  return (
    <div style={containerStyle}>
      <div style={spinnerStyle} />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
