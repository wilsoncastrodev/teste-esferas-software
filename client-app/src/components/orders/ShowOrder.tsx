import { useEffect, useState} from "react";
import Card from "react-bootstrap/Card";
import { Col, Row } from "react-bootstrap";
import moment from "moment";
import DialogCustomer from "../customers/DialogCustomer";

const ShowOrder = ({ order }:any) => {
    const [quantity, setQuatity] = useState<any>(0);

    useEffect(() => {
        setQuatity(order.items.reduce((total: any, product: any) => total + product.quantity, 0))
    }, [order]);

    return (
        <Card className="card-alt">
            <Card.Body>
                <Card.Title className="mb-4">Pedido Nº {order.id}</Card.Title>
                <Row className="mb-2">
                    <Col>
                        Nome do Cliente
                    </Col>
                    <Col className="text-end">
                        <DialogCustomer customer={order.customer}/>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col>
                        CPF
                    </Col>
                    <Col className="text-end">
                        {order.customer.cpf}
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col>
                        E-mail
                    </Col>
                    <Col className="text-end">
                        {order.customer.email}
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col>
                        Telefone
                    </Col>
                    <Col className="text-end">
                        {order.customer.phone}
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col>
                        {quantity} Produto(s)
                    </Col>
                    <Col className="text-end">
                        {order.subtotal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col>
                        Status
                    </Col>
                    <Col className="text-end">
                        {order.status}
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col>
                        Data do Pedido
                    </Col>
                    <Col className="text-end">
                        {moment(order.created_at).format("DD/MM/YYYY")}
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col>
                        Desconto
                    </Col>
                    <Col className="text-end">
                        {order.discount.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col>
                        Subtotal
                    </Col>
                    <Col className="text-end">
                        {order.subtotal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
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
            </Card.Body>
        </Card>
    );
};

export default ShowOrder;
