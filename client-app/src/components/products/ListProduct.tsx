import { FC, useEffect, useState, Fragment } from "react";
import { useAppDispatch, useAppSelector, RootState } from "../../stores/store";
import { getAllProduct, deleteProduct } from "../../stores/features/productSlice";
import { editProduct } from "../../stores/features/themeSlice";
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";
import { InputText } from 'primereact/inputtext';
import { MDCSnackbar } from '@material/snackbar';
import { FilterMatchMode } from 'primereact/api';
import MediaQuery from 'react-responsive';
import { Card } from "react-bootstrap";
import { addProduct } from "../../stores/features/themeSlice";
import Dialogproduct from "./DialogProduct";

const ListProduct: FC = () => {
    const isLoading = useAppSelector((state: RootState) => state.product.isLoading);
    const products = useAppSelector((state: RootState) => state.product.products);
    const errors = useAppSelector((state: RootState) => state.product.errors);
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
            snackbar.labelText = "Ocorreu um problema! Não foi possível excluir o produto, por estar vinculado a pelo menos um pedido.";
            snackbar.open();
        }
    }, [errors, dispatch]);

    useEffect(() => {
        dispatch(getAllProduct());
    }, [isLoading]);

    useEffect(() => {
        setItems(products);
    }, [errors, products]);

    useEffect(() => {
        if(undo) {
            dispatch(deleteProduct(undo.id));
            dispatch(addProduct());
        }
    }, [undo]);

    const deleteItem = (data: any) => {
        const snackbarButton: any = document.getElementById('mdc-button');
        const mdcSnackbar: any = document.querySelector('.mdc-snackbar');
        const snackbar = new MDCSnackbar(mdcSnackbar);

        const _items = items.filter((product: any) => product.id !== data.id);
        setItems(_items);

        snackbar.timeoutMs = 6000;
        snackbar.labelText = "Produto excluído";
        snackbar.actionButtonText = "Desfazer";
        snackbar.open();

        snackbarButton.addEventListener('click', () => setItems(items));
        snackbar.listen('MDCSnackbar:closed', (event: CustomEvent<{reason: string}>) => {
            if(event.detail.reason === 'dismiss') {
                setUndo(data);
            }
        });
    }

    const productTemplate = (data: any) => {
        return <Dialogproduct product={data}/>;
    }

    const actionBodyTemplate = (data: any) => {
        return (
            <div>
                <button onClick={() => dispatch(editProduct(data))}><i className="fa-regular fa-pen-to-square"></i></button>
                <button onClick={() => deleteItem(data)}><i className="fa-regular fa-trash-can"></i></button>
            </div>
        );
    }

    const priceFormatTemplate = (data: any) => {
        return data.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
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
                            <Column field="code" header="Código do Produto" sortable />
                            <Column field="name" body={productTemplate} header="Nome do Produto" sortable />
                            <Column body={priceFormatTemplate} field="price" header="Preço" sortable />
                            <Column header="Ações" body={actionBodyTemplate} exportable={false} style={{ width: '150px' }} />
                        </DataTable>
                    </MediaQuery>
                    <MediaQuery maxWidth={960}>
                        <DataTable value={items} paginator rows={8} header={renderHeader()} filters={filters} responsiveLayout="stack">
                            <Column field="code" header="Código do Produto" sortable />
                            <Column field="name" body={productTemplate} header="Nome do Produto" sortable />
                            <Column body={priceFormatTemplate} field="price" header="Preço" sortable />
                            <Column header="Editar" expander={true} />
                            <Column header="Excluir" body={actionBodyTemplate} exportable={false} />
                        </DataTable>
                    </MediaQuery>
                </Fragment>
                 :  <div className="pt-4">
                        <Card className="mt-5">
                            <Card.Body>Não há nenhum Produto cadastrado.</Card.Body>
                        </Card>
                    </div>
            }
        </Fragment>
    )
};

export default ListProduct;
