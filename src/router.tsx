import { createBrowserRouter } from "react-router-dom";
import Default from "./layouts/Default";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Default />,
        children: [],
    },
]);

export default router;
