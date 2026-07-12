import { useState } from "react";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { createPortal } from "react-dom";

interface FailReasonModalProps {
    onClose: () => void;
    onSubmit: (reasonText: string) => void;
}

export const FailReasonModal = ({
    onClose,
    onSubmit,
}: FailReasonModalProps) => {
    const [reasonText, setReasonText] = useState("");

    return createPortal(
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-[#FAF6F0] dark:bg-[#2A2521] rounded-xl p-6 w-full max-w-md flex flex-col gap-4">
                <h2 className="text-xl font-bold text-text-primary">
                    실패 이유
                </h2>
                <Input
                    label="실패 이유를 입력해주세요"
                    type="text"
                    size="lg"
                    value={reasonText}
                    onChange={setReasonText}
                    placeholder="오늘 실패한 이유를 적어주세요"
                />
                <div className="flex gap-2 justify-end">
                    <Button variant="outline" size="md" onClick={onClose}>
                        취소
                    </Button>
                    <Button
                        variant="primary"
                        size="md"
                        onClick={() => onSubmit(reasonText)}
                        disabled={!reasonText}
                    >
                        확인
                    </Button>
                </div>
            </div>
        </div>,
        document.body,
    );
};
