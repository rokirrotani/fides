import { useState, FormEvent, useEffect, DragEvent } from 'react';
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
  const [token, setToken] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [loginMessage, setLoginMessage] = useState<string>('');
  const [loginStatus, setLoginStatus] = useState<'success' | 'error' | null>(null);

  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<'paesana' | 'torino' | 'all'>('all');
  const [isDragging, setIsDragging] = useState(false);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  
  // Stati per la modalità modifica
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

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

  // Carica il token dal localStorage all'avvio
  useEffect(() => {
    const savedToken = localStorage.getItem('fides_admin_token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('fides_properties');
    if (saved) {
      try {
        const loadedProperties = JSON.parse(saved);
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

      setToken(data.token);
      setUserName(username);
      localStorage.setItem('fides_admin_token', data.token);
      setLoginMessage(`Benvenuto, ${username}!`);
      setLoginStatus('success');
    } catch (err: any) {
      setToken(null);
      setUserName('');
      setLoginMessage(err.message);
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

  async function compressImage(file: File, maxWidth: number = 1200, maxHeight: number = 900, quality: number = 0.7): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let { width, height } = img;
          
          // Ridimensiona mantenendo proporzioni
          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d')!;
          ctx.drawImage(img, 0, 0, width, height);
          
          resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.onerror = () => reject(new Error('Errore caricamento immagine'));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Errore lettura file'));
      reader.readAsDataURL(file);
    });
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
  }

  async function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );
    
    if (files.length > 0) {
      await processImages(files);
    }
  }

  async function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files).filter(file => 
        file.type.startsWith('image/')
      );
      
      await processImages(fileArray);
    }
  }

  async function processImages(files: File[]) {
    const MAX_IMAGES = 15;
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    
    // Controlla se supera il limite di immagini
    if (imagePreviewUrls.length + files.length > MAX_IMAGES) {
      alert(`Massimo ${MAX_IMAGES} immagini consentite! Hai selezionato ${files.length} immagini e ne hai già ${imagePreviewUrls.length}.`);
      return;
    }

    for (const file of files) {
      // Valida dimensione file
      if (file.size > MAX_FILE_SIZE) {
        alert(`File ${file.name} supera 5MB. Seleziona un'immagine più piccola.`);
        continue;
      }

      try {
        const compressedBase64 = await compressImage(file);
        setImagePreviewUrls(prev => [...prev, compressedBase64]);
      } catch (error) {
        console.error('Errore compressione immagine:', error);
        alert(`Errore nel caricamento di ${file.name}`);
      }
    }
  }

  function addImageUrl(url: string) {
    const MAX_IMAGES = 15;
    
    if (imagePreviewUrls.length >= MAX_IMAGES) {
      alert(`Hai raggiunto il massimo di ${MAX_IMAGES} immagini. Rimuovine una prima di aggiungerne un'altra.`);
      return;
    }
    
    if (url.trim()) {
      setImagePreviewUrls(prev => [...prev, url.trim()]);
    }
  }

  function removeImageUrl(index: number) {
    setImagePreviewUrls(prev => prev.filter((_, i) => i !== index));
  }

  function resetForm() {
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
    setEditingId(null);
    setIsEditMode(false);
  }

  function startEdit(property: Property) {
    setFormData(property);
    setImagePreviewUrls(property.images);
    setEditingId(property.id || null);
    setIsEditMode(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!token) {
      alert('Devi essere autenticato!');
      return;
    }

    if (isEditMode && editingId) {
      // Modifica immobile esistente
      setProperties(prev => prev.map(p => 
        p.id === editingId 
          ? { ...formData, images: imagePreviewUrls }
          : p
      ));
      alert('Immobile aggiornato con successo!');
    } else {
      // Nuovo immobile
      const newProperty: Property = {
        ...formData,
        id: Date.now().toString(),
        images: imagePreviewUrls,
        status: 'available'
      };
      setProperties(prev => [...prev, newProperty]);
      alert('Immobile aggiunto con successo!');
    }

    resetForm();
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

  function handleCancel() {
    resetForm();
  }

  const filteredProperties = selectedBranch === 'all' 
    ? properties 
    : properties.filter(p => p.branch === selectedBranch);

  return (
    <>
      <Navbar />

      <main style={{ marginTop: '56px', padding: '48px 24px', minHeight: 'calc(100vh - 56px)', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

          {!token ? (
            <div style={{ maxWidth: '480px', margin: '0 auto' }}>
              <div style={{ background: '#fff', padding: '48px 40px', borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
                
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                  <div style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    width: '72px',
                    height: '72px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                    marginBottom: '20px'
                  }}>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                  <h1 style={{ color: '#0f172a', fontSize: '1.8rem', fontWeight: '800', marginBottom: '8px' }}>
                    Pannello Amministrativo
                  </h1>
                  <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Accesso riservato ai gestori Fides</p>
                </div>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#334155', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
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
                        padding: '13px 14px', 
                        border: '2px solid #e2e8f0', 
                        borderRadius: '10px', 
                        fontSize: '1rem',
                        transition: 'all 0.3s',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#0f172a';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(15, 23, 42, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#e2e8f0';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#334155', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
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
                        padding: '13px 14px', 
                        border: '2px solid #e2e8f0', 
                        borderRadius: '10px', 
                        fontSize: '1rem',
                        transition: 'all 0.3s',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#0f172a';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(15, 23, 42, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#e2e8f0';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  <button 
                    type="submit"
                    style={{ 
                      padding: '14px', 
                      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '10px', 
                      fontSize: '1.05rem', 
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      boxShadow: '0 4px 12px rgba(15, 23, 42, 0.3)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(15, 23, 42, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(15, 23, 42, 0.3)';
                    }}
                  >
                    Accedi
                  </button>

                  <div style={{ 
                    padding: '14px', 
                    borderRadius: '10px', 
                    background: '#f0fdf4',
                    border: '1px solid #bbf7d0',
                    fontSize: '0.85rem',
                    color: '#15803d',
                    textAlign: 'center',
                    lineHeight: '1.6'
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ verticalAlign: 'middle', marginRight: '6px' }}>
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                    <strong>Protezione Avanzata</strong>
                    <br />Autenticazione sicura con crittografia bcrypt
                  </div>

                  {loginMessage && (
                    <p style={{ 
                      padding: '12px', 
                      borderRadius: '10px', 
                      textAlign: 'center',
                      background: loginStatus === 'success' ? '#d1fae5' : '#fee2e2',
                      color: loginStatus === 'success' ? '#065f46' : '#991b1b',
                      fontSize: '0.9rem',
                      fontWeight: '500'
                    }}>
                      {loginMessage}
                    </p>
                  )}
                </form>
              </div>
            </div>
          ) : (
            <div>
              {/* Header Benvenuto */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '40px', 
                padding: '24px 32px', 
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', 
                borderRadius: '16px',
                color: 'white'
              }}>
                <div>
                  <h1 style={{ marginBottom: '4px', fontSize: '1.6rem', fontWeight: '800', letterSpacing: '-0.5px' }}>Benvenuto, {userName}</h1>
                  <p style={{ opacity: 0.85, fontSize: '0.95rem' }}>Gestisci gli immobili della tua agenzia</p>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  style={{
                    padding: '12px 28px',
                    background: 'rgba(255,255,255,0.15)',
                    color: 'white',
                    border: '2px solid white',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    transition: 'all 0.3s',
                    fontSize: '0.9rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.color = '#0f172a';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                    e.currentTarget.style.color = 'white';
                  }}
                >
                  Esci
                </button>
              </div>

              {/* Sezione Aggiungi/Modifica Immobile */}
              <div style={{ background: '#fff', padding: '40px', borderRadius: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', marginBottom: '40px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                  <div style={{
                    width: '6px',
                    height: '40px',
                    background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
                    borderRadius: '3px'
                  }}></div>
                  <h2 style={{ fontSize: '1.6rem', color: '#0f172a', fontWeight: '800', margin: 0 }}>
                    {isEditMode ? 'Modifica Immobile' : 'Aggiungi Nuovo Immobile'}
                  </h2>
                  {isEditMode && (
                    <span style={{ 
                      marginLeft: 'auto',
                      padding: '6px 12px',
                      background: '#fef3c7',
                      color: '#92400e',
                      borderRadius: '6px',
                      fontSize: '0.9rem',
                      fontWeight: '600'
                    }}>
                      Modifica in corso
                    </span>
                  )}
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Sezione Informazioni Principali */}
                  <div style={{ marginBottom: '32px' }}>
                    <h3 style={{ marginBottom: '20px', color: '#1e293b', fontSize: '1.1rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Informazioni Principali
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                      
                      <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#475569', fontSize: '0.9rem' }}>
                          Titolo Annuncio *
                        </label>
                        <input
                          required
                          value={formData.title}
                          onChange={(e) => setFormData({...formData, title: e.target.value})}
                          placeholder="Es: Bilocale via Pratoguglielmo, Paesana"
                          style={{ width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '0.95rem', transition: 'all 0.3s', boxSizing: 'border-box' }}
                          onFocus={(e) => e.currentTarget.style.borderColor = '#0f172a'}
                          onBlur={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#475569', fontSize: '0.9rem' }}>
                          Prezzo (€) *
                        </label>
                        <input
                          required
                          type="number"
                          value={formData.price || ''}
                          onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                          placeholder="19500"
                          style={{ width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '0.95rem', transition: 'all 0.3s', boxSizing: 'border-box' }}
                          onFocus={(e) => e.currentTarget.style.borderColor = '#0f172a'}
                          onBlur={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#475569', fontSize: '0.9rem' }}>
                          Contratto *
                        </label>
                        <select
                          value={formData.type}
                          onChange={(e) => setFormData({...formData, type: e.target.value as 'sale' | 'rent'})}
                          style={{ width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '0.95rem', transition: 'all 0.3s', boxSizing: 'border-box', background: '#fff' }}
                          onFocus={(e) => e.currentTarget.style.borderColor = '#0f172a'}
                          onBlur={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                        >
                          <option value="sale">Vendita</option>
                          <option value="rent">Affitto</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#475569', fontSize: '0.9rem' }}>
                          Tipologia *
                        </label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                          style={{ width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '0.95rem', transition: 'all 0.3s', boxSizing: 'border-box', background: '#fff' }}
                          onFocus={(e) => e.currentTarget.style.borderColor = '#0f172a'}
                          onBlur={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                        >
                          <option value="apartment">Appartamento</option>
                          <option value="house">Casa/Villa</option>
                          <option value="commercial">Commerciale</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#475569', fontSize: '0.9rem' }}>
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
                          style={{ width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '0.95rem', transition: 'all 0.3s', boxSizing: 'border-box', background: '#fef3c7' }}
                          onFocus={(e) => e.currentTarget.style.borderColor = '#0f172a'}
                          onBlur={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                        >
                          <option value="paesana">Paesana (Valle Po)</option>
                          <option value="torino">Torino (Città)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Sezione Localizzazione */}
                  <div style={{ marginBottom: '32px' }}>
                    <h3 style={{ marginBottom: '20px', color: '#1e293b', fontSize: '1.1rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Localizzazione
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                      
                      <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#475569', fontSize: '0.9rem' }}>
                          Indirizzo *
                        </label>
                        <input
                          required
                          value={formData.location.address}
                          onChange={(e) => setFormData({...formData, location: {...formData.location, address: e.target.value}})}
                          placeholder="Via Pratoguglielmo"
                          style={{ width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '0.95rem', transition: 'all 0.3s', boxSizing: 'border-box' }}
                          onFocus={(e) => e.currentTarget.style.borderColor = '#0f172a'}
                          onBlur={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#475569', fontSize: '0.9rem' }}>
                          Città *
                        </label>
                        <input
                          required
                          value={formData.location.city}
                          onChange={(e) => setFormData({...formData, location: {...formData.location, city: e.target.value}})}
                          style={{ width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '0.95rem', transition: 'all 0.3s', boxSizing: 'border-box' }}
                          onFocus={(e) => e.currentTarget.style.borderColor = '#0f172a'}
                          onBlur={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#475569', fontSize: '0.9rem' }}>
                          Provincia *
                        </label>
                        <input
                          required
                          value={formData.location.province}
                          onChange={(e) => setFormData({...formData, location: {...formData.location, province: e.target.value}})}
                          placeholder="CN"
                          maxLength={2}
                          style={{ width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '0.95rem', transition: 'all 0.3s', boxSizing: 'border-box' }}
                          onFocus={(e) => e.currentTarget.style.borderColor = '#0f172a'}
                          onBlur={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Sezione Caratteristiche */}
                  <div style={{ marginBottom: '32px' }}>
                    <h3 style={{ marginBottom: '20px', color: '#1e293b', fontSize: '1.1rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Caratteristiche
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                      
                      <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#475569', fontSize: '0.9rem' }}>
                          Locali *
                        </label>
                        <input
                          required
                          type="number"
                          min="1"
                          value={formData.details.rooms}
                          onChange={(e) => setFormData({...formData, details: {...formData.details, rooms: Number(e.target.value)}})}
                          style={{ width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '0.95rem', transition: 'all 0.3s', boxSizing: 'border-box' }}
                          onFocus={(e) => e.currentTarget.style.borderColor = '#0f172a'}
                          onBlur={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#475569', fontSize: '0.9rem' }}>
                          Bagni *
                        </label>
                        <input
                          required
                          type="number"
                          min="1"
                          value={formData.details.bathrooms}
                          onChange={(e) => setFormData({...formData, details: {...formData.details, bathrooms: Number(e.target.value)}})}
                          style={{ width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '0.95rem', transition: 'all 0.3s', boxSizing: 'border-box' }}
                          onFocus={(e) => e.currentTarget.style.borderColor = '#0f172a'}
                          onBlur={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#475569', fontSize: '0.9rem' }}>
                          Superficie (m²) *
                        </label>
                        <input
                          required
                          type="number"
                          min="10"
                          value={formData.details.sqm}
                          onChange={(e) => setFormData({...formData, details: {...formData.details, sqm: Number(e.target.value)}})}
                          style={{ width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '0.95rem', transition: 'all 0.3s', boxSizing: 'border-box' }}
                          onFocus={(e) => e.currentTarget.style.borderColor = '#0f172a'}
                          onBlur={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#475569', fontSize: '0.9rem' }}>
                          Piano
                        </label>
                        <input
                          type="number"
                          value={formData.details.floor || ''}
                          onChange={(e) => setFormData({...formData, details: {...formData.details, floor: e.target.value ? Number(e.target.value) : undefined}})}
                          placeholder="Piano terra = 0"
                          style={{ width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '0.95rem', transition: 'all 0.3s', boxSizing: 'border-box' }}
                          onFocus={(e) => e.currentTarget.style.borderColor = '#0f172a'}
                          onBlur={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#475569', fontSize: '0.9rem' }}>
                          Classe Energetica
                        </label>
                        <select
                          value={formData.details.energyClass || 'G'}
                          onChange={(e) => setFormData({...formData, details: {...formData.details, energyClass: e.target.value}})}
                          style={{ width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '0.95rem', transition: 'all 0.3s', boxSizing: 'border-box', background: '#fff' }}
                          onFocus={(e) => e.currentTarget.style.borderColor = '#0f172a'}
                          onBlur={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
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

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginTop: '20px' }}>
                      
                      <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '12px', background: '#f8fafc', borderRadius: '10px', border: '2px solid #e2e8f0', transition: 'all 0.3s' }}
                        onMouseEnter={(e) => e.currentTarget.style.borderColor = '#0f172a'}
                        onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                      >
                        <input
                          type="checkbox"
                          checked={formData.details.balcony || false}
                          onChange={(e) => setFormData({...formData, details: {...formData.details, balcony: e.target.checked}})}
                          style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#0f172a' }}
                        />
                        <span style={{ fontWeight: '500', color: '#334155', fontSize: '0.95rem' }}>Balcone</span>
                      </label>

                      <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '12px', background: '#f8fafc', borderRadius: '10px', border: '2px solid #e2e8f0', transition: 'all 0.3s' }}
                        onMouseEnter={(e) => e.currentTarget.style.borderColor = '#0f172a'}
                        onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                      >
                        <input
                          type="checkbox"
                          checked={formData.details.garage || false}
                          onChange={(e) => setFormData({...formData, details: {...formData.details, garage: e.target.checked}})}
                          style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#0f172a' }}
                        />
                        <span style={{ fontWeight: '500', color: '#334155', fontSize: '0.95rem' }}>Box/Garage</span>
                      </label>

                      <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '12px', background: '#f8fafc', borderRadius: '10px', border: '2px solid #e2e8f0', transition: 'all 0.3s' }}
                        onMouseEnter={(e) => e.currentTarget.style.borderColor = '#0f172a'}
                        onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                      >
                        <input
                          type="checkbox"
                          checked={formData.details.elevator || false}
                          onChange={(e) => setFormData({...formData, details: {...formData.details, elevator: e.target.checked}})}
                          style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#0f172a' }}
                        />
                        <span style={{ fontWeight: '500', color: '#334155', fontSize: '0.95rem' }}>Ascensore</span>
                      </label>

                      <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '12px', background: '#f8fafc', borderRadius: '10px', border: '2px solid #e2e8f0', transition: 'all 0.3s' }}
                        onMouseEnter={(e) => e.currentTarget.style.borderColor = '#0f172a'}
                        onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                      >
                        <input
                          type="checkbox"
                          checked={formData.details.furnished || false}
                          onChange={(e) => setFormData({...formData, details: {...formData.details, furnished: e.target.checked}})}
                          style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#0f172a' }}
                        />
                        <span style={{ fontWeight: '500', color: '#334155', fontSize: '0.95rem' }}>Arredato</span>
                      </label>
                    </div>
                  </div>

                  {/* Sezione Spese */}
                  <div style={{ marginBottom: '32px' }}>
                    <h3 style={{ marginBottom: '20px', color: '#1e293b', fontSize: '1.1rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Spese Aggiuntive
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                      
                      <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#475569', fontSize: '0.9rem' }}>
                          Spese Condominio (€/mese)
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={formData.costs?.condominiumFees || ''}
                          onChange={(e) => setFormData({...formData, costs: {...formData.costs, condominiumFees: Number(e.target.value) || 0}})}
                          placeholder="60"
                          style={{ width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '0.95rem', transition: 'all 0.3s', boxSizing: 'border-box' }}
                          onFocus={(e) => e.currentTarget.style.borderColor = '#0f172a'}
                          onBlur={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#475569', fontSize: '0.9rem' }}>
                          Spese Riscaldamento (€/anno)
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={formData.costs?.heatingCosts || ''}
                          onChange={(e) => setFormData({...formData, costs: {...formData.costs, heatingCosts: Number(e.target.value) || 0}})}
                          placeholder="800"
                          style={{ width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '0.95rem', transition: 'all 0.3s', boxSizing: 'border-box' }}
                          onFocus={(e) => e.currentTarget.style.borderColor = '#0f172a'}
                          onBlur={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Sezione Descrizione */}
                  <div style={{ marginBottom: '32px' }}>
                    <h3 style={{ marginBottom: '20px', color: '#1e293b', fontSize: '1.1rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Descrizione
                    </h3>
                    <textarea
                      required
                      rows={6}
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Descrivi in dettaglio le caratteristiche dell'immobile, i servizi disponibili, la posizione strategica..."
                      style={{ width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '0.95rem', resize: 'vertical', fontFamily: 'inherit', transition: 'all 0.3s', boxSizing: 'border-box' }}
                      onFocus={(e) => e.currentTarget.style.borderColor = '#0f172a'}
                      onBlur={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                    />
                  </div>

                  {/* Sezione Immagini */}
                  <div style={{ marginBottom: '32px' }}>
                    <h3 style={{ marginBottom: '20px', color: '#1e293b', fontSize: '1.1rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Galeria Immagini
                    </h3>
                    
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      style={{
                        border: isDragging ? '3px dashed #0f172a' : '3px dashed #cbd5e1',
                        borderRadius: '12px',
                        padding: '48px 40px',
                        textAlign: 'center',
                        background: isDragging ? '#f1f5f9' : '#f8fafc',
                        transition: 'all 0.3s',
                        marginBottom: '20px',
                        cursor: 'pointer'
                      }}
                      onClick={() => document.getElementById('file-input')?.click()}
                    >
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5" style={{ margin: '0 auto 16px' }}>
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <path d="m21 15-5-5L5 21"></path>
                      </svg>
                      <p style={{ fontSize: '1.1rem', fontWeight: '600', color: '#1e293b', marginBottom: '8px', margin: 0 }}>
                        {isDragging ? 'Rilascia le immagini qui' : 'Trascina le immagini qui o clicca per sfogliare'}
                      </p>
                      <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '8px 0 0' }}>
                        Formati supportati: JPG, PNG, WEBP • Massimo 15 immagini • Fino a 5MB per file
                        <br />
                        <span style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px', display: 'block' }}>
                          Immagini caricate: {imagePreviewUrls.length}/15
                        </span>
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

                    {imagePreviewUrls.length > 0 && (
                      <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', 
                        gap: '12px',
                        marginBottom: '20px'
                      }}>
                        {imagePreviewUrls.map((url, index) => (
                          <div key={index} style={{ position: 'relative', paddingTop: '100%', borderRadius: '10px', overflow: 'hidden', border: '2px solid #e2e8f0', background: '#f8fafc' }}>
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
                                top: '6px',
                                right: '6px',
                                background: '#dc2626',
                                color: 'white',
                                border: 'none',
                                borderRadius: '50%',
                                width: '32px',
                                height: '32px',
                                cursor: 'pointer',
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.3s',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#b91c1c';
                                e.currentTarget.style.transform = 'scale(1.1)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = '#dc2626';
                                e.currentTarget.style.transform = 'scale(1)';
                              }}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <div style={{ marginTop: '20px' }}>
                      <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#334155', fontSize: '0.9rem' }}>
                        Oppure inserisci URL immagini ({imagePreviewUrls.length}/15)
                      </label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <input
                          type="url"
                          id="image-url-input"
                          placeholder="https://esempio.com/immagine.jpg"
                          disabled={imagePreviewUrls.length >= 15}
                          style={{ 
                            flex: 1, 
                            padding: '12px 14px', 
                            border: '2px solid #e2e8f0', 
                            borderRadius: '10px', 
                            fontSize: '0.95rem',
                            transition: 'all 0.3s',
                            boxSizing: 'border-box',
                            opacity: imagePreviewUrls.length >= 15 ? 0.5 : 1,
                            cursor: imagePreviewUrls.length >= 15 ? 'not-allowed' : 'text'
                          }}
                          onFocus={(e) => e.currentTarget.style.borderColor = '#0f172a'}
                          onBlur={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && imagePreviewUrls.length < 15) {
                              e.preventDefault();
                              const input = e.currentTarget;
                              addImageUrl(input.value);
                              input.value = '';
                            }
                          }}
                        />
                        <button
                          type="button"
                          disabled={imagePreviewUrls.length >= 15}
                          onClick={() => {
                            const input = document.getElementById('image-url-input') as HTMLInputElement;
                            if (input && imagePreviewUrls.length < 15) {
                              addImageUrl(input.value);
                              input.value = '';
                            }
                          }}
                          style={{
                            padding: '12px 24px',
                            background: imagePreviewUrls.length >= 15 ? '#cbd5e1' : '#0f172a',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            cursor: imagePreviewUrls.length >= 15 ? 'not-allowed' : 'pointer',
                            fontWeight: '600',
                            transition: 'all 0.3s',
                            fontSize: '0.9rem',
                            opacity: imagePreviewUrls.length >= 15 ? 0.6 : 1
                          }}
                          onMouseEnter={(e) => {
                            if (imagePreviewUrls.length < 15) {
                              e.currentTarget.style.background = '#1e293b';
                              e.currentTarget.style.transform = 'translateY(-2px)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (imagePreviewUrls.length < 15) {
                              e.currentTarget.style.background = '#0f172a';
                              e.currentTarget.style.transform = 'translateY(0)';
                            }
                          }}
                        >
                          Aggiungi
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Pulsanti Azione */}
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button 
                      type="submit"
                      style={{ 
                        flex: 1,
                        padding: '16px', 
                        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '10px', 
                        fontSize: '1.05rem', 
                        fontWeight: '700',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        boxShadow: '0 4px 12px rgba(15, 23, 42, 0.3)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(15, 23, 42, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(15, 23, 42, 0.3)';
                      }}
                    >
                      {isEditMode ? 'Salva Modifiche' : 'Pubblica Immobile'}
                    </button>

                    {isEditMode && (
                      <button 
                        type="button"
                        onClick={handleCancel}
                        style={{ 
                          flex: 1,
                          padding: '16px', 
                          background: 'transparent',
                          color: '#475569', 
                          border: '2px solid #cbd5e1', 
                          borderRadius: '10px', 
                          fontSize: '1.05rem', 
                          fontWeight: '700',
                          cursor: 'pointer',
                          transition: 'all 0.3s',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#f1f5f9';
                          e.currentTarget.style.borderColor = '#9ca3af';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.borderColor = '#cbd5e1';
                        }}
                      >
                        Annulla
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Sezione Immobili Pubblicati */}
              <div style={{ background: '#fff', padding: '40px', borderRadius: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '6px',
                      height: '40px',
                      background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
                      borderRadius: '3px'
                    }}></div>
                    <h2 style={{ fontSize: '1.6rem', color: '#0f172a', fontWeight: '800', margin: 0 }}>
                      Immobili Pubblicati ({filteredProperties.length})
                    </h2>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => setSelectedBranch('all')}
                      style={{
                        padding: '10px 18px',
                        background: selectedBranch === 'all' ? '#0f172a' : '#f1f5f9',
                        color: selectedBranch === 'all' ? 'white' : '#475569',
                        border: '2px solid' + (selectedBranch === 'all' ? ' #0f172a' : ' #e2e8f0'),
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        transition: 'all 0.3s',
                        fontSize: '0.9rem'
                      }}
                      onMouseEnter={(e) => {
                        if (selectedBranch !== 'all') {
                          e.currentTarget.style.borderColor = '#cbd5e1';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedBranch !== 'all') {
                          e.currentTarget.style.borderColor = '#e2e8f0';
                        }
                      }}
                    >
                      Tutti ({properties.length})
                    </button>
                    <button
                      onClick={() => setSelectedBranch('paesana')}
                      style={{
                        padding: '10px 18px',
                        background: selectedBranch === 'paesana' ? '#0f172a' : '#f1f5f9',
                        color: selectedBranch === 'paesana' ? 'white' : '#475569',
                        border: '2px solid' + (selectedBranch === 'paesana' ? ' #0f172a' : ' #e2e8f0'),
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        transition: 'all 0.3s',
                        fontSize: '0.9rem'
                      }}
                    >
                      Paesana ({properties.filter(p => p.branch === 'paesana').length})
                    </button>
                    <button
                      onClick={() => setSelectedBranch('torino')}
                      style={{
                        padding: '10px 18px',
                        background: selectedBranch === 'torino' ? '#0f172a' : '#f1f5f9',
                        color: selectedBranch === 'torino' ? 'white' : '#475569',
                        border: '2px solid' + (selectedBranch === 'torino' ? ' #0f172a' : ' #e2e8f0'),
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        transition: 'all 0.3s',
                        fontSize: '0.9rem'
                      }}
                    >
                      Torino ({properties.filter(p => p.branch === 'torino').length})
                    </button>
                  </div>
                </div>

                {filteredProperties.length === 0 && (
                  <p style={{ textAlign: 'center', color: '#6b7280', padding: '60px 40px', fontSize: '1rem' }}>
                    {selectedBranch === 'all' 
                      ? 'Nessun immobile pubblicato. Aggiungi il primo annuncio!' 
                      : `Nessun immobile per ${selectedBranch === 'paesana' ? 'Paesana' : 'Torino'}`}
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
                        background: '#fff'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.borderColor = '#cbd5e1';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.borderColor = '#e5e7eb';
                      }}
                    >
                      <div style={{
                        height: '200px',
                        backgroundImage: `url(${property.images[0] || '/placeholder.jpg'})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative'
                      }}>
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
                              fontSize: '1.4rem',
                              fontWeight: '800',
                              transform: 'rotate(-15deg)',
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                              letterSpacing: '3px',
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
                          background: property.branch === 'paesana' ? '#0f172a' : '#1e293b',
                          color: 'white',
                          borderRadius: '6px',
                          fontWeight: '600',
                          fontSize: '0.8rem'
                        }}>
                          {property.branch === 'paesana' ? 'Paesana' : 'Torino'}
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
                            fontSize: '0.8rem',
                            fontWeight: '600'
                          }}>
                            +{property.images.length - 1} foto
                          </div>
                        )}
                      </div>

                      <div style={{ padding: '16px' }}>
                        <h4 style={{ marginBottom: '12px', fontSize: '1rem', color: '#1e293b', fontWeight: '700' }}>
                          {property.title}
                        </h4>
                        
                        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', fontSize: '0.85rem', color: '#64748b', flexWrap: 'wrap' }}>
                          <span>{property.location.city}</span>
                          <span>•</span>
                          <span>{property.details.rooms} locali</span>
                          <span>•</span>
                          <span>{property.details.sqm} m²</span>
                        </div>

                        <div style={{ display: 'flex', gap: '6px', marginBottom: '12px', fontSize: '0.75rem', flexWrap: 'wrap' }}>
                          {property.details.balcony && <span style={{ padding: '4px 8px', background: '#e0e7ff', color: '#3730a3', borderRadius: '4px', fontWeight: '600' }}>Balcone</span>}
                          {property.details.garage && <span style={{ padding: '4px 8px', background: '#e0e7ff', color: '#3730a3', borderRadius: '4px', fontWeight: '600' }}>Garage</span>}
                          {property.details.elevator && <span style={{ padding: '4px 8px', background: '#e0e7ff', color: '#3730a3', borderRadius: '4px', fontWeight: '600' }}>Ascensore</span>}
                          {property.status === 'sold' && <span style={{ padding: '4px 8px', background: '#fef3c7', color: '#92400e', borderRadius: '4px', fontWeight: '700' }}>VENDUTO</span>}
                        </div>

                        <div style={{ 
                          fontSize: '1.4rem', 
                          fontWeight: '800', 
                          color: '#0f172a',
                          marginBottom: '16px'
                        }}>
                          € {property.price.toLocaleString('it-IT')}
                          {property.type === 'rent' && <span style={{ fontSize: '0.7rem', fontWeight: 'normal', color: '#64748b' }}>/mese</span>}
                        </div>

                        <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
                          <button
                            onClick={() => startEdit(property)}
                            style={{
                              width: '100%',
                              padding: '10px',
                              background: '#3b82f6',
                              color: 'white',
                              border: '2px solid #3b82f6',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              fontWeight: '600',
                              transition: 'all 0.3s',
                              fontSize: '0.9rem'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = '#2563eb';
                              e.currentTarget.style.borderColor = '#2563eb';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = '#3b82f6';
                              e.currentTarget.style.borderColor = '#3b82f6';
                            }}
                          >
                            Modifica
                          </button>

                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMarkSold(property.id!);
                              }}
                              style={{
                                flex: 1,
                                padding: '10px',
                                background: property.status === 'sold' ? '#10b981' : '#f1f5f9',
                                color: property.status === 'sold' ? 'white' : '#334155',
                                border: property.status === 'sold' ? '2px solid #10b981' : '2px solid #e2e8f0',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: '600',
                                transition: 'all 0.3s',
                                fontSize: '0.9rem'
                              }}
                              onMouseEnter={(e) => {
                                if (property.status === 'sold') {
                                  e.currentTarget.style.background = '#059669';
                                } else {
                                  e.currentTarget.style.background = '#e0e7ff';
                                  e.currentTarget.style.borderColor = '#cbd5e1';
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (property.status === 'sold') {
                                  e.currentTarget.style.background = '#10b981';
                                } else {
                                  e.currentTarget.style.background = '#f1f5f9';
                                  e.currentTarget.style.borderColor = '#e2e8f0';
                                }
                              }}
                            >
                              {property.status === 'sold' ? 'Ripubblica' : 'Segna Venduto'}
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
                                transition: 'all 0.3s',
                                fontSize: '0.9rem'
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
                              Elimina
                            </button>
                          </div>
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
          
          /* Prevent iOS zoom on inputs */
          input,
          textarea,
          select {
            font-size: 16px !important;
          }
        }

        @media (max-width: 600px) {
          main {
            padding: 72px 14px 40px 14px !important;
          }

          h1 { font-size: 1.75rem !important; }
        }
      `}</style>
    </>
  );
}