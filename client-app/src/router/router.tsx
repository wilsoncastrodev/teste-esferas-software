import { createBrowserRouter, Navigate } from 'react-router-dom';

import DashboardLayout from '../layouts/DashboardLayout';

import ErrorPage from '../pages/errors/Error';
import NotFoundPage from '../pages/errors/NotFound';

import CustomerPage from '../pages/dashboard/Customer';
import ProductPage from '../pages/dashboard/Product';
import OrderPage from '../pages/dashboard/order/Order';
import CreateOrderPage from '../pages/dashboard/order/CreateOrder';
import EditOrderPage from '../pages/dashboard/order/EditOrder';

const Router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="dashboard" />
    },
    {
        path: 'dashboard',
        element: <DashboardLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "*",
                element: <NotFoundPage />,
            },
            {
                path: "",
                element: <Navigate to="clientes" />
            },
            {
                path: "clientes",
                element: <CustomerPage />,
            },
            {
                path: "produtos",
                element: <ProductPage />,
            },
            {
                path: "pedidos",
                element: <OrderPage />,
            },
            {
                path: "pedidos/criar",
                element: <CreateOrderPage />,
            },
            {
                path: "pedidos/editar/:orderId",
                element: <EditOrderPage />,
            },
        ]
    },
    {
        path: '*',
        element: <NotFoundPage />
    }
])

export default Router
