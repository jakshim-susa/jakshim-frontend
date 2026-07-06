export type Theme = "light" | "dark" | "system";

export const applyTheme = (theme: Theme) => {
    const root = document.documentElement;

    if (theme === "dark") {
        root.classList.add("dark");
    } else if (theme === "light") {
        root.classList.remove("dark");
    } else {
        // system
        const isDark = window.matchMedia(
            "(prefers-color-scheme: dark)",
        ).matches;
        isDark ? root.classList.add("dark") : root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
};

export const getTheme = (): Theme => {
    return (localStorage.getItem("theme") as Theme) || "system";
};
