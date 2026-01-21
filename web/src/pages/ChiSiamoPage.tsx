import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

function ChiSiamoPage() {
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);

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
      
      <main style={{ paddingTop: '120px', padding: '120px 24px 64px 24px', maxWidth: '1000px', margin: '0 auto' }}>
        <div className="fade-in">
          <div style={{ 
            textAlign: 'center', 
            marginBottom: '64px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #2c3e50, #34495e)',
              marginBottom: '24px',
              boxShadow: '0 8px 24px rgba(44, 62, 80, 0.3)'
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h1 className="slide-in-left" style={{ fontSize: '2.5rem', marginBottom: '16px', color: '#2c3e50', fontWeight: '700' }}>Chi Siamo</h1>
            <p className="slide-in-right" style={{ color: '#6b7280', fontSize: '1.1rem', maxWidth: '800px', lineHeight: '1.8' }}>
              Fides Immobiliare opera con professionalità nel settore immobiliare con due sedi strategiche:
              Paesana in Valle Po e Torino centro. Offriamo consulenza personalizzata per vendita, acquisto e affitto di immobili.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px' }}>
            {team.map((member, index) => (
              <div 
                key={member.name} 
                className="scale-in"
                style={{ 
                  textAlign: 'center',
                  padding: '32px',
                  borderRadius: '16px',
                  background: 'white',
                  boxShadow: hoveredMember === member.name ? '0 12px 32px rgba(0,0,0,0.15)' : '0 4px 16px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  transform: hoveredMember === member.name ? 'translateY(-8px) scale(1.05)' : 'translateY(0) scale(1)',
                  animationDelay: `${index * 0.2}s`,
                  cursor: 'pointer'
                }}
                onMouseEnter={() => setHoveredMember(member.name)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                <img 
                  src={member.image} 
                  alt={member.name} 
                  style={{ 
                    width: '150px', 
                    height: '150px', 
                    borderRadius: '50%', 
                    marginBottom: '16px',
                    border: '4px solid #f3f4f6',
                    transition: 'all 0.3s ease',
                    transform: hoveredMember === member.name ? 'scale(1.1)' : 'scale(1)'
                  }} 
                />
                <h3 style={{ marginBottom: '8px', fontSize: '1.3rem', color: '#2c3e50' }}>{member.name}</h3>
                <p style={{ color: '#dc2626', fontWeight: '600', marginBottom: '12px', fontSize: '0.95rem' }}>{member.role}</p>
                <p style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: '1.6' }}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          main {
            padding: 80px 16px 48px 16px !important;
          }

          h1 { font-size: 2rem !important; }

          /* Team grid */
          main > div > div:last-child {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }

        @media (max-width: 600px) {
          main {
            padding: 72px 14px 40px 14px !important;
          }

          h1 { font-size: 1.75rem !important; }
        }

        @media (max-width: 480px) {
          main { padding: 64px 12px 36px 12px !important; }
          h1 { font-size: 1.6rem !important; }
        }
      `}</style>
    </>
  );
}

export { ChiSiamoPage };