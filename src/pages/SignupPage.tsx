import { useState } from "react";
import { Input } from "../components/common/Input";
import { Button } from "../components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import { CenteredPageLayout } from "../components/layout/CenteredPageLayout";
import { kakaoLogin } from "../utils/kakao";
import toast from "react-hot-toast";
import { signup } from "../api/auth";

export const SignupPage = () => {
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const navigate = useNavigate();

    const handleSignup = async () => {
        if (password !== passwordConfirm) {
            toast.error("비밀번호가 일치하지 않아요.");
            return;
        }

        // 이메일 형식 체크
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("이메일 형식이 올바르지 않아요.");
            return;
        }

        // 비밀번호 길이 체크
        if (password.length < 8) {
            toast.error("비밀번호는 8자 이상 입력해주세요.");
            return;
        }

        try {
            await signup({ email, password, nickname });
            toast.success("회원가입이 완료되었어요!");
            navigate("/login");
        } catch (error) {
            const err = error as { response?: { data?: { detail?: string } } };
            const message =
                err.response?.data?.detail || "회원가입에 실패했어요.";
            toast.error(message);
            console.error(error);
        }
    };

    return (
        <CenteredPageLayout>
            <div className="animate-fade-in w-full flex flex-col items-center">
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
                            label="비밀번호 확인"
                            type="password"
                            size="lg"
                            value={passwordConfirm}
                            onChange={setPasswordConfirm}
                            placeholder="비밀번호를 입력하세요"
                        />
                    </div>
                    <Button size="md" variant="primary" onClick={handleSignup}>
                        가입하고 시작하기
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
                        이미 계정이 있으신가요?
                        <Link to="/login">
                            <span className="pl-2 text-text-secondary font-semibold underline">
                                로그인
                            </span>
                        </Link>
                    </p>
                </div>
            </div>
        </CenteredPageLayout>
    );
};
