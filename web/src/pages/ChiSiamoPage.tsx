import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export function ChiSiamoPage() {
  const team = [
    {
      name: 'Marco Rossi',
      role: 'Fondatore & CEO',
      bio: 'Oltre 20 anni di esperienza nel settore immobiliare.',
      image: 'https://i.pravatar.cc/300?img=12'
    },
    {
      name: 'Laura Bianchi',
      role: 'Agente Fides Paesana',
      bio: 'Esperta di immobili in montagna e Valle Po.',
      image: 'https://i.pravatar.cc/300?img=45'
    },
    {
      name: 'Giovanni Verdi',
      role: 'Agente Fides Torino',
      bio: 'Specializzato in investimenti immobiliari urbani.',
      image: 'https://i.pravatar.cc/300?img=33'
    }
  ];

  return (
    <>
      <Navbar />
      
      <main style={{ marginTop: '64px', padding: '64px 24px', maxWidth: '1000px', margin: '64px auto' }}>
        <h1 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '16px' }}>Chi Siamo</h1>
        <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '48px', fontSize: '1.1rem' }}>
          Fides Immobiliare è un'agenzia con due sedi: Paesana e Torino. La nostra missione è offrire soluzioni immobiliari su misura.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px' }}>
          {team.map(member => (
            <div key={member.name} style={{ textAlign: 'center' }}>
              <img src={member.image} alt={member.name} style={{ width: '150px', height: '150px', borderRadius: '50%', marginBottom: '16px' }} />
              <h3 style={{ marginBottom: '4px' }}>{member.name}</h3>
              <p style={{ color: '#dc2626', fontWeight: 'bold', marginBottom: '8px' }}>{member.role}</p>
              <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>{member.bio}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}