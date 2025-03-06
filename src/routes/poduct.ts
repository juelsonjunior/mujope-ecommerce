import { Router } from 'express';
import { productController } from '../controllers/';

const router = Router();

router.post('/product', productController.create);
router.get('/product', productController.index);
router.get('/product/:id', productController.show);
router.put('/product/:id', productController.update);
router.delete('/product/:id', productController.delete);

export default router;