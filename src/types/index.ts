export interface IResponse<T> {
    status: "success" | "error"
    msg: string
    data: T
}

export interface IProduct {
    id?: number
    name: string
    description: string
    price: number
    stock: number
    slug: string
    createdAt?: Date
    updatedAt?: Date
    category?: any
    manufacture?: any
}