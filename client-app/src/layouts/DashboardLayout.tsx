import { FC, Fragment } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/layouts/headers/Header";
import { Container } from "react-bootstrap";

export const DashboardLayout: FC = () => {
    return (
        <Fragment>
            <Header />
            <main>
                <Container className="my-4">
                    <Outlet />
                </Container>
            </main>
        </Fragment>
    );
};

export default DashboardLayout;
