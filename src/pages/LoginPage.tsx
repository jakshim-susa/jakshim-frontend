import { useState } from "react";
import { Button } from "../components/common/Button";
import { Input } from "../components/common/Input";
import { Link } from "react-router-dom";
import { CenteredPageLayout } from "../components/layout/CenteredPageLayout";
import { kakaoLogin } from "../utils/kakao";

export const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <CenteredPageLayout>
            <div className="animate-fade-in w-full flex flex-col items-center">
                <h1 className="text-3xl text-text-primary text-center font-bold mb-8">
                    로그인
                </h1>

                <div className="flex flex-col gap-2 w-full max-w-lg">
                    <Input
                        label="이메일"
                        type="email"
                        size="lg"
                        value={email}
                        onChange={setEmail}
                        placeholder="이메일을 입력하세요"
                    />
                    <Input
                        label="비밀번호"
                        type="password"
                        size="lg"
                        value={password}
                        onChange={setPassword}
                        placeholder="비밀번호를 입력하세요"
                    />
                    <Button size="md" variant="primary">
                        로그인
                    </Button>

                    <div className="flex items-center gap-4 w-full my-2">
                        <div className="flex-1 h-px bg-border-primary" />
                        <span className="text-sm text-text-muted whitespace-nowrap">
                            또는
                        </span>
                        <div className="flex-1 h-px bg-border-primary" />
                    </div>

                    <Button size="md" variant="kakao" onClick={kakaoLogin}>
                        카카오로 로그인
                    </Button>

                    <p className="text-center mt-6 text-sm text-text-secondary">
                        계정이 없으신가요?
                        <Link to="/signup">
                            <span className="pl-2 text-text-secondary font-semibold underline">
                                회원가입
                            </span>
                        </Link>
                    </p>
                </div>
            </div>
        </CenteredPageLayout>
    );
};
