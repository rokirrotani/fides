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

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    setSubmitStatus('loading');
    
    try {
      await submitSellRequest(formData);
      
      setSubmitStatus('success');
      setMessage('✅ Richiesta inviata con successo! Ti contatteremo entro 24 ore.');
      
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
      setTimeout(() => {
        setSubmitStatus('idle');
        setMessage('');
      }, 5000);
    }
  }

  return (
    <>
      <Navbar />
      
      <main style={{ marginTop: '56px', minHeight: 'calc(100vh - 56px)', background: '#f8fafc' }}>
        
        {/* Hero Section */}
        <section className="hero fade-in" style={{
          backgroundImage: 'linear-gradient(135deg, rgba(15, 23, 42, 0.5), rgba(30, 41, 59, 0.7)), url(https://images.unsplash.com/photo-1560448204-e02f7cff0e45?w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          height: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          
          <div className="scale-in" style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              width: '80px',
              height: '80px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))',
              backdropFilter: 'blur(20px)',
              marginBottom: '24px',
              boxShadow: '0 12px 36px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              animation: 'float 3s ease-in-out infinite'
            }} className="float">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
              </svg>
            </div>
            
            <h1 style={{ 
              fontSize: '3rem', 
              marginBottom: '16px', 
              fontWeight: '800',
              textShadow: '0 4px 24px rgba(0,0,0,0.5)',
              letterSpacing: '-1px'
            }}>
              Vendi il Tuo Immobile
            </h1>
            
            <p style={{ 
              fontSize: '1.2rem', 
              textShadow: '0 2px 12px rgba(0,0,0,0.4)',
              opacity: 0.95,
              marginBottom: '24px',
              fontWeight: '400',
              letterSpacing: '0.3px',
              maxWidth: '600px',
              margin: '0 auto 24px'
            }}>
              Ricevi una valutazione gratuita e vendi al miglior prezzo possibile
            </p>

            <div style={{
              display: 'inline-flex',
              gap: '16px',
              fontSize: '0.9rem',
              fontWeight: '600'
            }}>
              <div style={{
                padding: '8px 16px',
                background: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(10px)',
                borderRadius: '30px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M9 12l2 2 4-4m7 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Valutazione Gratuita
              </div>
              <div style={{
                padding: '8px 16px',
                background: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(10px)',
                borderRadius: '30px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Risposta in 24h
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '64px 24px' }}>
          
          {/* Benefits Section */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
            marginBottom: '64px'
          }}>
            
            <div style={{
              padding: '24px',
              background: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              textAlign: 'center',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '10px',
                background: '#dbeafe',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="2">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                </svg>
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '6px', color: '#0f172a' }}>
                Valutazione Precisa
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
                Stima professionale del valore della tua proprietà
              </p>
            </div>

            <div style={{
              padding: '24px',
              background: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              textAlign: 'center',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '10px',
                background: '#dbeafe',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="2">
                  <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                  <polyline points="13 2 13 9 20 9"></polyline>
                </svg>
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '6px', color: '#0f172a' }}>
                Documentazione Completa
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
                Tutta la documentazione gestita professionalmente
              </p>
            </div>

            <div style={{
              padding: '24px',
              background: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              textAlign: 'center',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '10px',
                background: '#dbeafe',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '6px', color: '#0f172a' }}>
                Esperti Dedicati
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
                Team specializzato nel tuo territorio
              </p>
            </div>

            <div style={{
              padding: '24px',
              background: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              textAlign: 'center',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '10px',
                background: '#dbeafe',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '6px', color: '#0f172a' }}>
                Processo Rapido
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
                Dalla valutazione alla vendita in tempi brevi
              </p>
            </div>

          </div>

          {/* Form Section */}
          <div style={{ 
            background: '#ffffff', 
            padding: '48px', 
            borderRadius: '16px', 
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
          }}>
            
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ 
                fontSize: '1.8rem', 
                marginBottom: '8px', 
                color: '#0f172a', 
                fontWeight: '800',
                letterSpacing: '-0.5px'
              }}>
                Compila il Modulo
              </h2>
              <p style={{ 
                fontSize: '0.95rem', 
                color: '#64748b',
                margin: 0
              }}>
                Fornisci i dettagli del tuo immobile per ricevere una valutazione personalizzata
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              
              {/* Personal Info Section */}
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '16px', 
                  color: '#0f172a', 
                  fontSize: '1.1rem', 
                  fontWeight: '700',
                  borderBottom: '2px solid #0f172a',
                  paddingBottom: '12px'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  Dati Personali
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#0f172a', fontSize: '0.9rem' }}>
                      Nome e Cognome *
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.ownerName}
                      onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
                      placeholder="Es. Mario Rossi"
                      style={{ 
                        width: '100%', 
                        padding: '12px 14px', 
                        border: '1.5px solid #e2e8f0', 
                        borderRadius: '10px', 
                        fontSize: '0.95rem',
                        transition: 'all 0.3s',
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
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#0f172a', fontSize: '0.9rem' }}>
                      Email *
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="Es. mario@email.com"
                      style={{ 
                        width: '100%', 
                        padding: '12px 14px', 
                        border: '1.5px solid #e2e8f0', 
                        borderRadius: '10px', 
                        fontSize: '0.95rem',
                        transition: 'all 0.3s',
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
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#0f172a', fontSize: '0.9rem' }}>
                      Telefono *
                    </label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="Es. +39 333 1234567"
                      style={{ 
                        width: '100%', 
                        padding: '12px 14px', 
                        border: '1.5px solid #e2e8f0', 
                        borderRadius: '10px', 
                        fontSize: '0.95rem',
                        transition: 'all 0.3s',
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

              {/* Property Info Section */}
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '16px', 
                  color: '#0f172a', 
                  fontSize: '1.1rem', 
                  fontWeight: '700',
                  borderBottom: '2px solid #0f172a',
                  paddingBottom: '12px'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  Informazioni Immobile
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#0f172a', fontSize: '0.9rem' }}>
                      Tipologia *
                    </label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => setFormData({...formData, propertyType: e.target.value as any})}
                      style={{ 
                        width: '100%', 
                        padding: '12px 14px', 
                        border: '1.5px solid #e2e8f0', 
                        borderRadius: '10px', 
                        fontSize: '0.95rem',
                        transition: 'all 0.3s',
                        fontFamily: 'inherit',
                        cursor: 'pointer',
                        background: 'white'
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
                      <option value="apartment">🏢 Appartamento</option>
                      <option value="house">🏠 Casa/Villa</option>
                      <option value="commercial">🏪 Commerciale</option>
                      <option value="land">🌳 Terreno</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#0f172a', fontSize: '0.9rem' }}>
                      Indirizzo *
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      placeholder="Es. Via Roma, 10"
                      style={{ 
                        width: '100%', 
                        padding: '12px 14px', 
                        border: '1.5px solid #e2e8f0', 
                        borderRadius: '10px', 
                        fontSize: '0.95rem',
                        transition: 'all 0.3s',
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
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#0f172a', fontSize: '0.9rem' }}>
                      Città *
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      placeholder="Es. Paesana"
                      style={{ 
                        width: '100%', 
                        padding: '12px 14px', 
                        border: '1.5px solid #e2e8f0', 
                        borderRadius: '10px', 
                        fontSize: '0.95rem',
                        transition: 'all 0.3s',
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
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#0f172a', fontSize: '0.9rem' }}>
                      Provincia *
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.province}
                      onChange={(e) => setFormData({...formData, province: e.target.value.toUpperCase()})}
                      placeholder="Es. CN"
                      maxLength={2}
                      style={{ 
                        width: '100%', 
                        padding: '12px 14px', 
                        border: '1.5px solid #e2e8f0', 
                        borderRadius: '10px', 
                        fontSize: '0.95rem',
                        transition: 'all 0.3s',
                        fontFamily: 'inherit',
                        textTransform: 'uppercase'
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
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#0f172a', fontSize: '0.9rem' }}>
                      Numero Locali
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={formData.rooms || ''}
                      onChange={(e) => setFormData({...formData, rooms: e.target.value ? Number(e.target.value) : undefined})}
                      placeholder="Es. 3"
                      style={{ 
                        width: '100%', 
                        padding: '12px 14px', 
                        border: '1.5px solid #e2e8f0', 
                        borderRadius: '10px', 
                        fontSize: '0.95rem',
                        transition: 'all 0.3s',
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
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#0f172a', fontSize: '0.9rem' }}>
                      Superficie (m²)
                    </label>
                    <input
                      type="number"
                      min="10"
                      max="10000"
                      value={formData.sqm || ''}
                      onChange={(e) => setFormData({...formData, sqm: e.target.value ? Number(e.target.value) : undefined})}
                      placeholder="Es. 80"
                      style={{ 
                        width: '100%', 
                        padding: '12px 14px', 
                        border: '1.5px solid #e2e8f0', 
                        borderRadius: '10px', 
                        fontSize: '0.95rem',
                        transition: 'all 0.3s',
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
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#0f172a', fontSize: '0.9rem' }}>
                      Prezzo Richiesto (€)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="10000000"
                      value={formData.price || ''}
                      onChange={(e) => setFormData({...formData, price: e.target.value ? Number(e.target.value) : undefined})}
                      placeholder="Es. 150000"
                      style={{ 
                        width: '100%', 
                        padding: '12px 14px', 
                        border: '1.5px solid #e2e8f0', 
                        borderRadius: '10px', 
                        fontSize: '0.95rem',
                        transition: 'all 0.3s',
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
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#0f172a', fontSize: '0.9rem' }}>
                      Urgenza della Vendita *
                    </label>
                    <select
                      value={formData.urgency}
                      onChange={(e) => setFormData({...formData, urgency: e.target.value as any})}
                      style={{ 
                        width: '100%', 
                        padding: '12px 14px', 
                        border: '1.5px solid #e2e8f0', 
                        borderRadius: '10px', 
                        fontSize: '0.95rem',
                        transition: 'all 0.3s',
                        fontFamily: 'inherit',
                        cursor: 'pointer',
                        background: 'white'
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
                      <option value="low">⏰ Bassa - Nessuna fretta</option>
                      <option value="medium">⚡ Media - Entro 3-6 mesi</option>
                      <option value="high">🔥 Alta - Urgente</option>
                    </select>
                  </div>

                </div>
              </div>

              {/* Description Section */}
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '16px', 
                  color: '#0f172a', 
                  fontSize: '1.1rem', 
                  fontWeight: '700',
                  borderBottom: '2px solid #0f172a',
                  paddingBottom: '12px'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                  Descrizione Aggiuntiva
                </h3>
                <textarea
                  rows={6}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Descrivi il tuo immobile: ristrutturazioni effettuate, caratteristiche particolari, punti di forza, elementi da migliorare..."
                  style={{ 
                    width: '100%', 
                    padding: '14px', 
                    border: '1.5px solid #e2e8f0', 
                    borderRadius: '10px', 
                    fontSize: '0.95rem', 
                    resize: 'vertical',
                    transition: 'all 0.3s',
                    fontFamily: 'inherit',
                    minHeight: '120px'
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
                <p style={{ 
                  fontSize: '0.8rem', 
                  color: '#94a3b8', 
                  marginTop: '6px',
                  margin: '6px 0 0 0'
                }}>
                  {formData.description.length}/500 caratteri
                </p>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={submitStatus === 'loading'}
                style={{ 
                  width: '100%', 
                  padding: '16px 24px', 
                  background: submitStatus === 'loading' 
                    ? '#cbd5e1' 
                    : 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '10px', 
                  fontSize: '1rem', 
                  fontWeight: '700',
                  cursor: submitStatus === 'loading' ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  boxShadow: '0 4px 12px rgba(15, 23, 42, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => {
                  if (submitStatus !== 'loading') {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(15, 23, 42, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(15, 23, 42, 0.2)';
                }}
              >
                {submitStatus === 'loading' ? (
                  <>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderTopColor: 'white',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }} />
                    Invio in corso...
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    Invia Richiesta di Valutazione
                  </>
                )}
              </button>

              {/* Status Message */}
              {submitStatus !== 'idle' && (
                <div style={{ 
                  marginTop: '24px', 
                  padding: '16px', 
                  borderRadius: '10px', 
                  textAlign: 'center',
                  background: submitStatus === 'success' 
                    ? 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)' 
                    : submitStatus === 'error'
                    ? 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)'
                    : '#f8fafc',
                  color: submitStatus === 'success' ? '#166534' : '#991b1b',
                  fontWeight: '600',
                  fontSize: '0.95rem',
                  border: `1.5px solid ${
                    submitStatus === 'success' ? '#86efac' : '#fca5a5'
                  }`
                }}>
                  {message}
                </div>
              )}

            </form>
          </div>

          {/* Contact Alternative Section */}
          <div style={{ 
            marginTop: '48px', 
            padding: '32px', 
            background: '#f8fafc', 
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            textAlign: 'center'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '56px',
              height: '56px',
              borderRadius: '12px',
              background: '#dbeafe',
              marginBottom: '16px'
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <h3 style={{ 
              fontSize: '1.3rem', 
              marginBottom: '12px', 
              fontWeight: '800',
              color: '#0f172a',
              letterSpacing: '-0.5px'
            }}>
              Preferisci Contattarci Direttamente?
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginTop: '20px' }}>
              <div style={{
                padding: '16px',
                background: '#ffffff',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 8px 0', fontWeight: '600' }}>
                  Telefono
                </p>
                <p style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                  011 428 2544
                </p>
              </div>
              <div style={{
                padding: '16px',
                background: '#ffffff',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 8px 0', fontWeight: '600' }}>
                  Email
                </p>
                <p style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', margin: 0, wordBreak: 'break-all' }}>
                  info@fidesimmobiliare.it
                </p>
              </div>
              <div style={{
                padding: '16px',
                background: '#ffffff',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 8px 0', fontWeight: '600' }}>
                  Orari
                </p>
                <p style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                  Lun - Ven 9:00-18:00
                </p>
              </div>
            </div>
          </div>

        </div>

      </main>

      <Footer />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero { animation: fadeIn 0.8s ease-out; }
        .scale-in { animation: slideUp 0.8s ease-out; }
        .float { animation: float 3s ease-in-out infinite; }

        @media (max-width: 768px) {
          h1 { font-size: 2rem !important; }
        }
      `}</style>
    </>
  );
}