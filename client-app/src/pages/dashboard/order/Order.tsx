import { FC, Fragment } from "react";
import { useAppSelector, RootState } from "../../../stores/store";
import { Col, Row } from "react-bootstrap";
import ListOrder from "../../../components/orders/ListOrders";
import ShowOrder from "../../../components/orders/ShowOrder";

const OrderPage: FC = () => {
    const order = useAppSelector((state: RootState) => state.theme.data);

    return (
        <Fragment>
            <h3>Pedidos</h3>
            <Row className="mt-5">
                <Col md={12} lg={7} xl={8}>
                    <ListOrder />
                </Col>
                <Col md={12} lg={5} xl={4}>
                    {
                        order && order.items
                        ? <ShowOrder order={order}/>
                        : null
                    }
                </Col>
            </Row>
        </Fragment>
    )
};

export default OrderPage;
