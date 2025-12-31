import { useState, FormEvent } from 'react';
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

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    try {
      await submitBuyRequest(formData);
      
      setSubmitStatus('success');
      setMessage('✅ Richiesta inviata con successo! Ti contatteremo con le migliori proposte.');
      
      // Reset form
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

      // Reset message dopo 5 secondi
      setTimeout(() => {
        setSubmitStatus('idle');
        setMessage('');
      }, 5000);
      
    } catch (error) {
      setSubmitStatus('error');
      setMessage('❌ Errore nell\'invio. Riprova più tardi.');
    }
  }

  return (
    <>
      <Navbar />
      
      <main style={{ marginTop: '56px', padding: '48px 24px', minHeight: 'calc(100vh - 56px)', background: '#ffffff' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }} className="fade-in">
          
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              width: '48px',
              height: '48px',
              borderRadius: '8px',
              background: '#0f172a',
              marginBottom: '16px'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </div>
            <h1 style={{ fontSize: '2rem', marginBottom: '12px', color: '#0f172a', fontWeight: '600' }}>
              Cerca Immobile
            </h1>
            <p style={{ fontSize: '1rem', color: '#6b7280', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
              Compila il form e ti invieremo le migliori proposte disponibili.
            </p>
          </div>

          {/* Form */}
          <div style={{ 
            background: '#f9fafb', 
            padding: '32px', 
            borderRadius: '8px', 
            border: '1px solid #e5e7eb'
          }}>
            <h2 style={{ marginBottom: '24px', color: '#0f172a', fontSize: '1.3rem', fontWeight: '600' }}>
              Dettagli Ricerca
            </h2>

            <form onSubmit={handleSubmit}>
              {/* Dati Personali */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ marginBottom: '12px', color: '#0f172a', fontSize: '1rem', fontWeight: '600', borderBottom: '1px solid #e5e7eb', paddingBottom: '8px' }}>
                  Dati Personali
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#475569' }}>
                      Nome e Cognome *
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.buyerName}
                      onChange={(e) => setFormData({...formData, buyerName: e.target.value})}
                      placeholder="Mario Rossi"
                      style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#475569' }}>
                      Email *
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="mario.rossi@email.com"
                      style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#475569' }}>
                      Telefono *
                    </label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+39 333 1234567"
                      style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem' }}
                    />
                  </div>

                </div>
              </div>

              {/* Preferenze Ricerca */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ marginBottom: '12px', color: '#0f172a', fontSize: '1rem', fontWeight: '600', borderBottom: '1px solid #e5e7eb', paddingBottom: '8px' }}>
                  Caratteristiche Immobile
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#475569' }}>
                      Tipologia *
                    </label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => setFormData({...formData, propertyType: e.target.value as any})}
                      style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem' }}
                    >
                      <option value="any">Qualsiasi</option>
                      <option value="apartment">Appartamento</option>
                      <option value="house">Casa/Villa</option>
                      <option value="commercial">Commerciale</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#475569' }}>
                      Zona Preferita *
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.preferredCity}
                      onChange={(e) => setFormData({...formData, preferredCity: e.target.value})}
                      placeholder="Es: Paesana, Torino, Valle Po..."
                      style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#475569' }}>
                      Budget Minimo (€)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.minPrice || ''}
                      onChange={(e) => setFormData({...formData, minPrice: e.target.value ? Number(e.target.value) : undefined})}
                      placeholder="50000"
                      style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#475569' }}>
                      Budget Massimo (€)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.maxPrice || ''}
                      onChange={(e) => setFormData({...formData, maxPrice: e.target.value ? Number(e.target.value) : undefined})}
                      placeholder="200000"
                      style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#475569' }}>
                      Numero Minimo Locali
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.minRooms || ''}
                      onChange={(e) => setFormData({...formData, minRooms: e.target.value ? Number(e.target.value) : undefined})}
                      placeholder="2"
                      style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#475569' }}>
                      Superficie Minima (m²)
                    </label>
                    <input
                      type="number"
                      min="10"
                      value={formData.minSqm || ''}
                      onChange={(e) => setFormData({...formData, minSqm: e.target.value ? Number(e.target.value) : undefined})}
                      placeholder="60"
                      style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#475569' }}>
                      Urgenza *
                    </label>
                    <select
                      value={formData.urgency}
                      onChange={(e) => setFormData({...formData, urgency: e.target.value as any})}
                      style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem' }}
                    >
                      <option value="low">⏰ Bassa - Sto solo guardando</option>
                      <option value="medium">⚡ Media - Entro 3-6 mesi</option>
                      <option value="high">🔥 Alta - Subito</option>
                    </select>
                  </div>

                </div>
              </div>

              {/* Note */}
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ marginBottom: '16px', color: '#475569', fontSize: '1.2rem', borderBottom: '2px solid #3b82f6', paddingBottom: '8px' }}>
                  📝 Caratteristiche Desiderate
                </h3>
                <textarea
                  rows={6}
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="Esempio: Cerco appartamento con balcone, piano non troppo alto, possibilmente con garage. Preferenza per zone tranquille..."
                  style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem', resize: 'vertical' }}
                />
              </div>

              {/* Submit */}
              <button 
                type="submit"
                style={{ 
                  width: '100%', 
                  padding: '16px', 
                  background: '#0f172a', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '8px', 
                  fontSize: '1rem', 
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#1e293b';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#0f172a';
                }}
              >
                Invia Richiesta
              </button>

              {/* Status Message */}
              {submitStatus !== 'idle' && (
                <div style={{ 
                  marginTop: '24px', 
                  padding: '16px', 
                  borderRadius: '8px', 
                  textAlign: 'center',
                  background: submitStatus === 'success' ? '#dbeafe' : '#fee2e2',
                  color: submitStatus === 'success' ? '#1e3a8a' : '#991b1b',
                  fontWeight: '600',
                  fontSize: '1.1rem'
                }}>
                  {message}
                </div>
              )}

            </form>
          </div>

          {/* Info Section */}
          <div style={{ 
            marginTop: '48px', 
            padding: '32px', 
            background: '#f9fafb', 
            borderRadius: '8px',
            textAlign: 'center',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', fontWeight: '600', color: '#0f172a' }}>
              Preferisci Parlare Direttamente?
            </h3>
            <p style={{ fontSize: '1rem', marginBottom: '8px', color: '#475569' }}>
              Chiamaci al <strong style={{ color: '#0f172a' }}>011 428 2544</strong>
            </p>
            <p style={{ fontSize: '0.95rem', color: '#64748b' }}>
              Oppure scrivici a <strong style={{ color: '#0f172a' }}>info@fidesimmobiliare.it</strong>
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
