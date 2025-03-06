import { Router } from 'express';
import { categoryController } from '../controllers/';

const router = Router();

router.post('/category', categoryController.create);
router.get('/category', categoryController.index);
router.get('/category/:id', categoryController.show);
router.put('/category/:id', categoryController.update);
router.delete('/category/:id', categoryController.delete);

export default router;