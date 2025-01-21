import { Request, Response } from 'express';
import createProductService from '../service/createProductService';
import { IProduct, IFilter, IdParams } from '../types';

class ProductController {
	async create(req: Request<{}, {}, IProduct>, res: Response) {
		const result = await createProductService.create(req.body);
		if (!result) {
			res.status(400).json({ message: 'Falha ao cadastrar produto' });
		}
		res.status(200).json({ message: 'Produto criado com sucesso' });
	}
	async index(req: Request, res: Response) {
		const result = await createProductService.index();
		res.status(200).json(result);
	}
	show(req: Request, res: Response) {
		const filter: IFilter = {
			id: req.query.id ? Number(req.query.id) : undefined,
			name: req.query.name as string | undefined,
		};
		const result = createProductService.show(filter);
		res.status(200).json(result);
	}
	update(req: Request<IdParams, {}, IProduct>, res: Response) {
		const id = Number(req.params.id);
		const result = createProductService.update(id, req.body);
		res.status(200).json({ message: 'Produto actualizado', result });
	}
	delete(req: Request, res: Response) {
		const result = createProductService.delete(req.params.id);
		res.status(200).json({
			message: 'Produto deletado com sucesso',
			result,
		});
	}
}

export default new ProductController();
