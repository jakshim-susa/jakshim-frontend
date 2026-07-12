interface StatCardProps {
    value: string;
    label: string;
}

export const StatCard = ({ value, label }: StatCardProps) => {
    return (
        <div
            className="border-1 rounded-lg border-border-primary bg-bg-white p-6
            [box-shadow:var(--shadow-sm)] hover:[box-shadow:var(--shadow-md)] hover:-translate-y-1 transition-all duration-200"
        >
            <div className="text-2xl font-bold text-text-primary">{value}</div>
            <div className="text-text-primary">{label}</div>
        </div>
    );
};
