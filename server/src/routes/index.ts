import { Router } from 'express';
import propertyRoutes from './propertyRoutes';
import requestRoutes from './requestRoutes';
import authRoutes from './authRoutes';

const router = Router();

// Health check
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    time: new Date().toISOString(),
    service: 'Fides API',
    database: 'SQLite connected',
    security: 'Enhanced with bcrypt authentication'
  });
});

// Auth routes
router.use('/auth', authRoutes);

// Property routes
router.use('/', propertyRoutes);

// Request routes (vendita/acquisto)
router.use('/requests', requestRoutes);

export default router;