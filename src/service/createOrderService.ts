import { PrismaClient, Prisma } from '@prisma/client';
import { IOrder, IdParams } from '../types';
import { BadRequestError } from '../helpers/api-error';
import { orderRepository } from '../repositories';

class CreateOrderService {
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
		const resultOrder = await orderRepository.index(
			page,
			limit,
			where,
			order
		);

		if (resultOrder.length == 0) {
			throw new BadRequestError('Nenhuma pedido foi encontrado');
		}

		return resultOrder;
	}
	async show(id: IdParams): Promise<IOrder[]> {
		const resultOrder = await orderRepository.show(id);

		if (resultOrder.length == 0) {
			throw new BadRequestError('Nenhum pedido foi encontrado');
		}

		return resultOrder;
	}
	async create(order: IOrder): Promise<IOrder> {
		const idOrder = await this.prisma.order.findMany();

		const existOrder = await this.prisma.order.findUnique({
			where: { id: idOrder[0].id },
		});

		if (existOrder) {
			throw new BadRequestError(
				'Esse pedido já existe! tente usar outro'
			);
		}

		const newOrder = await orderRepository.create(order);

		if (!newOrder) {
			throw new BadRequestError('Houve um problema ao efetuar o pedido');
		}

		return newOrder;
	}
	async update(id: IdParams, Order: Partial<IOrder>): Promise<IOrder> {
		const editOrder = await orderRepository.update(id, Order);

		if (!editOrder) {
			throw new BadRequestError('Houve um problema ao editar o pedido');
		}

		return editOrder;
	}
	async delete(id: IdParams): Promise<IOrder> {
		return await orderRepository.delete(id);
	}
}

export default new CreateOrderService();
