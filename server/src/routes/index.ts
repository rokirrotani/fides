import { Router } from 'express';
import propertyRoutes from './propertyRoutes';

const router = Router();

// Health check
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    time: new Date().toISOString(),
    service: 'Fides API',
    database: 'SQLite connected'
  });
});

// Property routes
router.use('/', propertyRoutes);

export default router;