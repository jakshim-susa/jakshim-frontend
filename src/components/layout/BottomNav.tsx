import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { Home, BarChart2, Calendar } from "lucide-react";

export const BottomNav = () => {
    const location = useLocation();
    const { accessToken } = useAuthStore();

    if (!accessToken) return null;

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="fixed bottom-0 left-0 w-full h-16 bg-secondary flex md:hidden justify-around items-center border-t border-border-primary px-4">
            <Link
                to="/home"
                className={`flex flex-col items-center gap-1 text-xs px-4 py-1 transition-all
                    ${isActive("/home") ? "text-primary" : "text-text-muted"}`}
            >
                <Home
                    className={`transition-all ${isActive("/home") ? "w-6 h-6" : "w-5 h-5"}`}
                />
                <span className={isActive("/home") ? "font-bold" : ""}>홈</span>
            </Link>
            <Link
                to="/analysis"
                className={`flex flex-col items-center gap-1 text-xs px-4 py-1 transition-all
                    ${isActive("/analysis") ? "text-primary" : "text-text-muted"}`}
            >
                <BarChart2
                    className={`transition-all ${isActive("/analysis") ? "w-6 h-6" : "w-5 h-5"}`}
                />
                <span className={isActive("/analysis") ? "font-bold" : ""}>
                    분석
                </span>
            </Link>
            <Link
                to="/record"
                className={`flex flex-col items-center gap-1 text-xs px-4 py-1 transition-all
                    ${isActive("/record") ? "text-primary" : "text-text-muted"}`}
            >
                <Calendar
                    className={`transition-all ${isActive("/record") ? "w-6 h-6" : "w-5 h-5"}`}
                />
                <span className={isActive("/record") ? "font-bold" : ""}>
                    기록 달력
                </span>
            </Link>
        </nav>
    );
};
