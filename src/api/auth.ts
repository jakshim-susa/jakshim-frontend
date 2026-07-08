import api from "./index";

export const kakaoLogin = async (code: string) => {
    const res = await api.post("/api/auth/login", { code });
    return res.data;
};

export const logout = async () => {
    const res = await api.post("/api/auth/logout");
    return res.data;
};
