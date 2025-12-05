import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export function ChiSiamoPage() {
  const team = [
    {
      name: 'Niccolò Zanias',
      role: 'Agente Immobiliare - Fides Paesana',
      bio: 'Esperto di immobili in Valle Po e zone montane. Referente per la sede di Paesana.',
      image: 'https://i.pravatar.cc/300?img=12'
    },
    {
      name: 'XXXX',
      role: 'Agente Immobiliare - Fides Torino',
      bio: 'Referente per la sede di Torino. Specializzato in immobili urbani e centro città.',
      image: 'https://i.pravatar.cc/300?img=33'
    }
  ];

  return (
    <>
      <Navbar />
      
      <main style={{ marginTop: '64px', padding: '64px 24px', maxWidth: '1000px', margin: '64px auto' }}>
        <h1 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '16px' }}>Chi Siamo</h1>
        <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '48px', fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto 48px' }}>
          Fides Immobiliare opera con professionalità nel settore immobiliare con due sedi strategiche:
          Paesana in Valle Po e Torino centro. Offriamo consulenza personalizzata per vendita, acquisto e affitto di immobili.
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