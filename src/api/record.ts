import api from "./index";

export const getAllRecords = async () => {
    const res = await api.get("/api/records");
    return res.data;
};

export const getRecordsByDate = async (recordDate: string) => {
    const res = await api.get(`/api/records/${recordDate}`);
    return res.data;
};

export const createRecord = async (data: {
    goalId: string;
    status: string;
    reasonText?: string;
}) => {
    const res = await api.post("/api/records", data);
    return res.data;
};

export const updateRecord = async (
    recordId: string,
    data: { status: string; reasonText?: string },
) => {
    const res = await api.put(`/api/records/${recordId}`, data);
    return res.data;
};

export const deleteRecord = async (recordId: string) => {
    const res = await api.delete(`/api/records/${recordId}`);
    return res.data;
};
