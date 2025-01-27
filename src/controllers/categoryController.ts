import { Request, Response } from 'express';
import { ICategory, IFilter, IdParams } from '../types';
import createCategoryService from '../service/createCategoryService';

class CategoryController {
	async create(req: Request<{}, {}, ICategory>, res: Response) {
		await createCategoryService.create(req.body);
		res.status(200).json({ message: 'Categoria criado com sucesso' });
	}

	async index(req: Request, res: Response) {
		const result = await createCategoryService.index();
		res.status(200).json(result);
	}

	async show(req: Request, res: Response) {
		const filter: IFilter = {
			id: req.query.id ? Number(req.query.id) : undefined,
			name: req.query.name as string | undefined,
		};
		const result = await createCategoryService.show(filter);
		res.status(200).json(result);
	}

	async update(req: Request, res: Response) {
		const id: IdParams = Number(req.params.id);
		const category: ICategory = req.body;

		await createCategoryService.update(id, category);
		res.status(200).json({ message: 'Categoria editado com sucesso' });
	}

	async delete(req: Request, res: Response) {
		const id = Number(req.params.id);
		await createCategoryService.delete(id);
		res.status(200).json({ message: 'Categoria deletado com sucesso' });
	}
}

export default new CategoryController();
