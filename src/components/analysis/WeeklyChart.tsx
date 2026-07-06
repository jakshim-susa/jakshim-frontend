// components/analysis/WeeklyChart.tsx
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";
import type { WeeklyItem } from "../../types/analysis";

interface WeeklyChartProps {
    data: WeeklyItem[];
    worstDay: string | null;
}

export const WeeklyChart = ({ data, worstDay }: WeeklyChartProps) => {
    return (
        <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data}>
                <XAxis dataKey="day" />
                <YAxis unit="%" />
                <Tooltip formatter={(value) => [`${value}%`, "실패율"]} />
                <Bar dataKey="failRate" radius={[4, 4, 0, 0]}>
                    {data.map((entry) => (
                        <Cell
                            key={entry.dayOfWeek}
                            fill={
                                entry.day === worstDay ? "#F5E97A" : "#8BAFC4"
                            }
                        />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};
