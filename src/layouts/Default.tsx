import { Outlet, ScrollRestoration } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { BottomNav } from "../components/layout/BottomNav";

export const Default = () => {
    return (
        <div>
            <ScrollRestoration />
            <Header />
            <div className="pt-16 pb-16 md:pb-0">
                <Outlet />
            </div>
            <BottomNav />
        </div>
    );
};

export default Default;
