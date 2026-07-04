import { create } from "zustand";

interface AuthStore {
    accessToken: string | null;
    nickname: string | null;
    theme: string | null;
    setAuth: (accessToken: string, nickname: string, theme: string) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    accessToken: null,
    nickname: null,
    theme: null,
    setAuth: (accessToken, nickname, theme) =>
        set({ accessToken, nickname, theme }),
    clearAuth: () => set({ accessToken: null, nickname: null, theme: null }),
}));
