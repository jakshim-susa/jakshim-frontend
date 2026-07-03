import React from "react";

interface TagProps {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "danger" | "outline" | "kakao";
    size?: "sm" | "md";
}

export const Tag = ({
    children,
    variant = "primary",
    size = "md",
}: TagProps) => {
    const variantStyle = {
        primary: "bg-primary text-white hover:bg-primary-hover",
        secondary: "bg-secondary text-text-primary hover:bg-secondary-hover",
        danger: "bg-danger text-white hover:bg-danger-hover",
        kakao: "bg-[#FEE500] text-text-primary hover:bg-[#FDD800]",
        outline:
            "bg-transparent text-primary border border-primary hover:bg-primary hover:text-white",
    };

    const sizeStyle = {
        sm: "text-xs px-3 py-1.5 rounded-sm",
        md: "text-sm px-4 py-2.5 rounded-3xl",
    };

    return (
        <div
            className={`cursor-pointer font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variantStyle[variant]} ${sizeStyle[size]}`}
        >
            {children}
        </div>
    );
};
