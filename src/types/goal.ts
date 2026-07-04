export interface Goal {
    goalId: string;
    title: string;
    startDate: string | null;
    endDate: string | null;
    isActive: boolean;
    createdAt: string;
}

export interface GoalListResponse {
    goals: Goal[];
}
