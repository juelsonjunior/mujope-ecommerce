import { Router } from 'express';
import produtctController from '../controllers/product/productController';

const router = Router();

//Route product
router.post('/product', produtctController.create);
router.get('/product', produtctController.index);
router.get('/product/filter', produtctController.show);

//Route category
export default router;
