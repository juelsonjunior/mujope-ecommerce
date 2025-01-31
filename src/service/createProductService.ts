import { PrismaClient, Prisma } from '@prisma/client';
import { productRepository } from '../repositories/';
import { IProduct, IFilter, IdParams } from '../types';
import { BadRequestError } from '../helpers/api-error';

class CreateProductService {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	async index(): Promise<Partial<IProduct>[]> {
		const resultDataProduct = await productRepository.index();

		if (!resultDataProduct) {
			throw new BadRequestError('Falha ao listar os produtos');
		}

		return resultDataProduct;
	}
	async show(id: IdParams): Promise<IProduct[]> {
		const resultProduct = await productRepository.show(id);

		if (!resultProduct) {
			throw new BadRequestError(
				'Nenhum produto foi encontrado com base nesse ID'
			);
		}

		return resultProduct;
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

		const newProduct = await productRepository.create(product);

		if (!newProduct) {
			throw new BadRequestError(
				'Houve um problema ao cadastrar o produto'
			);
		}

		return newProduct;
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

		const editProduct = await productRepository.update(id, product);

		if (!editProduct) {
			throw new BadRequestError('Houve um problema ao editar o produto');
		}

		return editProduct;
	}
	async delete(id: IdParams): Promise<IProduct> {
		return await productRepository.delete(id);
	}
}

export default new CreateProductService();
