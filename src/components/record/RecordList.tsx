interface recordListProps {
    date: string;
    goalTitle: string;
    status: string | null;
    reasonCategory: string | null;
}

export const RecordList = ({
    date,
    goalTitle,
    status,
    reasonCategory,
}: recordListProps) => {
    return (
        <>
            <div className="flex flex-wrap justify-between mb-4 items-center">
                <div className="flex items-center gap-8">
                    <p className="font-bold text-text-primary">{date}</p>
                    <div className="text-text-primary">{goalTitle}</div>
                    {reasonCategory && (
                        <span className="text-xs text-text-muted">
                            ({reasonCategory})
                        </span>
                    )}
                </div>
                <div
                    className={`text-xs text-white text-center rounded-2xl px-4 py-1 ${status === "success" ? "bg-success" : "bg-error"}`}
                >
                    {status === "success" ? "성공" : "실패"}
                </div>
            </div>
            <hr className="text-border-primary mb-4" />
        </>
    );
};
