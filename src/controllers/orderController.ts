import { Request, Response } from 'express';
import { IOrder, IFilterItems, IdParams } from '../types';
import { createOrderService } from '../service';
import { filterItems } from '../utils/filters';

class OrderController {
	async index(req: Request<{}, {}, {}, IFilterItems>, res: Response) {
		const filter = filterItems(
			req.query,
			req.query.page,
			req.query.limit,
			'Order'
		);
		const result = await createOrderService.index(
			filter.page,
			filter.limit,
			filter.where,
			filter.order
		);
		res.status(200).json(result);
	}
	async show(req: Request, res: Response) {
		const id: IdParams = Number(req.params.id);
		const result = await createOrderService.show(id);
		res.status(200).json(result);
	}
	async create(req: Request<{}, {}, IOrder>, res: Response) {
		await createOrderService.create(req.body);
		res.status(200).json({ message: 'Pedido criado com sucesso' });
	}
	async update(req: Request, res: Response) {
		const id: IdParams = Number(req.params.id);
		const order: Partial<IOrder> = req.body;

		await createOrderService.update(id, order);
		res.status(200).json({ message: 'Pedido editado com sucesso' });
	}
	async delete(req: Request, res: Response) {
		const id = Number(req.params.id);
		await createOrderService.delete(id);
		res.status(200).json({ message: 'Pedido deletado com sucesso' });
	}
}

export default new OrderController();
