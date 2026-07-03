import { useState } from "react";
import { Input } from "../components/common/Input";
import { Button } from "../components/common/Button";
import { Link } from "react-router-dom";
import { CenteredPageLayout } from "../components/layout/CenteredPageLayout";

export const SignupPage = () => {
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <CenteredPageLayout>
            <div className="text-text-primary text-center mb-8">
                <h1 className="text-3xl font-bold mb-1">시작해 볼까요?</h1>
            </div>

            <div className="flex flex-col gap-2 w-full max-w-lg">
                <div className="flex gap-6">
                    <Input
                        label="닉네임"
                        type="text"
                        size="lg"
                        value={nickname}
                        onChange={setNickname}
                        placeholder="닉네임을 입력하세요"
                    />
                    <Input
                        label="이메일"
                        type="email"
                        size="lg"
                        value={email}
                        onChange={setEmail}
                        placeholder="이메일을 입력하세요"
                    />
                </div>
                <div className="flex gap-6">
                    <Input
                        label="비밀번호"
                        type="password"
                        size="lg"
                        value={password}
                        onChange={setPassword}
                        placeholder="비밀번호를 입력하세요"
                    />
                    <Input
                        label="비밀번호"
                        type="password"
                        size="lg"
                        value={password}
                        onChange={setPassword}
                        placeholder="비밀번호를 입력하세요"
                    />
                </div>
                <Button size="md" variant="primary">
                    가입하고 시작하기
                </Button>

                <div className="flex items-center gap-4 w-full my-2">
                    <div className="flex-1 h-px bg-border-primary" />
                    <span className="text-sm text-text-muted whitespace-nowrap">
                        또는
                    </span>
                    <div className="flex-1 h-px bg-border-primary" />
                </div>

                <Button size="md" variant="kakao">
                    카카오로 로그인
                </Button>

                <p className="text-center mt-6 text-sm text-text-secondary">
                    이미 계정이 있으신가요?
                    <Link to="/login">
                        <span className="pl-2 text-text-secondary font-semibold underline">
                            로그인
                        </span>
                    </Link>
                </p>
            </div>
        </CenteredPageLayout>
    );
};
