import { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { PropertiesGrid } from '../components/PropertiesGrid';
import { fetchPropertiesByBranch, type Property } from '../services/api';

export function PaesanaPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carica immobili dal localStorage (creati dall'admin)
    const savedProperties = localStorage.getItem('fides_properties');
    if (savedProperties) {
      try {
        const allProperties = JSON.parse(savedProperties);
        // Aggiungi status: 'available' alle proprietà esistenti che non ce l'hanno
        const migratedProperties = allProperties.map((p: any) => ({
          ...p,
          status: p.status || 'available'
        }));
        // Filtra solo per Paesana
        const paesanaProperties = migratedProperties.filter((p: any) => p.branch === 'paesana');
        setProperties(paesanaProperties);
        setLoading(false);
      } catch (e) {
        console.error('Error loading properties:', e);
        // Fallback API
        fetchPropertiesByBranch('paesana')
          .then(setProperties)
          .finally(() => setLoading(false));
      }
    } else {
      // Nessun immobile salvato, usa API mock
      fetchPropertiesByBranch('paesana')
        .then(setProperties)
        .finally(() => setLoading(false));
    }
  }, []);

  return (
    <>
      <Navbar />
      
      <main style={{ marginTop: '56px', minHeight: 'calc(100vh - 56px)' }}>
        {/* Hero Section */}
        <section className="hero fade-in" style={{
          backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.5), rgba(15, 23, 42, 0.7)), url(/zani1.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center'
        }}>
          <div className="scale-in">
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              marginBottom: '24px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)'
            }} className="float">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
            <h1 style={{ fontSize: '3rem', marginBottom: '16px', fontWeight: 'bold', textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}>
              Fides Paesana
            </h1>
            <p style={{ fontSize: '1.2rem', textShadow: '0 1px 6px rgba(0,0,0,0.3)' }}>
              Immobili esclusivi in Valle Po
            </p>
          </div>
        </section>

        {/* Properties Grid */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '48px', color: '#6b7280' }}>
            <div className="spinner" style={{ borderColor: '#e5e7eb', borderTopColor: '#dc2626', width: '48px', height: '48px', margin: '0 auto 16px' }}></div>
            <p>Caricamento...</p>
          </div>
        )}

        {!loading && <PropertiesGrid branch="paesana" properties={properties} />}
      </main>

      <Footer />
    </>
  );
}