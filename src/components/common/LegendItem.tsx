interface LegendItemProps {
    color: string;
    label: string;
}

export const LegendItem = ({ color, label }: LegendItemProps) => {
    return (
        <div className="flex items-center gap-1">
            <div className={`w-3 h-3 rounded-full ${color}`} />
            <span className="text-sm text-gray-500">{label}</span>
        </div>
    );
};
