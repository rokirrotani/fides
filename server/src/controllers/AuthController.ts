import { Request, Response } from 'express';
import { verifyAdminCredentials } from '../config/security';

export class AuthController {
  /**
   * Login admin
   */
  static async login(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    const ip = req.ip || req.socket.remoteAddress || 'unknown';

    // Validazione input
    if (!username || !password) {
      res.status(400).json({ error: 'Username e password richiesti' });
      return;
    }

    if (typeof username !== 'string' || typeof password !== 'string') {
      res.status(400).json({ error: 'Formato credenziali non valido' });
      return;
    }

    // Lunghezza massima per prevenire DoS
    if (username.length > 100 || password.length > 100) {
      res.status(400).json({ error: 'Credenziali troppo lunghe' });
      return;
    }

    try {
      // Verifica credenziali
      const isValid = await verifyAdminCredentials(username, password);

      if (!isValid) {
        // Log per sicurezza
        console.warn(`⚠️ Tentativo di login fallito da IP: ${ip} alle ${new Date().toISOString()}`);

        res.status(401).json({ error: 'Credenziali non valide' });
        return;
      }

      // Login riuscito
      const sessionToken = generateSecureToken();

      console.log(`✅ Login admin riuscito da IP: ${ip} alle ${new Date().toISOString()}`);

      res.json({ 
        success: true,
        message: 'Autenticazione riuscita',
        token: sessionToken,
        expiresIn: 3600 // 1 ora
      });
    } catch (error) {
      console.error('Errore durante login:', error);
      res.status(500).json({ error: 'Errore del server' });
    }
  }

  /**
   * Verifica se un token è valido
   */
  static verifyToken(req: Request, res: Response): void {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      res.status(401).json({ error: 'Token mancante' });
      return;
    }

    // In produzione, verifica JWT
    // Per ora controlliamo solo il formato
    if (token.length >= 32) {
      res.json({ valid: true });
    } else {
      res.status(401).json({ error: 'Token non valido' });
    }
  }

  /**
   * Logout (invalida token)
   */
  static logout(req: Request, res: Response): void {
    // In produzione, invalida il JWT token
    res.json({ success: true, message: 'Logout effettuato' });
  }
}

/**
 * Genera un token sicuro usando crypto
 */
function generateSecureToken(): string {
  const crypto = require('crypto');
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Middleware per proteggere rotte admin
 */
export function requireAuth(req: Request, res: Response, next: Function): void {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token || token.length < 32) {
    res.status(401).json({ error: 'Non autenticato' });
    return;
  }

  // In produzione, verifica JWT
  next();
}
