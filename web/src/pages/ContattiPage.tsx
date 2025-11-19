import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export function ContattiPage() {
  const offices = [
    {
      name: 'Fides Paesana',
      address: 'Via Esempio 1, 12034 Paesana (CN)',
      phone: '+39 0175 123456',
      email: 'paesana@fidesimmobiliare.it',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2845.123!2d7.274!3d44.687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDTCsDQxJzEzLjIiTiA3wrAxNiczMC40IkU!5e0!3m2!1sit!2sit!4v1234567890'
    },
    {
      name: 'Fides Torino',
      address: 'Via Roma 100, 10100 Torino (TO)',
      phone: '+39 011 987654',
      email: 'torino@fidesimmobiliare.it',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2817.8!2d7.685!3d45.070!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDA0JzEyLjAiTiA3wrA0MScwNi4wIkU!5e0!3m2!1sit!2sit!4v1234567890'
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
                <h2 style={{ marginBottom: '24px' }}>{office.name}</h2>
                <p style={{ marginBottom: '16px' }}>
                  <strong>📍 Indirizzo:</strong><br />
                  {office.address}
                </p>
                <p style={{ marginBottom: '16px' }}>
                  <strong>📞 Telefono:</strong><br />
                  <a href={`tel:${office.phone}`} style={{ color: '#dc2626' }}>{office.phone}</a>
                </p>
                <p style={{ marginBottom: '24px' }}>
                  <strong>✉️ Email:</strong><br />
                  <a href={`mailto:${office.email}`} style={{ color: '#dc2626' }}>{office.email}</a>
                </p>
                <a
                  href={office.mapUrl.replace('/embed', '')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary"
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