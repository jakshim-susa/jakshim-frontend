interface recordListProps {
    reason: string;
    category: string;
}

export const RecordList = ({ reason, category }: recordListProps) => {
    return (
        <>
            <div className="flex flex-wrap justify-between mb-4 items-center">
                <div className="flex items-center gap-8">
                    <p className="font-bold text-text-primary">06.08(월)</p>
                    <div className="text-text-primary">{reason}</div>
                </div>
                <div className="text-xs text-white text-center rounded-2xl bg-success px-4 py-1">
                    {category}
                </div>
            </div>
            <hr className="text-border-primary mb-4" />
        </>
    );
};
