import * as Yup from "yup";
import { api } from '../config/api';
import { cpf } from 'cpf-cnpj-validator';
import { getAddressByCEP } from 'cep-address-finder';
import validator from 'validator';

export const addCustomerValidation: any = Yup.object().shape({
    name: Yup.string()
        .required("O campo Nome do Cliente é obrigatório"),
    email: Yup.string().test("email-validate", "O E-mail informado já cadastrado", async (value: any, options: any) => {
        try {
            if (validator.isEmail(value)) {
                await api.post(`customers`, { email: value });
            }
            return true;
        } catch (e: any) {
            return !e.response.data.errors.email ? true : false;
        }
    }).email("O E-mail fornecido deve ser válido")
        .required("O campo E-mail é obrigatório"),
    phone: Yup.string().test("phone", "O telefone informado é inválido", (value: any) => {
        return value.replace(/[^0-9]/g, "").length > 9 ? true : false;
    }).required("O campo Telefone é obrigatório"),
    cpf: Yup.string().test("cpf-validate", "O CPF informado já cadastrado", async (value: any) => {
        try {
            if (cpf.isValid(value)) {
                await api.post(`customers`, { cpf: value });
            }
            return true;
        } catch (e: any) {
            return !e.response.data.errors.cpf ? true : false;
        }
    }).test("cpf", "O CPF informado é inválido", (value: any) => {
        return cpf.isValid(value) ? true : false;
    }).required("O campo CPF é obrigatório"),
    zipcode: Yup.string().test("cep", "O CEP informado é inválido", async (value: any) => {
        try {
            const address = await getAddressByCEP(value);
            return address && address.street.length > 0 ? true : false;
        } catch (e) {
            return false;
        }
    }).required("O campo CEP é obrigatório"),
    number: Yup.number().typeError("O número informado é inválido")
        .required("O campo Número é obrigatório"),
    complement: Yup.string()
        .required("O campo Complemento é obrigatório"),
});

export const updateCustomerValidation = Yup.object().shape({
    name: Yup.string()
        .required("O campo Nome do Cliente é obrigatório"),
    email: Yup.string().test("email-validate", "O E-mail informado já cadastrado", async (value: any, options: any) => {
        try {
            if (validator.isEmail(value)) {
                await api.patch(`customers/${options.from[0].value.id}`, { email: value });
            }
            return true;
        } catch (e: any) {
            return !e.response.data.errors.email ? true : false;
        }
    }).email("O E-mail fornecido deve ser válido")
        .required("O campo E-mail é obrigatório"),
    phone: Yup.string().test("phone", "O telefone informado é inválido", (value: any) => {
        return value.replace(/[^0-9]/g, "").length > 9 ? true : false;
    }).required("O campo Telefone é obrigatório"),
    cpf: Yup.string().test("cpf-validate", "O CPF informado já cadastrado", async (value: any, options: any) => {
        try {
            if (cpf.isValid(value)) {
                await api.patch(`customers/${options.from[0].value.id}`, { cpf: value });
            }
            return true;
        } catch (e: any) {
            return !e.response.data.errors.cpf ? true : false;
        }
    }).test("cpf", "O CPF informado é inválido", (value: any) => {
        return cpf.isValid(value) ? true : false;
    }).required("O campo CPF é obrigatório"),
    zipcode: Yup.string().test("cep", "O CEP informado é inválido", async (value: any) => {
        try {
            const address = await getAddressByCEP(value);
            return address && address.street.length > 0 ? true : false;
        } catch (e) {
            return false;
        }
    }).required("O campo CEP é obrigatório"),
    number: Yup.number().typeError("O número informado é inválido")
        .required("O campo Número é obrigatório"),
    complement: Yup.string()
        .required("O campo Complemento é obrigatório"),
});
