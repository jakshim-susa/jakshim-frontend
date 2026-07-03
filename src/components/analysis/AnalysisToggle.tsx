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
        <div className="flex items-center justify-center gap-4 bg-bg-secondary py-1 px-1 rounded-md border-1 border-border-primary">
            <div className="flex items-center justify-center gap-2 cursor-pointer pl-2">
                <Calendar className="w-4 h-4" />
                <p className="text-md text-text-secondary ">{leftLabel}</p>
            </div>
            <div className="flex items-center justify-center gap-2 bg-bg-white py-0.5 px-2.5 rounded-md border-1 border-border-primary cursor-pointer">
                <List className="w-4 h-4" />
                <p className="text-md text-text-secondary">{rightLabel}</p>
            </div>
        </div>
    );
};
