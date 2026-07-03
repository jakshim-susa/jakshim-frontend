import type React from "react";

interface CenteredPageLayoutProps {
    children: React.ReactNode;
    className?: string;
}

export const CenteredPageLayout = ({
    children,
    className = "",
}: CenteredPageLayoutProps) => {
    return (
        <main
            className={`min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-4 ${className}`}
        >
            {children}
        </main>
    );
};
