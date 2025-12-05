export function Footer() {
  return (
    <footer id="contacts" className="footer">
      <div className="footer__column">
        <h4>Fides Immobiliare</h4>
        <p>Soluzioni su misura a Paesana e Torino.</p>
      </div>

      <div className="footer__column">
        <h4>📍 Fides Paesana</h4>
        <p>Via Po, 1, 12034 Paesana CN</p>
        <p>Tel: <a href="tel:011 428 2544" style={{ color: 'inherit' }}>011 428 2544</a></p>
        <p>Orari: Lun-Gio 09-13, 14-19:30</p>
      </div>

      <div className="footer__column">
        <h4>📍 Fides Torino</h4>
        <p>Via Paolo Sacchi, 32, 10128 Torino TO</p>
        <p>Tel: <a href="tel:011 428 2544" style={{ color: 'inherit' }}>011 428 2544</a></p>
        <p>Email: info@fidesimmobiliare.it</p>
      </div>
    </footer>
  );
}