export interface Summary {
    totalSuccess: number;
    totalFail: number;
    currentStreak: number;
    maxStreak: number;
}

export interface WeeklyItem {
    dayOfWeek: number;
    day: string;
    failCount: number;
    totalCount: number;
    failRate: number;
}

export interface Weekly {
    weekly: WeeklyItem[];
    worstDay: string | null;
}

export interface ReasonItem {
    rank: number;
    reasonCategory: string;
    count: number;
    rate: number;
}

export interface Reasons {
    totalFail: number;
    reasons: ReasonItem[];
}
