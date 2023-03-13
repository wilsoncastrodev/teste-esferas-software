import { FC, Fragment, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import ListProductsCreateOrder from "../../../components/orders/ListProductsCreateOrder";
import CreateFormOrder from "../../../components/orders/CreateFormOrder";
import { removeAllOrderItems } from "../../../stores/features/orderItemSlice";
import { useAppDispatch } from "../../../stores/store";

const CreateOrderPage: FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(removeAllOrderItems());
    }, [dispatch]);

    return(
        <Fragment>
            <h3>Criar Pedido</h3>
            <Row className="mt-5">
                <Col md={12} lg={7} xl={8}>
                    <ListProductsCreateOrder />
                </Col>
                <Col md={12} lg={5} xl={4}>
                    <CreateFormOrder />
                </Col>
            </Row>
        </Fragment>
    );
}

export default CreateOrderPage;
