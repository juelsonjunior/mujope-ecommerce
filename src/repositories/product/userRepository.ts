import { PrismaClient } from '@prisma/client';
import { IProduct } from '../../types/Iproduct';
import { IParams } from '../../types/typeParams';
import { BadRequestError } from '../../helpers/api-error';
import { IFilter } from '../../types/Ifilter';

class ProdutcRepository {
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
		let resultDataFilter: IProduct | null;

		if (filter.id) {
			resultDataFilter = await this.prisma.product.findUnique({
				where: { id: filter.id },
			});
		} else if (filter.name) {
			resultDataFilter = await this.prisma.product.findUnique({
				where: { name: filter.name },
			});
		}else {
			throw new BadRequestError(
				'Defina um filtro para ver os dados especificos'
			);
		}

		if (!resultDataFilter) {
			throw new BadRequestError(
				'Houve um problema ao exibir os dados desse produto'
			);
		}

		return resultDataFilter;
	}
	update(id: IParams, product: IProduct) {}
	delete(id: IParams) {}
}

export default new ProdutcRepository();
