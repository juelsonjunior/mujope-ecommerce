import { Router } from 'express';
import produtctController from '../controllers/productController';

const router = Router();

//Route product
router.post('/product', produtctController.create);
router.get('/product', produtctController.index);
router.get('/product/filter', produtctController.show);
router.put('/product/:id', produtctController.update);
router.delete('/product/:id', produtctController.delete);

//Route category
export default router;
