import { Router } from 'express';
import produtctController from '../controllers/product/produtctController';

const router = Router();

//Route default
router.get('/', (req, res) => {
	res.status(200).json({ message: 'Rota raiz' });
});

//Route product
router.post('/product', produtctController.create);

//Route category
export default router;
