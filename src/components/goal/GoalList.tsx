import { Check, Dumbbell, X } from "lucide-react";
import type React from "react";
import { createRecord, deleteRecord, updateRecord } from "../../api/record";
import { useState } from "react";
import { FailReasonModal } from "./FailReasonModal";
import toast from "react-hot-toast";

interface GoalListProps {
    children: React.ReactNode;
    goalId: string;
    recordId: string | null;
    status: string | null; // 오늘 기록 여부
    onSuccess: () => void; // 기록 후 목표 목록 갱신
}

export const GoalList = ({
    children,
    goalId,
    recordId,
    status,
    onSuccess,
}: GoalListProps) => {
    const [isFailModalOpen, setIsFailModalOpen] = useState(false);

    const handleSuccess = async () => {
        try {
            if (recordId && status === "success") {
                // 이미 성공인데 또 누르면 -> 삭제
                await deleteRecord(recordId);
                toast("✅ 성공 체크가 해제됐어요.");
            } else if (recordId) {
                // 기록이 있으면 수정
                await updateRecord(recordId, { status: "success" });
                toast.success("성공으로 수정됐어요!");
            } else {
                // 기록 없으면 생성
                await createRecord({ goalId, status: "success" });
                toast.success("성공으로 기록됐어요!");
            }
            onSuccess();
        } catch (error) {
            toast.error("기록에 실패했어요.");
            console.error(error);
        }
    };

    const handleFail = () => {
        if (recordId && status === "fail") {
            // 이미 실패면 모달 없이 바로 삭제
            deleteRecord(recordId)
                .then(() => {
                    onSuccess();
                    toast("❌ 실패 체크가 해제됐어요.");
                })
                .catch(() => toast.error("오류가 발생했어요."));
            return;
        }
        setIsFailModalOpen(true);
    };

    const handleFailSubmit = async (reasonText: string) => {
        setIsFailModalOpen(false);

        try {
            if (recordId) {
                // 기록 있으면 수정
                await updateRecord(recordId, { status: "fail", reasonText });
                toast("실패로 수정됐어요.", { icon: "❌" });
            } else {
                // 기록 없으면 생성
                await createRecord({ goalId, status: "fail", reasonText });
                toast("실패로 기록됐어요.", { icon: "❌" });
            }
            onSuccess();
        } catch (error) {
            toast.error("기록에 실패했어요.");
            console.error(error);
        }
    };

    return (
        <>
            <div className="flex justify-between mb-4">
                <div className="flex items-center gap-8">
                    <Dumbbell className="w-5 h-5 text-text-primary" />
                    <div className="text-text-primary">{children}</div>
                </div>
                <div className="flex gap-3">
                    <Check
                        className={`w-8 h-8 p-1 rounded-sm border-1 cursor-pointer
                            ${
                                status === "success"
                                    ? "bg-success text-white"
                                    : "text-success bg-white hover:bg-success hover:text-white"
                            } `}
                        onClick={handleSuccess}
                    />
                    <X
                        className={`w-8 h-8 p-1 rounded-sm border-1 cursor-pointer
                            ${
                                status === "fail"
                                    ? "bg-error text-white"
                                    : "text-error bg-white hover:bg-error hover:text-white"
                            }`}
                        onClick={handleFail}
                    />
                </div>
            </div>
            <hr className="text-border-primary mb-4" />

            {isFailModalOpen && (
                <FailReasonModal
                    onClose={() => setIsFailModalOpen(false)}
                    onSubmit={handleFailSubmit}
                />
            )}
        </>
    );
};
