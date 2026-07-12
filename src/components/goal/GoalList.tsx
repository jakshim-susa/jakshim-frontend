import { Check, Trash2, X } from "lucide-react";
import type React from "react";
import { createRecord, deleteRecord, updateRecord } from "../../api/record";
import { useState } from "react";
import { FailReasonModal } from "./FailReasonModal";
import toast from "react-hot-toast";
import { deleteGoal, updateGoal } from "../../api/goal";

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
    const [isUpdating, setIsUpdating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(String(children));

    // 목표 수정
    const handleSave = async () => {
        try {
            await updateGoal(goalId, { title: editTitle });
            setIsEditing(false);
            onSuccess();
            toast.success("목표가 수정됐어요!");
        } catch (error) {
            toast.error("수정에 실패했어요.");
            console.error(error);
        }
    };

    // 목표 삭제
    const handleDeleteGoal = () => {
        toast(
            (t) => (
                <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium">
                        목표를 삭제하시겠어요?
                    </p>
                    <p className="text-xs text-gray-500">
                        관련 기록도 모두 삭제돼요.
                    </p>
                    <div className="flex gap-2  justify-center">
                        <button
                            className="px-3 py-1 text-xs bg-error text-white rounded-md cursor-pointer"
                            onClick={async () => {
                                toast.dismiss(t.id);
                                try {
                                    await deleteGoal(goalId);
                                    onSuccess();
                                    toast.success("목표가 삭제됐어요.");
                                } catch {
                                    toast.error("삭제에 실패했어요.");
                                }
                            }}
                        >
                            삭제
                        </button>
                        <button
                            className="px-3 py-1 text-xs bg-gray-200 rounded-md cursor-pointer"
                            onClick={() => toast.dismiss(t.id)}
                        >
                            취소
                        </button>
                    </div>
                </div>
            ),
            { duration: Infinity },
        );
    };

    const handleSuccess = async () => {
        try {
            setIsUpdating(true);
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
        } catch (error) {
            toast.error("기록에 실패했어요.");
            console.error(error);
        } finally {
            setIsUpdating(false);
            onSuccess();
        }
    };

    const handleFail = () => {
        if (recordId && status === "fail") {
            setIsUpdating(true);
            // 이미 실패면 모달 없이 바로 삭제
            deleteRecord(recordId)
                .then(() => {
                    toast("❌ 실패 체크가 해제됐어요.");
                })
                .catch(() => toast.error("오류가 발생했어요."))
                .finally(() => setIsUpdating(false));
            onSuccess();
            return;
        }
        setIsFailModalOpen(true);
    };

    const handleFailSubmit = async (reasonText: string) => {
        setIsFailModalOpen(false);
        setIsUpdating(true);
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
        } catch (error) {
            toast.error("기록에 실패했어요.");
            console.error(error);
        } finally {
            setIsUpdating(false);
            onSuccess();
        }
    };

    return (
        <>
            <li className="flex justify-between items-center mb-1 -mt-2 list-none">
                <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-text-muted/60 shrink-0" />

                    {isEditing ? (
                        <input
                            className="text-text-primary border-b border-primary focus:outline-none bg-transparent"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            onBlur={handleSave}
                            onKeyDown={(e) => e.key === "Enter" && handleSave()}
                            autoFocus
                        />
                    ) : (
                        <div
                            className="text-text-primary text-sm md:text-base font-medium cursor-pointer truncate"
                            onDoubleClick={() => setIsEditing(true)}
                        >
                            {children}
                        </div>
                    )}
                    <Trash2
                        className="w-4 h-4 text-text-muted cursor-pointer hover:text-error shrink-0 transition-colors ml-1"
                        onClick={handleDeleteGoal}
                    />
                </div>

                <div className="flex gap-3 shrink-0">
                    {isUpdating ? (
                        <div className="w-8 h-8 flex items-center justify-center">
                            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : (
                        <>
                            <Check
                                className={`w-8 h-8 p-1 rounded-sm border-1 cursor-pointer transition-colors
                ${status === "success" ? "bg-success text-white" : "text-success bg-white hover:bg-success hover:text-white"}`}
                                onClick={handleSuccess}
                            />
                            <X
                                className={`w-8 h-8 p-1 rounded-sm border-1 cursor-pointer transition-colors
                ${status === "fail" ? "bg-error text-white" : "text-error bg-white hover:bg-error hover:text-white"}`}
                                onClick={handleFail}
                            />
                        </>
                    )}
                </div>
            </li>
            <hr className="text-border-primary/50 mb-3" />

            {isFailModalOpen && (
                <FailReasonModal
                    onClose={() => setIsFailModalOpen(false)}
                    onSubmit={handleFailSubmit}
                />
            )}
        </>
    );
};
