interface InputProps {
    label?: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: "text" | "email" | "password" | "number";
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
}

export const Input = ({
    label,
    value,
    onChange,
    placeholder,
    type = "text",
    size = "md",
    disabled = false,
}: InputProps) => {
    const sizeStyle = {
        sm: "text-xs px-3 py-1.5",
        md: "text-sm px-4 py-2",
        lg: "text-base px-5 py-3",
    };
    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <label className="text-sm font-medium text-text-secondary">
                    {label}
                </label>
            )}
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                disabled={disabled}
                className={`w-full mb-4 border border-border-primary rounded-md focus:outline-none focus:border-primary disabled:bg-bg-secondary disabled:cursor-not-allowed ${sizeStyle[size]}`}
            />
        </div>
    );
};
