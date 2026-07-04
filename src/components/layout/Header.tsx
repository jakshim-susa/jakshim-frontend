import { Link, useLocation } from "react-router-dom";
import { Logo } from "../common/Logo";

export const Header = () => {
    const isLoggedIn = true;

    const location = useLocation();
    const isLoginPage = location.pathname === "/login";
    const isSignupPage = location.pathname === "/signup";

    return (
        <header className="fixed top-0 left-0 z-50 w-full h-16 px-4 bg-secondary grid grid-cols-3 items-center">
            {/* 왼쪽: 로고 */}
            <div className="justify-self-start">
                <Logo />
            </div>

            {/* 가운데 네비게이션 */}
            <nav className="justify-self-center flex items-center gap-8 hidden md:flex">
                {isLoggedIn && (
                    <>
                        {" "}
                        <Link
                            to="/home"
                            className="text-text-primary hover:text-primary"
                        >
                            홈
                        </Link>
                        <Link
                            to="/analysis"
                            className="text-text-primary hover:text-primary"
                        >
                            분석
                        </Link>
                        <Link
                            to="/record"
                            className="text-text-primary hover:text-primary"
                        >
                            기록 달력
                        </Link>
                    </>
                )}
            </nav>

            {/* 오른쪽: 로그인 여부에 따라 분기 */}
            <div className="justify-self-end flex items-center gap-4">
                {isLoggedIn ? (
                    <>
                        {/* <span>{user?.name}님</span>
                        <button onClick={logout}>로그아웃</button> */}
                    </>
                ) : isLoginPage ? (
                    // 로그인 페이지 → 회원가입 버튼만
                    <Link
                        to="/signup"
                        className="text-sm px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover"
                    >
                        회원가입
                    </Link>
                ) : isSignupPage ? (
                    // 회원가입 페이지 → 로그인 버튼만
                    <Link
                        to="/login"
                        className="text-sm px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover"
                    >
                        로그인
                    </Link>
                ) : (
                    // 그 외 모든 페이지
                    <>
                        <Link
                            to="/login"
                            className="text-sm px-4 py-2 bg-white text-primar rounded-md hover:bg-primary-hover"
                        >
                            로그인
                        </Link>
                        <Link
                            to="/signup"
                            className="text-sm px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover"
                        >
                            회원가입
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
};
