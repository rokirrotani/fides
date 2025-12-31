import { useState, FormEvent, useEffect, DragEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

interface Property {
  id?: string;
  title: string;
  description: string;
  price: number;
  type: 'sale' | 'rent';
  category: 'apartment' | 'house' | 'commercial';
  branch: 'paesana' | 'torino';
  status: 'available' | 'sold';
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
  const [isDragging, setIsDragging] = useState(false);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  
  const [formData, setFormData] = useState<Property>({
    title: '',
    description: '',
    price: 0,
    type: 'sale',
    category: 'apartment',
    branch: 'paesana',
    status: 'available',
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
        const loadedProperties = JSON.parse(saved);
        // Aggiungi status: 'available' alle proprietà esistenti che non ce l'hanno
        const migratedProperties = loadedProperties.map((p: any) => ({
          ...p,
          status: p.status || 'available'
        }));
        setProperties(migratedProperties);
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
    const username = String(formData.get('username') ?? '').trim();
    const password = String(formData.get('password') ?? '').trim();

    if (!username || !password) {
      setLoginMessage('Inserisci username e password');
      setLoginStatus('error');
      return;
    }

    try {
      // Chiamata API sicura con bcrypt
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Autenticazione fallita');
      }

      // Login riuscito
      setToken(data.token);
      setUserName(username);
      localStorage.setItem('fides_admin_token', data.token);
      setLoginMessage(`✅ Benvenuto, ${username}!`);
      setLoginStatus('success');
    } catch (err: any) {
      setToken(null);
      setUserName('');
      setLoginMessage(`❌ ${err.message}`);
      setLoginStatus('error');
      console.error('Login error:', err);
    }
  }

  function handleLogout() {
    setToken(null);
    setUserName('');
    setLoginMessage('');
    setLoginStatus(null);
    localStorage.removeItem('fides_admin_token');
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );
    
    if (files.length > 0) {
      // Crea preview per le nuove immagini
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setImagePreviewUrls(prev => [...prev, e.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  }

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files).filter(file => 
        file.type.startsWith('image/')
      );
      
      fileArray.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setImagePreviewUrls(prev => [...prev, e.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  }

  function addImageUrl(url: string) {
    if (url.trim()) {
      setImagePreviewUrls(prev => [...prev, url.trim()]);
    }
  }

  function removeImageUrl(index: number) {
    setImagePreviewUrls(prev => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!token) {
      alert('Devi essere autenticato!');
      return;
    }

    const newProperty: Property = {
      ...formData,
      id: Date.now().toString(),
      images: imagePreviewUrls,
      status: 'available'
    };

    setProperties(prev => [...prev, newProperty]);
    alert('✅ Immobile aggiunto con successo!');

    // Reset form completo
    setFormData({
      title: '',
      description: '',
      price: 0,
      type: 'sale',
      category: 'apartment',
      branch: 'paesana',
      status: 'available',
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
    
    setImagePreviewUrls([]);
  }

  function handleDelete(id: string) {
    if (confirm('Sei sicuro di voler eliminare questo immobile?')) {
      setProperties(prev => prev.filter(p => p.id !== id));
    }
  }

  function handleMarkSold(id: string) {
    setProperties(prev => prev.map(p => 
      p.id === id ? { ...p, status: p.status === 'sold' ? 'available' : 'sold' } : p
    ));
  }

  const filteredProperties = selectedBranch === 'all' 
    ? properties 
    : properties.filter(p => p.branch === selectedBranch);

  return (
    <>
      <Navbar />

      <main style={{ marginTop: '56px', padding: '48px 24px', minHeight: 'calc(100vh - 56px)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '32px', textAlign: 'center', color: '#1e293b' }}>
            🔐 Area Admin Fides
          </h1>

          {!token ? (
            <div style={{ maxWidth: '500px', margin: '0 auto', background: '#fff', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: '#0f172a',
                  marginBottom: '16px'
                }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
                <h2 style={{ color: '#1e293b', fontSize: '1.5rem', fontWeight: '700' }}>Accesso Sicuro</h2>
                <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '8px' }}>Area riservata agli amministratori</p>
              </div>

              <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#475569', fontSize: '0.9rem' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ verticalAlign: 'middle', marginRight: '6px' }}>
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    Username
                  </label>
                  <input
                    name="username"
                    type="text"
                    required
                    autoComplete="username"
                    placeholder="Inserisci username"
                    style={{ 
                      width: '100%', 
                      padding: '12px 14px', 
                      border: '2px solid #e2e8f0', 
                      borderRadius: '8px', 
                      fontSize: '1rem',
                      transition: 'border-color 0.3s'
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = '#0f172a'}
                    onBlur={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#475569', fontSize: '0.9rem' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ verticalAlign: 'middle', marginRight: '6px' }}>
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    placeholder="••••••••••••"
                    style={{ 
                      width: '100%', 
                      padding: '12px 14px', 
                      border: '2px solid #e2e8f0', 
                      borderRadius: '8px', 
                      fontSize: '1rem',
                      transition: 'border-color 0.3s'
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = '#0f172a'}
                    onBlur={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                  />
                </div>

                <button 
                  type="submit"
                  style={{ 
                    padding: '14px', 
                    background: '#0f172a', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '8px', 
                    fontSize: '1.05rem', 
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    boxShadow: '0 4px 12px rgba(15, 23, 42, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#1e293b';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(15, 23, 42, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#0f172a';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(15, 23, 42, 0.3)';
                  }}
                >
                  🔐 Accedi in Sicurezza
                </button>

                <div style={{ 
                  padding: '12px', 
                  borderRadius: '8px', 
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  fontSize: '0.85rem',
                  color: '#15803d',
                  textAlign: 'center'
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ verticalAlign: 'middle', marginRight: '6px' }}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                  <strong>Autenticazione sicura con bcrypt</strong>
                  <br />Protezione contro brute-force e timing attacks
                </div>

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
                    
                    {/* Drag and Drop Area */}
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      style={{
                        border: isDragging ? '3px dashed #0f172a' : '3px dashed #cbd5e1',
                        borderRadius: '12px',
                        padding: '40px',
                        textAlign: 'center',
                        background: isDragging ? '#f1f5f9' : '#f8fafc',
                        transition: 'all 0.3s',
                        marginBottom: '20px',
                        cursor: 'pointer'
                      }}
                      onClick={() => document.getElementById('file-input')?.click()}
                    >
                      <div style={{ fontSize: '3rem', marginBottom: '16px' }}>
                        {isDragging ? '📥' : '🖼️'}
                      </div>
                      <p style={{ fontSize: '1.1rem', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>
                        {isDragging ? 'Rilascia le immagini qui' : 'Trascina immagini qui o clicca per selezionare'}
                      </p>
                      <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
                        Formati supportati: JPG, PNG, WEBP
                      </p>
                      <input
                        id="file-input"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileInput}
                        style={{ display: 'none' }}
                      />
                    </div>

                    {/* Image Preview Grid */}
                    {imagePreviewUrls.length > 0 && (
                      <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', 
                        gap: '12px',
                        marginBottom: '20px'
                      }}>
                        {imagePreviewUrls.map((url, index) => (
                          <div key={index} style={{ position: 'relative', paddingTop: '100%', borderRadius: '8px', overflow: 'hidden', border: '2px solid #e2e8f0' }}>
                            <img 
                              src={url} 
                              alt={`Preview ${index + 1}`}
                              style={{ 
                                position: 'absolute', 
                                top: 0, 
                                left: 0, 
                                width: '100%', 
                                height: '100%', 
                                objectFit: 'cover' 
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => removeImageUrl(index)}
                              style={{
                                position: 'absolute',
                                top: '4px',
                                right: '4px',
                                background: '#dc2626',
                                color: 'white',
                                border: 'none',
                                borderRadius: '50%',
                                width: '28px',
                                height: '28px',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* URL Input Alternative */}
                    <div style={{ marginTop: '20px' }}>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#475569' }}>
                        Oppure inserisci URL immagini
                      </label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <input
                          type="url"
                          id="image-url-input"
                          placeholder="https://esempio.com/immagine.jpg"
                          style={{ 
                            flex: 1, 
                            padding: '12px', 
                            border: '2px solid #e2e8f0', 
                            borderRadius: '8px', 
                            fontSize: '1rem' 
                          }}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              const input = e.currentTarget;
                              addImageUrl(input.value);
                              input.value = '';
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const input = document.getElementById('image-url-input') as HTMLInputElement;
                            if (input) {
                              addImageUrl(input.value);
                              input.value = '';
                            }
                          }}
                          style={{
                            padding: '12px 24px',
                            background: '#0f172a',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600'
                          }}
                        >
                          Aggiungi URL
                        </button>
                      </div>
                    </div>
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
                        {/* Overlay VENDUTO con barra diagonale */}
                        {property.status === 'sold' && (
                          <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'rgba(0, 0, 0, 0.6)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 10
                          }}>
                            <div style={{
                              background: '#dc2626',
                              color: 'white',
                              padding: '12px 60px',
                              fontSize: '1.5rem',
                              fontWeight: '800',
                              transform: 'rotate(-15deg)',
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                              letterSpacing: '4px',
                              border: '4px solid white'
                            }}>
                              VENDUTO
                            </div>
                          </div>
                        )}
                        
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
                          {property.status === 'sold' && <span style={{ padding: '4px 8px', background: '#fef3c7', color: '#92400e', borderRadius: '4px', fontWeight: '600' }}>✅ VENDUTO</span>}
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

                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMarkSold(property.id!);
                            }}
                            style={{
                              flex: 1,
                              padding: '10px',
                              background: property.status === 'sold' ? '#10b981' : '#fef3c7',
                              color: property.status === 'sold' ? 'white' : '#92400e',
                              border: property.status === 'sold' ? '2px solid #10b981' : '2px solid #fbbf24',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              fontWeight: '600',
                              transition: 'all 0.3s'
                            }}
                            onMouseEnter={(e) => {
                              if (property.status === 'sold') {
                                e.currentTarget.style.background = '#059669';
                              } else {
                                e.currentTarget.style.background = '#fbbf24';
                                e.currentTarget.style.color = 'white';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (property.status === 'sold') {
                                e.currentTarget.style.background = '#10b981';
                              } else {
                                e.currentTarget.style.background = '#fef3c7';
                                e.currentTarget.style.color = '#92400e';
                              }
                            }}
                          >
                            {property.status === 'sold' ? '↩️ Ripubblica' : '✅ Segna Venduto'}
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(property.id!);
                            }}
                            style={{
                              flex: 1,
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
                            🗑️ Elimina
                          </button>
                        </div>
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
