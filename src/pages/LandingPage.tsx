import { Link } from "react-router-dom";
import landingIcon from "../assets/images/langing-icon.png";
import { Button } from "../components/common/Button";
import { CenteredPageLayout } from "../components/layout/CenteredPageLayout";
import feature1 from "../assets/images/landing_image_1.png";
import feature2 from "../assets/images/landing_image_2.png";
import feature3 from "../assets/images/landing_image_3.png";

const features = [
    {
        image: feature1,
        title: "1. 실패는 단서입니다",
        description:
            "반복되는 실패를 기록하고 원인을 찾아 다음 성공으로 연결합니다.",
    },
    {
        image: feature2,
        title: "2. 사건처럼 기록합니다",
        description:
            "목표와 실패를 하나의 사건 파일처럼 관리하며 성장 과정을 남깁니다.",
    },
    {
        image: feature3,
        title: "3. 탐정과 함께 성장합니다",
        description:
            "귀여운 탐정 캐릭터가 매일 꾸준한 습관을 응원하고 함께 수사합니다.",
    },
];

export const LandingPage = () => {
    return (
        <CenteredPageLayout className="w-full">
            <div className="flex flex-col justify-center gap-8 md:gap-12 w-full max-w-[850px] mx-auto text-text-primary animate-fade-in py-6 md:py-10 px-6 md:px-0">
                {/* 1. 래이아웃 유지 (좌 텍스트 / 우 마스코트) */}
                <section className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 w-full">
                    {/* 텍스트 영역 (md:w-1/2로 변경) */}
                    <div className="w-full md:w-1/2 text-center md:text-left flex flex-col items-center md:items-start order-2 md:order-1">
                        <h1 className="font-logo text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-3">
                            작심삼일 수사대
                        </h1>
                        <p className="mb-6 md:mb-8 text-text-muted font-medium text-xs sm:text-sm md:text-base leading-relaxed break-keep max-w-[280px] md:max-w-none">
                            당신의 습관을 수사하여,{" "}
                            <br className="hidden sm:inline" />
                            반복되는 실패의 원인을 밝혀드립니다.
                        </p>
                        <div className="w-full sm:w-auto sm:min-w-[180px] px-4 sm:px-0">
                            <Link to="/login" className="w-full block">
                                <Button size="md" variant="primary" fullWidth>
                                    시작하기
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* 마스코트 영역 (md:w-1/2 및 max-w 크기 조절) */}
                    <div className="w-full md:w-1/2 flex justify-center order-first md:order-last">
                        <img
                            src={landingIcon}
                            alt="로고 이미지"
                            className="w-36 sm:w-44 md:w-full max-w-[240px] md:max-w-[260px] object-contain filter drop-shadow-md 
                animate-bounce [animation-duration:2.5s] 
                hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                </section>

                {/* 2. 카드 섹션 */}
                <section className="w-full">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="flex flex-col gap-2.5 p-4 bg-bg-white rounded-xl border border-border-primary backdrop-blur-md
                                    [box-shadow:var(--shadow-sm)] hover:[box-shadow:var(--shadow-md)] hover:-translate-y-1 transition-all duration-200"
                            >
                                <div className="w-full h-16 md:h-20 flex items-center justify-center p-1 overflow-hidden">
                                    <img
                                        src={feature.image}
                                        alt={feature.title}
                                        className="h-full object-contain"
                                    />
                                </div>
                                <div className="flex flex-col gap-0.5 text-center">
                                    <h2 className="font-bold text-text-primary text-sm md:text-base">
                                        {feature.title}
                                    </h2>
                                    <p className="text-text-muted text-xs md:text-sm leading-relaxed break-keep">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </CenteredPageLayout>
    );
};
