import * as Yup from "yup";

export const orderValidation: any = Yup.object().shape({
    customer_id: Yup.number().min(1, 'O campo Cliente é obrigatório')
        .required("O campo Cliente é obrigatório"),
    discount: Yup.number().typeError("O Desconto informado é inválido")
        .test("discount", "O desconto não pode ser maior do que o total do pedido", (value: any, options: any) => {
        return options.from[0].value.subtotal < value ? false : true;
    })
});
