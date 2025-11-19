import { useState, FormEvent } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { loginOwner } from '../services/api';

interface Property {
  id?: string;
  title: string;
  description: string;
  price: number;
  type: 'sale' | 'rent';
  category: 'apartment' | 'house' | 'commercial';
  city: 'paesana' | 'torino';
  address: string;
  province: string;
  rooms: number;
  bathrooms: number;
  sqm: number;
  floor?: number;
  images: string[];
}

export function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [loginMessage, setLoginMessage] = useState<string>('');
  const [loginStatus, setLoginStatus] = useState<'success' | 'error' | null>(null);

  const [properties, setProperties] = useState<Property[]>([]);
  const [formData, setFormData] = useState<Property>({
    title: '',
    description: '',
    price: 0,
    type: 'sale',
    category: 'apartment',
    city: 'paesana',
    address: '',
    province: 'CN',
    rooms: 1,
    bathrooms: 1,
    sqm: 50,
    images: []
  });

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoginMessage('');
    setLoginStatus(null);

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get('email') ?? '').trim();
    const password = String(formData.get('password') ?? '').trim();

    if (!email || !password) {
      setLoginMessage('Inserisci email e password');
      setLoginStatus('error');
      return;
    }

    try {
      const res = await loginOwner(email, password);
      setToken(res.token);
      setUserName(res.name);
      setLoginMessage(`✅ Benvenuto, ${res.name}!`);
      setLoginStatus('success');
    } catch (err: any) {
      setToken(null);
      setUserName('');
      setLoginMessage(err.message ?? 'Errore di autenticazione');
      setLoginStatus('error');
    }
  }

  function handleLogout() {
    setToken(null);
    setUserName('');
    setLoginMessage('');
    setLoginStatus(null);
    setProperties([]);
  }

  function handleChange(field: keyof Property, value: any) {
    setFormData(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!token) {
      alert('Devi essere autenticato!');
      return;
    }

    // TODO: Invia al backend
    const newProperty: Property = {
      ...formData,
      id: Date.now().toString()
    };

    setProperties(prev => [...prev, newProperty]);
    alert('✅ Immobile aggiunto con successo!');

    // Reset form
    setFormData({
      title: '',
      description: '',
      price: 0,
      type: 'sale',
      category: 'apartment',
      city: 'paesana',
      address: '',
      province: 'CN',
      rooms: 1,
      bathrooms: 1,
      sqm: 50,
      images: []
    });
  }

  function handleDelete(id: string) {
    if (confirm('Sei sicuro di voler eliminare questo immobile?')) {
      setProperties(prev => prev.filter(p => p.id !== id));
    }
  }

  return (
    <>
      <Navbar />

      <main style={{ marginTop: '64px', padding: '48px 24px', maxWidth: '1200px', margin: '64px auto' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '32px', textAlign: 'center' }}>
          🔐 Area Proprietario
        </h1>

        {!token ? (
          <div className="login__card" style={{ maxWidth: '460px', margin: '0 auto' }}>
            <h2>Accedi</h2>
            <form className="login__form" onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="admin@fides.it"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                />
              </div>

              <button type="submit" className="btn btn--primary btn--full">
                Accedi
              </button>

              <p className="login__hint">
                💡 <strong>Test:</strong> email: <code>admin@fides.it</code> | password: <code>password</code>
              </p>

              {loginMessage && (
                <p
                  className={
                    'login__message ' +
                    (loginStatus === 'success'
                      ? 'login__message--success'
                      : loginStatus === 'error'
                      ? 'login__message--error'
                      : '')
                  }
                >
                  {loginMessage}
                </p>
              )}
            </form>
          </div>
        ) : (
          <div className="admin">
            {/* Header Admin */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', padding: '16px', background: '#f3f4f6', borderRadius: '12px' }}>
              <div>
                <h3 style={{ marginBottom: '4px' }}>👤 {userName}</h3>
                <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Gestisci gli immobili</p>
              </div>
              <button
                type="button"
                className="btn btn--secondary"
                onClick={handleLogout}
              >
                Esci
              </button>
            </div>

            {/* Form Aggiungi Immobile */}
            <div style={{ background: '#fff', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', marginBottom: '32px' }}>
              <h3 style={{ marginBottom: '24px' }}>➕ Aggiungi Nuovo Immobile</h3>

              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label>Titolo *</label>
                    <input
                      required
                      value={formData.title}
                      onChange={(e) => handleChange('title', e.target.value)}
                      placeholder="Es: Attico Vista Mole"
                    />
                  </div>

                  <div className="form-group">
                    <label>Prezzo (€) *</label>
                    <input
                      required
                      type="number"
                      value={formData.price}
                      onChange={(e) => handleChange('price', Number(e.target.value))}
                    />
                  </div>

                  <div className="form-group">
                    <label>Tipo *</label>
                    <select
                      value={formData.type}
                      onChange={(e) => handleChange('type', e.target.value as 'sale' | 'rent')}
                    >
                      <option value="sale">Vendita</option>
                      <option value="rent">Affitto</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Categoria *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleChange('category', e.target.value)}
                    >
                      <option value="apartment">Appartamento</option>
                      <option value="house">Casa</option>
                      <option value="commercial">Commerciale</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Città *</label>
                    <select
                      value={formData.city}
                      onChange={(e) => handleChange('city', e.target.value as 'paesana' | 'torino')}
                    >
                      <option value="paesana">Paesana</option>
                      <option value="torino">Torino</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Indirizzo *</label>
                    <input
                      required
                      value={formData.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                      placeholder="Via Roma 100"
                    />
                  </div>

                  <div className="form-group">
                    <label>Locali *</label>
                    <input
                      required
                      type="number"
                      min="1"
                      value={formData.rooms}
                      onChange={(e) => handleChange('rooms', Number(e.target.value))}
                    />
                  </div>

                  <div className="form-group">
                    <label>Bagni *</label>
                    <input
                      required
                      type="number"
                      min="1"
                      value={formData.bathrooms}
                      onChange={(e) => handleChange('bathrooms', Number(e.target.value))}
                    />
                  </div>

                  <div className="form-group">
                    <label>Superficie (m²) *</label>
                    <input
                      required
                      type="number"
                      min="10"
                      value={formData.sqm}
                      onChange={(e) => handleChange('sqm', Number(e.target.value))}
                    />
                  </div>

                  <div className="form-group">
                    <label>Piano (opzionale)</label>
                    <input
                      type="number"
                      value={formData.floor || ''}
                      onChange={(e) => handleChange('floor', e.target.value ? Number(e.target.value) : undefined)}
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '16px' }}>
                  <label>Descrizione *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder="Descrizione dettagliata dell'immobile..."
                  />
                </div>

                <div className="form-group" style={{ marginTop: '16px' }}>
                  <label>URL Immagini (separati da virgola)</label>
                  <input
                    value={formData.images.join(', ')}
                    onChange={(e) => handleChange('images', e.target.value.split(',').map(url => url.trim()).filter(Boolean))}
                    placeholder="https://esempio.com/img1.jpg, https://esempio.com/img2.jpg"
                  />
                </div>

                <button type="submit" className="btn btn--primary" style={{ marginTop: '24px', width: '100%' }}>
                  💾 Salva Immobile
                </button>
              </form>
            </div>

            {/* Lista Immobili */}
            <div style={{ background: '#fff', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
              <h3 style={{ marginBottom: '24px' }}>📋 Immobili Caricati ({properties.length})</h3>

              {properties.length === 0 && (
                <p style={{ textAlign: 'center', color: '#6b7280', padding: '32px' }}>
                  Nessun immobile caricato. Aggiungi il primo immobile!
                </p>
              )}

              <div style={{ display: 'grid', gap: '16px' }}>
                {properties.map(property => (
                  <div key={property.id} style={{ display: 'flex', gap: '16px', padding: '16px', border: '2px solid #e5e7eb', borderRadius: '12px' }}>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ marginBottom: '8px' }}>{property.title}</h4>
                      <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '8px' }}>
                        📍 {property.address}, {property.city} • {property.rooms} locali • {property.sqm} m²
                      </p>
                      <p style={{ fontWeight: 'bold', color: '#dc2626' }}>
                        {new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(property.price)}
                        {property.type === 'rent' && '/mese'}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(property.id!)}
                      className="btn btn--secondary"
                      style={{ height: 'fit-content' }}
                    >
                      🗑️ Elimina
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}