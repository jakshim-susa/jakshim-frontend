import { Outlet, ScrollRestoration } from "react-router-dom";
import { Header } from "../components/layout/Header";

export const Default = () => {
    return (
        <div>
            <ScrollRestoration />
            <Header />
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default Default;
