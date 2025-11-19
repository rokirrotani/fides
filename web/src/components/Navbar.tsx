import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="navbar__logo" style={{ textDecoration: 'none', color: 'inherit' }}>
        Fides Immobiliare
      </Link>
      <nav className="navbar__links">
        <Link to="/">Home</Link>
        <Link to="/chi-siamo">Chi Siamo</Link>
        <Link to="/contatti">Contatti</Link>
        <Link to="/admin" style={{ background: 'rgba(220, 38, 38, 0.2)', color: '#fca5a5' }}>
          🔐 Area Admin
        </Link>
      </nav>
    </header>
  );
}