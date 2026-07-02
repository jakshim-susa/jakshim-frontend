import { createBrowserRouter } from "react-router-dom";
import Default from "./layouts/Default";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Default />,
        children: [
            { path: "", element: <LandingPage /> },
            { path: "/login", element: <LoginPage /> },
            { path: "/signup", element: <SignupPage /> },
        ],
    },
]);

export default router;
