import { useState, FormEvent } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { submitSellRequest } from '../services/api';

interface SellRequestFormData {
  ownerName: string;
  email: string;
  phone: string;
  propertyType: 'apartment' | 'house' | 'commercial' | 'land';
  address: string;
  city: string;
  province: string;
  rooms?: number;
  sqm?: number;
  price?: number;
  description: string;
  urgency: 'low' | 'medium' | 'high';
}

export function VendiCasaPage() {
  const [formData, setFormData] = useState<SellRequestFormData>({
    ownerName: '',
    email: '',
    phone: '',
    propertyType: 'apartment',
    address: '',
    city: '',
    province: '',
    rooms: undefined,
    sqm: undefined,
    price: undefined,
    description: '',
    urgency: 'medium'
  });

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    try {
      await submitSellRequest(formData);
      
      setSubmitStatus('success');
      setMessage('✅ Richiesta inviata con successo! Ti contatteremo presto.');
      
      // Reset form
      setFormData({
        ownerName: '',
        email: '',
        phone: '',
        propertyType: 'apartment',
        address: '',
        city: '',
        province: '',
        rooms: undefined,
        sqm: undefined,
        price: undefined,
        description: '',
        urgency: 'medium'
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
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
            <h1 style={{ fontSize: '2rem', marginBottom: '12px', color: '#0f172a', fontWeight: '600' }}>
              Vendi Immobile
            </h1>
            <p style={{ fontSize: '1rem', color: '#6b7280', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
              Compila il form per ricevere una valutazione gratuita del tuo immobile.
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
              Dettagli Immobile
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
                      value={formData.ownerName}
                      onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
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

              {/* Dati Immobile */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ marginBottom: '12px', color: '#0f172a', fontSize: '1rem', fontWeight: '600', borderBottom: '1px solid #e5e7eb', paddingBottom: '8px' }}>
                  Informazioni Immobile
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
                      <option value="apartment">Appartamento</option>
                      <option value="house">Casa/Villa</option>
                      <option value="commercial">Commerciale</option>
                      <option value="land">Terreno</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#475569' }}>
                      Indirizzo *
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      placeholder="Via Roma, 10"
                      style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#475569' }}>
                      Città *
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      placeholder="Paesana"
                      style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#475569' }}>
                      Provincia *
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.province}
                      onChange={(e) => setFormData({...formData, province: e.target.value})}
                      placeholder="CN"
                      maxLength={2}
                      style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#475569' }}>
                      Numero Locali
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.rooms || ''}
                      onChange={(e) => setFormData({...formData, rooms: e.target.value ? Number(e.target.value) : undefined})}
                      placeholder="3"
                      style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#475569' }}>
                      Superficie (m²)
                    </label>
                    <input
                      type="number"
                      min="10"
                      value={formData.sqm || ''}
                      onChange={(e) => setFormData({...formData, sqm: e.target.value ? Number(e.target.value) : undefined})}
                      placeholder="80"
                      style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#475569' }}>
                      Prezzo Richiesto (€)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.price || ''}
                      onChange={(e) => setFormData({...formData, price: e.target.value ? Number(e.target.value) : undefined})}
                      placeholder="150000"
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
                      <option value="low">⏰ Bassa - Nessuna fretta</option>
                      <option value="medium">⚡ Media - Entro 3-6 mesi</option>
                      <option value="high">🔥 Alta - Urgente</option>
                    </select>
                  </div>

                </div>
              </div>

              {/* Descrizione */}
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ marginBottom: '16px', color: '#475569', fontSize: '1.2rem', borderBottom: '2px solid #22c55e', paddingBottom: '8px' }}>
                  📝 Note Aggiuntive
                </h3>
                <textarea
                  rows={6}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Descrivi il tuo immobile, eventuali ristrutturazioni, caratteristiche particolari..."
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
                  background: submitStatus === 'success' ? '#d1fae5' : '#fee2e2',
                  color: submitStatus === 'success' ? '#065f46' : '#991b1b',
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
