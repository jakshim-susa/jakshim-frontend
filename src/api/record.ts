import api from "./index";

export const getAllRecords = async () => {
    const res = await api.get("/api/records");
    return res.data;
};

export const getRecordsByDate = async (recordDate: string) => {
    const res = await api.get(`/api/records/${recordDate}`);
    return res.data;
};
