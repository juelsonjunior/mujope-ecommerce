import { PrismaClient, Prisma } from '@prisma/client';
import { ICustomer, IdParams } from '../types';
import { BadRequestError } from '../helpers/api-error';
import { customerRepository } from '../repositories';

class CreateCustomerService {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}
	async index(
		page: number,
		limit: number,
		where: Prisma.CustomerWhereInput,
		order: Prisma.CustomerOrderByWithRelationInput[]
	): Promise<Partial<ICustomer>[]> {
		const resultCustomer = await customerRepository.index(
			page,
			limit,
			where,
			order
		);

		if (resultCustomer.length == 0) {
			throw new BadRequestError('Nenhuma cliente foi encontrada');
		}

		return resultCustomer;
	}
	async show(id: IdParams): Promise<ICustomer[]> {
		const resultCustomer = await customerRepository.show(id);

		if (resultCustomer.length == 0) {
			throw new BadRequestError('Nenhum cliente foi encontrado');
		}

		return resultCustomer;
	}
	async create(customer: ICustomer): Promise<ICustomer> {
		const existCustomer = await this.prisma.customer.findUnique({
			where: { email: customer.email },
		});

		if (existCustomer) {
			throw new BadRequestError(
				'Esse nome de cliente já foi cadastrado! tente usar outro'
			);
		}

		const newCustomer = await customerRepository.create(customer);

		if (!newCustomer) {
			throw new BadRequestError(
				'Houve um problema ao cadastrar o cliente'
			);
		}

		return newCustomer;
	}
	async update(
		id: IdParams,
		customer: Partial<ICustomer>
	): Promise<ICustomer> {
		const editCustomer = await customerRepository.update(id, customer);

		if (!editCustomer) {
			throw new BadRequestError('Houve um problema ao editar o cliente');
		}

		return editCustomer;
	}
	async delete(id: IdParams): Promise<ICustomer> {
		return await customerRepository.delete(id);
	}
}

export default new CreateCustomerService();
