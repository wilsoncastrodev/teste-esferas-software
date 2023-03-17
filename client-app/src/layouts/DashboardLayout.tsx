import { FC, Fragment } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/layouts/headers/Header";
import { Container } from "react-bootstrap";
import Snackbar from "../components/snackbars/Snackbar";
import SnackbarError from "../components/snackbars/SnackbarError";

export const DashboardLayout: FC = () => {
    return (
        <Fragment>
            <Header />
            <main>
                <Container className="my-4 pb-5">
                    <Outlet />
                </Container>
            </main>
            <Snackbar />
            <SnackbarError />
        </Fragment>
    );
};

export default DashboardLayout;
