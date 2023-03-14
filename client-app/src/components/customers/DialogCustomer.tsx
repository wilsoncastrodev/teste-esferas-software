import { Fragment, useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Col, Row } from "react-bootstrap";

const DialogCustomer = ({ customer }: any) => {
    const [visible, setVisible] = useState<boolean>(false);

    const footerContent = (
        <div>
            <Button label="Fechar" className="btn btn-primary" onClick={() => setVisible(false)} autoFocus />
        </div>
    );

    return (
        <Fragment>
            <a href="!#" onClick={(e) => {e.preventDefault(); setVisible(true)}}>{customer.name}</a>
            <Dialog header={"Cliente: " + customer.name} visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={footerContent}>
                <Row className="mb-3">
                    <Col>
                        <div><strong>Nome do Cliente:</strong></div>
                        <div>{customer.name}</div>
                    </Col>
                    <Col>
                        <div><strong>CPF:</strong></div>
                        <div>{customer.cpf}</div>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <div><strong>E-mail:</strong></div>
                        <div>{customer.email}</div>
                    </Col>
                    <Col>
                        <div><strong>Telefone:</strong></div>
                        <div>{customer.phone}</div>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <div><strong>Endereço:</strong></div>
                        <div>{customer.address}</div>
                    </Col>
                    <Col>
                        <div><strong>Número:</strong></div>
                        <div>{customer.number}</div>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <div><strong>Bairro:</strong></div>
                        <div>{customer.neighbourhood}</div>
                    </Col>
                    <Col>
                        <div><strong>Complemento:</strong></div>
                        <div>{customer.complement}</div>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <div><strong>Cidade:</strong></div>
                        <div>{customer.city}</div>
                    </Col>
                    <Col>
                        <div><strong>Estado:</strong></div>
                        <div>{customer.state}</div>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <div><strong>CEP:</strong></div>
                        <div>{customer.zipcode}</div>
                    </Col>
                </Row>
            </Dialog>
        </Fragment>
    );
};

export default DialogCustomer;
