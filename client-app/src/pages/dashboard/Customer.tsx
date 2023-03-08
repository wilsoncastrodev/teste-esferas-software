import { FC, Fragment } from "react";
import { Col, Row } from "react-bootstrap";
import ListCustomer from "../../components/customers/ListCustomer";
import FormCustomer from "../../components/customers/FormCustomer";

const CustomerPage: FC = () => (
    <Fragment>
        <h3>Clientes</h3>
        <Row className="mt-2=4">
            <Col md={12} lg={5} xl={4}>
                <FormCustomer />
            </Col>
            <Col md={12} lg={7} xl={8}>
                <ListCustomer />
            </Col>
        </Row>
    </Fragment>
);

export default CustomerPage;
