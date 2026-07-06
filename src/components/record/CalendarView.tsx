import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "../../styles/calendar.css";
import { CalendarLegendItem } from "./CalendarLegendItem";
import { StatCard } from "./StatCard";
import { getAllRecords, getRecordsByDate } from "../../api/record";
import type { RecordListDay, RecordListGoal } from "../../types/record";

export const CalendarView = () => {
    const [value, setValue] = useState(new Date());
    const [records, setRecords] = useState<RecordListDay[]>([]);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedRecords, setSelectedRecords] = useState<RecordListGoal[]>(
        [],
    );
    const [selectedDiary, setSelectedDiary] = useState<string | null>(null);

    const handleDateClick = async (date: Date) => {
        setValue(date);
        const kstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
        const dateStr = kstDate.toISOString().split("T")[0];
        setSelectedDate(dateStr);

        try {
            const res = await getRecordsByDate(dateStr);
            console.log("res:", res);
            setSelectedRecords(res.records);
            setSelectedDiary(res.diary?.content || null);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const res = await getAllRecords();
                setRecords(res.records);
            } catch (error) {
                console.error(error);
            }
        };
        fetchRecords();
    }, []);

    // 날짜별 status 계산
    const getDateStatus = (dateStr: string) => {
        const dayData = records.find((r) => r.date === dateStr);
        if (!dayData) return null;

        // 실제 기록한 것만 필터링 (null 제외)
        const recordedGoals = dayData.goals.filter((g) => g.status !== null);

        // 기록한 게 하나도 없으면 null
        if (recordedGoals.length === 0) return null;

        const successCount = recordedGoals.filter(
            (g) => g.status === "success",
        ).length;
        const failCount = recordedGoals.filter(
            (g) => g.status === "fail",
        ).length;

        // 성공만 있으면 all_success
        if (failCount === 0) return "all_success";
        // 실패만 있으면 all_fail
        if (successCount === 0) return "all_fail";
        // 둘 다 있으면 partial
        return "partial";
    };

    // 이번 달 통계
    const now = new Date();
    const thisMonthRecords = records.filter((r) => {
        const date = new Date(r.date);
        return (
            date.getFullYear() === now.getFullYear() &&
            date.getMonth() === now.getMonth()
        );
    });

    const thisMonthSuccess = thisMonthRecords.reduce(
        (acc, day) =>
            acc + day.goals.filter((g) => g.status === "success").length,
        0,
    );

    const thisMonthFail = thisMonthRecords.reduce(
        (acc, day) => acc + day.goals.filter((g) => g.status === "fail").length,
        0,
    );

    const totalRecorded = thisMonthSuccess + thisMonthFail;
    const successRate =
        totalRecorded > 0
            ? Math.round((thisMonthSuccess / totalRecorded) * 100)
            : 0;

    const tileClassName = ({ date }: { date: Date }) => {
        const kstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
        const dateStr = kstDate.toISOString().split("T")[0];
        const today = new Date(Date.now() + 9 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0];

        // 오늘 날짜면 기본 스타일 유지
        if (dateStr === today) return null;

        const status = getDateStatus(dateStr);
        if (status === "all_success") return "tile-success";
        if (status === "all_fail") return "tile-fail";
        if (status === "partial") return "tile-partial";
        return null;
    };

    return (
        <div className="flex flex-col gap-10">
            <div
                className={`flex flex-col gap-8 ${selectedDate ? "md:flex-row" : ""}`}
            >
                {/* 왼쪽 - 달력 */}
                <div className={selectedDate ? "md:w-1/2" : "w-full"}>
                    <Calendar
                        value={value}
                        onChange={(date) => handleDateClick(date as Date)}
                        locale="ko-KR"
                        formatDay={(_locale, date) => date.getDate().toString()}
                        tileClassName={tileClassName}
                    />
                    {/* 범례 - 모바일에서는 달력 바로 아래 */}
                    <div className="mt-4 md:hidden">
                        <CalendarLegendItem />
                    </div>
                </div>

                {/* 오른쪽 - 상세 정보 */}

                <div className="md:w-1/2">
                    <div className="flex flex-col gap-4">
                        <p className="font-bold text-text-primary">
                            {selectedDate}
                        </p>
                        {selectedRecords.map((record) => (
                            <div
                                key={record.goalId}
                                className="flex justify-between items-center"
                            >
                                <span className="text-text-primary">
                                    {record.goal}
                                </span>
                                <span
                                    className={`text-xs text-white rounded-2xl px-4 py-1 ${record.status === "success" ? "bg-success" : record.status === "fail" ? "bg-error" : "bg-gray-300"}`}
                                >
                                    {record.status === "success"
                                        ? "성공"
                                        : record.status === "fail"
                                          ? "실패"
                                          : "미기록"}
                                </span>
                            </div>
                        ))}
                        {selectedDiary && (
                            <div className="mt-4">
                                <p className="text-sm text-text-muted">일기</p>
                                <p className="text-text-primary">
                                    {selectedDiary}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 범례 - 데스크탑에서는 기존 위치 */}
            <div className="hidden md:block">
                <CalendarLegendItem />
            </div>
            <hr />
            <div className="flex flex-col gap-6">
                <p className="text-text-primary text-md font-medium">
                    이번 달 요약
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 text-center gap-4">
                    <StatCard value={`${thisMonthSuccess}회`} label="성공" />
                    <StatCard value={`${thisMonthFail}회`} label="실패" />
                    <StatCard value={`${successRate}%`} label="성공률" />
                </div>
            </div>
        </div>
    );
};
