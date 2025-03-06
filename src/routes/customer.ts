import { Router } from 'express';
import { customerController } from '../controllers/';

const router = Router();

router.post('/customer', customerController.create);
router.get('/customer', customerController.index);
router.get('/customer/:id', customerController.show);
router.put('/customer/:id', customerController.update);
router.delete('/customer/:id', customerController.delete);

export default router;