import ProdutcRepository from "../../repositories/product/userRepository"

class CreateProductService {
	create(product) {
        return ProdutcRepository.create(product)
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
