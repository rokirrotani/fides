import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { submitBuyRequest } from '../services/api';

interface BuyRequestFormData {
  buyerName: string;
  email: string;
  phone: string;
  propertyType: 'apartment' | 'house' | 'commercial' | 'any';
  preferredCity: string;
  minPrice?: number;
  maxPrice?: number;
  minRooms?: number;
  minSqm?: number;
  urgency: 'low' | 'medium' | 'high';
  notes: string;
}

export function CompraCasaPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<BuyRequestFormData>({
    buyerName: '',
    email: '',
    phone: '',
    propertyType: 'any',
    preferredCity: '',
    minPrice: undefined,
    maxPrice: undefined,
    minRooms: undefined,
    minSqm: undefined,
    urgency: 'medium',
    notes: ''
  });

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    setSubmitStatus('loading');
    
    try {
      await submitBuyRequest(formData);
      
      setSubmitStatus('success');
      setMessage('Richiesta inviata con successo! Ti contatteremo con le migliori proposte.');
      
      setFormData({
        buyerName: '',
        email: '',
        phone: '',
        propertyType: 'any',
        preferredCity: '',
        minPrice: undefined,
        maxPrice: undefined,
        minRooms: undefined,
        minSqm: undefined,
        urgency: 'medium',
        notes: ''
      });

      setTimeout(() => {
        setSubmitStatus('idle');
        setMessage('');
      }, 5000);
      
    } catch (error) {
      setSubmitStatus('error');
      setMessage('Errore nell\'invio della richiesta. Riprova più tardi.');
      
      setTimeout(() => {
        setSubmitStatus('idle');
        setMessage('');
      }, 5000);
    }
  }

  return (
    <>
      <Navbar />
      
      <main style={{ marginTop: '56px', padding: '48px 24px', minHeight: 'calc(100vh - 56px)', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              width: '80px',
              height: '80px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
              marginBottom: '24px',
              boxShadow: '0 4px 20px rgba(15, 23, 42, 0.15)'
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
            <h1 style={{ 
              fontSize: '2.2rem', 
              marginBottom: '12px', 
              color: '#0f172a', 
              fontWeight: '800',
              letterSpacing: '-0.5px'
            }}>
              Cerca la Tua Casa
            </h1>
            <p style={{ 
              fontSize: '1.1rem', 
              color: '#64748b', 
              maxWidth: '600px', 
              margin: '0 auto', 
              lineHeight: '1.8',
              fontWeight: '400'
            }}>
              Compila il modulo con i tuoi criteri di ricerca e il nostro team ti contatterà con le migliori proposte disponibili nel nostro portafoglio.
            </p>
          </div>

          {/* Main Form Container */}
          <div style={{ 
            background: '#ffffff', 
            padding: '48px', 
            borderRadius: '16px', 
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
            border: '1px solid #e2e8f0'
          }}>

            <form onSubmit={handleSubmit}>

              {/* Sezione 1: Dati Personali */}
              <div style={{ marginBottom: '48px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
                  <div style={{
                    width: '5px',
                    height: '32px',
                    background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
                    borderRadius: '3px'
                  }}></div>
                  <h2 style={{ 
                    margin: 0,
                    color: '#0f172a', 
                    fontSize: '1.3rem', 
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Dati Personali
                  </h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                  
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '10px', 
                      fontWeight: '600', 
                      color: '#334155',
                      fontSize: '0.95rem'
                    }}>
                      Nome e Cognome *
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.buyerName}
                      onChange={(e) => setFormData({...formData, buyerName: e.target.value})}
                      placeholder="Mario Rossi"
                      style={{ 
                        width: '100%', 
                        padding: '13px 14px', 
                        border: '2px solid #e2e8f0', 
                        borderRadius: '10px', 
                        fontSize: '0.95rem',
                        transition: 'all 0.3s',
                        boxSizing: 'border-box',
                        fontFamily: 'inherit'
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
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '10px', 
                      fontWeight: '600', 
                      color: '#334155',
                      fontSize: '0.95rem'
                    }}>
                      Email *
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="mario.rossi@email.com"
                      style={{ 
                        width: '100%', 
                        padding: '13px 14px', 
                        border: '2px solid #e2e8f0', 
                        borderRadius: '10px', 
                        fontSize: '0.95rem',
                        transition: 'all 0.3s',
                        boxSizing: 'border-box',
                        fontFamily: 'inherit'
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
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '10px', 
                      fontWeight: '600', 
                      color: '#334155',
                      fontSize: '0.95rem'
                    }}>
                      Telefono *
                    </label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+39 333 1234567"
                      style={{ 
                        width: '100%', 
                        padding: '13px 14px', 
                        border: '2px solid #e2e8f0', 
                        borderRadius: '10px', 
                        fontSize: '0.95rem',
                        transition: 'all 0.3s',
                        boxSizing: 'border-box',
                        fontFamily: 'inherit'
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

                </div>
              </div>

              {/* Sezione 2: Caratteristiche Immobile */}
              <div style={{ marginBottom: '48px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
                  <div style={{
                    width: '5px',
                    height: '32px',
                    background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
                    borderRadius: '3px'
                  }}></div>
                  <h2 style={{ 
                    margin: 0,
                    color: '#0f172a', 
                    fontSize: '1.3rem', 
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Caratteristiche Immobile
                  </h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                  
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '10px', 
                      fontWeight: '600', 
                      color: '#334155',
                      fontSize: '0.95rem'
                    }}>
                      Tipologia *
                    </label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => setFormData({...formData, propertyType: e.target.value as any})}
                      style={{ 
                        width: '100%', 
                        padding: '13px 14px', 
                        border: '2px solid #e2e8f0', 
                        borderRadius: '10px', 
                        fontSize: '0.95rem',
                        transition: 'all 0.3s',
                        boxSizing: 'border-box',
                        background: '#fff',
                        fontFamily: 'inherit',
                        cursor: 'pointer'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#0f172a';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(15, 23, 42, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#e2e8f0';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <option value="any">Qualsiasi Tipologia</option>
                      <option value="apartment">Appartamento</option>
                      <option value="house">Casa / Villa</option>
                      <option value="commercial">Locale Commerciale</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '10px', 
                      fontWeight: '600', 
                      color: '#334155',
                      fontSize: '0.95rem'
                    }}>
                      Zona Preferita *
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.preferredCity}
                      onChange={(e) => setFormData({...formData, preferredCity: e.target.value})}
                      placeholder="Paesana, Torino, Valle Po..."
                      style={{ 
                        width: '100%', 
                        padding: '13px 14px', 
                        border: '2px solid #e2e8f0', 
                        borderRadius: '10px', 
                        fontSize: '0.95rem',
                        transition: 'all 0.3s',
                        boxSizing: 'border-box',
                        fontFamily: 'inherit'
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
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '10px', 
                      fontWeight: '600', 
                      color: '#334155',
                      fontSize: '0.95rem'
                    }}>
                      Urgenza della Ricerca *
                    </label>
                    <select
                      value={formData.urgency}
                      onChange={(e) => setFormData({...formData, urgency: e.target.value as any})}
                      style={{ 
                        width: '100%', 
                        padding: '13px 14px', 
                        border: '2px solid #e2e8f0', 
                        borderRadius: '10px', 
                        fontSize: '0.95rem',
                        transition: 'all 0.3s',
                        boxSizing: 'border-box',
                        background: '#fff',
                        fontFamily: 'inherit',
                        cursor: 'pointer'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#0f172a';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(15, 23, 42, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#e2e8f0';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <option value="low">Bassa - Sto solo guardando</option>
                      <option value="medium">Media - Entro 3-6 mesi</option>
                      <option value="high">Alta - Subito</option>
                    </select>
                  </div>

                </div>
              </div>

              {/* Sezione 3: Budget e Dimensioni */}
              <div style={{ marginBottom: '48px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
                  <div style={{
                    width: '5px',
                    height: '32px',
                    background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
                    borderRadius: '3px'
                  }}></div>
                  <h2 style={{ 
                    margin: 0,
                    color: '#0f172a', 
                    fontSize: '1.3rem', 
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Budget e Dimensioni
                  </h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                  
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '10px', 
                      fontWeight: '600', 
                      color: '#334155',
                      fontSize: '0.95rem'
                    }}>
                      Budget Minimo (€)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.minPrice || ''}
                      onChange={(e) => setFormData({...formData, minPrice: e.target.value ? Number(e.target.value) : undefined})}
                      placeholder="50.000"
                      style={{ 
                        width: '100%', 
                        padding: '13px 14px', 
                        border: '2px solid #e2e8f0', 
                        borderRadius: '10px', 
                        fontSize: '0.95rem',
                        transition: 'all 0.3s',
                        boxSizing: 'border-box',
                        fontFamily: 'inherit'
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
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '10px', 
                      fontWeight: '600', 
                      color: '#334155',
                      fontSize: '0.95rem'
                    }}>
                      Budget Massimo (€)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.maxPrice || ''}
                      onChange={(e) => setFormData({...formData, maxPrice: e.target.value ? Number(e.target.value) : undefined})}
                      placeholder="200.000"
                      style={{ 
                        width: '100%', 
                        padding: '13px 14px', 
                        border: '2px solid #e2e8f0', 
                        borderRadius: '10px', 
                        fontSize: '0.95rem',
                        transition: 'all 0.3s',
                        boxSizing: 'border-box',
                        fontFamily: 'inherit'
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
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '10px', 
                      fontWeight: '600', 
                      color: '#334155',
                      fontSize: '0.95rem'
                    }}>
                      Numero Minimo Locali
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.minRooms || ''}
                      onChange={(e) => setFormData({...formData, minRooms: e.target.value ? Number(e.target.value) : undefined})}
                      placeholder="2"
                      style={{ 
                        width: '100%', 
                        padding: '13px 14px', 
                        border: '2px solid #e2e8f0', 
                        borderRadius: '10px', 
                        fontSize: '0.95rem',
                        transition: 'all 0.3s',
                        boxSizing: 'border-box',
                        fontFamily: 'inherit'
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
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '10px', 
                      fontWeight: '600', 
                      color: '#334155',
                      fontSize: '0.95rem'
                    }}>
                      Superficie Minima (m²)
                    </label>
                    <input
                      type="number"
                      min="10"
                      value={formData.minSqm || ''}
                      onChange={(e) => setFormData({...formData, minSqm: e.target.value ? Number(e.target.value) : undefined})}
                      placeholder="60"
                      style={{ 
                        width: '100%', 
                        padding: '13px 14px', 
                        border: '2px solid #e2e8f0', 
                        borderRadius: '10px', 
                        fontSize: '0.95rem',
                        transition: 'all 0.3s',
                        boxSizing: 'border-box',
                        fontFamily: 'inherit'
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

                </div>
              </div>

              {/* Sezione 4: Note Aggiuntive */}
              <div style={{ marginBottom: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
                  <div style={{
                    width: '5px',
                    height: '32px',
                    background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
                    borderRadius: '3px'
                  }}></div>
                  <h2 style={{ 
                    margin: 0,
                    color: '#0f172a', 
                    fontSize: '1.3rem', 
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Note Aggiuntive
                  </h2>
                </div>

                <textarea
                  rows={6}
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="Descrivi le caratteristiche desiderate: balcone, garage, ascensore, zona tranquilla, vicino ai trasporti, giardino, ecc..."
                  style={{ 
                    width: '100%', 
                    padding: '14px', 
                    border: '2px solid #e2e8f0', 
                    borderRadius: '10px', 
                    fontSize: '0.95rem', 
                    resize: 'vertical',
                    fontFamily: 'inherit',
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

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={submitStatus === 'loading'}
                style={{ 
                  width: '100%', 
                  padding: '16px', 
                  background: submitStatus === 'loading' 
                    ? '#cbd5e1'
                    : 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '10px', 
                  fontSize: '1.05rem', 
                  fontWeight: '700',
                  cursor: submitStatus === 'loading' ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  boxShadow: '0 4px 12px rgba(15, 23, 42, 0.3)'
                }}
                onMouseEnter={(e) => {
                  if (submitStatus !== 'loading') {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(15, 23, 42, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (submitStatus !== 'loading') {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(15, 23, 42, 0.3)';
                  }
                }}
              >
                {submitStatus === 'loading' ? 'Invio in corso...' : 'Invia Richiesta di Ricerca'}
              </button>

              {/* Status Message */}
              {submitStatus !== 'idle' && (
                <div style={{ 
                  marginTop: '24px', 
                  padding: '16px 20px', 
                  borderRadius: '10px', 
                  textAlign: 'center',
                  background: submitStatus === 'success' 
                    ? '#d1fae5'
                    : submitStatus === 'error'
                    ? '#fee2e2'
                    : '#dbeafe',
                  color: submitStatus === 'success' 
                    ? '#065f46'
                    : submitStatus === 'error'
                    ? '#991b1b'
                    : '#1e3a8a',
                  fontWeight: '600',
                  fontSize: '0.95rem',
                  border: submitStatus === 'success' 
                    ? '1px solid #a7f3d0'
                    : submitStatus === 'error'
                    ? '1px solid #fca5a5'
                    : '1px solid #93c5fd',
                  animation: 'slideIn 0.3s ease-out'
                }}>
                  {submitStatus === 'success' && '✓ ' + message}
                  {submitStatus === 'error' && '✕ ' + message}
                  {submitStatus === 'loading' && message}
                </div>
              )}

            </form>
          </div>

          {/* Info Section */}
          <div style={{ 
            marginTop: '56px', 
            padding: '40px', 
            background: '#ffffff', 
            borderRadius: '16px',
            textAlign: 'center',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
          }}>
            <h3 style={{ 
              fontSize: '1.4rem', 
              marginBottom: '20px', 
              fontWeight: '700', 
              color: '#0f172a',
              letterSpacing: '-0.5px'
            }}>
              Preferisci Contattarci Direttamente?
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginTop: '28px' }}>
              
              <a href="tel:0114282544" style={{ textDecoration: 'none' }}>
                <div style={{ 
                  padding: '24px', 
                  background: '#f8fafc', 
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '48px',
                    height: '48px',
                    borderRadius: '10px',
                    background: '#dbeafe',
                    marginBottom: '12px'
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <p style={{ fontSize: '0.95rem', color: '#64748b', marginBottom: '8px', margin: 0 }}>
                    Chiama la nostra sede principale
                  </p>
                  <p style={{ 
                    fontSize: '1.3rem', 
                    fontWeight: '700', 
                    color: '#0f172a',
                    margin: '12px 0 0 0'
                  }}>
                    011 428 2544
                  </p>
                </div>
              </a>

              <a href="mailto:info@fidesimmobiliare.it" style={{ textDecoration: 'none' }}>
                <div style={{ 
                  padding: '24px', 
                  background: '#f8fafc', 
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '48px',
                    height: '48px',
                    borderRadius: '10px',
                    background: '#dbeafe',
                    marginBottom: '12px'
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <p style={{ fontSize: '0.95rem', color: '#64748b', marginBottom: '8px', margin: 0 }}>
                    Invia una email
                  </p>
                  <p style={{ 
                    fontSize: '1.1rem', 
                    fontWeight: '700', 
                    color: '#0f172a',
                    margin: '12px 0 0 0',
                    wordBreak: 'break-all'
                  }}>
                    info@fidesimmobiliare.it
                  </p>
                </div>
              </a>

              <div
                onClick={() => navigate('/contatti')}
                style={{ 
                  padding: '24px', 
                  background: '#f8fafc', 
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  background: '#dbeafe',
                  marginBottom: '12px'
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <p style={{ fontSize: '0.95rem', color: '#64748b', marginBottom: '8px', margin: 0 }}>
                  Visita le Sedi
                </p>
                <p style={{ 
                  fontSize: '1.1rem', 
                  fontWeight: '700', 
                  color: '#0f172a',
                  margin: '12px 0 0 0'
                }}>
                  Vedi orari e sedi
                </p>
              </div>

            </div>

            <p style={{
              marginTop: '24px',
              fontSize: '0.9rem',
              color: '#64748b'
            }}>
              Il nostro team risponderà nel più breve tempo possibile con le proposte più adatte alle tue esigenze.
            </p>
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
          h1 { font-size: 2rem !important; }
          
          /* Prevent iOS zoom on inputs */
          input,
          textarea,
          select {
            font-size: 16px !important;
            min-height: 44px !important;
          }

          /* Form grid */
          main > div > div {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 600px) {
          main {
            padding: 32px 16px !important;
          }

          h1 { font-size: 1.75rem !important; }
        }

        @media (max-width: 480px) {
          main { padding: 24px 12px !important; }
          h1 { font-size: 1.6rem !important; }
        }
      `}</style>
    </>
  );
}