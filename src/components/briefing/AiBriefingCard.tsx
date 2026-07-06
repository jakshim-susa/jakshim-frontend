import analysisIcon from "../../assets/images/analysis-icons.png";

interface AiBriefingCardProps {
    title: string;
    content: string;
}

export const AiBriefingCard = ({ title, content }: AiBriefingCardProps) => {
    return (
        <div className="flex items-center justify-start p-4 gap-5 bg-bg-white border-1 border-border-primary rounded-lg overflow-hidden">
            <div className="shrink-0">
                <img
                    src={analysisIcon}
                    alt="로고 이미지"
                    className="w-16 h-16 md:w-25 md:h-25"
                />
            </div>
            <div>
                <p className="text-sm md:text-lg font-semibold text-text-primary">
                    {title}
                </p>
                <p className="text-sm md:text-lg text-text-primary pr-2">
                    {content}
                </p>
            </div>
        </div>
    );
};
