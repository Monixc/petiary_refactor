export function formatDateKorean(date: Date) {
  const weekDay = new Intl.DateTimeFormat("ko-KR", { weekday: "long" }).format(
    date
  );
  const formattedDate = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  return `${formattedDate} ${weekDay}`;
}
