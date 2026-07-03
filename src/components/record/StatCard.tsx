interface StatCardProps {
    value: string;
    label: string;
}

export const StatCard = ({ value, label }: StatCardProps) => {
    return (
        <div className="border-1 rounded-lg border-border-primary bg-bg-white p-6">
            <div className="text-2xl font-bold">{value}</div>
            <div>{label}</div>
        </div>
    );
};
