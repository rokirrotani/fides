import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { PaesanaPage } from './pages/PaesanaPage';
import { TorinoPage } from './pages/TorinoPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { ChiSiamoPage } from './pages/ChiSiamoPage';
import { ContattiPage } from './pages/ContattiPage';
import { AdminPage } from './pages/AdminPage';
import { VendiCasaPage } from './pages/VendiCasaPage';
import { CompraCasaPage } from './pages/CompraCasaPage';
import './assets/styles/main.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/paesana" element={<PaesanaPage />} />
        <Route path="/torino" element={<TorinoPage />} />
        <Route path="/immobile/:id" element={<PropertyDetailPage />} />
        <Route path="/chi-siamo" element={<ChiSiamoPage />} />
        <Route path="/contatti" element={<ContattiPage />} />
        <Route path="/vendi-casa" element={<VendiCasaPage />} />
        <Route path="/compra-casa" element={<CompraCasaPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);