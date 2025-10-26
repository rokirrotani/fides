import { Request, Response, NextFunction } from 'express';

export const securityHeaders = (req: Request, res: Response, next: NextFunction) => {
  // Previene clickjacking
  res.setHeader('X-Frame-Options', 'DENY');
  
  // Previene MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // XSS Protection
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // Referrer Policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Content Security Policy (personalizza secondo necessità)
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline'"
  );
  
  next();
};