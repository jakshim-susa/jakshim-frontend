import { Check, Dumbbell, X } from "lucide-react";
import type React from "react";
import { createRecord, deleteRecord, updateRecord } from "../../api/record";
import { useState } from "react";
import { FailReasonModal } from "./FailReasonModal";

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
            } else if (recordId) {
                // 기록이 있으면 수정
                await updateRecord(recordId, { status: "success" });
            } else {
                // 기록 없으면 생성
                await createRecord({ goalId, status: "success" });
            }
            onSuccess();
        } catch (error) {
            console.error(error);
        }
    };

    const handleFail = () => {
        if (recordId && status === "fail") {
            // 이미 실패면 모달 없이 바로 삭제
            deleteRecord(recordId).then(() => onSuccess());
            return;
        }
        setIsFailModalOpen(true);
    };

    const handleFailSubmit = async (reasonText: string) => {
        try {
            if (recordId) {
                // 기록 있으면 수정
                await updateRecord(recordId, { status: "fail", reasonText });
            } else {
                // 기록 없으면 생성
                await createRecord({ goalId, status: "fail", reasonText });
            }
            onSuccess();
            setIsFailModalOpen(false);
        } catch (error) {
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
