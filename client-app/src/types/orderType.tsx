export type OrderResponseType = {
    id: number,
    customer_id: number,
    status: string,
    discount: number,
    subtotal: number,
    total: number,
    items?: any,
    customer: any,
    created_at: string,
    updated_at: string
};

export type OrderRequestType = {
    id?: number,
    customer_id: number,
    products: any,
    discount: number,
    status?: string
}

export type OrderStateType = {
    orders: OrderResponseType | any,
    errors: any,
    isLoading: boolean
};
