import { FC, useEffect, useState, Fragment } from "react";
import { useAppDispatch, useAppSelector, RootState } from "../../stores/store";
import { getAllProduct } from "../../stores/features/productSlice";
import { addOrderItem, removeOrderItem, updateQuantity } from "../../stores/features/orderItemSlice";
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';
import MediaQuery from 'react-responsive';
import { Button, Card } from "react-bootstrap";
import { InputNumber } from "primereact/inputnumber";
import Dialogproduct from "../products/DialogProduct";

const ListProduct: FC = () => {
    const isLoading = useAppSelector((state: RootState) => state.product.isLoading);
    const products = useAppSelector((state: RootState) => state.product.products);
    const order = useAppSelector((state: RootState) => state.orderItem);
    const dispatch = useAppDispatch();
    const [items, setItems] = useState<any>([]);
    const [filters, setFilters] = useState<any>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    useEffect(() => {
        dispatch(getAllProduct());
    }, [isLoading]);

    useEffect(() => {
        if (products) setItems(products.map((product: any) => ({ ...product, quantity: 1, action: false })));
    }, [products]);

    const quantityTemplate = (data: any) => {
        return <InputNumber value={data.quantity}
                            onValueChange={(event: any) => setQuantityProduct(event.value, data)}
                            showButtons
                            min={1}
                            buttonLayout="horizontal"
                            decrementButtonClassName="p-button-danger"
                            incrementButtonClassName="p-button-success"
                            incrementButtonIcon="pi pi-plus"
                            decrementButtonIcon="pi pi-minus"/>
    }

    const setQuantityProduct = (quantity: number, data: any) => {
        const product = order.products.some((product: any) => product.id === data.id);
        if (product) dispatch(updateQuantity({ ...data, quantity }));
        setItems(items.map((item: any) => item.id === data.id ? { ...item, quantity } : item));
    }

    const removeItem = (data: any) => {
        dispatch(removeOrderItem(data.id));
        setItems(items.map((item: any) => item.id === data.id ? { ...item, action: false} : item));
    };

    const addItem = (data: any) => {
        const _data = {
            id: data.id,
            quantity: data.quantity,
            price: data.price
        }

        dispatch(addOrderItem(_data));
        setItems(items.map((item: any) => item.id === data.id ? { ...item, action: true} : item));
    };

    const priceFormatTemplate = (data: any) => data.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })

    const addOrderItemTemplate = (data: any) => {
        const _product = order.products.some((product: any) => product.id === data.id);

        if (_product) {
            return <Button className="btn btn-primary btn-outline-danger" onClick={() => removeItem(data)}>Remover</Button>
        }

        return <Button className="btn btn-primary btn-outline-primary" onClick={() => addItem(data)}>Adicionar</Button>
    }

    const productTemplate = (data: any) => {
        return <Dialogproduct product={data}/>;
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
            <div className="text-start">
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
                            <DataTable value={items} paginator rows={7} header={renderHeader()} filters={filters} responsiveLayout="stack"
                                emptyMessage="Não foi encontrado nenhum resultado">
                                <Column field="code" header="Código" sortable />
                                <Column field="name" body={productTemplate} header="Produto" sortable />
                                <Column field="price" body={priceFormatTemplate} header="Preço" sortable />
                                <Column header="Quantidade" field="quantity" body={quantityTemplate} exportable={false} style={{ width: '150px' }} sortable/>
                                <Column header="Ação" field="action" body={addOrderItemTemplate} style={{ width: '150px' }} sortable/>
                            </DataTable>
                        </MediaQuery>
                        <MediaQuery maxWidth={960}>
                            <DataTable value={items} paginator rows={7} header={renderHeader()} filters={filters} responsiveLayout="stack">
                                <Column field="code" header="Código" sortable />
                                <Column field="name" body={productTemplate} header="Produto" sortable />
                                <Column field="price" body={priceFormatTemplate} header="Preço" sortable />
                                <Column header="Quantidade" field="quantity" body={quantityTemplate} exportable={false} style={{ width: '150px' }} sortable/>
                                <Column header="Ação" field="action" body={addOrderItemTemplate} sortable/>
                            </DataTable>
                        </MediaQuery>
                    </Fragment>
                    : <Card className="mt-5">
                        <Card.Body>Não há nenhum Produto cadastrado.</Card.Body>
                    </Card>
            }
        </Fragment>
    )
};

export default ListProduct;
