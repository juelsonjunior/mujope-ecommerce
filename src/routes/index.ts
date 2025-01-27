import { Router } from 'express';
import produtctController from '../controllers/productController';
import categoryController from '../controllers/categoryController';

const router = Router();

//Route product
router.post('/product', produtctController.create);
router.get('/product', produtctController.index);
router.get('/product/filter', produtctController.show);
router.put('/product/:id', produtctController.update);
router.delete('/product/:id', produtctController.delete);

//Route category
router.post('/category', categoryController.create);
router.get('/category', categoryController.index);
router.get('/category/filter', categoryController.show);
router.put('/category/:id', categoryController.update);
router.delete('/category/:id', categoryController.delete);
export default router;
