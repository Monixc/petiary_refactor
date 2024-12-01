import { DiaryEntry } from "@/types/diary.types";
import { useState, useEffect } from "react";

export function useDiary(dateParam: string | null) {
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [generatedDiary, setGeneratedDiary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const updateDiaryEntry = (updates: Partial<DiaryEntry>) => {
    if (!dateParam) return;

    const entries = JSON.parse(localStorage.getItem("diaryEntries") || "[]");
    const existingEntryIndex = entries.findIndex(
      (entry: DiaryEntry) => entry.date === dateParam
    );

    if (existingEntryIndex >= 0) {
      entries[existingEntryIndex] = {
        ...entries[existingEntryIndex],
        ...updates,
      };
    } else {
      entries.push({
        date: dateParam,
        ...updates,
      });
    }

    localStorage.setItem("diaryEntries", JSON.stringify(entries));
  };

  const handleImageUpload = (url: string) => {
    setImageUrl(url);
    updateDiaryEntry({ imageUrl: url });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    updateDiaryEntry({ content: newContent });
  };

  const generateDiary = async () => {
    if (!imageUrl || !content) {
      alert("이미지와 내용을 모두 입력해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/generate-diary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: imageUrl,
          text: content,
        }),
      });

      if (!response.ok) throw new Error("일기 생성에 실패했습니다.");

      const data = await response.json();
      setGeneratedDiary(data.diary);
      setGeneratedImage(data.generatedImage);

      updateDiaryEntry({
        generatedDiary: data.diary,
        generatedImage: data.generatedImage,
      });
    } catch (error) {
      console.error("Error:", error);
      alert("일기 생성에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!dateParam) return;

    const entries = JSON.parse(localStorage.getItem("diaryEntries") || "[]");
    const existingEntry = entries.find(
      (entry: DiaryEntry) => entry.date === dateParam
    );

    if (existingEntry) {
      setImageUrl(existingEntry.imageUrl || null);
      setContent(existingEntry.content || "");
      setGeneratedDiary(existingEntry.generatedDiary || null);
      setGeneratedImage(existingEntry.generatedImage || null);
    }
  }, [dateParam]);

  return {
    content,
    imageUrl,
    generatedDiary,
    generatedImage,
    isLoading,
    handleImageUpload,
    handleContentChange,
    generateDiary,
  };
}
