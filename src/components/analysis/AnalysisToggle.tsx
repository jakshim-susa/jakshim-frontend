import { Calendar, List } from "lucide-react";

interface ToggleProps {
    leftLabel: string;
    rightLabel: string;
    selected: "left" | "right";
    onChange: (value: "left" | "right") => void;
}

export const AnalysisToggle = ({
    leftLabel,
    rightLabel,
    selected,
    onChange,
}: ToggleProps) => {
    return (
        <div className="relative flex items-center bg-bg-secondary py-1 px-1 rounded-lg border-1 border-border-primary [box-shadow:var(--shadow-sm)]">
            {/* 슬라이딩 배경 */}
            <div
                className={`absolute top-1 bottom-1 rounded-md bg-bg-white border-1 border-border-primary [box-shadow:var(--shadow-sm)] transition-all duration-300
                    ${selected === "left" ? "left-1 right-1/2" : "left-1/2 right-1"}`}
            />

            {/* 왼쪽 */}
            <div
                className={`relative flex items-center justify-center gap-2 py-1 px-3 rounded-md cursor-pointer transition-all duration-300 z-10
                    ${selected === "left" ? "text-primary" : "text-text-muted"}`}
                onClick={() => onChange("left")}
            >
                <Calendar className="w-4 h-4" />
                <p className="text-sm font-medium">{leftLabel}</p>
            </div>

            {/* 오른쪽 */}
            <div
                className={`relative flex items-center justify-center gap-2 py-1 px-3 rounded-md cursor-pointer transition-all duration-300 z-10
                    ${selected === "right" ? "text-primary" : "text-text-muted"}`}
                onClick={() => onChange("right")}
            >
                <List className="w-4 h-4" />
                <p className="text-sm font-medium">{rightLabel}</p>
            </div>
        </div>
    );
};
