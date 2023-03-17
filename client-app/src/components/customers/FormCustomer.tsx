import { FC, Fragment } from "react";
import Card from "react-bootstrap/Card";
import CreateFormCustomer from "./CreateFormCustomer";
import { useAppDispatch, RootState, useAppSelector } from "../../stores/store";
import EditFormCustomer from "./EditFormCustomer";
import { Button } from "react-bootstrap";
import { addCustomer } from "../../stores/features/themeSlice";

const FormCustomer: FC = () => {
    const dispatch = useAppDispatch();
    const customer = useAppSelector((state: RootState) => state.theme.data);
    const isEdit = useAppSelector((state: RootState) => state.theme.isEdit);

    return (
        <Card className="card-alt">
            <Card.Body>
                {!isEdit ?
                    <Fragment>
                        <Card.Title>Adicionar Cliente</Card.Title>
                        <CreateFormCustomer />
                    </Fragment> :
                    <Fragment>
                        <div className="h-100 d-flex flex-row justify-content-between">
                            <Card.Title>Editar Cliente</Card.Title>
                            <Button variant="light" onClick={() => dispatch(addCustomer())}>Adicionar</Button>
                        </div>
                        <EditFormCustomer customer={customer} />
                    </Fragment>}
            </Card.Body>
        </Card>
    );
};

export default FormCustomer;
