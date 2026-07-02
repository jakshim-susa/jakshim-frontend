import { Link } from "react-router-dom";
import logoIcon from "../../assets/images/logo-icon.png";

export const Logo = () => {
    return (
        <Link to="/" className="flex items-center gap-2">
            <img src={logoIcon} alt="로고 아이콘" className="w-12 h-12" />
            <div className="font-logo text-2xl">작심삼일 수사대</div>
        </Link>
    );
};
