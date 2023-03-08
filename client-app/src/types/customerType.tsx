export type CustomerResponseType = {
    id: number,
    email: string,
    phone: string,
    cpf: string,
    zipcode: string,
    address: string,
    number: number,
    complement: string,
    neighbourhood: string,
    city: string,
    state: string,
    created_at: string,
    updated_at: string
};

export type CustomerRequestType = {
    id?: number,
    name: string,
    email: string,
    phone: string,
    cpf: string,
    zipcode: string,
    address: string,
    number: any,
    complement: string,
    neighbourhood: string,
    city: string,
    state: string,
}

export type CustomerStateType = {
    customers: CustomerResponseType | any,
    errors: any,
    isLoading: boolean
};
