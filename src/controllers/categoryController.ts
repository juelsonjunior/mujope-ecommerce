import { Request, Response } from 'express';
import { ICategory, IFilterItems, IdParams } from '../types';
import { createCategoryService } from '../service/';
import { filterItems } from '../utils/filters';

class CategoryController {
	async index(req: Request<{}, {}, {}, IFilterItems>, res: Response) {
		const filter = filterItems(
			req.query,
			req.query.page,
			req.query.limit,
			'Category'
		);
		const result = await createCategoryService.index(
			filter.page,
			filter.limit,
			filter.where,
			filter.order
		);
		res.status(200).json(result);
	}
	async show(req: Request, res: Response) {
		const id: IdParams = Number(req.params.id);
		const result = await createCategoryService.show(id);
		res.status(200).json(result);
	}
	async create(req: Request<{}, {}, ICategory>, res: Response) {
		await createCategoryService.create(req.body);
		res.status(200).json({ message: 'Categoria criado com sucesso' });
	}
	async update(req: Request, res: Response) {
		const id: IdParams = Number(req.params.id);
		const category: Partial<ICategory> = req.body;

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
