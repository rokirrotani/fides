import bcrypt from 'bcryptjs';

/**
 * CREDENZIALI ADMIN SICURE
 * 
 * Username: fidesimmobiliare2026
 * Password: f1d3s1mm0b1l1@r3
 * 
 * ⚠️ IMPORTANTE: Non condividere queste credenziali!
 * La password è stata hashata con bcrypt (10 rounds) per massima sicurezza.
 */

// Hash generato da: f1d3s1mm0b1l1@r3
const ADMIN_PASSWORD_HASH = '$2b$10$MXKq76TWzmgoA7FmSdxXT.e5PCkrvjrZhYAMi1wcmrHaLKkTzdh3y';
const ADMIN_USERNAME = 'fidesimmobiliare2026';

export interface AdminCredentials {
  username: string;
  password: string;
}

/**
 * Verifica le credenziali admin in modo sicuro
 */
export async function verifyAdminCredentials(username: string, password: string): Promise<boolean> {
  // Verifica username (case-sensitive)
  if (username !== ADMIN_USERNAME) {
    // Delay intenzionale per prevenire timing attacks
    await new Promise(resolve => setTimeout(resolve, 100));
    return false;
  }

  // Verifica password con bcrypt (sicuro contro timing attacks)
  try {
    const isValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    return isValid;
  } catch (error) {
    console.error('Error verifying password:', error);
    return false;
  }
}

/**
 * Funzione di utilità per generare nuovi hash (solo per sviluppo)
 * NON USARE IN PRODUZIONE
 */
export async function generatePasswordHash(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

// Security headers configuration
export const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
};

// Rate limiting configuration
export const rateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minuti
  max: 100, // max 100 richieste per IP
  message: 'Troppi tentativi, riprova più tardi'
};

// Admin login rate limiting (più restrittivo)
export const adminRateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minuti
  max: 5, // max 5 tentativi di login
  message: 'Troppi tentativi di login. Riprova tra 15 minuti.'
};
