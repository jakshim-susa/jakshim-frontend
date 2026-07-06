import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router.tsx";
import { applyTheme, getTheme } from "./utils/theme.ts";

// 앱 시작할 때 저장된 테마 적용
applyTheme(getTheme());

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
