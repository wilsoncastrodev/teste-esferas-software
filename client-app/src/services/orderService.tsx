import { api } from '../config/api';
import { AxiosResponse } from "axios";
import { OrderRequestType, OrderResponseType } from '../types/orderType';

const getOrderById = (id: number): Promise<AxiosResponse<OrderResponseType>> => {
    return api.get<OrderResponseType>(`orders/${id}`);
}

const getAllOrder = (): Promise<AxiosResponse<OrderResponseType>> => {
    return api.get<OrderResponseType>(`orders`);
}

const createOrder = (payload: OrderRequestType): Promise<AxiosResponse<OrderResponseType>> => {
    return api.post<OrderResponseType>(`orders`, payload);
}

const updateOrder = (payload: OrderRequestType): Promise<AxiosResponse<OrderResponseType>> => {
    return api.patch<OrderResponseType>(`orders/${payload.id}`, payload);
}

const deleteOrder = (id: string): Promise<AxiosResponse> => {
    return api.delete(`orders/${id}`);
}

const OrderService = {
    getOrderById,
    getAllOrder,
    createOrder,
    updateOrder,
    deleteOrder
};

export default OrderService;
