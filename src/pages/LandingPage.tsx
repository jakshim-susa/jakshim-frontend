import { Link } from "react-router-dom";
import landingIcon from "../assets/images/langing-icon.png";
import { Button } from "../components/common/Button";

export const LandingPage = () => {
    return (
        <main>
            <div className="flex items-center justify-center mb-5 max-w-[1200px] mx-auto mt-32">
                <div>
                    <div className="font-logo text-7xl mb-5 --bor">
                        작심삼일
                    </div>
                    <div className="font-logo text-7xl">
                        수사대
                        <span className="inline-block scale-x-[-1] text-6xl">
                            🔎
                        </span>
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
                    <img src={landingIcon} alt="로고 이미지" className="w-lg" />
                </div>
            </div>
        </main>
    );
};
