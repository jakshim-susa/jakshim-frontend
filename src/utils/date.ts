export const getKoreaToday = (): string => {
    const today = new Date();
    const koreaToday = new Date(today.getTime() + 9 * 60 * 60 * 1000);
    return koreaToday.toISOString().split("T")[0];
};

export const getFormattedDate = (): string => {
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const now = new Date(Date.now() + 9 * 60 * 60 * 1000);
    const year = now.getUTCFullYear();
    const month = now.getUTCMonth() + 1;
    const day = now.getUTCDate();
    const dayOfWeek = days[now.getUTCDay()];
    return `${year}년 ${month}월 ${day}일 ${dayOfWeek}요일`;
};
