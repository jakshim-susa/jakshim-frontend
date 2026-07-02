import { createBrowserRouter } from "react-router-dom";
import Default from "./layouts/Default";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Default />,
        children: [
            { path: "", element: <LandingPage /> },
            { path: "/login", element: <LoginPage /> },
        ],
    },
]);

export default router;
