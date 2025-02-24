import { Request, Response } from 'express';
import { IOrderItem, IFilterItems, IdParams } from '../types';
import { createOrderItemService } from '../service';
import { filterItems } from '../utils/filters';

class OrderItemController {
	async index(req: Request<{}, {}, {}, IFilterItems>, res: Response) {
		const filter = filterItems(
			req.query,
			req.query.page,
			req.query.limit,
			'OrderItem'
		);
		const result = await createOrderItemService.index(
			filter.page,
			filter.limit,
			filter.where,
			filter.order
		);
		res.status(200).json(result);
	}
	async show(req: Request, res: Response) {
		const id: IdParams = Number(req.params.id);
		const result = await createOrderItemService.show(id);
		res.status(200).json(result);
	}
	async create(req: Request<{}, {}, IOrderItem>, res: Response) {
		await createOrderItemService.create(req.body);
		res.status(200).json({ message: 'Item do pedido criado com sucesso' });
	}
	async update(req: Request, res: Response) {
		const id: IdParams = Number(req.params.id);
		const order: Partial<IOrderItem> = req.body;

		await createOrderItemService.update(id, order);
		res.status(200).json({ message: 'Item do pedido editado com sucesso' });
	}
	async delete(req: Request, res: Response) {
		const id = Number(req.params.id);
		await createOrderItemService.delete(id);
		res.status(200).json({ message: 'Item do pedido deletado com sucesso' });
	}
}

export default new OrderItemController();
