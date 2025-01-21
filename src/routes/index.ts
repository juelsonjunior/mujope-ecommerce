import { Router } from 'express';
import produtctController from '../controllers/product/produtctController';

const router = Router();

//Route product
router.post('/product', produtctController.create);
router.get('/product', produtctController.index);
router.get('/product', produtctController.show);

//Route category
export default router;
