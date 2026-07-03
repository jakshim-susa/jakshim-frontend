interface DailyRecordItemProps {
    date: string;
    dayLabel: string;
    tasks: string[];
}

const DailyRecordItem = ({ date, dayLabel, tasks }: DailyRecordItemProps) => {
    return (
        <div className="flex items-stretch gap-4 border-border-primary py-4">
            <div className="border-l -my-4 border-border-primary" />
            <div className="flex flex-col justify-center items-center w-16">
                <div className="text-lg font-bold text-text-primary">
                    {date}
                </div>
                <p className="text-sm text-text-secondary">{dayLabel}</p>
            </div>
            <div className="border-l -my-4 border-border-primary" />
            <div>
                <ul>
                    {tasks.map((task, i) => (
                        <li key={i}>
                            <span className="inline-block bg-success w-3 h-3 rounded-full mr-2.5" />
                            {task}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="border-l border-border-primary -my-4 ml-auto" />
        </div>
    );
};

interface DailyRecordListProps {
    items: DailyRecordItemProps[];
}

export const DailyRecordList = ({ items }: DailyRecordListProps) => {
    return (
        <div className="divide-y divide-border-primary border-t border-b border-border-primary">
            {items.map((item, i) => (
                <DailyRecordItem key={i} {...item} />
            ))}
        </div>
    );
};
