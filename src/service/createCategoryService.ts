import { PrismaClient, Prisma } from '@prisma/client';
import { ICategory, IFilter, IdParams } from '../types';
import { BadRequestError } from '../helpers/api-error';
import { categoryRepository } from '../repositories/';

class CreateCategoryService {
	private prisma: PrismaClient;
	
	constructor() {
		this.prisma = new PrismaClient();
	}

	async index(): Promise<Partial<ICategory>[]> {
		const resultDataCategory = await categoryRepository.index();

		if (!resultDataCategory) {
			throw new BadRequestError('Falha ao listar os categoria');
		}

		return resultDataCategory;
	}
	async show(query: IFilter): Promise<ICategory[]> {
		const filters = {} as Prisma.CategoryWhereInput;

		if (query.id) {
			filters.id = query.id;
		}

		if (query.name) {
			filters.name = { contains: query.name, mode: 'insensitive' };
		}
		const resultDataFilter = await categoryRepository.show(filters);

		if (resultDataFilter.length == 0) {
			throw new BadRequestError(
				'Houve um problema ao filtrar os dados desse categoria'
			);
		}

		return resultDataFilter;
	}
	async create(category: ICategory): Promise<ICategory> {
		const existCategory = await this.prisma.category.findUnique({
			where: { name: category.name },
		});

		if (existCategory) {
			throw new BadRequestError(
				'Esse nome de categoria já foi cadastrado! tente usar outro'
			);
		}

		const newCategory = await categoryRepository.create(category);

		if (!newCategory) {
			throw new BadRequestError(
				'Houve um problema ao cadastrar o categoria'
			);
		}

		return newCategory;
	}
	async update(id: IdParams, category: ICategory): Promise<ICategory> {
		const existCategory = await this.prisma.product.findUnique({
			where: { name: category.name },
		});

		if (existCategory) {
			throw new BadRequestError(
				'Esse nome de categoria já foi cadastrado! tente usar outro'
			);
		}

		const editCategory = await categoryRepository.update(id, category);

		if (!editCategory) {
			throw new BadRequestError(
				'Houve um problema ao editar o categoria'
			);
		}

		return editCategory;
	}
	async delete(id: IdParams): Promise<ICategory> {
		return await categoryRepository.delete(id);
	}
}

export default new CreateCategoryService();
