import { Router } from 'express';
import { orderItemController } from '../controllers/';

const router = Router();

router.post('/orderItem', orderItemController.create);
router.get('/orderItem', orderItemController.index);
router.get('/orderItem/:id', orderItemController.show);
router.put('/orderItem/:id', orderItemController.update);
router.delete('/orderItem/:id', orderItemController.delete);

export default router;