import { api } from '../config/api';
import { AxiosResponse } from "axios";
import { OrderRequestType, OrderResponseType } from '../types/orderType';

const createOrder = (payload: OrderRequestType): Promise<AxiosResponse<OrderResponseType>> => {
    return api.post<OrderResponseType>(`orders`, payload);
}

const OrderService = {
    createOrder
};

export default OrderService;
