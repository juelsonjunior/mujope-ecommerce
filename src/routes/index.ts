import { Router } from 'express';
import {productController, categoryController} from '../controllers/';

const router = Router();

//Route product
router.post('/product', productController.create);
router.get('/product', productController.index);
router.get('/product/filter', productController.show);
router.put('/product/:id', productController.update);
router.delete('/product/:id', productController.delete);

//Route category
router.post('/category', categoryController.create);
router.get('/category', categoryController.index);
router.get('/category/filter', categoryController.show);
router.put('/category/:id', categoryController.update);
router.delete('/category/:id', categoryController.delete);
export default router;
