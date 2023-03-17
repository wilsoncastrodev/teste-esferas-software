import { FC } from "react";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header: FC = () => (
    <header className="d-flex pb-0">
        <Container>
            <Row>
                <Col sm={4}>
                    <h1 className="header-logo text-white text-center text-sm-start">
                        <Link className="text-white" to="/">
                            Esferas
                        </Link>
                    </h1>
                </Col>
                <Col sm={4}>
                    <div className="menu-page d-lg-flex text-end h-100 justify-content-center">
                        <ListGroup horizontal>
                            <ListGroup.Item>
                                <Link className="text-white" to="clientes">
                                    Clientes
                                </Link>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Link className="text-white" to="produtos">
                                    Produtos
                                </Link>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Link className="text-white" to="pedidos">
                                    Pedidos
                                </Link>
                            </ListGroup.Item>
                        </ListGroup>
                    </div>
                </Col>
                <Col sm={4} className="align-self-md-center d-none d-lg-block">
                    <div className="text-end">
                        <Link className="btn btn-outline-light" to="pedidos/criar">
                            Criar Pedido
                        </Link>
                    </div>
                </Col>
            </Row>
        </Container>
    </header>
);

export default Header;
