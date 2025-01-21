import ProdutcRepository from "../../repositories/product/userRepository"
import { IProduct } from "../../types/Iproduct"

class CreateProductService {
	async create(product: IProduct) {
        return await ProdutcRepository.create(product)
    }
	index() {
        return ProdutcRepository.index()
    }
	show(filter) {
        return ProdutcRepository.show(filter)
    }
	update(id, product) {
        return ProdutcRepository.update(id, product)
    }
	delete(id) {
        return ProdutcRepository.delete(id)
    }
}

export default new CreateProductService();
