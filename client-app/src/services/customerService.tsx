import { api } from '../config/api';
import { AxiosResponse } from "axios";
import { CustomerRequestType, CustomerResponseType } from '../types/customerType';

const getAllCustomer = (): Promise<AxiosResponse<CustomerResponseType>> => {
    return api.get<CustomerResponseType>(`customers`);
}

const createCustomer = (payload: CustomerRequestType): Promise<AxiosResponse<CustomerResponseType>> => {
    return api.post<CustomerResponseType>(`customers`, payload);
}

const updateCustomer = (payload: CustomerRequestType): Promise<AxiosResponse<CustomerResponseType>> => {
    return api.patch<CustomerResponseType>(`customers/${payload.id}`, payload);
}

const deleteCustomer = (id: string): Promise<AxiosResponse> => {
    return api.delete(`customers/${id}`);
}

const CustomerService = {
    getAllCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer
};

export default CustomerService;
