import api from "./index";

export const getGoals = async () => {
    const res = await api.get("/api/goals/me");
    return res.data;
};
