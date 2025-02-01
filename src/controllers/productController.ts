import { Request, Response } from 'express';
import { IProduct, IFilterProduct, IdParams } from '../types';
import { createProductService } from '../service/';
import { PrismaClient, Prisma } from '@prisma/client';
import { parseISO } from 'date-fns';

class ProductController {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}
	async index(req: Request<{}, {}, {}, IFilterProduct>, res: Response) {
		const {
			name,
			price,
			createAtBefore,
			createAtAfter,
			updatedAtBefore,
			updatedAtAfter,
			sort,
		} = req.query;
		const page = req.query.page ? Number(req.query.page) : 1;
		const limit = req.query.limit ? Number(req.query.limit) : 25;
		let order: Prisma.ProductOrderByWithRelationInput[] = [];
		const where: Prisma.ProductWhereInput = {};

		if (name) where.name = { contains: name, mode: 'insensitive',};
		if (price) where.price = Number(price);
		
		if (createAtBefore || createAtAfter) {
			where.createAt = {};
			if (createAtBefore) where.createAt.lte = parseISO(createAtBefore);
			if (createAtAfter) where.createAt.gte = parseISO(createAtAfter);
		}
		if (updatedAtBefore || updatedAtAfter) {
			where.updatedAt = {};
			if (updatedAtBefore) where.updatedAt.lte = parseISO(updatedAtBefore);
			if (updatedAtAfter) where.updatedAt.gte = parseISO(updatedAtAfter);
		}
		if (sort) {
			order = sort.split(',').map((item) => {
				const [field, direction] = item.split(':');
				return { [field]: direction as 'asc' | 'desc' };
			});
		}
		const result = await createProductService.index(page, limit, where, order);
		res.status(200).json(result);
	}
	async show(req: Request, res: Response) {
		const id: IdParams = Number(req.params.id);
		const result = await createProductService.show(id);
		res.status(200).json(result);
	}
	async create(req: Request<{}, {}, IProduct>, res: Response) {
		await createProductService.create(req.body);
		res.status(200).json({ message: 'Produto criado com sucesso' });
	}
	async update(req: Request, res: Response) {
		const id: IdParams = Number(req.params.id);
		const product: Partial<IProduct> = req.body;

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
