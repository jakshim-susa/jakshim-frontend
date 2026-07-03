import analysisIcon from "../../assets/images/analysis-icons.png";

interface AiBriefingCardProps {
    title: string;
    content: string;
}

export const AiBriefingCard = ({ title, content }: AiBriefingCardProps) => {
    return (
        <div className="flex items-center justify-start p-4 gap-5 bg-white border-1 border-border-primary rounded-lg">
            <div>
                <img
                    src={analysisIcon}
                    alt="로고 이미지"
                    className="w-25 h-25"
                />
            </div>
            <div>
                <p className="text-lg font-semibold text-text-primary">
                    {title}
                </p>
                <p className="text-lg text-text-primary">{content}</p>
            </div>
        </div>
    );
};
