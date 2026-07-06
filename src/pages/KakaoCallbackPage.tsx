import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { kakaoLogin } from "../api/auth";
import { useAuthStore } from "../store/authStore";
import { applyTheme, type Theme } from "../utils/theme";

export const KakaoCallbackPage = () => {
    const navigate = useNavigate();
    const { setAuth } = useAuthStore();
    const called = useRef(false);

    useEffect(() => {
        if (called.current) return;
        called.current = true;

        const code = new URLSearchParams(window.location.search).get("code");

        if (!code) {
            navigate("/login");
            return;
        }

        const login = async () => {
            try {
                const res = await kakaoLogin(code);
                setAuth(res.accessToken, res.nickname, res.theme);

                // 로그인 후 테마 적용
                applyTheme((res.theme as Theme) || "system");
                navigate("/home");
            } catch (error) {
                console.error(error);
                navigate("/login");
            }
        };

        login();
    }, []);

    return <div>로그인 중...</div>;
};
