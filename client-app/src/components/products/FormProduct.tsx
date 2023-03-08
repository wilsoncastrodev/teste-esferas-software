import { FC, Fragment } from "react";
import Card from "react-bootstrap/Card";
import CreateFormProduct from "./CreateFormProduct";
import { useAppDispatch, RootState, useAppSelector } from "../../stores/store";
import EditFormProduct from "./EditFormProduct";
import { Button } from "react-bootstrap";
import { addProduct } from "../../stores/features/themeSlice";

const FormProduct: FC = () => {
    const dispatch = useAppDispatch();
    const product = useAppSelector((state: RootState) => state.theme.data);
    const isEdit = useAppSelector((state: RootState) => state.theme.isEdit);

    return (
        <Card className="card-alt">
            <Card.Body>
                { !isEdit ? <Fragment>
                    <Card.Title>Adicionar Produto</Card.Title>
                    <CreateFormProduct />
                </Fragment> : <Fragment>
                    <div className="h-100 d-flex flex-row justify-content-between">
                        <Card.Title>Editar Produto</Card.Title>
                        <Button variant="light" onClick={() => dispatch(addProduct())}>Adicionar</Button>
                    </div>
                    <EditFormProduct product={product} />
                </Fragment> }
            </Card.Body>
        </Card>
    );
};

export default FormProduct;
