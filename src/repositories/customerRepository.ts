import { PrismaClient, Prisma } from '@prisma/client';
import { ICustomer, IdParams } from '../types';
class CustomerRepository {
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
		return await this.prisma.customer.findMany({
			where,
			orderBy: order,
			take: limit,
			skip: limit * (page - 1),
		});
	}
	async show(id: IdParams): Promise<ICustomer[]> {
		return await this.prisma.customer.findMany({
			where: { id },
		});
	}
	async create(customer: ICustomer): Promise<ICustomer> {
		return await this.prisma.customer.create({
			data: {
				name: customer.name,
				email: customer.email,
				password: customer.password,
			},
		});
	}
	async update(
		id: IdParams,
		customer: Partial<ICustomer>
	): Promise<ICustomer> {
		return await this.prisma.customer.update({
			where: { id },
			data: {
				name: customer.name,
				email: customer.email,
			},
		});
	}
	async delete(id: IdParams): Promise<ICustomer> {
		return await this.prisma.customer.delete({
			where: { id },
		});
	}
}

export default new CustomerRepository();
