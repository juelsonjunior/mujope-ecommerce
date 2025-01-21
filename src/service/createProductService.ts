import ProductRepository from '../repositories/userRepository';
import { IProduct, IFilter, IdParams } from '../types';

class CreateProductService {
	async create(product: IProduct): Promise<boolean> {
		return await ProductRepository.create(product);
	}
	async index(): Promise<IProduct[]> {
		return await ProductRepository.index();
	}
	async show(filter: IFilter): Promise<IProduct[]> {
		return await ProductRepository.show(filter);
	}
	async update(id: IdParams, product: IProduct): Promise<boolean> {
		return await ProductRepository.update(id, product);
	}
	async delete(id: IdParams): Promise<boolean> {
		return await ProductRepository.delete(id);
	}
}

export default new CreateProductService();
