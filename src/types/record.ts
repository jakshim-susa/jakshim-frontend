export interface RecordListGoal {
    goalId: string;
    recordId: string | null;
    goal: string;
    status: string | null;
    reasonCategory: string | null;
}

export interface RecordListDay {
    date: string;
    diary: string | null;
    goals: RecordListGoal[];
}

export interface RecordAllListResponse {
    records: RecordListDay[];
}
