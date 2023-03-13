import { FC } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import { ErrorMessage, Formik } from "formik";
import { useAppDispatch } from "../../stores/store";
import { productValidation } from "../../validations/productValidation";
import { createProduct } from "../../stores/features/productSlice";
import { MDCSnackbar } from "@material/snackbar";
import { InputNumber } from 'primereact/inputnumber';

const CreateFormProduct: FC = () => {
    const dispatch = useAppDispatch();

    return (
        <Formik
            validationSchema={productValidation}
            onSubmit={async (payload, { resetForm }) => {
                const mdcSnackbar: any = document.querySelector(".mdc-snackbar");
                const snackbar = new MDCSnackbar(mdcSnackbar);
                snackbar.timeoutMs = 5000;
                snackbar.labelText = "Produto cadastrado com sucesso";
                snackbar.actionButtonText = "";
                snackbar.open();

                await dispatch(createProduct(payload));
                resetForm();
                window.scrollTo({ top: 0, behavior: "auto" });
            }}
            initialValues={{
                name: "",
                description: "",
                price: 0,
            }}
        >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form onSubmit={handleSubmit} className="form">
                    <Row className="mb-3">
                        <Form.Group
                            as={Col}
                            md="12"
                            className="mt-2 mb-2"
                            controlId="name"
                        >
                            <Form.Label>Nome do Produto</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=""
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                isInvalid={
                                    !!(
                                        touched.name &&
                                        errors.name
                                    )
                                }
                                isValid={
                                    touched.name && !errors.name
                                }
                            />
                            <div className="invalid">
                                <ErrorMessage name="name" />
                            </div>
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md="12"
                            className="mt-2 mb-2"
                            controlId="description"
                        >
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                placeholder=""
                                name="description"
                                value={values.description}
                                onChange={handleChange}
                                isInvalid={
                                    !!(
                                        touched.description &&
                                        errors.description
                                    )
                                }
                                isValid={
                                    touched.description && !errors.description
                                }
                            />
                            <div className="invalid">
                                <ErrorMessage name="description" />
                            </div>
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md="12"
                            className="mt-2 mb-2"
                            controlId="price"
                        >
                            <Form.Label>Preço</Form.Label>
                            <InputNumber
                                inputId="price"
                                name="price"
                                value={values.price}
                                onValueChange={handleChange}
                                mode="currency"
                                currency="BRL"
                                locale="pt-BR"
                                className={"d-block " +
                                    (!!(
                                        touched.price &&
                                        errors.price
                                    )
                                        ? "is-invalid"
                                        : touched.price
                                            ? "is-valid"
                                            : "")
                                }
                            />
                            <div className="invalid">
                                <ErrorMessage name="price" />
                            </div>
                        </Form.Group>
                    </Row>
                    <div className="text-end">
                        <Button type="submit" className="btn btn-primary btn-primary-alt">
                            Salvar
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default CreateFormProduct;
