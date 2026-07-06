import { Link } from "react-router-dom";
import logoIcon from "../../assets/images/logo-icon.png";
import { useAuthStore } from "../../store/authStore";

export const Logo = () => {
    const { accessToken } = useAuthStore();
    return (
        <Link
            to={accessToken ? "/home" : "/"}
            className="flex items-center gap-2"
        >
            <img src={logoIcon} alt="로고 아이콘" className="w-12 h-12" />
            <div className="font-logo text-lg md:text-2xl whitespace-nowrap">
                작심삼일 수사대
            </div>
        </Link>
    );
};
