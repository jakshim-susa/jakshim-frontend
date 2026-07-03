import { useState } from "react";
import Calendar from "react-calendar";
import "../../styles/calendar.css";
import { CalendarLegendItem } from "./CalendarLegendItem";
import { StatCard } from "./StatCard";

export const CalendarView = () => {
    const [value, setValue] = useState(new Date());
    return (
        <div className="flex flex-col gap-10">
            <Calendar
                value={value}
                onChange={(date) => setValue(date as Date)}
                locale="ko-KR"
                formatDay={(locale, date) => date.getDate().toString()}
            />
            <CalendarLegendItem />
            <hr />
            <div className="flex flex-col gap-6">
                <p className="text-text-primary text-md font-medium">
                    이번 달 요약
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 text-center gap-4 ">
                    <StatCard value="14일" label="성공"></StatCard>
                    <StatCard value="5일" label="실패"></StatCard>
                    <StatCard value="174%" label="성공률"></StatCard>
                </div>
            </div>
        </div>
    );
};
