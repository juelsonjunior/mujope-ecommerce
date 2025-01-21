import { PrismaClient, Prisma } from '@prisma/client';
import ProductRepository from '../repositories/userRepository';
import { IProduct, IFilter, IdParams } from '../types';
import { BadRequestError } from '../helpers/api-error';

class CreateProductService {
	private prisma: PrismaClient;
	constructor() {
		this.prisma = new PrismaClient();
	}
	
	async create(product: IProduct): Promise<IProduct> {
		const existProduct = await this.prisma.product.findUnique({
			where: { name: product.name },
		});

		if (existProduct) {
			throw new BadRequestError(
				'Esse nome de produto já foi cadastrado! tente usar outro'
			);
		}

		const newProduct = await ProductRepository.create(product);

		if (!newProduct) {
			throw new BadRequestError(
				'Houve um problema ao cadastrar o produto'
			);
		}

		return newProduct;
	}

	async index(): Promise<Partial<IProduct>[]> {
		const resultDataProduct = await ProductRepository.index();

		if (!resultDataProduct) {
			throw new BadRequestError('Falha ao listar os produtos');
		}

		return resultDataProduct;
	}

	async show(query: IFilter): Promise<IProduct[]> {
		const filters = {} as Prisma.ProductWhereInput;

		if (query.id) {
			filters.id = query.id;
		}

		if (query.name) {
			filters.name = { contains: query.name, mode: 'insensitive' };
		}
		const resultDataFilter = await ProductRepository.show(filters);

		if (resultDataFilter.length == 0) {
			throw new BadRequestError(
				'Houve um problema ao filtrar os dados desse produto'
			);
		}

		return resultDataFilter;
	}

	async update(id: IdParams, product: IProduct): Promise<IProduct> {
		const existProduct = await this.prisma.product.findUnique({
			where: { name: product.name },
		});

		if (existProduct) {
			throw new BadRequestError(
				'Esse nome de produto já foi cadastrado! tente usar outro'
			);
		}

		const editProduct = await ProductRepository.update(id, product);

		if (!editProduct) {
			throw new BadRequestError(
				'Houve um problema ao editar o produto'
			);
		}

		return editProduct
	}

	async delete(id: IdParams): Promise<boolean> {
		return await ProductRepository.delete(id);
	}
}

export default new CreateProductService();
