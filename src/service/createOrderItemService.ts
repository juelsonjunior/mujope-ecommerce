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
		const existOrderItem = await this.prisma.orderItem.findFirst({
			where: {
				orderId: orderItem.orderId,
				productId: orderItem.productId,
			},
		});

		if (existOrderItem) {
			return await this.prisma.orderItem.update({
				where: { id: existOrderItem.id },
				data: {
					quantity: existOrderItem.quantity + orderItem.quantity,
				},
			});
		}

		const newOrderItem = await orderItemRepository.create(orderItem);

		if (!newOrderItem) {
			throw new BadRequestError(
				'Houve um problema ao efetuar o item de pedido'
			);
		}

		return newOrderItem;
	}
	async update(
		id: IdParams,
		OrderItem: Partial<IOrderItem>
	): Promise<IOrderItem> {
		const existIdOrderItem = await this.prisma.orderItem.findFirst({
			where: { id: id },
		});

		if (!existIdOrderItem) {
			throw new BadRequestError('Esse pedido de item não foi encontrada');
		}

		const editOrderItem = await orderItemRepository.update(id, OrderItem);

		if (!editOrderItem) {
			throw new BadRequestError(
				'Houve um problema ao editar item de pedido'
			);
		}

		return editOrderItem;
	}
	async delete(id: IdParams): Promise<IOrderItem> {
		return await orderItemRepository.delete(id);
	}
}

export default new CreateOrderItemService();
