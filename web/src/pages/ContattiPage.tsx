import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export function ContattiPage() {
  const [hoveredOffice, setHoveredOffice] = useState<string | null>(null);

  const offices = [
    {
      name: 'Immobiliare Fides - Paesana',
      address: 'Via Po, 1, 12034 Paesana CN',
      phone: '011 428 2544',
      email: 'paesana@fidesimmobiliare.it',
      rating: '4.9',
      reviews: '39 recensioni',
      hours: 'Lun-Gio: 09-13, 14-19:30 | Ven: 09-13, 14-19:30 | Sab: 09-18 | Dom: Chiuso',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2845.9!2d7.2744!3d44.6872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12cd4f6c0d0a0001%3A0x1234567890abcdef!2sVia%20Po%2C%201%2C%2012034%20Paesana%20CN!5e0!3m2!1sit!2sit!4v1234567890',
      icon: '🏔️'
    },
    {
      name: 'Immobiliare Fides - Torino',
      address: 'Via Paolo Sacchi, 32, 10128 Torino TO',
      phone: '011 428 2544',
      email: 'torino@fidesimmobiliare.it',
      rating: '5.0',
      reviews: '62 recensioni',
      hours: 'Apre mar alle 09:00',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2818.2!2d7.6857!3d45.0646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47886d71a4b6d0a1%3A0x1234567890fedcba!2sVia%20Paolo%20Sacchi%2C%2032%2C%2010128%20Torino%20TO!5e0!3m2!1sit!2sit!4v1234567890',
      icon: '🏙️'
    }
  ];

  return (
    <>
      <Navbar />
      
      <main style={{ marginTop: '72px', padding: '64px 24px', background: '#ffffff' }}>
        <div className="fade-in" style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            width: '56px',
            height: '56px',
            borderRadius: '12px',
            background: '#2c3e50',
            marginBottom: '20px',
            boxShadow: '0 4px 16px rgba(44, 62, 80, 0.15)'
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
          <h1 style={{ 
            fontSize: '2.5rem', 
            marginBottom: '16px', 
            color: '#2c3e50', 
            fontWeight: '700',
            letterSpacing: '-0.02em'
          }}>
            Le Nostre Sedi
          </h1>
          <p style={{ 
            fontSize: '1.125rem', 
            color: '#666', 
            maxWidth: '700px', 
            margin: '0 auto', 
            lineHeight: '1.7',
            fontWeight: '400'
          }}>
            Vieni a trovarci nelle nostre sedi per una consulenza personalizzata e professionale.
          </p>
        </div>

        {offices.map((office, index) => (
          <section 
            key={office.name} 
            className="scale-in"
            style={{ 
              maxWidth: '1280px', 
              margin: '0 auto 48px', 
              background: '#f8f9fa', 
              borderRadius: '20px', 
              overflow: 'hidden', 
              boxShadow: hoveredOffice === office.name 
                ? '0 20px 40px rgba(44, 62, 80, 0.12)' 
                : '0 4px 16px rgba(44, 62, 80, 0.06)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: hoveredOffice === office.name ? 'translateY(-4px)' : 'translateY(0)',
              animationDelay: `${index * 0.15}s`,
              border: '1px solid #e8ecef'
            }}
            onMouseEnter={() => setHoveredOffice(office.name)}
            onMouseLeave={() => setHoveredOffice(null)}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }} className="contatti-office-card">
              {/* Info */}
              <div style={{ padding: '56px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#ffffff' }} className="contatti-office-info">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }} className="contatti-office-title">
                  <span style={{ fontSize: '2rem' }}>{office.icon}</span>
                  <h2 style={{ 
                    fontSize: '1.75rem', 
                    color: '#2c3e50', 
                    fontWeight: '700', 
                    margin: 0,
                    letterSpacing: '-0.01em'
                  }}>
                    {office.name}
                  </h2>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px', paddingBottom: '24px', borderBottom: '1px solid #e8ecef' }}>
                  <span style={{ fontSize: '1.25rem' }}>⭐</span>
                  <span style={{ color: '#2c3e50', fontWeight: '700', fontSize: '1.125rem' }}>{office.rating}</span>
                  <span style={{ color: '#999', fontSize: '0.925rem', fontWeight: '500' }}>({office.reviews})</span>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: '#f0f4f8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2c3e50" strokeWidth="2.5">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <strong style={{ color: '#2c3e50', fontSize: '0.925rem', fontWeight: '600', display: 'block', marginBottom: '4px' }}>Indirizzo</strong>
                      <span style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.5' }}>{office.address}</span>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: '#f0f4f8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2c3e50" strokeWidth="2.5">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <strong style={{ color: '#2c3e50', fontSize: '0.925rem', fontWeight: '600', display: 'block', marginBottom: '4px' }}>Telefono</strong>
                      <a href={`tel:${office.phone.replace(/\s/g, '')}`} style={{ 
                        color: '#2c3e50', 
                        textDecoration: 'none', 
                        fontWeight: '600',
                        fontSize: '0.95rem',
                        transition: 'color 0.2s',
                        display: 'inline-block'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.color = '#555'}
                      onMouseOut={(e) => e.currentTarget.style.color = '#2c3e50'}
                      >
                        {office.phone}
                      </a>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: '#f0f4f8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2c3e50" strokeWidth="2.5">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <strong style={{ color: '#2c3e50', fontSize: '0.925rem', fontWeight: '600', display: 'block', marginBottom: '4px' }}>Email</strong>
                      <a href={`mailto:${office.email}`} style={{ 
                        color: '#666', 
                        textDecoration: 'none',
                        fontSize: '0.95rem',
                        transition: 'color 0.2s',
                        wordBreak: 'break-all'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.color = '#2c3e50'}
                      onMouseOut={(e) => e.currentTarget.style.color = '#666'}
                      >
                        {office.email}
                      </a>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: '#f0f4f8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2c3e50" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <strong style={{ color: '#2c3e50', fontSize: '0.925rem', fontWeight: '600', display: 'block', marginBottom: '4px' }}>Orari</strong>
                      <span style={{ color: '#666', fontSize: '0.875rem', lineHeight: '1.6' }}>{office.hours}</span>
                    </div>
                  </div>
                </div>
                
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ 
                    marginTop: '32px', 
                    textAlign: 'center',
                    padding: '14px 28px',
                    background: '#2c3e50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    textDecoration: 'none',
                    display: 'inline-block',
                    width: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 4px 12px rgba(44, 62, 80, 0.2)',
                    letterSpacing: '0.01em'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(44, 62, 80, 0.3)';
                    e.currentTarget.style.background = '#1a252f';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(44, 62, 80, 0.2)';
                    e.currentTarget.style.background = '#2c3e50';
                  }}
                >
                  Apri in Google Maps →
                </a>
              </div>

              {/* Map */}
              <div style={{ position: 'relative', overflow: 'hidden' }} className="contatti-map-container">
                <iframe
                  src={office.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '600px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Mappa ${office.name}`}
                />
              </div>
            </div>
          </section>
        ))}
      </main>

      <Footer />
    </>
  );
}