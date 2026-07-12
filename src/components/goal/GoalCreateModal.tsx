import { useState } from "react";
import { createPortal } from "react-dom";
import type { GoalCreateRequest } from "../../types/goal";
import { createGoal } from "../../api/goal";
import { Button } from "../common/Button";
import { Input } from "../common/Input";

interface GoalCreateModalProps {
    onClose: () => void;
    onSuccess: () => void;
}

export const GoalCreateModal = ({
    onClose,
    onSuccess,
}: GoalCreateModalProps) => {
    const [title, setTitle] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!title) return;

        try {
            setLoading(true);
            const data: GoalCreateRequest = {
                title,
                startDate: startDate || undefined,
                endDate: endDate || undefined,
            };
            await createGoal(data);
            onSuccess();
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return createPortal(
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] px-4 animate-fade-in">
            <div className="bg-[#FAF6F0] dark:bg-[#2A2521] rounded-xl p-6 w-full max-w-md flex flex-col gap-4 max-h-[90vh] overflow-y-auto shadow-2xl border border-border-primary/20">
                <h2 className="text-xl font-bold text-text-primary flex items-center gap-1.5">
                    🔎 새로운 목표 등록
                </h2>

                <Input
                    label="목표 이름"
                    type="text"
                    size="lg"
                    value={title}
                    onChange={setTitle}
                    placeholder="수사망에 올릴 목표를 입력하세요"
                />
                <Input
                    label="시작일"
                    type="date"
                    size="lg"
                    value={startDate}
                    onChange={setStartDate}
                />
                <Input
                    label="종료일"
                    type="date"
                    size="lg"
                    value={endDate}
                    onChange={setEndDate}
                />

                <div className="flex gap-2 justify-end mt-2">
                    <Button variant="outline" size="md" onClick={onClose}>
                        취소
                    </Button>
                    <Button
                        variant="primary"
                        size="md"
                        onClick={handleSubmit}
                        disabled={!title || loading}
                    >
                        {loading ? "등록 중..." : "등록"}
                    </Button>
                </div>
            </div>
        </div>,
        document.body,
    );
};
