import type React from "react";

interface StatCardProps {
    icon: React.ReactNode;
    value: string | number;
    label: string;
    trend?: {
        direction: "up" | "down";
        value: string;
    };
}

export const StatCard = ({ icon, value, label, trend }: StatCardProps) => {
    return (
        <div className="w-full p-4 bg-white border-1 rounded-lg border-border-primary flex justify-between items-center">
            <div className="flex items-center gap-4">
                <div className="p-2 bg-bg-secondary rounded-md">{icon}</div>
                <div>
                    <div className="font-bold text-lg">{value}</div>
                    <p className="text-sm text-text-secondary">{label}</p>
                </div>
            </div>
            {trend && (
                <div className="text-text-secondary text-sm flex items-center gap-1">
                    {trend.direction === "up" ? "🔼" : "🔽"} {trend.value}
                </div>
            )}
        </div>
    );
};
