import ProdutcRepository from "../../repositories/product/userRepository"
import { IFilter } from "../../types/Ifilter"
import { IProduct } from "../../types/Iproduct"

class CreateProductService {
	async create(product: IProduct) {
        return await ProdutcRepository.create(product)
    }
	async index() {
        return await ProdutcRepository.index()
    }
	async show(filter:IFilter) {
        return await ProdutcRepository.show(filter)
    }
	update(id, product) {
        return ProdutcRepository.update(id, product)
    }
	delete(id) {
        return ProdutcRepository.delete(id)
    }
}

export default new CreateProductService();
