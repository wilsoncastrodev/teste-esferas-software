import { Fragment, useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Col, Row } from "react-bootstrap";

const Dialogproduct = ({ product }: any) => {
    const [visible, setVisible] = useState<boolean>(false);

    const footerContent = (
        <div>
            <Button label="Fechar" className="btn btn-primary" onClick={() => setVisible(false)} autoFocus />
        </div>
    );

    return (
        <Fragment>
            <a href="!#" onClick={(e) => {e.preventDefault(); setVisible(true)}}>{product.name}</a>
            <Dialog header={"Produto: " + product.name} visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={footerContent}>
                <Row className="mb-3">
                    <Col xs={5}>
                        <div><strong>Nome do Produto:</strong></div>
                        <div>{product.name}</div>
                    </Col>
                    <Col>
                        <div><strong>Preço:</strong></div>
                        <div>{product.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</div>
                    </Col>
                    <Col>
                        <div><strong>Código do Produto:</strong></div>
                        <div>{product.code}</div>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <div><strong>Descrição:</strong></div>
                        <div>{product.description}</div>
                    </Col>
                </Row>
            </Dialog>
        </Fragment>
    );
};

export default Dialogproduct;
