import { Request, Response, NextFunction } from 'express';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

export const rateLimiter = (maxRequests: number = 100, windowMs: number = 60000) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || 'unknown';
    const now = Date.now();
    
    if (!store[ip] || now > store[ip].resetTime) {
      store[ip] = {
        count: 1,
        resetTime: now + windowMs
      };
      return next();
    }
    
    store[ip].count++;
    
    if (store[ip].count > maxRequests) {
      return res.status(429).json({
        error: 'Too many requests',
        message: `Rate limit exceeded. Try again in ${Math.ceil((store[ip].resetTime - now) / 1000)} seconds`,
        retryAfter: Math.ceil((store[ip].resetTime - now) / 1000)
      });
    }
    
    next();
  };
};