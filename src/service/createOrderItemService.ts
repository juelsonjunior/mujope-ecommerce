import { PrismaClient, Prisma } from '@prisma/client';
import { IOrderItem, IdParams } from '../types';
import { BadRequestError } from '../helpers/api-error';
import { orderItemRepository } from '../repositories';

class CreateOrderItemService {
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
		const resultOrderItem = await orderItemRepository.index(
			page,
			limit,
			where,
			orderItem
		);

		if (resultOrderItem.length == 0) {
			throw new BadRequestError('Nenhum item de pedido foi encontrado');
		}

		return resultOrderItem;
	}
	async show(id: IdParams): Promise<IOrderItem[]> {
		const resultOrderItem = await orderItemRepository.show(id);

		if (resultOrderItem.length == 0) {
			throw new BadRequestError('Nenhum item de pedido foi encontrado');
		}

		return resultOrderItem;
	}
	async create(orderItem: IOrderItem): Promise<IOrderItem> {
		const idOrderItem = await this.prisma.orderItem.findMany();

		const existOrderItem = await this.prisma.orderItem.findUnique({
			where: { id: idOrderItem[0].id },
		});

		if (existOrderItem) {
			throw new BadRequestError(
				'Esse item de pedido já existe! tente usar outro'
			);
		}

		const newOrderItem = await orderItemRepository.create(orderItem);

		if (!newOrderItem) {
			throw new BadRequestError('Houve um problema ao efetuar o item de pedido');
		}

		return newOrderItem;
	}
	async update(id: IdParams, OrderItem: Partial<IOrderItem>): Promise<IOrderItem> {
		const editOrderItem = await orderItemRepository.update(id, OrderItem);

		if (!editOrderItem) {
			throw new BadRequestError('Houve um problema ao editar item de pedido');
		}

		return editOrderItem;
	}
	async delete(id: IdParams): Promise<IOrderItem> {
		return await orderItemRepository.delete(id);
	}
}

export default new CreateOrderItemService();
