import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { fetchPropertiesByBranch, type Property } from '../services/api';

export function TorinoPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
        // Filtra solo per Torino
        const torinoProperties = migratedProperties.filter((p: any) => p.branch === 'torino');
        setProperties(torinoProperties);
        setLoading(false);
      } catch (e) {
        console.error('Error loading properties:', e);
        // Fallback API
        fetchPropertiesByBranch('torino')
          .then(setProperties)
          .finally(() => setLoading(false));
      }
    } else {
      // Nessun immobile salvato, usa API mock
      fetchPropertiesByBranch('torino')
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
          backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.5), rgba(15, 23, 42, 0.7)), url(https://images.unsplash.com/photo-1549333728-0aa0eebf53c7?w=1600&q=80)',
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
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <h1 style={{ fontSize: '3rem', marginBottom: '16px', fontWeight: 'bold', textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}>
              Fides Torino
            </h1>
            <p style={{ fontSize: '1.2rem', textShadow: '0 1px 6px rgba(0,0,0,0.3)' }}>
              Appartamenti e investimenti nel cuore della città
            </p>
          </div>
        </section>

        {/* Properties Grid */}
        <section className="properties">
          <div className="properties__header">
            <h2 className="slide-in-left">Immobili Disponibili</h2>
            <p className="slide-in-right">Attici, appartamenti e soluzioni esclusive a Torino</p>
          </div>

          {loading && (
            <div style={{ textAlign: 'center', padding: '48px', color: '#6b7280' }}>
              <div className="spinner" style={{ borderColor: '#e5e7eb', borderTopColor: '#dc2626', width: '48px', height: '48px', margin: '0 auto 16px' }}></div>
              <p>Caricamento...</p>
            </div>
          )}

          {!loading && properties.length === 0 && (
            <p style={{ textAlign: 'center', padding: '48px', color: '#6b7280' }}>
              Nessun immobile disponibile al momento.
            </p>
          )}

          <div className="properties__grid">
            {properties.map(property => (
              <article
                key={property.id}
                className="property-card"
                onClick={() => navigate(`/immobile/${property.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <div
                  className="property-card__image"
                  style={{ 
                    backgroundImage: `url('${property.images[0]}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
                <div className="property-card__body">
                  <h3 className="property-card__title">{property.title}</h3>
                  <div className="property-card__meta">
                    📍 {property.location.city} • {property.details.rooms} locali • {property.details.sqm} m²
                  </div>
                  <div className="property-card__price">
                    {new Intl.NumberFormat('it-IT', { 
                      style: 'currency', 
                      currency: 'EUR', 
                      minimumFractionDigits: 0 
                    }).format(property.price)}
                    {property.type === 'rent' && '/mese'}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}