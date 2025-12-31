import { Router } from 'express';
import { RequestController } from '../controllers/RequestController';

const router = Router();
const requestController = new RequestController();

// Sell Request Routes
router.post('/sell', requestController.createSellRequest);
router.get('/sell', requestController.getAllSellRequests);
router.get('/sell/:id', requestController.getSellRequestById);
router.patch('/sell/:id/status', requestController.updateSellRequestStatus);
router.delete('/sell/:id', requestController.deleteSellRequest);

// Buy Request Routes
router.post('/buy', requestController.createBuyRequest);
router.get('/buy', requestController.getAllBuyRequests);
router.get('/buy/:id', requestController.getBuyRequestById);
router.patch('/buy/:id/status', requestController.updateBuyRequestStatus);
router.delete('/buy/:id', requestController.deleteBuyRequest);

export default router;
