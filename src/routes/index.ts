import { Router } from 'express';
import produtctController from '../controllers/product/produtctController';

const router = Router();

//Rout product
router.get('/product', produtctController.create);

//Rout category
export default router;
