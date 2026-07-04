import { useState } from "react";
import { AnalysisToggle } from "../components/analysis/AnalysisToggle";
import { Greeting } from "../components/common/Greeting";
import { ListView } from "../components/record/ListView";
import { CalendarView } from "../components/record/CalendarView";
import { useLocation } from "react-router-dom";

// 예시
interface RawRecord {
    id: string;
    createdAt: string; // "2026-06-20"
    todos: { id: string; title: string }[];
}

const rawRecords: RawRecord[] = [
    {
        id: "1",
        createdAt: "2026-06-20",
        todos: [
            { id: "a", title: "매일 운동하기" },
            { id: "b", title: "매일 운동하기" },
        ],
    },
    {
        id: "2",
        createdAt: "2026-06-19",
        todos: [{ id: "c", title: "매일 운동하기" }],
    },
];

const formatDate = (iso: string) => {
    const d = new Date(iso);
    return `${d.getMonth() + 1}.${d.getDate()}`;
};

const getDayLabel = (iso: string) => {
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    return days[new Date(iso).getDay()];
};

const items = rawRecords.map((record) => ({
    date: formatDate(record.createdAt),
    dayLabel: getDayLabel(record.createdAt),
    tasks: record.todos.map((t) => t.title),
}));

export const RecordPage = () => {
    const location = useLocation();
    const [view, setView] = useState<"calendar" | "list">(
        location.state?.view || "calendar",
    );
    return (
        <main>
            <div className="flex flex-col gap-10">
                <div className="flex justify-between items-center">
                    <Greeting>수사 캘린더 📆</Greeting>
                    <AnalysisToggle
                        leftLabel="달력"
                        rightLabel="리스트"
                    ></AnalysisToggle>
                </div>
                {view === "calendar" ? (
                    <CalendarView />
                ) : (
                    <ListView items={items} />
                )}
            </div>
        </main>
    );
};
