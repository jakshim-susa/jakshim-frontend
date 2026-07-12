import { Greeting } from "../components/common/Greeting";
import { AiBriefingCard } from "../components/briefing/AiBriefingCard";
import { Button } from "../components/common/Button";
import { GoalList } from "../components/goal/GoalList";
import { RecordList } from "../components/record/RecordList";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useEffect, useState } from "react";
import { getGoals } from "../api/goal";
import type { Goal } from "../types/goal";
import { GoalCreateModal } from "../components/goal/GoalCreateModal";
import type { RecordListDay, RecordListGoal } from "../types/record";
import { getAllRecords } from "../api/record";
import { getFormattedDate, getKoreaToday } from "../utils/date";
import { getBriefing, getSummary } from "../api/analysis";
import type { Summary } from "../types/analysis";

export const HomePage = () => {
    const { nickname } = useAuthStore();
    const [goals, setGoals] = useState<Goal[]>([]);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [recentRecords, setRecentRecords] = useState<RecordListDay[]>([]);
    const [todayRecords, setTodayRecords] = useState<RecordListGoal[]>([]);
    const [briefing, setBriefing] = useState<string>("");
    const [summary, setSummary] = useState<Summary | null>(null);

    const fetchSummary = async () => {
        const res = await getSummary();
        setSummary(res);
    };

    const fetchTodayRecords = async () => {
        const today = getKoreaToday();
        const res = await getAllRecords();
        const todayData = res.records.find(
            (day: RecordListDay) => day.date === today,
        );
        setTodayRecords(todayData?.goals || []);
    };

    const fetchGoals = async () => {
        const res = await getGoals();
        setGoals(res.goals);
    };

    const fetchRecords = async () => {
        const res = await getAllRecords();
        setRecentRecords(res.records.slice(0, 4));
    };

    const fetchBriefing = async () => {
        const res = await getBriefing();
        setBriefing(res.content);
    };

    useEffect(() => {
        // 목표, 기록, 연속성공일 같이 호출
        const initData = async () => {
            try {
                await Promise.all([
                    fetchGoals(),
                    fetchRecords(),
                    fetchTodayRecords(),
                    fetchSummary(),
                ]);
            } catch (error) {
                console.error(error);
            }
        };
        initData();

        // AI 브리핑은 Gemini API 호출이라 따로 처리
        const initBriefing = async () => {
            try {
                await fetchBriefing();
            } catch (error) {
                console.error(error);
            }
        };
        initBriefing();
    }, []);

    const handleGoalSuccess = async () => {
        try {
            await Promise.all([
                fetchGoals(),
                fetchTodayRecords(),
                fetchRecords(),
            ]);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <main className="flex flex-col gap-10 flex-1 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-border-strong/30 w-full">
                <div className="flex flex-col gap-1">
                    <Greeting>안녕하세요, {nickname} 탐정님</Greeting>
                    <p className="text-xs md:text-sm font-medium text-text-muted tracking-wider">
                        사건 의뢰일: {getFormattedDate()}
                    </p>
                </div>
                {summary?.currentStreak ? (
                    /* 스트릭 배지도 탐정단 느낌으로 */
                    <div className="text-xs font-bold text-white text-center py-1.5 px-4 rounded-lg bg-success shadow-sm self-start md:self-auto tracking-wide animate-pulse">
                        🔥 {summary.currentStreak}일 연속 사건 해결 중
                    </div>
                ) : null}
            </div>
            <div className="relative before:absolute before:-top-3 before:left-8 before:w-16 before:h-5 before:bg-yellow-600/15 before:backdrop-blur-[1px] before:rotate-[-3deg] before:z-10">
                <AiBriefingCard
                    title="🕵️‍♂️ AI 탐정의 수사 브리핑"
                    content={
                        briefing ||
                        "단서들을 종합하여 브리핑을 작성 중입니다..."
                    }
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                {/* 좌측: 오늘의 목표 섹션 */}
                <div className="flex flex-col p-5 bg-bg-white border border-border-primary rounded-xl backdrop-blur-md [box-shadow:var(--shadow-sm)]">
                    <div className="flex justify-between items-center mb-6">
                        <p className="font-bold text-sm md:text-base tracking-wide flex items-center gap-1.5 text-primary-pressed">
                            📌 오늘의 수사 목표
                        </p>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsModalOpen(true)}
                        >
                            + 목표 추가
                        </Button>
                    </div>

                    <div className="flex flex-col gap-3">
                        {goals.length === 0 ? (
                            <p className="text-text-muted text-xs md:text-sm py-4 text-center">
                                아직 배정된 목표가 없습니다. 새로운 목표를
                                수사망에 올려보세요!
                            </p>
                        ) : (
                            goals.map((goal) => (
                                <GoalList
                                    key={goal.goalId}
                                    goalId={goal.goalId}
                                    recordId={
                                        todayRecords.find(
                                            (r) => r.goalId === goal.goalId,
                                        )?.recordId || null
                                    }
                                    status={
                                        todayRecords.find(
                                            (r) => r.goalId === goal.goalId,
                                        )?.status || null
                                    }
                                    onSuccess={handleGoalSuccess}
                                >
                                    {goal.title}
                                </GoalList>
                            ))
                        )}
                    </div>
                </div>

                {isModalOpen && (
                    <GoalCreateModal
                        onClose={() => setIsModalOpen(false)}
                        onSuccess={handleGoalSuccess}
                    />
                )}

                {/* 최근 기록 섹션 */}
                <div className="flex flex-col p-5 bg-bg-white border border-border-primary rounded-xl backdrop-blur-md [box-shadow:var(--shadow-sm)]">
                    <div className="flex justify-between items-center mb-6">
                        <p className="font-bold text-sm md:text-base tracking-wide flex items-center gap-1.5 text-primary-pressed">
                            📜 최근 발견된 단서
                        </p>
                        <p
                            className="cursor-pointer text-xs font-semibold text-text-muted hover:text-primary-pressed transition-colors active:underline"
                            onClick={() =>
                                navigate("/record", { state: { view: "list" } })
                            }
                        >
                            전체 사건 기록 ➔
                        </p>
                    </div>

                    <div className="flex flex-col gap-3">
                        {recentRecords.length === 0 ? (
                            <p className="text-text-muted text-xs md:text-sm py-4 text-center">
                                아직 획득한 단서(기록)가 없습니다.
                            </p>
                        ) : (
                            recentRecords.map((day) =>
                                day.goals
                                    .filter((goal) => goal.status !== null)
                                    .map((goal) => (
                                        <RecordList
                                            key={goal.goalId}
                                            date={day.date}
                                            goalTitle={goal.goal}
                                            status={goal.status}
                                            reasonCategory={goal.reasonCategory}
                                        />
                                    )),
                            )
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};
