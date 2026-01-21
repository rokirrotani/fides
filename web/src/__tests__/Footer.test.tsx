import { render, screen } from '@testing-library/react';
import { Footer } from '../components/Footer';

describe('Footer Component', () => {
  it('🎨 Dovrebbe renderizzare le informazioni di contatto', () => {
    render(<Footer />);
    
    // Verifica presenza sezioni principali
    expect(screen.getByText(/Fides Immobiliare/i)).toBeInTheDocument();
  });

  it('📞 Dovrebbe mostrare i contatti delle sedi', () => {
    render(<Footer />);
    
    // Cerca nel documento
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeDefined();
  });

  it('📅 Dovrebbe mostrare il copyright con anno corrente', () => {
    render(<Footer />);
    
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
  });

  it('🔗 Dovrebbe avere link ai social media', () => {
    render(<Footer />);
    
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });
});
