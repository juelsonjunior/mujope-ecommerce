import { PrismaClient, Prisma } from '@prisma/client';
import { IProduct, IdParams } from '../types';
class ProductRepository {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	async index(
		page: number,
		limit: number,
		where: Prisma.ProductWhereInput,
		order: Prisma.ProductOrderByWithRelationInput[]
	): Promise<Partial<IProduct>[]> {
		return await this.prisma.product.findMany({
			where,
			orderBy: order,
			take: limit,
			skip: limit * (page - 1),
		});
	}
	async show(id: IdParams): Promise<IProduct[]> {
		return await this.prisma.product.findMany({
			where: { id },
		});
	}
	async create(product: IProduct): Promise<IProduct> {
		return await this.prisma.product.create({
			data: {
				imageUrl: product.imageUrl,
				name: product.name,
				description: product.description,
				price: product.price,
				categoryId: product.categoryId,
			},
		});
	}
	async update(id: IdParams, product: Partial<IProduct>): Promise<IProduct> {
		return await this.prisma.product.update({
			where: { id },
			data: {
				imageUrl: product.imageUrl,
				name: product.name,
				description: product.description,
				price: product.price,
				categoryId: product.categoryId,
			},
		});
	}
	async delete(id: IdParams): Promise<IProduct> {
		return await this.prisma.product.delete({
			where: { id },
		});
	}
}

export default new ProductRepository();
