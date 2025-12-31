import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';

const router = Router();

// POST /api/auth/login - Login admin
router.post('/login', AuthController.login);

// GET /api/auth/verify - Verifica token
router.get('/verify', AuthController.verifyToken);

// POST /api/auth/logout - Logout
router.post('/logout', AuthController.logout);

export default router;
