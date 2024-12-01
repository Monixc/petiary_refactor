import { DiaryCalendar } from "@/components/DiaryCalendar";

export default function DiaryPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(90vh-120px)]">
      <DiaryCalendar />
    </div>
  );
}
