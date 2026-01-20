import { Request, Response, NextFunction } from 'express';

// Interfaccia per estendere Request con user
export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // TODO: Implementare autenticazione JWT quando servirà
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    res.status(401).json({ 
      error: 'Authentication required',
      message: 'No token provided' 
    });
    return;
  }
  
  // TODO: Verifica token JWT
  // const decoded = jwt.verify(token, process.env.JWT_SECRET);
  // (req as AuthRequest).user = decoded;
  
  // Per ora passa sempre
  console.log('⚠️ Auth middleware: JWT not implemented yet');
  next();
};

// Middleware per verificare il ruolo
export const requireRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authReq = req as AuthRequest;
    
    if (!authReq.user) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }
    
    if (!roles.includes(authReq.user.role)) {
      res.status(403).json({ 
        error: 'Forbidden',
        message: 'Insufficient permissions' 
      });
      return;
    }
    
    next();
  };
};