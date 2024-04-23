export interface InputListProductDTO {}

type ProductInterface = {
    name: string,
    price: number,
    id: string
} 

export interface OutputListProductDTO{
    products: ProductInterface[]
}