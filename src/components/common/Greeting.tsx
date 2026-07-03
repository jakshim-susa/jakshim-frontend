interface GreetingProps {
    children: React.ReactNode;
    className?: string;
}

export const Greeting = ({ children, className = "" }: GreetingProps) => {
    return (
        <p className={`text-3xl font-bold text-text-primary ${className}`}>
            {children}
        </p>
    );
};
