import { LegendItem } from "../common/LegendItem";

export const CalendarLegendItem = () => {
    return (
        <div className="pl-10 flex gap-6 justify-start -mt-6">
            <LegendItem color="bg-green-500" label="성공" />
            <LegendItem color="bg-red-400" label="실패" />
            <LegendItem color="border border-gray-300" label="미기록" />
        </div>
    );
};
