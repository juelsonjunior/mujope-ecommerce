import { Request, Response } from 'express';
import { ICustomer, IFilterItems, IdParams } from '../types';
import { createCustomerService } from '../service';
import { filterItems } from '../utils/filters';

class CustomerController {
	async index(req: Request<{}, {}, {}, IFilterItems>, res: Response) {
		const filter = filterItems(
			req.query,
			req.query.page,
			req.query.limit,
			'Customer'
		);
		const result = await createCustomerService.index(
			filter.page,
			filter.limit,
			filter.where,
			filter.order
		);
		res.status(200).json(result);
	}
	async show(req: Request, res: Response) {
		const id: IdParams = Number(req.params.id);
		const result = await createCustomerService.show(id);
		res.status(200).json(result);
	}
	async create(req: Request<{}, {}, ICustomer>, res: Response) {
		await createCustomerService.create(req.body);
		res.status(200).json({ message: 'Cliente criado com sucesso' });
	}
	async update(req: Request, res: Response) {
		const id: IdParams = Number(req.params.id);
		const customer: Partial<ICustomer> = req.body;

		await createCustomerService.update(id, customer);
		res.status(200).json({ message: 'Cliente editado com sucesso' });
	}
	async delete(req: Request, res: Response) {
		const id = Number(req.params.id);
		await createCustomerService.delete(id);
		res.status(200).json({ message: 'Cliente deletado com sucesso' });
	}
}

export default new CustomerController();
