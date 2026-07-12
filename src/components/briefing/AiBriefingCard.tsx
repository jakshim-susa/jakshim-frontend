import analysisIcon from "../../assets/images/analysis-icons.png";
import { useTypingEffect } from "../../hooks/useTypingEffect";

interface AiBriefingCardProps {
    title: string;
    content: string;
}

export const AiBriefingCard = ({ title, content }: AiBriefingCardProps) => {
    const { displayText, isTyping } = useTypingEffect(content);

    return (
        <div
            className="flex items-center justify-start p-4 gap-5 bg-bg-white border-1 border-border-primary rounded-lg
            [box-shadow:var(--shadow-sm)] hover:[box-shadow:var(--shadow-md)] hover:-translate-y-1 transition-all duration-200"
        >
            <div className="shrink-0">
                <img
                    src={analysisIcon}
                    alt="로고 이미지"
                    className="w-16 h-16 md:w-25 md:h-25"
                />
            </div>
            <div className="min-w-0">
                <p className="text-sm md:text-lg font-semibold text-text-primary">
                    {title}
                </p>
                <p className="text-sm md:text-lg text-text-primary">
                    {displayText}
                    {isTyping && (
                        <span className="animate-pulse">|</span> // ← 커서 깜빡임
                    )}
                </p>
            </div>
        </div>
    );
};
