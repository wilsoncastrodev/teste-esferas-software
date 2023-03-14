import { FC, useEffect, useState, Fragment } from "react";
import { useAppDispatch, useAppSelector, RootState } from "../../stores/store";
import { getAllOrder, deleteOrder } from "../../stores/features/orderSlice";
import { showOrder } from "../../stores/features/themeSlice";
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";
import { InputText } from 'primereact/inputtext';
import { MDCSnackbar } from '@material/snackbar';
import { FilterMatchMode } from 'primereact/api';
import MediaQuery from 'react-responsive';
import { Card } from "react-bootstrap";
import DialogCustomer from "../customers/DialogCustomer";
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';

const ListOrder: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isLoading = useAppSelector((state: RootState) => state.order.isLoading);
    const orders = useAppSelector((state: RootState) => state.order.orders);
    const [items, setItems] = useState<any>([]);
    const [filters, setFilters] = useState<any>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    useEffect(() => {
        dispatch(getAllOrder());
    }, [isLoading, dispatch]);

    useEffect(() => {
        if(orders) {
            setItems(orders);
            dispatch(showOrder(orders[0]));
        }
    }, [orders]);

    const deleteItem = (data: any) => {
        const snackbarButton: any = document.getElementById('mdc-button');
        const mdcSnackbar: any = document.querySelector('.mdc-snackbar');
        const snackbar = new MDCSnackbar(mdcSnackbar);

        const _items = items.filter((order: any) => order.id !== data.id);
        setItems(_items);

        snackbar.timeoutMs = 6000;
        snackbar.labelText = "Pedido excluído com sucesso";
        snackbar.actionButtonText = "Desfazer";
        snackbar.open();

        snackbarButton.addEventListener('click', () => setItems(items));
        snackbar.listen('MDCSnackbar:closed', (event: CustomEvent<{reason: string}>) => {
            if(event.detail.reason === 'dismiss') {
                dispatch(deleteOrder(data.id));
            }
        });
    }

    const actionBodyTemplate = (data: any) => {
        return (
            <Fragment>
                <button onClick={() => dispatch(showOrder(data))}><i className="fa-solid fa-eye"></i></button>
                <button onClick={() => navigate(`editar/${data.id}`)}><i className="fa-regular fa-pen-to-square"></i></button>
                <button onClick={() => deleteItem(data)}><i className="fa-regular fa-trash-can"></i></button>
            </Fragment>
        );
    }

    const customerTemplate = (data: any) => {
        return <DialogCustomer customer={data.customer}/>;
    }

    const onGlobalFilterChange = (event: any) => {
        const value = event.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
    };

    const dateFormatTemplate = (data: any) => {
        return moment(data.created_at).format("DD/MM/YYYY");
    }

    const totalFormatTemplate = (data: any) => {
        return data.total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    }

    const renderHeader = () => {
        const value = filters['global'] ? filters['global'].value : '';

        return (
            <div className="text-start">
                <Link className="btn btn-primary me-3" to="criar">
                    Criar Pedido
                </Link>
                <span className="p-input-icon-left">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <InputText type="search" value={value || ''} onChange={(e) => onGlobalFilterChange(e)} placeholder="Pesquisar..." />
                </span>
            </div>
        );
    };

    return (
        <Fragment>
            {
                items && items.length > 0 ?
                <Fragment>
                    <MediaQuery minWidth={960}>
                        <DataTable value={items} paginator rows={8} header={renderHeader()} filters={filters} responsiveLayout="stack"
                            emptyMessage="Não foi encontrado nenhum resultado">
                            <Column field="id" header="#" />
                            <Column body={customerTemplate} field="customer.name" header="Cliente" sortable />
                            <Column field="customer.cpf" header="CPF" sortable />
                            <Column body={totalFormatTemplate} field="total" header="Total" sortable />
                            <Column field="status" header="Status" sortable />
                            <Column body={dateFormatTemplate} field="created_at" header="Data do Pedido" sortable />
                            <Column header="Ações" body={actionBodyTemplate} exportable={false} style={{ width: '150px' }} />
                        </DataTable>
                    </MediaQuery>
                    <MediaQuery maxWidth={960}>
                        <DataTable value={items} paginator rows={8} header={renderHeader()} filters={filters} responsiveLayout="stack">
                            <Column field="id" header="#" />
                            <Column body={customerTemplate} field="customer.name" header="Cliente" sortable />
                            <Column field="customer.cpf" header="CPF" sortable />
                            <Column body={totalFormatTemplate} field="total" header="Total" sortable />
                            <Column field="status" header="Status" sortable />
                            <Column body={dateFormatTemplate} field="created_at" header="Data do Pedido" sortable />
                            <Column header="Ações" body={actionBodyTemplate} exportable={false} style={{ width: '150px' }} />
                        </DataTable>
                    </MediaQuery>
                </Fragment>
                 :  <Fragment>
                        <Link className="btn btn-primary me-3" to="criar">
                            Criar Pedido
                        </Link>
                        <Card className="mt-4">
                            <Card.Body>Não há nenhum Pedido cadastrado.</Card.Body>
                        </Card>
                    </Fragment>
            }
        </Fragment>
    )
};

export default ListOrder;
