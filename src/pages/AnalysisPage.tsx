import { useEffect, useState } from "react";
import { getSummary, getWeekly, getReasons, getInsight } from "../api/analysis";
import type { Summary, Weekly, Reasons } from "../types/analysis";
import { Tag } from "../components/common/Tag";
import { Greeting } from "../components/common/Greeting";
import { AiBriefingCard } from "../components/briefing/AiBriefingCard";
import { StatCard } from "../components/record/StatCard";
import { useAuthStore } from "../store/authStore";
import { WeeklyChart } from "../components/analysis/WeeklyChart";
import { ReasonsChart } from "../components/analysis/ReasonsChart";

export const AnalysisPage = () => {
    const { nickname } = useAuthStore();
    const [summary, setSummary] = useState<Summary | null>(null);
    const [weekly, setWeekly] = useState<Weekly | null>(null);
    const [reasons, setReasons] = useState<Reasons | null>(null);
    const [insight, setInsight] = useState<string>("");

    useEffect(() => {
        const initData = async () => {
            try {
                const [summaryRes, weeklyRes, reasonsRes] = await Promise.all([
                    getSummary(),
                    getWeekly(),
                    getReasons(),
                ]);
                setSummary(summaryRes);
                setWeekly(weeklyRes);
                setReasons(reasonsRes);
            } catch (error) {
                console.error(error);
            }
        };
        initData();

        const initInsight = async () => {
            try {
                const res = await getInsight();
                setInsight(res.content);
            } catch (error) {
                console.error(error);
            }
        };
        initInsight();
    }, []);

    const successRate = summary
        ? Math.round(
              (summary.totalSuccess /
                  (summary.totalSuccess + summary.totalFail)) *
                  100,
          )
        : 0;

    return (
        <main className="flex flex-col gap-8 flex-1">
            <Greeting>안녕하세요, {nickname}님👋</Greeting>
            <AiBriefingCard
                title="수사 보고서"
                content={insight || "인사이트를 불러오는 중..."}
            />

            {/* 통계 카드 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <StatCard value={`${successRate}%`} label="성공률" />
                <StatCard
                    // icon="🔥"
                    value={`${summary?.maxStreak || 0}일`}
                    label="연속 성공 최고"
                />
                <StatCard
                    // icon="📆"
                    value={`${summary?.currentStreak || 0}일`}
                    label="현재 연속 성공"
                />
            </div>

            <hr />

            {/* 차트 영역 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-text-primary">
                <div className="flex flex-col gap-2">
                    <p className="font-semibold">가장 많이 실패하는 요일</p>
                    {weekly && (
                        <WeeklyChart
                            data={weekly.weekly}
                            worstDay={weekly.worstDay}
                        />
                    )}
                    {weekly?.worstDay && (
                        <p className="text-sm text-text-muted">
                            당신은 매주 {weekly.worstDay}요일에 가장 많이
                            실패해요.
                        </p>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <p className="font-semibold">실패 원인 분석</p>
                    {reasons && reasons.reasons.length > 0 && (
                        <ReasonsChart data={reasons.reasons} />
                    )}
                </div>
            </div>

            <hr />

            {/* 키워드 태그 */}
            <div className="flex flex-col gap-2">
                <p className="text-text-primary">자주 등장하는 키워드</p>
                <div className="flex flex-wrap gap-2">
                    {reasons?.reasons.map((reason) => (
                        <Tag key={reason.rank} size="md">
                            # {reason.reasonCategory}
                        </Tag>
                    ))}
                </div>
            </div>
        </main>
    );
};
