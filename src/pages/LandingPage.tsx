import { Link } from "react-router-dom";
import landingIcon from "../assets/images/langing-icon.png";
import { Button } from "../components/common/Button";
import { CenteredPageLayout } from "../components/layout/CenteredPageLayout";

export const LandingPage = () => {
    return (
        <CenteredPageLayout>
            <main className="grid grid-cols-2 items-center justify-center mb-5 max-w-[1200px] mx-auto text-text-primary animate-fade-in">
                <div>
                    <div className="font-logo text-4xl mb-2 md:text-6xl md:mb-5">
                        작심삼일 수사대
                        {/* <span className="inline-block scale-x-[-1] text-3xl md:text-5xl">
                            🔎
                        </span> */}
                    </div>
                    <p className="my-4 pl-1 text-text-muted font-semibold">
                        당신의 습관을 수사하여, <br />
                        반복되는 실패의 원인을 밝혀드립니다.
                    </p>

                    <Link to="/login" className="block w-full">
                        <Button size="md" variant="primary" fullWidth>
                            시작하기
                        </Button>
                    </Link>
                </div>
                <div>
                    <img
                        src={landingIcon}
                        alt="로고 이미지"
                        className="w-xs md:w-lg"
                    />
                </div>
            </main>
        </CenteredPageLayout>
    );
};
