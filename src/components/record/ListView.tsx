import type { DailyRecordItemProps } from "../../types/record";

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
                        <li key={i} className="flex items-center gap-2 mb-1">
                            <span
                                className={`inline-block w-3 h-3 rounded-full ${
                                    task.status === "success"
                                        ? "bg-success"
                                        : task.status === "fail"
                                          ? "bg-error"
                                          : "bg-gray-300"
                                }`}
                            />
                            <span className="text-text-primary">
                                {task.goalTitle}
                            </span>
                            {task.status === null && (
                                <span className="text-xs text-text-muted">
                                    미기록
                                </span>
                            )}
                            {task.status === "fail" && task.reasonCategory && (
                                <span className="text-xs text-text-muted">
                                    ({task.reasonCategory})
                                </span>
                            )}
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

export const ListView = ({ items }: DailyRecordListProps) => {
    return (
        <div className="divide-y divide-border-primary border-t border-b border-border-primary">
            {items.length === 0 ? (
                <p className="text-text-muted text-sm py-4">기록이 없어요.</p>
            ) : (
                items.map((item, i) => <DailyRecordItem key={i} {...item} />)
            )}
        </div>
    );
};
