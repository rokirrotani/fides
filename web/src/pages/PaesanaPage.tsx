import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { fetchPropertiesByBranch, type Property } from '../services/api';

export function PaesanaPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPropertiesByBranch('paesana')
      .then(setProperties)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      
      <main style={{ marginTop: '64px', minHeight: 'calc(100vh - 64px)' }}>
        {/* Hero Section */}
        <section className="hero" style={{
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
          <div>
            <h1 style={{ fontSize: '3rem', marginBottom: '16px', fontWeight: 'bold', textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}>
              Fides Paesana
            </h1>
            <p style={{ fontSize: '1.2rem', textShadow: '0 1px 6px rgba(0,0,0,0.3)' }}>
              Immobili esclusivi in Valle Po
            </p>
          </div>
        </section>

        {/* Properties Grid */}
        <section className="properties">
          <div className="properties__header">
            <h2>Immobili Disponibili</h2>
            <p>Case, appartamenti e baite a Paesana e dintorni</p>
          </div>

          {loading && <p style={{ textAlign: 'center', padding: '48px', color: '#6b7280' }}>Caricamento...</p>}

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