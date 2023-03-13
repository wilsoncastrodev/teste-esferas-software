import { useState } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import { ErrorMessage, Formik } from "formik";
import { useAppDispatch } from "../../stores/store";
import { updateCustomerValidation } from "../../validations/customerValidation";
import { updateCustomer } from "../../stores/features/customerSlice";
import { getAddressByCEP } from 'cep-address-finder';
import { InputMask } from 'primereact/inputmask';
import { MDCSnackbar } from "@material/snackbar";
import { addCustomer } from "../../stores/features/themeSlice";

const EditFormCustomer = ({ customer }: any) => {
    const dispatch = useAppDispatch();

    const handleAddress = async (e: any, setFieldValue: any) => {
        if (e.target.value.replace(/[^0-9]/g, "").length > 7) {
            const address = await getAddressByCEP(e.target.value)
            setFieldValue("address", address.street);
            setFieldValue("neighbourhood", address.neighborhood);
            setFieldValue("city", address.city);
            setFieldValue("state", address.state);
        }
    }

    const [validateAfterSubmit, setValidateAfterSubmit] = useState<any>(false);

    return (
        <Formik
            validationSchema={updateCustomerValidation}
            validateOnChange={validateAfterSubmit}
            onSubmit={async (payload) => {
                const mdcSnackbar: any = document.querySelector(".mdc-snackbar");
                const snackbar = new MDCSnackbar(mdcSnackbar);
                snackbar.timeoutMs = 5000;
                snackbar.labelText = "Cliente atualizado com sucesso";
                snackbar.actionButtonText = "";
                snackbar.open();
                await dispatch(updateCustomer(payload));
                dispatch(addCustomer());
                window.scrollTo({ top: 0, behavior: "auto" });
            }}
            initialValues={{
                id: customer.id,
                name: customer.name,
                email: customer.email,
                phone: customer.phone,
                cpf: customer.cpf,
                zipcode: customer.zipcode,
                address: customer.address,
                number: customer.number,
                complement: customer.complement,
                neighbourhood: customer.neighbourhood,
                city: customer.city,
                state: customer.state
            }}
        >
            {({ handleSubmit, handleChange, values, touched, errors, setFieldValue }) => (
                <Form onSubmit={handleSubmit} className="form">
                    <Row className="mb-3">
                        <Form.Group
                            as={Col}
                            md="12"
                            className="mt-2 mb-2"
                            controlId="id"
                        >
                            <Form.Control
                                type="hidden"
                                placeholder=""
                                name="id"
                                value={values.id}
                                disabled={true}
                            />
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md="12"
                            className="mt-2 mb-2"
                            controlId="name"
                        >
                            <Form.Label>Nome do Cliente</Form.Label>
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
                            controlId="email"
                        >
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=""
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                isInvalid={
                                    !!(
                                        touched.email &&
                                        errors.email
                                    )
                                }
                                isValid={
                                    touched.email && !errors.email
                                }
                            />
                            <div className="invalid">
                                <ErrorMessage name="email" />
                            </div>
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md="6"
                            className="mt-2 mb-2"
                            controlId="cpf"
                        >
                            <Form.Label>CPF</Form.Label>
                            <InputMask
                                mask="999.999.999-99"
                                name="cpf"
                                value={values.cpf}
                                onChange={handleChange}
                                className={"form-control " +
                                    (!!(
                                        touched.cpf &&
                                        errors.cpf
                                    )
                                        ? "is-invalid"
                                        : touched.cpf
                                            ? "is-valid"
                                            : "")
                                }
                            />
                            <div className="invalid">
                                <ErrorMessage name="cpf" />
                            </div>
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md="6"
                            className="mt-2 mb-2"
                            controlId="phone"
                        >
                            <Form.Label>Telefone</Form.Label>
                            <InputMask
                                mask="(99) 99999-999?9"
                                name="phone"
                                value={values.phone}
                                onChange={handleChange}
                                className={"form-control " +
                                    (!!(
                                        touched.phone &&
                                        errors.phone
                                    )
                                        ? "is-invalid"
                                        : touched.phone
                                            ? "is-valid"
                                            : "")
                                }
                            />
                            <div className="invalid">
                                <ErrorMessage name="phone" />
                            </div>
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md="12"
                            className="mt-2 mb-2"
                            controlId="zipcode"
                        >
                            <Form.Label>CEP</Form.Label>
                            <InputMask
                                mask="99999-999"
                                name="zipcode"
                                value={values.zipcode}
                                onChange={(e: any) => {
                                    handleChange(e);
                                    handleAddress(e, setFieldValue);
                                }}
                                className={"form-control " +
                                    (!!(
                                        touched.zipcode &&
                                        errors.zipcode
                                    )
                                        ? "is-invalid"
                                        : touched.zipcode
                                            ? "is-valid"
                                            : "")
                                }
                            />
                            <div className="invalid">
                                <ErrorMessage name="zipcode" />
                            </div>
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md="8"
                            className="mt-2 mb-2"
                            controlId="address"
                        >
                            <Form.Label>Endereço</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=""
                                name="address"
                                value={values.address}
                                onChange={handleChange}
                                disabled={true}
                                isInvalid={
                                    !!(
                                        touched.address &&
                                        errors.address
                                    )
                                }
                                isValid={
                                    touched.zipcode && !errors.zipcode
                                }
                            />
                            <div className="invalid">
                                <ErrorMessage name="address" />
                            </div>
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md="4"
                            className="mt-2 mb-2"
                            controlId="number"
                        >
                            <Form.Label>Número</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=""
                                name="number"
                                value={values.number}
                                onChange={handleChange}
                                isInvalid={
                                    !!(
                                        touched.number &&
                                        errors.number
                                    )
                                }
                                isValid={
                                    touched.number && !errors.number
                                }
                            />
                            <div className="invalid">
                                <ErrorMessage name="number" />
                            </div>
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md="12"
                            className="mt-2 mb-2"
                            controlId="complement"
                        >
                            <Form.Label>Complemento</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=""
                                name="complement"
                                value={values.complement}
                                onChange={handleChange}
                                isInvalid={
                                    !!(
                                        touched.complement &&
                                        errors.complement
                                    )
                                }
                                isValid={
                                    touched.complement && !errors.complement
                                }
                            />
                            <div className="invalid">
                                <ErrorMessage name="complement" />
                            </div>
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md="12"
                            className="mt-2 mb-2"
                            controlId="neighbourhood"
                        >
                            <Form.Label>Bairro</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=""
                                name="neighbourhood"
                                value={values.neighbourhood}
                                onChange={handleChange}
                                disabled={true}
                                isInvalid={
                                    !!(
                                        touched.address &&
                                        errors.address
                                    )
                                }
                                isValid={
                                    touched.zipcode && !errors.zipcode
                                }
                            />
                            <div className="invalid">
                                <ErrorMessage name="neighbourhood" />
                            </div>
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md="8"
                            className="mt-2 mb-2"
                            controlId="city"
                        >
                            <Form.Label>Cidade</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=""
                                name="name"
                                value={values.city}
                                onChange={handleChange}
                                disabled={true}
                                isInvalid={
                                    !!(
                                        touched.address &&
                                        errors.address
                                    )
                                }
                                isValid={
                                    touched.zipcode && !errors.zipcode
                                }
                            />
                            <div className="invalid">
                                <ErrorMessage name="city" />
                            </div>
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md="4"
                            className="mt-2 mb-2"
                            controlId="state"
                        >
                            <Form.Label>Estado</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=""
                                name="state"
                                value={values.state}
                                onChange={handleChange}
                                disabled={true}
                                isInvalid={
                                    !!(
                                        touched.address &&
                                        errors.address
                                    )
                                }
                                isValid={
                                    touched.zipcode && !errors.zipcode
                                }
                            />
                            <div className="invalid">
                                <ErrorMessage name="state" />
                            </div>
                        </Form.Group>
                    </Row>
                    <div className="text-end">
                        <Button type="submit" onClick={() => {
                            setValidateAfterSubmit(true);
                        }}
                        className="btn btn-primary btn-primary-alt">
                            Salvar
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default EditFormCustomer;
