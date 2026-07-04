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
