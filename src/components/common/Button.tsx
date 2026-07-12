import React from "react";

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "danger" | "outline" | "kakao";
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
    fullWidth?: boolean;
}

export const Button = ({
    children,
    onClick,
    variant = "primary",
    size = "md",
    disabled = false,
    fullWidth = false,
}: ButtonProps) => {
    const variantStyle = {
        primary:
            "bg-primary text-white hover:bg-primary-hover shadow-sm hover:shadow-md",
        secondary:
            "bg-secondary text-text-primary hover:bg-secondary-hover shadow-sm hover:shadow-md",
        danger: "bg-danger text-white hover:bg-danger-hover shadow-sm hover:shadow-md",
        kakao: "bg-[#FEE500] text-[#3B1F1F] hover:bg-[#FDD800] shadow-sm hover:shadow-md",
        outline:
            "bg-transparent text-primary border border-primary hover:bg-primary hover:text-white",
    };

    const sizeStyle = {
        sm: "text-xs px-3 py-1.5 rounded-sm",
        md: "text-md px-4 py-2.5 rounded-lg",
        lg: "text-lg px-6 py-4 rounded-2xl",
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`cursor-pointer font-medium transition-all duration-200
        active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
        ${fullWidth ? "w-full" : ""}
        ${variantStyle[variant]}
        ${sizeStyle[size]}`}
        >
            {children}
        </button>
    );
};
