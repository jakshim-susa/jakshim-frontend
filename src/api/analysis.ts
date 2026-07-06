import api from "./index";

export const getSummary = async () => {
    const res = await api.get("/api/analysis/summary");
    return res.data;
};

export const getWeekly = async () => {
    const res = await api.get("/api/analysis/weekly");
    return res.data;
};

export const getReasons = async () => {
    const res = await api.get("/api/analysis/reasons");
    return res.data;
};

export const getBriefing = async () => {
    const res = await api.get("/api/analysis/briefing");
    return res.data;
};

export const getInsight = async () => {
    const res = await api.post("/api/analysis/insight");
    return res.data;
};
