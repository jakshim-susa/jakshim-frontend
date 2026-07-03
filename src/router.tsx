import { createBrowserRouter } from "react-router-dom";
import Default from "./layouts/Default";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { HomePage } from "./pages/HomePage";
import { AnalysisPage } from "./pages/AnalysisPage";
import { RecordPage } from "./pages/RecordPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Default />,
        children: [
            { path: "", element: <LandingPage /> },
            { path: "/login", element: <LoginPage /> },
            { path: "/signup", element: <SignupPage /> },
            { path: "/home", element: <HomePage /> },
            { path: "/analysis", element: <AnalysisPage /> },
            { path: "/record", element: <RecordPage /> },
        ],
    },
]);

export default router;
