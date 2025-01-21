export interface IProduct {
    imageUrl: string
    name: string
    description: string
    price: number
    categoryId: number
    createAt?: Date
    updatedAt?: Date
}