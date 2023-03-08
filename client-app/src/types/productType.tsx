export type ProductResponseType = {
    id: number,
    code: string,
    name: string,
    description: string,
    price: number,
    created_at: string,
    updated_at: string
};

export type ProductRequestType = {
    id?: number,
    code?: string,
    name: string,
    description: string,
    price: number,
}

export type ProductStateType = {
    products: ProductResponseType | any,
    errors: any,
    isLoading: boolean
};
