import { Router } from 'express';
import { PropertyController } from '../controllers/PropertyController';

const router = Router();
const propertyController = new PropertyController();

// GET /api/properties - Lista tutti gli immobili
router.get('/properties', propertyController.getAllProperties);

// GET /api/properties/search - Ricerca immobili con filtri
router.get('/properties/search', propertyController.searchProperties);

// GET /api/properties/:id - Dettaglio immobile
router.get('/properties/:id', propertyController.getPropertyById);

// POST /api/properties - Crea nuovo immobile
router.post('/properties', propertyController.createProperty);

// PUT /api/properties/:id - Aggiorna immobile
router.put('/properties/:id', propertyController.updateProperty);

// DELETE /api/properties/:id - Elimina immobile
router.delete('/properties/:id', propertyController.deleteProperty);

export default router;