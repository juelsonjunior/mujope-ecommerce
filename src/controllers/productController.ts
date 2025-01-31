import { Request, Response } from 'express';
import { IProduct, IFilter, IdParams } from '../types';
import { createProductService } from '../service/';

class ProductController {
	async index(req: Request, res: Response) {
		const result = await createProductService.index();
		res.status(200).json(result);
	}
	async show(req: Request, res: Response) {
		const id = Number(req.params.id)
		const result = await createProductService.show(id);
		res.status(200).json(result);
	}
	async create(req: Request<{}, {}, IProduct>, res: Response) {
		await createProductService.create(req.body);
		res.status(200).json({ message: 'Produto criado com sucesso' });
	}
	async update(req: Request, res: Response) {
		const id: IdParams = Number(req.params.id);
		const product: IProduct = req.body;

		await createProductService.update(id, product);
		res.status(200).json({ message: 'Produto editado com sucesso' });
	}
	async delete(req: Request, res: Response) {
		const id = Number(req.params.id);
		await createProductService.delete(id);
		res.status(200).json({ message: 'Produto deletado com sucesso' });
	}
}

export default new ProductController();
