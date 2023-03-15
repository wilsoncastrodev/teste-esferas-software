import { FC, Fragment, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import ListProductsEditOrder from "../../../components/orders/ListProductsEditOrder";
import EditFormOrder from "../../../components/orders/EditFormOrder";
import { RootState, useAppDispatch, useAppSelector } from "../../../stores/store";
import { useParams } from "react-router-dom";
import { getOrderById } from '../../../stores/features/orderSlice';

const EditOrderPage: FC = () => {
    const dispatch = useAppDispatch();
    const { orderId }: any = useParams();
    const order = useAppSelector((state: RootState) => state.order.orders);

    useEffect(() => {
        dispatch(getOrderById(orderId));
    }, [dispatch]);

    return (
        <Fragment>
            <h3>Editar Pedido</h3>
            <Row className="mt-5">
                <Col md={12} lg={7} xl={8}>
                    {
                        order && order.items
                        ? <ListProductsEditOrder itemsRegistered={order.items}/>
                        : null
                    }
                </Col>
                <Col md={12} lg={5} xl={4}>
                    {
                        order && order.items
                        ? <EditFormOrder order={order}/>
                        : null
                    }
                </Col>
            </Row>
        </Fragment>
    )
};

export default EditOrderPage;
