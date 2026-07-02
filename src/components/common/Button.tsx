import React from "react";

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "danger" | "outline";
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
}

export const Button = ({
    children,
    onClick,
    variant = "primary",
    size = "md",
    disabled = false,
}: ButtonProps) => {
    const variantStyle = {
        primary: "bg-primary text-white hover:bg-primary-hover",
        secondary: "bg-secondary text-text-primary hover:bg-secondary-hover",
        danger: "bg-danger text-white hover:bg-danger-hover",
        outline:
            "bg-transparent text-primary border border-primary hover:bg-primary hover:text-white",
    };

    const sizeStyle = {
        sm: "text-xs px-3 py-1.5",
        md: "text-sm px-4 py-2",
        lg: "text-base w-[500px] h-[60px] text-[24px] rounded-xl",
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`cursor-pointer font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variantStyle[variant]} ${sizeStyle[size]}`}
        >
            {children}
        </button>
    );
};
