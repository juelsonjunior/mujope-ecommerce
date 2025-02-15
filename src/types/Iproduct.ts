export interface IProduct {
    imageUrl: string
    name: string
    description: string | null
    price: number
    categoryId: number
    createAt?: Date
    updatedAt?: Date
}