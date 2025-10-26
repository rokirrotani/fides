import { Request, Response, NextFunction } from 'express';

export const sanitizeInput = (req: Request, res: Response, next: NextFunction) => {
  // Rimuovi caratteri pericolosi da query params
  if (req.query) {
    Object.keys(req.query).forEach(key => {
      if (typeof req.query[key] === 'string') {
        req.query[key] = (req.query[key] as string)
          .replace(/[<>]/g, '') // Rimuovi < >
          .trim();
      }
    });
  }
  
  // Sanitizza body se è stringa
  if (req.body && typeof req.body === 'object') {
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = req.body[key]
          .replace(/[<>]/g, '')
          .trim();
      }
    });
  }
  
  next();
};