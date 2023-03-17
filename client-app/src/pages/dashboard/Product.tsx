import { FC, Fragment } from "react";
import { Col, Row } from "react-bootstrap";
import ListProduct from "../../components/products/ListProduct";
import FormProduct from "../../components/products/FormProduct";

const ProductPage: FC = () => (
    <Fragment>
        <h3>Produtos</h3>
        <Row className="mt-4">
            <Col md={12} lg={5} xl={4} className="order-last order-lg-first">
                <FormProduct />
            </Col>
            <Col md={12} lg={7} xl={8} className="order-first order-lg-last">
                <ListProduct />
            </Col>
        </Row>
    </Fragment>
);

export default ProductPage;
