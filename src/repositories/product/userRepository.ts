import { PrismaClient } from '@prisma/client';
import { IProduct } from '../../types/Iproduct';
import { IParams } from '../../types/typeParams';

class ProdutcRepository {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}
	async create(product: IProduct) {
		try {
			await this.prisma.product.create({
				data: {
					imageUrl: product.imageUrl,
					name: product.name,
					description: product.description,
					price: product.price,
					categoryId: product.category,
				},
			});

			return true;
		} catch (error) {
			console.log('Falha ao cadastrar na bd', error);
		}
	}
	index() {}
	async show(name:string) {
		await this.prisma.product.findUnique({
			where: { name: name}
		})
	}
	update(id: IParams, product: IProduct) {}
	delete(id: IParams) {}
}

export default new ProdutcRepository();
