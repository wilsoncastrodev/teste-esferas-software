import { api } from '../config/api';
import { AxiosResponse } from "axios";
import { ProductRequestType, ProductResponseType } from '../types/productType';

const getAllProduct = (): Promise<AxiosResponse<ProductResponseType>> => {
    return api.get<ProductResponseType>(`products`);
}

const createProduct = (payload: ProductRequestType): Promise<AxiosResponse<ProductResponseType>> => {
    return api.post<ProductResponseType>(`products`, payload);
}

const updateProduct = (payload: ProductRequestType): Promise<AxiosResponse<ProductResponseType>> => {
    return api.patch<ProductResponseType>(`products/${payload.id}`, payload);
}

const deleteProduct = (id: string): Promise<AxiosResponse> => {
    return api.delete(`products/${id}`);
}

const ProductService = {
    getAllProduct,
    createProduct,
    updateProduct,
    deleteProduct
};

export default ProductService;
