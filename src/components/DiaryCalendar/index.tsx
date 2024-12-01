"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getDiaries } from "@/lib/db/diary";
import { DiaryEntry } from "@/types/diary.types";

function formatYYYYMMDD(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("ko-KR", {
    month: "long",
  }).format(date);
}

function formatDay(date: Date) {
  return date.getDate().toString();
}

// 요일 표시를 위한 함수 추가
const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

export function DiaryCalendar() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      const { sub } = JSON.parse(userInfo);
      setUserId(sub);
      fetchDiaries(sub);
    }
  }, [currentMonth]);

  const fetchDiaries = async (userId: string) => {
    try {
      const response = await getDiaries(userId);
      if (response.Items) {
        setDiaryEntries(response.Items as DiaryEntry[]);
      }
    } catch (error) {
      console.error("Failed to fetch diaries:", error);
    }
  };

  // 월의 첫날과 마지막날 계산
  const firstDay = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  );
  const lastDay = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  );

  // 달력에 표시할 날짜들 생성
  const days = Array.from(
    { length: lastDay.getDate() },
    (_, i) =>
      new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1)
  );

  // 이미지 URL을 저장하는 함수
  const saveDiaryEntry = (date: string, imageUrl: string) => {
    setDiaryEntries((prev) => {
      const existing = prev.find((entry) => entry.date === date);
      if (existing) {
        return prev.map((entry) =>
          entry.date === date ? { ...entry, imageUrl } : entry
        );
      }
      return [...prev, { userId: userId!, date, imageUrl }];
    });
  };

  // 달력 날짜 클릭 시 처리
  const handleDateClick = (formattedDate: string) => {
    router.push(`/diary/write?date=${formattedDate}`);
  };

  return (
    <div className="w-full px-8 py-4">
      <div className="flex flex-col items-center mb-8">
        <div className="text-sm text-gray-500 mb-1">
          {currentMonth.getFullYear()}
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={() =>
              setCurrentMonth(
                new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth() - 1
                )
              )
            }
            className="p-2">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h2 className="text-xl font-medium min-w-[80px] text-center">
            {formatDate(currentMonth)}
          </h2>
          <button
            onClick={() =>
              setCurrentMonth(
                new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth() + 1
                )
              )
            }
            className="p-2">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* 요일 헤더 추가 */}
      <div className="grid grid-cols-7 gap-3 mb-3">
        {WEEKDAYS.map((day) => (
          <div key={day} className="text-center text-sm text-gray-500">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-3">
        {Array.from({ length: firstDay.getDay() }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}

        {days.map((day) => {
          const formattedDate = formatYYYYMMDD(day);
          const entry = diaryEntries.find((e) => e.date === formattedDate);

          return (
            <button
              key={day.toString()}
              onClick={() => handleDateClick(formattedDate)}
              className="relative aspect-square group">
              <div className="relative w-full h-full">
                {entry?.imageUrl ? (
                  <div className="absolute inset-0 rounded-full overflow-hidden">
                    <Image
                      src={entry.imageUrl}
                      alt={`Diary entry for ${formattedDate}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="absolute inset-0 rounded-full bg-gray-200 transition-transform group-hover:scale-105" />
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm text-gray-700 group-hover:font-medium z-10">
                    {formatDay(day)}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
