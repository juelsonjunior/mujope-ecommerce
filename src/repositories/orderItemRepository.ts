import { PrismaClient, Prisma } from '@prisma/client';
import { IOrderItem, IdParams } from '../types';
class OrderItemRepository {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	async index(
		page: number,
		limit: number,
		where: Prisma.OrderItemWhereInput,
		orderItem: Prisma.OrderItemOrderByWithRelationInput[]
	): Promise<Partial<IOrderItem>[]> {
		return await this.prisma.orderItem.findMany({
			where,
			orderBy: orderItem,
			take: limit,
			skip: limit * (page - 1),
		});
	}
	async show(id: IdParams): Promise<IOrderItem[]> {
		return await this.prisma.orderItem.findMany({
			where: { id },
		});
	}
	async create(orderItem: IOrderItem): Promise<IOrderItem> {
		return await this.prisma.orderItem.create({
			data: {
				orderId: orderItem.orderId,
				productId: orderItem.productId,
				quantity: orderItem.quantity,
				price: orderItem.price
			},
		});
	}
	async update(id: IdParams, orderItem: Partial<IOrderItem>): Promise<IOrderItem> {
		return await this.prisma.orderItem.update({
			where: { id },
			data: {
				orderId: orderItem.orderId,
				productId: orderItem.productId,
				quantity: orderItem.quantity,
				price: orderItem.price
			},
		});
	}
	async delete(id: IdParams): Promise<IOrderItem> {
		return await this.prisma.orderItem.delete({
			where: { id },
		});
	}
}

export default new OrderItemRepository();
