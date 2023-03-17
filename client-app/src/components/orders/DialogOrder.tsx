import { Fragment, useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Col, Row } from "react-bootstrap";
import { DataTable } from "primereact/datatable";
import { Column } from 'primereact/column';
import moment from "moment";

const DialogCustomer = ({ order }: any) => {
    const [visible, setVisible] = useState<boolean>(false);

    const footerContent = (
        <div>
            <Button label="Fechar" className="btn btn-primary" onClick={() => setVisible(false)} autoFocus />
        </div>
    );

    const priceFormatTemplate = (data: any) => {
        return data.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    }

    const totalFormatTemplate = (data: any) => {
        return (data.price * data.quantity).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    }

    return (
        <Fragment>
            <div className="text-center mt-4">
                <a  href="!#"
                    className="btn btn-primary btn-success"
                    onClick={(e) => {e.preventDefault(); setVisible(true)}}
                >
                    Ver Detalhes do Pedido
                </a>
            </div>

            <Dialog
                header={"Detalhes do Pedido | Pedido Nº " + order.id}
                visible={visible}
                style={{ width: '50vw' }}
                onHide={() => setVisible(false)}
                footer={footerContent}
                breakpoints={{ '960px': '75vw', '641px': '100vw' }}
            >
                <h5>Informações do Pedido</h5>
                <Row className="mb-4 mt-3">
                    <Col>
                        <div><strong>Data do Pedido:</strong></div>
                        <div>{moment(order.created_at).format("DD/MM/YYYY")}</div>
                    </Col>
                    <Col>
                        <div><strong>Status:</strong></div>
                        <div>{order.status}</div>
                    </Col>
                </Row>
                <h5>Informações do Cliente</h5>
                <Row className="my-3">
                    <Col>
                        <div><strong>Nome do Cliente:</strong></div>
                        <div>{order.customer.name}</div>
                    </Col>
                    <Col>
                        <div><strong>CPF:</strong></div>
                        <div>{order.customer.cpf}</div>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <div><strong>E-mail:</strong></div>
                        <div>{order.customer.email}</div>
                    </Col>
                    <Col>
                        <div><strong>Telefone:</strong></div>
                        <div>{order.customer.phone}</div>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <div><strong>Endereço:</strong></div>
                        <div>{order.customer.address}</div>
                    </Col>
                    <Col>
                        <div><strong>Número:</strong></div>
                        <div>{order.customer.number}</div>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <div><strong>Bairro:</strong></div>
                        <div>{order.customer.neighbourhood}</div>
                    </Col>
                    <Col>
                        <div><strong>Complemento:</strong></div>
                        <div>{order.customer.complement}</div>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <div><strong>Cidade:</strong></div>
                        <div>{order.customer.city}</div>
                    </Col>
                    <Col>
                        <div><strong>Estado:</strong></div>
                        <div>{order.customer.state}</div>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col>
                        <div><strong>CEP:</strong></div>
                        <div>{order.customer.zipcode}</div>
                    </Col>
                </Row>
                <h5>Itens do Pedido</h5>
                <Row className="my-4">
                    <Col>
                        <DataTable value={order.items}>
                            <Column field="product.code" header="Código do Produto"></Column>
                            <Column field="product.name" header="Nome do Produto"></Column>
                            <Column body={priceFormatTemplate} field="product.price" header="Preço"></Column>
                            <Column field="quantity" header="Quantidade"></Column>
                            <Column body={totalFormatTemplate} field="quantity" header="Total"></Column>
                        </DataTable>
                    </Col>
                </Row>
                <Row className="mb-4 me-2">
                    <Col md={{ span: 5, offset: 7 }}>
                        <Row className="mb-2">
                            <Col>
                                Subtotal
                            </Col>
                            <Col className="text-end">
                                {order.subtotal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col>
                                Desconto
                            </Col>
                            <Col className="text-end">
                                {order.discount.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <h4>Total</h4>
                            </Col>
                            <Col className="text-end">
                                <h4>{order.total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h4>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Dialog>
        </Fragment>
    );
};

export default DialogCustomer;
