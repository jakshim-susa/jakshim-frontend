interface GreetingProps {
    name: string;
    className?: string;
}

export const Greeting = ({ name, className = "" }: GreetingProps) => {
    return (
        <p className={`text-3xl font-bold text-text-primary ${className}`}>
            안녕하세요, {name}님👋
        </p>
    );
};
