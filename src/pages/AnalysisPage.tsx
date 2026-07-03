import { AiBriefingCard } from "../components/briefing/AiBriefingCard";
import { Greeting } from "../components/common/Greeting";
import { StatCardProps } from "../components/analysis/StatCardProps";
import { Tag } from "../components/common/Tag";

export const AnalysisPage = () => {
    return (
        <main className="flex flex-col gap-8 flex-1">
            <Greeting name="홍길동" />
            <AiBriefingCard
                title="수사 보고서"
                content="수요일과 금요일 저녁 실패율이 높고, 유튜브·침대·야식 키워드가 반복됩니다. 저녁 루틴을 바꿔보는 게 핵심이에요."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <StatCardProps
                    icon="📊"
                    value="72%"
                    label="성공률"
                    trend={{ direction: "up", value: "지난달 +8%" }}
                ></StatCardProps>
                <StatCardProps
                    icon="🔥"
                    value="9일"
                    label="연속 성공 최고"
                ></StatCardProps>
                <StatCardProps
                    icon="📆"
                    value="4.7일"
                    label="평균 지속일"
                    trend={{ direction: "up", value: "+ 1.3일" }}
                ></StatCardProps>
            </div>

            <hr />

            <div className="grid grid-cols-2 text-text-primary">
                <div className="flex flex-col gap-2">
                    <p>가장 많이 실패하는 요인</p>
                    <div>차트</div>
                    <p>당신은 매주 월요일에 95% 확률로 무너집니다.</p>
                </div>
                <div>
                    <p>실패 원인 분석</p>
                    <div>
                        <div>차트</div>
                    </div>
                </div>
            </div>

            <hr />
            <div className="flex flex-col gap-2">
                <p>자주 등장하는 키워드</p>
                <div className="flex gap-2">
                    <Tag size="md"># 유튜브</Tag>
                    <Tag size="md"># 유튜브</Tag>
                </div>
            </div>
        </main>
    );
};
