import { PrismaClient, Prisma } from '@prisma/client';
import { IOrder, IdParams } from '../types';
class OrderRepository {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	async index(
		page: number,
		limit: number,
		where: Prisma.OrderWhereInput,
		order: Prisma.OrderOrderByWithRelationInput[]
	): Promise<Partial<IOrder>[]> {
		return await this.prisma.order.findMany({
			where,
			orderBy: order,
			take: limit,
			skip: limit * (page - 1),
		});
	}
	async show(id: IdParams): Promise<IOrder[]> {
		return await this.prisma.order.findMany({
			where: { id },
		});
	}
	async create(order: IOrder): Promise<IOrder> {
		return await this.prisma.order.create({
			data: {
				total: order.total,
				customerId: order.customerId,
				status: order.status
			},
		});
	}
	async update(id: IdParams, order: Partial<IOrder>): Promise<IOrder> {
		return await this.prisma.order.update({
			where: { id },
			data: {
				total: order.total,
				customerId: order.customerId,
				status: order.status,
			},
		});
	}
	async delete(id: IdParams): Promise<IOrder> {
		return await this.prisma.order.delete({
			where: { id },
		});
	}
}

export default new OrderRepository();
