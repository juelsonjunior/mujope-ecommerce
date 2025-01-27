import { PrismaClient, Prisma } from '@prisma/client';
import { ICategory, IdParams } from '../types';
class CategoryRepository {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	async create(category: ICategory): Promise<ICategory> {
		return await this.prisma.category.create({
			data: {
				name: category.name,
				description: category.description,
			},
		});
	}

	async index(): Promise<Partial<ICategory>[]> {
		return await this.prisma.category.findMany();
	}

	async show(filters: Prisma.CategoryWhereInput): Promise<ICategory[]> {
		return await this.prisma.category.findMany({
			where: filters,
		});
	}

	async update(id: IdParams, category: ICategory): Promise<ICategory> {
		return await this.prisma.category.update({
			where: { id },
			data: {
				name: category.name,
				description: category.description,
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
