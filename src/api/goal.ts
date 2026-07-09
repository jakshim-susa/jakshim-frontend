import type { GoalCreateRequest } from "../types/goal";
import api from "./index";

export const getGoals = async () => {
    const res = await api.get("/api/goals/me");
    return res.data;
};

export const createGoal = async (data: GoalCreateRequest) => {
    const res = await api.post("/api/goals", data);
    return res.data;
};

export const updateGoal = async (
    goalId: string,
    data: { title: string; startDate?: string; endDate?: string },
) => {
    const res = await api.put(`/api/goals/${goalId}`, data);
    return res.data;
};

export const deleteGoal = async (goalId: string) => {
    const res = await api.delete(`/api/goals/${goalId}`);
    return res.data;
};
