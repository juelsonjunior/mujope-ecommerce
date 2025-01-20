import { IProduct } from "../../types/Iproduct";
import { IParams } from "../../types/typeParams";

class ProdutcRepository {
    create(product: IProduct){}
    index(){}
    show(filter){}
    update(id: IParams, product: IProduct){}
    delete(id: IParams){}
}

export default new ProdutcRepository()