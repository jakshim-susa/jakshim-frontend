import axios from "axios";
import { useAuthStore } from "../store/authStore";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

// refresh 중인지 체크
let isRefreshing = false;
// 대기열
let failedQueue: {
    resolve: (token: string) => void;
    reject: (error: unknown) => void;
}[] = [];

// 대기열 처리
const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token!);
        }
    });
    failedQueue = [];
};

// 요청할 때마다 토큰 자동으로 헤더에 넣어주기
api.interceptors.request.use((config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

// 응답 interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // refresh 요청 자체가 실패하면 로그아웃
        if (originalRequest.url?.includes("/api/auth/token/refresh")) {
            useAuthStore.getState().clearAuth();
            window.location.href = "/login";
            return Promise.reject(error);
        }

        // 로그인/회원가입은 그냥 에러 반환
        if (
            originalRequest.url?.includes("/api/auth/login") ||
            originalRequest.url?.includes("/api/auth/signup")
        ) {
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // 이미 refresh 중이면 대기열에 추가
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return api(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const res = await api.post("/api/auth/token/refresh");
                const newAccessToken = res.data.accessToken;

                const { nickname, theme, setAuth } = useAuthStore.getState();
                setAuth(newAccessToken, nickname!, theme!);

                // 대기열 처리
                processQueue(null, newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (err) {
                processQueue(err, null);
                useAuthStore.getState().clearAuth();
                window.location.href = "/login";
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    },
);

export default api;
