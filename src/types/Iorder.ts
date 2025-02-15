enum Status {
    pending = "Pendente",
    process = "Processando",
    done = "Finalizado"
}
export interface IOrder {
    status: Status.pending
    total: number
    customerId: number
    createAt?: Date
    updatedAt?: Date
}