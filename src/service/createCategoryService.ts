import { PrismaClient, Prisma } from '@prisma/client';
import { ICategory, IdParams } from '../types';
import { BadRequestError } from '../helpers/api-error';
import { categoryRepository } from '../repositories/';

class CreateCategoryService {
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
		const resultCategory = await categoryRepository.index(
			page,
			limit,
			where,
			order
		);

		if (resultCategory.length == 0) {
			throw new BadRequestError('Nenhuma categoria foi encontrada');
		}

		return resultCategory;
	}
	async show(id: IdParams): Promise<ICategory[]> {
		const resultCategory = await categoryRepository.show(id);

		if (resultCategory.length == 0) {
			throw new BadRequestError('Nenhum produto foi encontrado');
		}

		return resultCategory;
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
	async update(
		id: IdParams,
		category: Partial<ICategory>
	): Promise<ICategory> {
		const existIdCategory = await this.prisma.category.findFirst({
			where: { id: id },
		});

		if (!existIdCategory) {
			throw new BadRequestError('Essa categoria não foi encontrada');
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
