import { PrismaClient, Prisma } from '@prisma/client';
import { ICategory, IdParams } from '../types';
class CategoryRepository {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	async index(
		page: number,
		limit: number,
		where: Prisma.CategoryWhereInput,
		order: Prisma.CategoryOrderByWithRelationInput[]
	): Promise<Partial<ICategory>[]> {
		return await this.prisma.category.findMany({
			where,
			orderBy: order,
			take: limit,
			skip: limit * (page - 1),
		});
	}
	async show(id: IdParams): Promise<ICategory[]> {
		return await this.prisma.category.findMany({
			where: { id },
		});
	}
	async create(category: ICategory): Promise<ICategory> {
		return await this.prisma.category.create({
			data: {
				name: category.name,
			},
		});
	}
	async update(
		id: IdParams,
		category: Partial<ICategory>
	): Promise<ICategory> {
		return await this.prisma.category.update({
			where: { id },
			data: {
				name: category.name,
			},
		});
	}
	async delete(id: IdParams): Promise<ICategory> {
		return await this.prisma.category.delete({
			where: { id },
		});
	}
}

export default new CategoryRepository();
