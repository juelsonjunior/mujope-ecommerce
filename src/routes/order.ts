import { Router } from 'express';
import { orderController } from '../controllers/';

const router = Router();

router.post('/order', orderController.create);
router.get('/order', orderController.index);
router.get('/order/:id', orderController.show);
router.put('/order/:id', orderController.update);
router.delete('/order/:id', orderController.delete);

export default router;