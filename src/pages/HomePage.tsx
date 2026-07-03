import { Greeting } from "../components/common/Greeting";
import { AiBriefingCard } from "../components/briefing/AiBriefingCard";
import { Button } from "../components/common/Button";
import { GoalList } from "../components/goal/GoalList";
import { Check, Dumbbell, X } from "lucide-react";
import { RecordList } from "../components/record/recordList";

export const HomePage = () => {
    return (
        <main className="flex flex-col gap-10 flex-1">
            <div className="flex flex-col gap-2">
                <Greeting name="홍길동" />
                <p className="text-md text-text-muted">
                    2026년 6월 28일 일요일
                </p>
                <div className="text-xs text-white text-center rounded-2xl bg-success w-[130px]">
                    🔥12일 연속 성공 중!
                </div>
            </div>
            <AiBriefingCard
                title="AI 브리핑"
                content="밤 10시 이후  취침이 운동 실패와 가장 높은 관련성을 보입니다. 오늘은 저녁 10시 전에 완료해 보세요."
            />

            <div className="grid grid-cols-2 gap-10">
                <div className="text-text-primary">
                    <div className="flex justify-between items-center mb-10">
                        <p className="font-semibold text-primary-pressed">
                            오늘의 목표
                        </p>
                        <Button variant="outline" size="sm">
                            + 목표 생성
                        </Button>
                    </div>
                    <GoalList>운동하기</GoalList>
                    <GoalList>운동하기</GoalList>
                    <GoalList>운동하기</GoalList>
                </div>
                <div className="text-text-primary">
                    <div className="flex justify-between items-center mb-10">
                        <p className="font-semibold text-primary-pressed">
                            최근 기록
                        </p>
                        <p className="cursor-pointer text-primary-pressed active:underline a">
                            전체 보기
                        </p>
                    </div>
                    <RecordList reason="피곤했다.." category="😓피로" />
                    <RecordList reason="피곤했다.." category="😓피로" />
                    <RecordList reason="피곤했다.." category="😓피로" />
                    <RecordList reason="피곤했다.." category="😓피로" />
                </div>
            </div>
        </main>
    );
};
