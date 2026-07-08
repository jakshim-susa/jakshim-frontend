import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
    accessToken: string | null;
    nickname: string | null;
    theme: string | null;
    setAuth: (accessToken: string, nickname: string, theme: string) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            accessToken: null,
            nickname: null,
            theme: null,
            setAuth: (accessToken, nickname, theme) =>
                set({ accessToken, nickname, theme }),
            clearAuth: () => {
                set({ accessToken: null, nickname: null, theme: null });
                localStorage.removeItem("auth-storage");
            },
        }),
        {
            name: "auth-storage",
        },
    ),
);
