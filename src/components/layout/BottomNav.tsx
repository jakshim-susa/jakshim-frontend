import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

export const BottomNav = () => {
    const location = useLocation();
    const { accessToken } = useAuthStore();

    if (!accessToken) return null;

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="fixed bottom-0 left-0 w-full h-16 bg-secondary flex md:hidden justify-around items-center border-t border-border px-4">
            <Link
                to="/home"
                className={`flex flex-col items-center gap-1 text-xs ${isActive("/home") ? "text-primary" : "text-text-muted"}`}
            >
                <span>🏠</span>
                <span>홈</span>
            </Link>
            <Link
                to="/analysis"
                className={`flex flex-col items-center gap-1 text-xs ${isActive("/analysis") ? "text-primary" : "text-text-muted"}`}
            >
                <span>📊</span>
                <span>분석</span>
            </Link>
            <Link
                to="/record"
                className={`flex flex-col items-center gap-1 text-xs ${isActive("/record") ? "text-primary" : "text-text-muted"}`}
            >
                <span>📅</span>
                <span>기록 달력</span>
            </Link>
        </nav>
    );
};
