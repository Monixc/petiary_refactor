"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LayoutGrid, Columns } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDateKorean } from "@/utils/date";
import { useDiary } from "@/hooks/useDiary";
import { ViewType } from "@/types/diary.types";
import { DiaryContent } from "@/app/(service)/diary/write/_components/DiaryContent";
import { PetDiaryContent } from "@/app/(service)/diary/write/_components/PetDiaryContent";
import { LoadingText } from "@/app/(service)/diary/write/_components/LoadingText";

export default function DiaryWritePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dateParam = searchParams.get("date");
  const date = dateParam ? new Date(dateParam) : new Date();

  const [isSwipeView, setIsSwipeView] = useState(false);
  const [activeView, setActiveView] = useState<ViewType>("human");

  const {
    content,
    imageUrl,
    generatedDiary,
    generatedImage,
    isLoading,
    handleImageUpload,
    handleContentChange,
    generateDiary,
  } = useDiary(dateParam);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* 헤더 영역 */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-medium text-gray-900">
          {formatDateKorean(new Date(date))}
        </h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSwipeView(!isSwipeView)}
          className="text-gray-500">
          {isSwipeView ? (
            <LayoutGrid className="h-5 w-5" />
          ) : (
            <Columns className="h-5 w-5" />
          )}
        </Button>
      </div>

      {isSwipeView ? (
        // 스와이프 뷰
        <div className="w-full">
          <div className="border-b mb-6">
            <div className="flex">
              <button
                onClick={() => setActiveView("human")}
                className={cn(
                  "flex-1 py-4 text-center",
                  activeView === "human"
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-500"
                )}>
                나의 일기
              </button>
              <button
                onClick={() => setActiveView("pet")}
                className={cn(
                  "flex-1 py-4 text-center",
                  activeView === "pet"
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-500"
                )}>
                반려동물의 일기
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden">
            <div
              className={cn(
                "flex transition-transform duration-300 ease-in-out",
                activeView === "pet" && "transform -translate-x-1/2"
              )}
              style={{ width: "200%" }}>
              <div className="w-1/2">
                <DiaryContent
                  content={content}
                  imageUrl={imageUrl}
                  onContentChange={handleContentChange}
                  onImageUpload={handleImageUpload}
                />
              </div>
              <div className="w-1/2">
                <PetDiaryContent
                  generatedDiary={generatedDiary}
                  generatedImage={generatedImage}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        // 기존 수직 뷰
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-medium mb-4">나의 일기</h3>
            <DiaryContent
              content={content}
              imageUrl={imageUrl}
              onContentChange={handleContentChange}
              onImageUpload={handleImageUpload}
            />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">반려동물의 일기</h3>
            <PetDiaryContent
              generatedDiary={generatedDiary}
              generatedImage={generatedImage}
            />
          </div>
        </div>
      )}

      {!generatedDiary ? (
        <Button
          onClick={generateDiary}
          className="w-full mt-6 py-6 text-lg bg-primary hover:bg-primary-hover text-white"
          disabled={isLoading || !imageUrl || !content}>
          {isLoading ? <LoadingText /> : "반려동물의 하루 생성하기"}
        </Button>
      ) : (
        <Button
          className="w-full mt-6 py-6 text-lg bg-white text-gray-400 cursor-not-allowed"
          disabled></Button>
      )}
    </div>
  );
}
