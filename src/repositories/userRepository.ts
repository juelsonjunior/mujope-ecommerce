import { PrismaClient } from '@prisma/client';
import { IProduct, IFilter, IdParams } from '../../types/';
import { BadRequestError } from '../../helpers/api-error';
class ProductRepository {
	private prisma: PrismaClient;
	constructor() {
		this.prisma = new PrismaClient();
	}
	async create(product: IProduct) {
		const existProduct = await this.prisma.product.findUnique({
			where: { name: product.name },
		});
		if (existProduct) {
			throw new BadRequestError(
				'Esse nome de produto já foi cadastrado! tente usar outro'
			);
		} else {
			const registerProduct = await this.prisma.product.create({
				data: {
					imageUrl: product.imageUrl,
					name: product.name,
					description: product.description,
					price: product.price,
					categoryId: product.categoryId,
				},
			});

			if (!registerProduct) {
				throw new BadRequestError(
					'Houve um problema ao cadastrar o produto'
				);
			}

			return true;
		}
	}
	async index() {
		const listProduct = await this.prisma.product.findMany();

		if (!listProduct) {
			throw new BadRequestError(
				'Houve um problema ao listar os produtos'
			);
		}

		return listProduct;
	}
	async show(filter: IFilter) {
		const resultDataFilter = await this.prisma.product.findMany({
			where: {
				AND: [
					filter.id ? { id: filter.id } : {},
					filter.name
						? {
								name: {
									contains: filter.name,
									mode: 'insensitive',
								},
							}
						: {},
				],
			},
		});
		console.log(resultDataFilter);

		if (!resultDataFilter) {
			throw new BadRequestError(
				'Houve um problema ao filtrar os dados desse produto'
			);
		}

		return resultDataFilter;
	}
	update(id: IdParams, product: IProduct) {
		console.log(id, product);
		return true;
	}
	delete(id: IdParams) {
		console.log(id);

		return true;
	}
}

export default new ProductRepository();
