import { Request, Response } from 'express';
import { ICategory, IFilterCategory, IdParams } from '../types';
import { createCategoryService } from '../service/';
import { PrismaClient, Prisma } from '@prisma/client';
import { parseISO } from 'date-fns';

class CategoryController {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}
	async index(req: Request<{}, {}, {}, IFilterCategory>, res: Response) {
		const {
			name,
			createAtBefore,
			createAtAfter,
			updatedAtBefore,
			updatedAtAfter,
			sort,
		} = req.query;

		const page = req.query.page ? Number(req.query.page) : 1;
		const limit = req.query.limit ? Number(req.query.limit) : 25;
		let order: Prisma.CategoryOrderByWithRelationInput[] = [];
		const where: Prisma.CategoryWhereInput = {};

		if (name) where.name = { contains: name, mode: 'insensitive' };

		if (createAtBefore || createAtAfter) {
			where.createAt = {};
			if (createAtBefore) where.createAt.lte = parseISO(createAtBefore);
			if (createAtAfter) where.createAt.gte = parseISO(createAtAfter);
		}
		if (updatedAtBefore || updatedAtAfter) {
			where.updatedAt = {};
			if (updatedAtBefore)
				where.updatedAt.lte = parseISO(updatedAtBefore);
			if (updatedAtAfter) where.updatedAt.gte = parseISO(updatedAtAfter);
		}
		if (sort) {
			order = sort.split(',').map((item) => {
				const [field, direction] = item.split(':');
				return { [field]: direction as 'asc' | 'desc' };
			});
		}
		const result = await createCategoryService.index(
			page,
			limit,
			where,
			order
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
