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
import { getBriefing } from "../api/analysis";
import { LoadingSpinner } from "../components/common/LoadingSpinner";

export const HomePage = () => {
    const { nickname } = useAuthStore();
    const [goals, setGoals] = useState<Goal[]>([]);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [recentRecords, setRecentRecords] = useState<RecordListDay[]>([]);
    const [todayRecords, setTodayRecords] = useState<RecordListGoal[]>([]);
    const [briefing, setBriefing] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);

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
        const fetchAll = async () => {
            try {
                setIsLoading(true);
                await Promise.all([
                    fetchGoals(),
                    fetchRecords(),
                    fetchBriefing(),
                    fetchTodayRecords(),
                ]);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAll();
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

    if (isLoading) return <LoadingSpinner />;

    return (
        <main className="flex flex-col gap-10 flex-1">
            <div className="flex flex-col gap-2">
                <Greeting>안녕하세요, {nickname}님👋</Greeting>
                <p className="text-sm md:text-lg text-text-muted">
                    {getFormattedDate()}
                </p>
                <div className="text-xs text-white text-center rounded-2xl bg-success w-[130px]">
                    🔥12일 연속 성공 중!
                </div>
            </div>
            <AiBriefingCard
                title="AI 브리핑"
                content={briefing || "브리핑을 불러오는 중..."}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="text-text-primary">
                    <div className="flex justify-between items-center mb-10">
                        <p className="font-semibold text-primary-pressed">
                            오늘의 목표
                        </p>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsModalOpen(true)}
                        >
                            + 목표 생성
                        </Button>

                        {isModalOpen && (
                            <GoalCreateModal
                                onClose={() => setIsModalOpen(false)}
                                onSuccess={handleGoalSuccess}
                            />
                        )}
                    </div>
                    {goals.length === 0 ? (
                        <p className="text-text-muted text-sm">
                            아직 목표가 없어요. 목표를 추가해보세요!
                        </p>
                    ) : (
                        goals.map((goal) => (
                            <GoalList
                                key={goal.goalId}
                                goalId={goal.goalId}
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
                <div className="text-text-primary">
                    <div className="flex justify-between items-center mb-10">
                        <p className="font-semibold text-primary-pressed">
                            최근 기록
                        </p>
                        <p
                            className="cursor-pointer text-primary-pressed active:underline a"
                            onClick={() =>
                                navigate("/record", { state: { view: "list" } })
                            }
                        >
                            전체 보기
                        </p>
                    </div>
                    {recentRecords.length === 0 ? (
                        <p className="text-text-muted text-sm">
                            최근 기록이 없어요.
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
        </main>
    );
};
