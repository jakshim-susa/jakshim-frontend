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
