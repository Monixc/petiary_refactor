import { DiaryEntry } from "@/types/diary.types";
import { useState, useEffect } from "react";
import { createDiary, getDiaryByDate } from "@/lib/db/diary";

export function useDiary(dateParam: string | null) {
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [generatedDiary, setGeneratedDiary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleImageUpload = (url: string) => {
    setImageUrl(url);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!e || !e.target) return;
    setContent(e.target.value);
  };

  const generateDiary = async () => {
    if (!imageUrl || !content || !userId || !dateParam) {
      alert("이미지와 내용을 모두 입력해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/diary/generate`, {
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

      await createDiary({
        userId,
        date: dateParam,
        content,
        imageUrl,
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

    const fetchDiary = async () => {
      if (!userId || !dateParam) return;

      try {
        const diary = await getDiaryByDate(userId, dateParam);
        if (diary) {
          setImageUrl(diary.imageUrl || null);
          setContent(diary.content || "");
          setGeneratedDiary(diary.generatedDiary || null);
          setGeneratedImage(diary.generatedImage || null);
        }
      } catch (error) {
        console.error("Failed to fetch diary:", error);
      }
    };

    fetchDiary();
  }, [dateParam, userId]);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      const { sub } = JSON.parse(userInfo);
      setUserId(sub);
    }
  }, []);

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
