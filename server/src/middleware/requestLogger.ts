import { Request, Response, NextFunction } from 'express';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  // Log della richiesta
  console.log(`📨 ${req.method} ${req.path}`);
  
  // Log della risposta quando finisce
  res.on('finish', () => {
    const duration = Date.now() - start;
    const statusColor = res.statusCode >= 400 ? '🔴' : '🟢';
    console.log(`${statusColor} ${req.method} ${req.path} ${res.statusCode} - ${duration}ms`);
  });
  
  next();
};