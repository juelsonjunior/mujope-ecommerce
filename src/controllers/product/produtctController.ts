import { Request, Response } from 'express';
import createProductService from '../../service/product/createProductService';
import { IProduct } from '../../types/Iproduct';
import { IParams } from '../../types/typeParams';

class ProductController {
	async create(req: Request<{}, {}, IProduct>, res: Response) {
		const result = await createProductService.create(req.body);
		if (!result) {
			res.status(400).json({ message: 'Falha ao cadastrar produto' });
		}
		res.status(200).json({ message: 'Produto criado com sucesso' });
	}
	index(req: Request, res: Response) {
		const result = createProductService.index();
		res.status(200).json(result);
	}
	show(req: Request, res: Response) {
		const result = createProductService.show(req.body);
		res.status(200).json(result);
	}
	update(req: Request<IParams, {}, IProduct>, res: Response) {
		const result = createProductService.update(req.params.id, req.body);
		res.status(200).json({ message: 'Produto actualizado' });
	}
	delete(req: Request, res: Response) {
		const result = createProductService.delete(req.params.id);
		res.status(200).json({ message: 'Produto deletado com sucesso' });
	}
}

export default new ProductController();
