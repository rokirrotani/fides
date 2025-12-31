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
      
      <main style={{ marginTop: '56px', padding: '48px 24px', background: '#ffffff' }}>
        <div className="fade-in" style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            width: '48px',
            height: '48px',
            borderRadius: '8px',
            background: '#0f172a',
            marginBottom: '16px'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
          <h1 style={{ fontSize: '2rem', marginBottom: '12px', color: '#0f172a', fontWeight: '600' }}>Contatti</h1>
          <p style={{ fontSize: '1rem', color: '#6b7280', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            Visita le nostre sedi per qualsiasi informazione.
          </p>
        </div>

        {offices.map((office, index) => (
          <section 
            key={office.name} 
            className="scale-in"
            style={{ 
              maxWidth: '1200px', 
              margin: '0 auto 64px', 
              background: '#fff', 
              borderRadius: '16px', 
              overflow: 'hidden', 
              boxShadow: hoveredOffice === office.name ? '0 12px 32px rgba(0,0,0,0.2)' : '0 4px 16px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              transform: hoveredOffice === office.name ? 'translateY(-8px)' : 'translateY(0)',
              animationDelay: `${index * 0.2}s`,
              border: '1px solid #f3f4f6'
            }}
            onMouseEnter={() => setHoveredOffice(office.name)}
            onMouseLeave={() => setHoveredOffice(null)}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
              {/* Info */}
              <div style={{ padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '2rem' }}>{office.icon}</span>
                  <h2 style={{ fontSize: '1.8rem', color: '#2c3e50', fontWeight: '700', margin: 0 }}>{office.name}</h2>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                  <span style={{ fontSize: '1.5rem' }}>⭐</span>
                  <span style={{ color: '#f59e0b', fontWeight: '600', fontSize: '1.1rem' }}>{office.rating}</span>
                  <span style={{ color: '#9ca3af', fontSize: '0.95rem' }}>({office.reviews})</span>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" style={{ flexShrink: 0, marginTop: '2px' }}>
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <div>
                      <strong style={{ color: '#2c3e50' }}>Indirizzo</strong><br />
                      <span style={{ color: '#6b7280' }}>{office.address}</span>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" style={{ flexShrink: 0, marginTop: '2px' }}>
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <div>
                      <strong style={{ color: '#2c3e50' }}>Telefono</strong><br />
                      <a href={`tel:${office.phone.replace(/\s/g, '')}`} style={{ color: '#16a34a', textDecoration: 'none', fontWeight: '600', transition: 'color 0.2s' }}>{office.phone}</a>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" style={{ flexShrink: 0, marginTop: '2px' }}>
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <div>
                      <strong style={{ color: '#2c3e50' }}>Email</strong><br />
                      <a href={`mailto:${office.email}`} style={{ color: '#2563eb', textDecoration: 'none', transition: 'color 0.2s' }}>{office.email}</a>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" style={{ flexShrink: 0, marginTop: '2px' }}>
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <div>
                      <strong style={{ color: '#2c3e50' }}>Orari</strong><br />
                      <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>{office.hours}</span>
                    </div>
                  </div>
                </div>
                
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary"
                  style={{ marginTop: '24px', textAlign: 'center' }}
                >
                  Apri in Google Maps
                </a>
              </div>

              {/* Map */}
              <iframe
                src={office.mapUrl}
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Mappa ${office.name}`}
              />
            </div>
          </section>
        ))}
      </main>

      <Footer />
    </>
  );
}