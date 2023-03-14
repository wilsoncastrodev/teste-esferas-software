import { api } from '../config/api';
import { AxiosResponse } from "axios";
import { OrderRequestType, OrderResponseType } from '../types/orderType';


const getAllOrder = (): Promise<AxiosResponse<OrderResponseType>> => {
    return api.get<OrderResponseType>(`orders`);
}

const createOrder = (payload: OrderRequestType): Promise<AxiosResponse<OrderResponseType>> => {
    return api.post<OrderResponseType>(`orders`, payload);
}

const deleteOrder = (id: string): Promise<AxiosResponse> => {
    return api.delete(`orders/${id}`);
}

const OrderService = {
    getAllOrder,
    createOrder,
    deleteOrder
};

export default OrderService;
