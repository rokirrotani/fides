import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';

describe('Navbar Component', () => {
  const renderNavbar = () => {
    return render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
  };

  it('🎨 Dovrebbe renderizzare il logo Fides', () => {
    renderNavbar();
    expect(screen.getByText('Fides')).toBeInTheDocument();
  });

  it('📍 Dovrebbe avere link a tutte le pagine principali', () => {
    renderNavbar();
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Chi Siamo')).toBeInTheDocument();
    expect(screen.getByText('Compra Casa')).toBeInTheDocument();
    expect(screen.getByText('Vendi Casa')).toBeInTheDocument();
    expect(screen.getByText('Contatti')).toBeInTheDocument();
  });

  it('🏢 Dovrebbe avere link alle sedi', () => {
    renderNavbar();
    
    expect(screen.getByText(/Paesana/)).toBeInTheDocument();
    expect(screen.getByText(/Torino/)).toBeInTheDocument();
  });

  it('🔗 Dovrebbe avere href corretti per i link', () => {
    renderNavbar();
    
    const homeLink = screen.getByText('Home').closest('a');
    expect(homeLink).toHaveAttribute('href', '/');
    
    const aboutLink = screen.getByText('Chi Siamo').closest('a');
    expect(aboutLink).toHaveAttribute('href', '/chi-siamo');
  });
});
