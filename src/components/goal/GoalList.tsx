import { Check, Dumbbell, X } from "lucide-react";
import type React from "react";

interface GoalListProps {
    children: React.ReactNode;
}

export const GoalList = ({ children }: GoalListProps) => {
    return (
        <>
            <div className="flex justify-between mb-4">
                <div className="flex items-center gap-8">
                    <Dumbbell className="w-5 h-5 text-text-primary" />
                    <div className="text-text-primary">{children}</div>
                </div>
                <div className="flex gap-3">
                    <Check className="w-8 h-8 text-success bg-white border-1 p-1 rounded-sm cursor-pointer hover:bg-success hover:text-white" />
                    <X className="w-8 h-8 text-error bg-white border-1 p-1 rounded-sm cursor-pointer hover:bg-error hover:text-white" />
                </div>
            </div>
            <hr className="text-border-primary mb-4" />
        </>
    );
};
