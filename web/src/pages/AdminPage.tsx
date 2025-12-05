import { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  branch: 'paesana' | 'torino';
  location: {
    address: string;
    city: string;
    province: string;
  };
  details: {
    rooms: number;
    bathrooms: number;
    sqm: number;
    floor?: number;
    energyClass?: string;
    balcony?: boolean;
    garage?: boolean;
    elevator?: boolean;
    furnished?: boolean;
  };
  costs?: {
    condominiumFees?: number;
    heatingCosts?: number;
  };
  images: string[];
}

export function AdminPage() {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [loginMessage, setLoginMessage] = useState<string>('');
  const [loginStatus, setLoginStatus] = useState<'success' | 'error' | null>(null);

  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<'paesana' | 'torino' | 'all'>('all');
  
  const [formData, setFormData] = useState<Property>({
    title: '',
    description: '',
    price: 0,
    type: 'sale',
    category: 'apartment',
    branch: 'paesana',
    location: {
      address: '',
      city: 'Paesana',
      province: 'CN'
    },
    details: {
      rooms: 2,
      bathrooms: 1,
      sqm: 52,
      energyClass: 'G',
      balcony: false,
      garage: false,
      elevator: false,
      furnished: false
    },
    costs: {
      condominiumFees: 0,
      heatingCosts: 0
    },
    images: []
  });

  useEffect(() => {
    const saved = localStorage.getItem('fides_properties');
    if (saved) {
      try {
        setProperties(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading properties:', e);
      }
    }
  }, []);

  useEffect(() => {
    if (properties.length > 0) {
      localStorage.setItem('fides_properties', JSON.stringify(properties));
    }
  }, [properties]);

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
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!token) {
      alert('Devi essere autenticato!');
      return;
    }

    const newProperty: Property = {
      ...formData,
      id: Date.now().toString()
    };

    setProperties(prev => [...prev, newProperty]);
    alert('✅ Immobile aggiunto con successo!');

    setFormData({
      title: '',
      description: '',
      price: 0,
      type: 'sale',
      category: 'apartment',
      branch: 'paesana',
      location: {
        address: '',
        city: 'Paesana',
        province: 'CN'
      },
      details: {
        rooms: 2,
        bathrooms: 1,
        sqm: 52,
        energyClass: 'G',
        balcony: false,
        garage: false,
        elevator: false,
        furnished: false
      },
      costs: {
        condominiumFees: 0,
        heatingCosts: 0
      },
      images: []
    });
  }

  function handleDelete(id: string) {
    if (confirm('Sei sicuro di voler eliminare questo immobile?')) {
      setProperties(prev => prev.filter(p => p.id !== id));
    }
  }

  const filteredProperties = selectedBranch === 'all' 
    ? properties 
    : properties.filter(p => p.branch === selectedBranch);

  return (
    <>
      <Navbar />

      <main style={{ marginTop: '64px', padding: '48px 24px', minHeight: 'calc(100vh - 64px)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '32px', textAlign: 'center', color: '#1e293b' }}>
            🔐 Area Admin Fides
          </h1>

          {!token ? (
            <div style={{ maxWidth: '500px', margin: '0 auto', background: '#fff', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
              <h2 style={{ marginBottom: '24px', textAlign: 'center', color: '#1e293b' }}>Accedi al Pannello</h2>
              <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#475569' }}>Email</label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="admin@fides.it"
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#475569' }}>Password</label>
                  <input
                    name="password"
                    type="password"
                    required
                    placeholder="••••••••"
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem' }}
                  />
                </div>

                <button 
                  type="submit"
                  style={{ 
                    padding: '14px', 
                    background: '#dc2626', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '8px', 
                    fontSize: '1.1rem', 
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'background 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#b91c1c'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#dc2626'}
                >
                  Accedi
                </button>

                <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#6b7280' }}>
                  💡 Test: admin@fides.it / password
                </p>

                {loginMessage && (
                  <p style={{ 
                    padding: '12px', 
                    borderRadius: '8px', 
                    textAlign: 'center',
                    background: loginStatus === 'success' ? '#d1fae5' : '#fee2e2',
                    color: loginStatus === 'success' ? '#065f46' : '#991b1b'
                  }}>
                    {loginMessage}
                  </p>
                )}
              </form>
            </div>
          ) : (
            <div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '32px', 
                padding: '20px', 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                borderRadius: '12px',
                color: 'white'
              }}>
                <div>
                  <h3 style={{ marginBottom: '4px', fontSize: '1.5rem' }}>👤 {userName}</h3>
                  <p style={{ opacity: 0.9 }}>Gestione Immobili Fides</p>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  style={{
                    padding: '12px 24px',
                    background: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    border: '2px solid white',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.color = '#764ba2';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                    e.currentTarget.style.color = 'white';
                  }}
                >
                  Esci
                </button>
              </div>

              <div style={{ background: '#fff', padding: '40px', borderRadius: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', marginBottom: '40px' }}>
                <h3 style={{ marginBottom: '32px', fontSize: '1.8rem', color: '#1e293b', borderBottom: '3px solid #dc2626', paddingBottom: '12px' }}>
                  ➕ Inserisci Nuovo Immobile
                </h3>

                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: '32px' }}>
                    <h4 style={{ marginBottom: '16px', color: '#475569', fontSize: '1.2rem' }}>📝 Informazioni Principali</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                      
                      <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#475569' }}>
                          Titolo Annuncio *
                        </label>
                        <input
                          required
                          value={formData.title}
                          onChange={(e) => setFormData({...formData, title: e.target.value})}
                          placeholder="Es: Bilocale via Pratoguglielmo, Paesana"
                          style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#475569' }}>
                          Prezzo (€) *
                        </label>
                        <input
                          required
                          type="number"
                          value={formData.price || ''}
                          onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                          placeholder="19500"
                          style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#475569' }}>
                          Contratto *
                        </label>
                        <select
                          value={formData.type}
                          onChange={(e) => setFormData({...formData, type: e.target.value as 'sale' | 'rent'})}
                          style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem' }}
                        >
                          <option value="sale">Vendita</option>
                          <option value="rent">Affitto</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#475569' }}>
                          Tipologia *
                        </label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                          style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem' }}
                        >
                          <option value="apartment">Appartamento</option>
                          <option value="house">Casa/Villa</option>
                          <option value="commercial">Commerciale</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#475569' }}>
                          Sede Agenzia *
                        </label>
                        <select
                          value={formData.branch}
                          onChange={(e) => {
                            const branch = e.target.value as 'paesana' | 'torino';
                            setFormData({
                              ...formData, 
                              branch,
                              location: {
                                ...formData.location,
                                city: branch === 'paesana' ? 'Paesana' : 'Torino',
                                province: branch === 'paesana' ? 'CN' : 'TO'
                              }
                            });
                          }}
                          style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem', background: '#fef3c7' }}
                        >
                          <option value="paesana">🏔️ Paesana (Valle Po)</option>
                          <option value="torino">🏙️ Torino (Città)</option>
                        </select>
                      </div>

                    </div>
                  </div>

                  <div style={{ marginBottom: '32px' }}>
                    <h4 style={{ marginBottom: '16px', color: '#475569', fontSize: '1.2rem' }}>📍 Localizzazione</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                      
                      <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#475569' }}>
                          Indirizzo *
                        </label>
                        <input
                          required
                          value={formData.location.address}
                          onChange={(e) => setFormData({...formData, location: {...formData.location, address: e.target.value}})}
                          placeholder="Via Pratoguglielmo"
                          style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#475569' }}>
                          Città *
                        </label>
                        <input
                          required
                          value={formData.location.city}
                          onChange={(e) => setFormData({...formData, location: {...formData.location, city: e.target.value}})}
                          style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#475569' }}>
                          Provincia *
                        </label>
                        <input
                          required
                          value={formData.location.province}
                          onChange={(e) => setFormData({...formData, location: {...formData.location, province: e.target.value}})}
                          placeholder="CN"
                          maxLength={2}
                          style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem' }}
                        />
                      </div>

                    </div>
                  </div>

                  <div style={{ marginBottom: '32px' }}>
                    <h4 style={{ marginBottom: '16px', color: '#475569', fontSize: '1.2rem' }}>🏠 Caratteristiche</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                      
                      <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#475569' }}>
                          Locali *
                        </label>
                        <input
                          required
                          type="number"
                          min="1"
                          value={formData.details.rooms}
                          onChange={(e) => setFormData({...formData, details: {...formData.details, rooms: Number(e.target.value)}})}
                          style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#475569' }}>
                          Bagni *
                        </label>
                        <input
                          required
                          type="number"
                          min="1"
                          value={formData.details.bathrooms}
                          onChange={(e) => setFormData({...formData, details: {...formData.details, bathrooms: Number(e.target.value)}})}
                          style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#475569' }}>
                          Superficie (m²) *
                        </label>
                        <input
                          required
                          type="number"
                          min="10"
                          value={formData.details.sqm}
                          onChange={(e) => setFormData({...formData, details: {...formData.details, sqm: Number(e.target.value)}})}
                          style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#475569' }}>
                          Piano
                        </label>
                        <input
                          type="number"
                          value={formData.details.floor || ''}
                          onChange={(e) => setFormData({...formData, details: {...formData.details, floor: e.target.value ? Number(e.target.value) : undefined}})}
                          placeholder="Piano terra = 0"
                          style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#475569' }}>
                          Classe Energetica
                        </label>
                        <select
                          value={formData.details.energyClass || 'G'}
                          onChange={(e) => setFormData({...formData, details: {...formData.details, energyClass: e.target.value}})}
                          style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem' }}
                        >
                          <option value="A+">A+</option>
                          <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="C">C</option>
                          <option value="D">D</option>
                          <option value="E">E</option>
                          <option value="F">F</option>
                          <option value="G">G</option>
                        </select>
                      </div>

                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '20px' }}>
                      
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={formData.details.balcony || false}
                          onChange={(e) => setFormData({...formData, details: {...formData.details, balcony: e.target.checked}})}
                          style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                        />
                        <span>Balcone</span>
                      </label>

                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={formData.details.garage || false}
                          onChange={(e) => setFormData({...formData, details: {...formData.details, garage: e.target.checked}})}
                          style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                        />
                        <span>Box/Garage</span>
                      </label>

                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={formData.details.elevator || false}
                          onChange={(e) => setFormData({...formData, details: {...formData.details, elevator: e.target.checked}})}
                          style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                        />
                        <span>Ascensore</span>
                      </label>

                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={formData.details.furnished || false}
                          onChange={(e) => setFormData({...formData, details: {...formData.details, furnished: e.target.checked}})}
                          style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                        />
                        <span>Arredato</span>
                      </label>

                    </div>
                  </div>

                  <div style={{ marginBottom: '32px' }}>
                    <h4 style={{ marginBottom: '16px', color: '#475569', fontSize: '1.2rem' }}>💶 Spese</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                      
                      <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#475569' }}>
                          Spese Condominio (€/mese)
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={formData.costs?.condominiumFees || ''}
                          onChange={(e) => setFormData({...formData, costs: {...formData.costs, condominiumFees: Number(e.target.value) || 0}})}
                          placeholder="60"
                          style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#475569' }}>
                          Spese Riscaldamento (€/anno)
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={formData.costs?.heatingCosts || ''}
                          onChange={(e) => setFormData({...formData, costs: {...formData.costs, heatingCosts: Number(e.target.value) || 0}})}
                          placeholder="1"
                          style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem' }}
                        />
                      </div>

                    </div>
                  </div>

                  <div style={{ marginBottom: '32px' }}>
                    <h4 style={{ marginBottom: '16px', color: '#475569', fontSize: '1.2rem' }}>📄 Descrizione</h4>
                    <textarea
                      required
                      rows={6}
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="PAESANA - A due passi dal centro del paese, in una posizione comoda ma tranquilla, propongo un appartamento situato al terzo e ultimo piano di una palazzina ordinata..."
                      style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem', resize: 'vertical' }}
                    />
                  </div>

                  <div style={{ marginBottom: '32px' }}>
                    <h4 style={{ marginBottom: '16px', color: '#475569', fontSize: '1.2rem' }}>📸 Immagini</h4>
                    <textarea
                      rows={3}
                      value={formData.images.join('\n')}
                      onChange={(e) => setFormData({...formData, images: e.target.value.split('\n').map(url => url.trim()).filter(Boolean)})}
                      placeholder={'Inserisci URL immagini (uno per riga)\nhttps://esempio.com/img1.jpg\nhttps://esempio.com/img2.jpg'}
                      style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem', fontFamily: 'monospace' }}
                    />
                  </div>

                  <button 
                    type="submit"
                    style={{ 
                      width: '100%', 
                      padding: '16px', 
                      background: '#dc2626', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '8px', 
                      fontSize: '1.2rem', 
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'background 0.3s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#b91c1c'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#dc2626'}
                  >
                    💾 Pubblica Immobile
                  </button>
                </form>
              </div>

              <div style={{ background: '#fff', padding: '40px', borderRadius: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
                  <h3 style={{ fontSize: '1.8rem', color: '#1e293b', borderBottom: '3px solid #dc2626', paddingBottom: '12px' }}>
                    📋 Immobili Pubblicati ({filteredProperties.length})
                  </h3>
                  
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                      onClick={() => setSelectedBranch('all')}
                      style={{
                        padding: '10px 20px',
                        background: selectedBranch === 'all' ? '#dc2626' : '#f1f5f9',
                        color: selectedBranch === 'all' ? 'white' : '#475569',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        transition: 'all 0.3s'
                      }}
                    >
                      Tutti ({properties.length})
                    </button>
                    <button
                      onClick={() => setSelectedBranch('paesana')}
                      style={{
                        padding: '10px 20px',
                        background: selectedBranch === 'paesana' ? '#dc2626' : '#f1f5f9',
                        color: selectedBranch === 'paesana' ? 'white' : '#475569',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        transition: 'all 0.3s'
                      }}
                    >
                      🏔️ Paesana ({properties.filter(p => p.branch === 'paesana').length})
                    </button>
                    <button
                      onClick={() => setSelectedBranch('torino')}
                      style={{
                        padding: '10px 20px',
                        background: selectedBranch === 'torino' ? '#dc2626' : '#f1f5f9',
                        color: selectedBranch === 'torino' ? 'white' : '#475569',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        transition: 'all 0.3s'
                      }}
                    >
                      🏙️ Torino ({properties.filter(p => p.branch === 'torino').length})
                    </button>
                  </div>
                </div>

                {filteredProperties.length === 0 && (
                  <p style={{ textAlign: 'center', color: '#6b7280', padding: '40px', fontSize: '1.1rem' }}>
                    {selectedBranch === 'all' 
                      ? '📦 Nessun immobile pubblicato. Aggiungi il primo annuncio!' 
                      : `📦 Nessun immobile per ${selectedBranch === 'paesana' ? 'Paesana' : 'Torino'}`}
                  </p>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
                  {filteredProperties.map(property => (
                    <div 
                      key={property.id} 
                      style={{ 
                        border: '2px solid #e5e7eb', 
                        borderRadius: '12px', 
                        overflow: 'hidden',
                        transition: 'all 0.3s',
                        cursor: 'pointer',
                        background: '#fff'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
                        e.currentTarget.style.transform = 'translateY(-4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                      onClick={() => navigate(`/property/${property.id}`)}
                    >
                      <div style={{
                        height: '200px',
                        backgroundImage: `url(${property.images[0] || '/placeholder.jpg'})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative'
                      }}>
                        <div style={{
                          position: 'absolute',
                          top: '12px',
                          left: '12px',
                          padding: '6px 12px',
                          background: property.branch === 'paesana' ? '#10b981' : '#3b82f6',
                          color: 'white',
                          borderRadius: '6px',
                          fontWeight: '600',
                          fontSize: '0.85rem'
                        }}>
                          {property.branch === 'paesana' ? '🏔️ Paesana' : '🏙️ Torino'}
                        </div>
                        {property.images.length > 1 && (
                          <div style={{
                            position: 'absolute',
                            bottom: '12px',
                            right: '12px',
                            padding: '6px 12px',
                            background: 'rgba(0,0,0,0.7)',
                            color: 'white',
                            borderRadius: '6px',
                            fontSize: '0.85rem'
                          }}>
                            +{property.images.length - 1} foto
                          </div>
                        )}
                      </div>

                      <div style={{ padding: '16px' }}>
                        <h4 style={{ marginBottom: '12px', fontSize: '1.1rem', color: '#1e293b', fontWeight: '600' }}>
                          {property.title}
                        </h4>
                        
                        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', fontSize: '0.9rem', color: '#6b7280' }}>
                          <span>📍 {property.location.city}</span>
                          <span>•</span>
                          <span>{property.details.rooms} loc</span>
                          <span>•</span>
                          <span>{property.details.sqm} m²</span>
                        </div>

                        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', fontSize: '0.85rem', flexWrap: 'wrap' }}>
                          {property.details.balcony && <span style={{ padding: '4px 8px', background: '#e0e7ff', borderRadius: '4px' }}>🏠 Balcone</span>}
                          {property.details.garage && <span style={{ padding: '4px 8px', background: '#e0e7ff', borderRadius: '4px' }}>🚗 Garage</span>}
                          {property.details.elevator && <span style={{ padding: '4px 8px', background: '#e0e7ff', borderRadius: '4px' }}>🛗 Ascensore</span>}
                        </div>

                        <div style={{ 
                          fontSize: '1.5rem', 
                          fontWeight: 'bold', 
                          color: '#dc2626',
                          marginBottom: '16px'
                        }}>
                          € {property.price.toLocaleString('it-IT')}
                          {property.type === 'rent' && <span style={{ fontSize: '1rem', fontWeight: 'normal' }}>/mese</span>}
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(property.id!);
                          }}
                          style={{
                            width: '100%',
                            padding: '10px',
                            background: '#fee2e2',
                            color: '#dc2626',
                            border: '2px solid #dc2626',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            transition: 'all 0.3s'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#dc2626';
                            e.currentTarget.style.color = 'white';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#fee2e2';
                            e.currentTarget.style.color = '#dc2626';
                          }}
                        >
                          🗑️ Elimina Annuncio
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
