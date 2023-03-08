import * as Yup from "yup";

export const productValidation: any = Yup.object().shape({
    name: Yup.string()
        .required("O campo Nome do Produto é obrigatório"),
    description: Yup.string().required("O campo Descrição é obrigatório"),
    price: Yup.number().typeError("O campo Preço é obrigatório")
        .required("O campo Preço é obrigatório"),
});
