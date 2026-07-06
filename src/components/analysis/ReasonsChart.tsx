// components/analysis/ReasonsChart.tsx
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import type { ReasonItem } from "../../types/analysis";

interface ReasonsChartProps {
    data: ReasonItem[];
}

const COLORS = ["#8BAFC4", "#F5E97A", "#CCC5A8", "#2E2E2E"];

export const ReasonsChart = ({ data }: ReasonsChartProps) => {
    return (
        <ResponsiveContainer width="100%" height={200}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="count"
                    nameKey="reasonCategory"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                >
                    {data.map((_, index) => (
                        <Cell
                            key={index}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value}회`, name]} />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
};
