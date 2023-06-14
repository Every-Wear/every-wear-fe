export const changeWord = (text: string) => {
  if (text === "man") return "남성";
  return "여성";
};

export const formattingTime = (preferTime?: string | Date | null) => {
  if (!preferTime) return;
  const date = new Date(preferTime);
  if (Number.isNaN(date.valueOf())) return preferTime;
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const plusZero = (date: number) => {
    return String(date).padStart(2, "0");
  };

  return `${date.getFullYear()}. ${plusZero(mm)}. 
    ${plusZero(dd)}. (${week[date.getDay()]}) ${plusZero(hour)}:${plusZero(
    minutes,
  )}`;
};
