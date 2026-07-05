export const getKoreaToday = (): string => {
    const today = new Date();
    const koreaToday = new Date(today.getTime() + 9 * 60 * 60 * 1000);
    return koreaToday.toISOString().split("T")[0];
};
