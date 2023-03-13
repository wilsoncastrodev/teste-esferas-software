import { FC, Fragment, useEffect, useState } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import { ErrorMessage, Field, Formik } from "formik";
import { useAppDispatch, useAppSelector, RootState } from "../../stores/store";
import { getAllCustomer } from "../../stores/features/customerSlice";
import { createOrder } from "../../stores/features/orderSlice";
import { MDCSnackbar } from "@material/snackbar";
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import Card from "react-bootstrap/Card";
import Inputmask from "inputmask";
import { orderValidation } from "../../validations/orderValidation";
import { useNavigate } from 'react-router-dom';
import { removeAllOrderItems } from "../../stores/features/orderItemSlice";

const CreateFormProduct: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const products = useAppSelector((state: RootState) => state.orderItem.products);
    const customers = useAppSelector((state: RootState) => state.customer.customers);

    const [quantity, setQuatity] = useState<any>(0);
    const [subtotal, setSubtotal] = useState<any>(0);
    const [isDiscount, setIsDiscount] = useState<any>(false);
    const [customer, setCustomer] = useState<any>(null);
    const [customersSelect, setCustomersSelect] = useState<any>([]);

    useEffect(() => {
        setQuatity(products.reduce((total: any, product: any) => total + product.quantity, 0))
        setSubtotal(products.reduce((total: any, product: any) => total + product.price * product.quantity, 0))
    }, [products]);

    useEffect(() => {
        dispatch(getAllCustomer());
    }, [dispatch]);

    useEffect(() => {
        setCustomersSelect(customers);
    }, [customers]);

    useEffect(() => {
        setCustomersSelect([]);
        if (customers && customers.length > 0) {
            const _customers = [...customers]
            _customers.sort((a: any, b: any) => a.name > b.name ? 1 : -1)

            _customers.map((customer: any) => {
                setCustomersSelect((prevCustomer: any) => [
                    ...prevCustomer,
                    { name: customer.name, id: customer.id, cpf: customer.cpf },
                ]);
            })
        }
    }, [customers]);

    const [validateAfterSubmit, setValidateAfterSubmit] = useState<any>(false);

    const handleMask = () => {
        const inputCustomer: any = document.getElementsByClassName("p-dropdown-filter");

        if (inputCustomer && inputCustomer.length > 0) {
            Inputmask({ "mask": "999.999.999-99" }).mask(inputCustomer);
        }
    };

    const selectedCustomerTemplate = (option: any, props: any) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <div>{option.name}</div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const customerOptionTemplate = (option: any) => {
        return (
            <div className="flex align-items-center">
                <div>{option.name}</div>
            </div>
        );
    };

    return (
        <Card className="card-alt">
            <Card.Body>
                <Card.Title className="mb-3">Cliente</Card.Title>
                <Formik
                    validationSchema={orderValidation}
                    validateOnChange={validateAfterSubmit}
                    onSubmit={async (payload, { resetForm }) => {
                        const mdcSnackbar: any = document.querySelector(".mdc-snackbar");
                        const snackbar = new MDCSnackbar(mdcSnackbar);
                        snackbar.timeoutMs = 5000;
                        snackbar.labelText = "Pedido criado com sucesso";
                        snackbar.actionButtonText = "";
                        snackbar.open();

                        await dispatch(createOrder(payload));
                        await dispatch(removeAllOrderItems());
                        resetForm();
                        window.scrollTo({ top: 0, behavior: "auto" });
                        navigate('../pedidos');
                    }}
                    initialValues={{
                        products: null,
                        customer_id: 0,
                        discount: 0,
                        subtotal: 0
                    }}
                >
                    {({ handleSubmit, handleChange, values, touched, errors, setFieldValue }) => (
                        <Form onSubmit={handleSubmit} className="form">
                            <Form.Group
                                as={Col}
                                md="12"
                                className="mt-2 mb-2"
                                controlId="customer_id"
                                onFocus={() => handleMask()}
                            >

                                <Field name="customer_id">
                                    {({ field }: any) => (
                                        <Dropdown
                                        {...field}
                                            name="customer_id"
                                            placeholder="Digite o CPF ou escolha um Cliente"
                                            value={values.customer_id}
                                            optionLabel="cpf"
                                            optionValue="id"
                                            filter
                                            emptyFilterMessage={"Cliente não encontrado"}
                                            valueTemplate={selectedCustomerTemplate}
                                            itemTemplate={customerOptionTemplate}
                                            onChange={(e) => {
                                                handleChange(e);
                                                setCustomer(customers.find((customer: any) => customer.id === e.value).name);
                                            }}
                                            options={customersSelect}
                                            className={
                                                !!(
                                                    touched.customer_id &&
                                                    errors.customer_id
                                                )
                                                    ? "is-invalid"
                                                    : touched.customer_id
                                                        ? "is-valid"
                                                        : ""
                                            }
                                        />
                                    )}
                                </Field>

                                <div className="invalid">
                                    <ErrorMessage name="customer_id" />
                                </div>
                            </Form.Group>
                            <Card.Title className="mt-4">Resumo do Pedido</Card.Title>
                            {
                                quantity ?
                                    (
                                        <Fragment>
                                            <Row className="mb-3">
                                                <Col>
                                                    Nome do Cliente
                                                </Col>
                                                <Col className="text-end">
                                                    { customer }
                                                </Col>
                                            </Row>
                                            <Row className="mb-3">
                                                <Col>
                                                    {quantity} Produtos
                                                </Col>
                                                <Col className="text-end">
                                                    {subtotal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                                                </Col>
                                            </Row>
                                            <Row className="mb-3">
                                                <Form.Group
                                                    as={Col}
                                                    md="12"
                                                    className="mt-2 mb-2"
                                                    controlId="isDiscount"                                                >
                                                    <Row>
                                                        <Col>
                                                            <Form.Label>Aplicar Desconto?</Form.Label>
                                                        </Col>
                                                        <Col className="text-end">
                                                            <Form.Check
                                                                type="switch"
                                                                checked={isDiscount}
                                                                onChange={() => {
                                                                    setIsDiscount(!isDiscount);
                                                                    setFieldValue("discount", isDiscount ? 0 : values.discount)
                                                                }}
                                                            />
                                                        </Col>
                                                    </Row>
                                                    <div className="invalid">
                                                        <ErrorMessage name="isDiscount" />
                                                    </div>
                                                </Form.Group>
                                                {
                                                    isDiscount ? (
                                                        <Form.Group
                                                            as={Col}
                                                            md="12"
                                                            className="mt-2 mb-2"
                                                            controlId="discount"
                                                        >
                                                            <Row>
                                                                <Col>
                                                                    <Form.Label>Valor do Desconto (R$)</Form.Label>

                                                                </Col>
                                                                <Col className="text-end">
                                                                    <InputNumber
                                                                        inputId="discount"
                                                                        name="discount"
                                                                        value={values.discount}
                                                                        onValueChange={handleChange}
                                                                        mode="currency"
                                                                        currency="BRL"
                                                                        locale="pt-BR"
                                                                        className={"inputdiscount " +
                                                                            (!!(
                                                                                touched.discount &&
                                                                                errors.discount
                                                                            )
                                                                                ? "is-invalid"
                                                                                : touched.discount
                                                                                    ? "is-valid"
                                                                                    : "")
                                                                        }
                                                                    />
                                                                </Col>
                                                            </Row>
                                                            <div className="invalid">
                                                                <ErrorMessage name="discount" />
                                                            </div>
                                                        </Form.Group>
                                                    ) : null
                                                }
                                            </Row>
                                            <Row className="mb-3">
                                                <Col>
                                                    Subtotal
                                                </Col>
                                                <Col className="text-end">
                                                    {subtotal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                                                </Col>
                                            </Row>
                                            <Row className="mb-3">
                                                <Col>
                                                    <h5>Total</h5>
                                                </Col>
                                                <Col className="text-end">
                                                    <h5>{
                                                        (subtotal - values.discount > 0 ? subtotal - values.discount : 0)
                                                            .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                                                    }</h5>
                                                </Col>
                                            </Row>
                                            <div className="text-end">
                                                <Button type="submit" onClick={() => {
                                                        setFieldValue("subtotal", subtotal)
                                                        setValidateAfterSubmit(true);
                                                        setFieldValue("products", products)
                                                    }}
                                                    className="btn btn-primary btn-success">
                                                    Finalizar Pedido
                                                </Button>
                                            </div>
                                        </Fragment>
                                    ) : <div className="text-center border rounded py-3">
                                        Adicione um produto aos pedidos tocando no botão "Adicionar" na listagem ao lado
                                    </div>
                            }
                        </Form>
                    )}
                </Formik>
            </Card.Body>
        </Card>
    );
};

export default CreateFormProduct;
