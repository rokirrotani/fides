import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export function ContattiPage() {
  const offices = [
    {
      name: '🏔️ Immobiliare Fides - Paesana',
      address: 'Via Po, 1, 12034 Paesana CN',
      phone: '011 428 2544',
      email: 'paesana@fidesimmobiliare.it',
      rating: '4.9 ⭐ (39 recensioni)',
      hours: 'Lun-Gio: 09-13, 14-19:30 | Ven: 09-13, 14-19:30 | Sab: 09-18 | Dom: Chiuso',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2845.9!2d7.2744!3d44.6872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12cd4f6c0d0a0001%3A0x1234567890abcdef!2sVia%20Po%2C%201%2C%2012034%20Paesana%20CN!5e0!3m2!1sit!2sit!4v1234567890'
    },
    {
      name: '🏙️ Immobiliare Fides - Torino',
      address: 'Via Paolo Sacchi, 32, 10128 Torino TO',
      phone: '011 428 2544',
      email: 'torino@fidesimmobiliare.it',
      rating: '5.0 ⭐ (62 recensioni)',
      hours: 'Apre mar alle 09:00',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2818.2!2d7.6857!3d45.0646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47886d71a4b6d0a1%3A0x1234567890fedcba!2sVia%20Paolo%20Sacchi%2C%2032%2C%2010128%20Torino%20TO!5e0!3m2!1sit!2sit!4v1234567890'
    }
  ];

  return (
    <>
      <Navbar />
      
      <main style={{ marginTop: '64px', padding: '64px 24px' }}>
        <h1 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '48px' }}>Contattaci</h1>

        {offices.map(office => (
          <section key={office.name} style={{ maxWidth: '1200px', margin: '0 auto 64px', background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
              {/* Info */}
              <div style={{ padding: '48px' }}>
                <h2 style={{ marginBottom: '12px', fontSize: '1.8rem' }}>{office.name}</h2>
                <p style={{ marginBottom: '24px', color: '#f59e0b', fontWeight: '600' }}>{office.rating}</p>
                
                <p style={{ marginBottom: '16px' }}>
                  <strong>📍 Indirizzo:</strong><br />
                  {office.address}
                </p>
                <p style={{ marginBottom: '16px' }}>
                  <strong>📞 Telefono:</strong><br />
                  <a href={`tel:${office.phone.replace(/\s/g, '')}`} style={{ color: '#dc2626', textDecoration: 'none', fontWeight: '600' }}>{office.phone}</a>
                </p>
                <p style={{ marginBottom: '16px' }}>
                  <strong>✉️ Email:</strong><br />
                  <a href={`mailto:${office.email}`} style={{ color: '#dc2626', textDecoration: 'none' }}>{office.email}</a>
                </p>
                <p style={{ marginBottom: '24px', fontSize: '0.9rem', color: '#6b7280' }}>
                  <strong>🕐 Orari:</strong><br />
                  {office.hours}
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary"
                  style={{ display: 'inline-block', padding: '12px 24px', background: '#dc2626', color: 'white', textDecoration: 'none', borderRadius: '8px', fontWeight: '600' }}
                >
                  🗺️ Apri in Google Maps
                </a>
              </div>

              {/* Map */}
              <iframe
                src={office.mapUrl}
                width="100%"
                height="400"
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