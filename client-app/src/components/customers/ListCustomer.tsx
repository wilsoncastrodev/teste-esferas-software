import { FC, useEffect, useState, Fragment } from "react";
import { useAppDispatch, useAppSelector, RootState } from "../../stores/store";
import { getAllCustomer, deleteCustomer } from "../../stores/features/customerSlice";
import { editCustomer } from "../../stores/features/themeSlice";
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";
import { InputText } from 'primereact/inputtext';
import { MDCSnackbar } from '@material/snackbar';
import { FilterMatchMode } from 'primereact/api';
import MediaQuery from 'react-responsive';
import { Card } from "react-bootstrap";
import { addCustomer } from "../../stores/features/themeSlice";
import DialogCustomer from "./DialogCustomer";

const ListCustomer: FC = () => {
    const isLoading = useAppSelector((state: RootState) => state.customer.isLoading);
    const customers = useAppSelector((state: RootState) => state.customer.customers);
    const errors = useAppSelector((state: RootState) => state.customer.errors);
    const dispatch = useAppDispatch();
    const [items, setItems] = useState<any>([]);
    const [undo, setUndo] = useState<any>(0);
    const [filters, setFilters] = useState<any>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    useEffect(() => {
        if(errors && errors.line === 760) {
            const mdcSnackbar: any = document.querySelector('.mdc-snackbar-error');
            const snackbar = new MDCSnackbar(mdcSnackbar);
            snackbar.timeoutMs = 10000;
            snackbar.labelText = "Ocorreu um problema! Não foi possível excluir o cliente, por estar vinculado a pelo menos um pedido.";
            snackbar.open();
        }
    }, [errors, dispatch]);

    useEffect(() => {
        dispatch(getAllCustomer());
    }, [isLoading]);

    useEffect(() => {
        setItems(customers);
    }, [errors, customers]);

    useEffect(() => {
        if(undo) {
            dispatch(deleteCustomer(undo.id));
            dispatch(addCustomer());
        }
    }, [undo]);

    const deleteItem = (data: any) => {
        const snackbarButton: any = document.getElementById('mdc-button');
        const mdcSnackbar: any = document.querySelector('.mdc-snackbar-info');
        const snackbar = new MDCSnackbar(mdcSnackbar);

        const _items = items.filter((customer: any) => customer.id !== data.id);
        setItems(_items);

        snackbar.timeoutMs = 5000;
        snackbar.labelText = "Cliente excluído";
        snackbar.actionButtonText = "Desfazer";
        snackbar.open();

        snackbarButton.addEventListener('click', () => setItems(items));
        snackbar.listen('MDCSnackbar:closed', (event: CustomEvent<{reason: string}>) => {
            if(event.detail.reason === 'dismiss') {
                setUndo(data);
            }
        });
    }

    const customerTemplate = (data: any) => {
        return <DialogCustomer customer={data}/>;
    }

    const actionBodyTemplate = (data: any) => {
        return (
            <div>
                <button onClick={() => dispatch(editCustomer(data))}><i className="fa-regular fa-pen-to-square"></i></button>
                <button onClick={() => deleteItem(data)}><i className="fa-regular fa-trash-can"></i></button>
            </div>
        );
    }

    const onGlobalFilterChange = (event: any) => {
        const value = event.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
    };

    const renderHeader = () => {
        const value = filters['global'] ? filters['global'].value : '';

        return (
            <span className="p-input-icon-left">
                <i className="fa-solid fa-magnifying-glass"></i>
                <InputText type="search" value={value || ''} onChange={(e) => onGlobalFilterChange(e)} placeholder="Pesquisar..." />
            </span>
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
                            <Column field="name" body={customerTemplate} header="Nome do Cliente" sortable />
                            <Column field="cpf" header="CPF" sortable />
                            <Column field="email" header="E-mail" sortable />
                            <Column header="Ações" body={actionBodyTemplate} exportable={false} style={{ width: '150px' }} />
                        </DataTable>
                    </MediaQuery>
                    <MediaQuery maxWidth={960}>
                        <DataTable value={items} paginator rows={8} header={renderHeader()} filters={filters} responsiveLayout="stack">
                            <Column field="name" body={customerTemplate} header="Nome do Cliente" sortable />
                            <Column field="cpf" header="CPF" sortable />
                            <Column field="email" header="E-mail" sortable />
                            <Column header="Ações" body={actionBodyTemplate} exportable={false} style={{ width: '20px !important' }} />
                        </DataTable>
                    </MediaQuery>
                </Fragment>
                 :  <div className="pt-4">
                        <Card className="mt-5">
                            <Card.Body>Não há nenhum Cliente cadastrado.</Card.Body>
                        </Card>
                    </div>
            }
        </Fragment>
    )
};

export default ListCustomer;
