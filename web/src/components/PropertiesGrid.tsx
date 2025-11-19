import type { Property } from '../services/api';

interface PropertiesGridProps {
  branch: 'paesana' | 'torino' | null;
  properties: Property[];
}

function formatPrice(value: number): string {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

export function PropertiesGrid({ branch, properties }: PropertiesGridProps) {
  if (!branch) return null;

  const title =
    branch === 'paesana'
      ? 'Immobili disponibili - Fides Paesana'
      : 'Immobili disponibili - Fides Torino';

  const subtitle =
    branch === 'paesana'
      ? 'Case, appartamenti e soluzioni in valle Po e dintorni.'
      : 'Appartamenti, attici e investimenti nel torinese.';

  return (
    <section id="properties" className="properties">
      <div className="properties__header">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>

      <div className="properties__grid">
        {properties.length === 0 && (
          <p style={{ textAlign: 'center', width: '100%', padding: '24px' }}>
            Nessun immobile disponibile al momento.
          </p>
        )}

        {properties.map(property => {
          const imageUrl =
            property.images && property.images.length > 0
              ? property.images[0]
              : 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800';

          return (
            <article key={property.id} className="property-card">
              <div
                className="property-card__image"
                style={{ backgroundImage: `url('${imageUrl}')` }}
              />
              <div className="property-card__body">
                <h3 className="property-card__title">{property.title}</h3>
                <div className="property-card__meta">
                  {property.location.city} • {property.details.rooms} locali •{' '}
                  {property.details.sqm} m²
                </div>
                <div className="property-card__price">
                  {formatPrice(property.price)}
                  {property.type === 'rent' && '/mese'}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}