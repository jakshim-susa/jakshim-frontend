import api from "./index";

export const kakaoLogin = async (code: string) => {
    const res = await api.post("/api/auth/login", { code });
    return res.data;
};

export const logout = async () => {
    const res = await api.post("/api/auth/logout");
    return res.data;
};

export const signup = async (data: {
    email: string;
    password: string;
    nickname: string;
}) => {
    const res = await api.post("/api/auth/signup", data);
    return res.data;
};
