import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { AdminPage } from '../../pages/AdminPage';

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('AdminPage - Login', () => {
  beforeEach(() => {
    localStorage.clear();
    (global.fetch as jest.Mock).mockClear();
  });

  it('🎨 Dovrebbe renderizzare il form di login', () => {
    renderWithRouter(<AdminPage />);
    
    expect(screen.getByText('Pannello Amministrativo')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Inserisci username')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /accedi/i })).toBeInTheDocument();
  });

  it('✅ Dovrebbe effettuare login con credenziali corrette', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        token: 'test-token-123',
        message: 'Autenticazione riuscita'
      })
    });

    renderWithRouter(<AdminPage />);
    
    const usernameInput = screen.getByPlaceholderText('Inserisci username');
    const passwordInput = screen.getByPlaceholderText(/••••/);
    const submitButton = screen.getByRole('button', { name: /accedi/i });

    await userEvent.type(usernameInput, 'fidesimmobiliare2026');
    await userEvent.type(passwordInput, 'f1d3s1mm0b1l1@r3');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:4000/api/auth/login',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            username: 'fidesimmobiliare2026',
            password: 'f1d3s1mm0b1l1@r3'
          })
        })
      );
    });

    await waitFor(() => {
      expect(screen.getByText(/Benvenuto/)).toBeInTheDocument();
    });
  });

  it('❌ Dovrebbe mostrare errore con credenziali errate', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({
        error: 'Credenziali non valide. Tentativi rimasti: 2'
      })
    });

    renderWithRouter(<AdminPage />);
    
    const usernameInput = screen.getByPlaceholderText('Inserisci username');
    const passwordInput = screen.getByPlaceholderText(/••••/);
    const submitButton = screen.getByRole('button', { name: /accedi/i });

    await userEvent.type(usernameInput, 'wrong');
    await userEvent.type(passwordInput, 'wrong');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Credenziali non valide/)).toBeInTheDocument();
    });
  });

  it('🔒 Dovrebbe salvare il token in localStorage', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        token: 'saved-token-456'
      })
    });

    renderWithRouter(<AdminPage />);
    
    const usernameInput = screen.getByPlaceholderText('Inserisci username');
    const passwordInput = screen.getByPlaceholderText(/••••/);
    const submitButton = screen.getByRole('button', { name: /accedi/i });

    await userEvent.type(usernameInput, 'fidesimmobiliare2026');
    await userEvent.type(passwordInput, 'f1d3s1mm0b1l1@r3');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'fides_admin_token',
        'saved-token-456'
      );
    });
  });

  it('🚪 Dovrebbe effettuare logout correttamente', async () => {
    localStorage.setItem('fides_admin_token', 'existing-token');
    
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, token: 'new-token' })
    });

    renderWithRouter(<AdminPage />);
    
    // Prima fai login
    const usernameInput = screen.getByPlaceholderText('Inserisci username');
    const passwordInput = screen.getByPlaceholderText(/••••/);
    await userEvent.type(usernameInput, 'fidesimmobiliare2026');
    await userEvent.type(passwordInput, 'f1d3s1mm0b1l1@r3');
    await userEvent.click(screen.getByRole('button', { name: /accedi/i }));

    await waitFor(() => {
      expect(screen.getByText(/Benvenuto/)).toBeInTheDocument();
    });

    // Poi logout
    const logoutButton = screen.getByRole('button', { name: /esci/i });
    await userEvent.click(logoutButton);

    await waitFor(() => {
      expect(localStorage.removeItem).toHaveBeenCalledWith('fides_admin_token');
      expect(screen.getByText('Pannello Amministrativo')).toBeInTheDocument();
    });
  });
});
