import { Router } from 'express';
import {
	productController,
	categoryController,
	customerController,
} from '../controllers/';

const router = Router();

//Route product
router.post('/product', productController.create);
router.get('/product', productController.index);
router.get('/product/:id', productController.show);
router.put('/product/:id', productController.update);
router.delete('/product/:id', productController.delete);

//Route category
router.post('/category', categoryController.create);
router.get('/category', categoryController.index);
router.get('/category/:id', categoryController.show);
router.put('/category/:id', categoryController.update);
router.delete('/category/:id', categoryController.delete);

//Route customer
router.post('/customer', customerController.create);
router.get('/customer', customerController.index);
router.get('/customer/:id', customerController.show);
router.put('/customer/:id', customerController.update);
router.delete('/customer/:id', customerController.delete);

export default router;
