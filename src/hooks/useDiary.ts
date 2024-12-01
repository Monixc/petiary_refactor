import { useState, useEffect } from "react";
import { createDiary, getDiaries } from "@/lib/db/diary";

export function useDiary(dateParam: string | null) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [content, setContent] = useState<string>("");
  const [generatedDiary, setGeneratedDiary] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo && dateParam) {
      const { sub: userId } = JSON.parse(userInfo);
      loadDiary(userId, dateParam);
    }
  }, [dateParam]);

  const loadDiary = async (userId: string, date: string) => {
    try {
      const response = await getDiaries(userId);
      const diary = response.Items?.find((item) => item.date.startsWith(date));

      if (diary) {
        setImageUrl(diary.imageUrl || null);
        setContent(typeof diary.content === "string" ? diary.content : "");
        setGeneratedDiary(diary.generatedDiary || null);
        setGeneratedImage(diary.generatedImage || null);
      } else {
        setImageUrl(null);
        setContent("");
        setGeneratedDiary(null);
        setGeneratedImage(null);
      }
    } catch (error) {
      console.error("Failed to load diary:", error);
    }
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageUrl, text: content }),
      });

      if (!response.ok) throw new Error("일기 생성에 실패했습니다.");

      const data = await response.json();
      setGeneratedDiary(data.diary);
      setGeneratedImage(data.generatedImage);

      // DynamoDB에 저장
      const userInfo = localStorage.getItem("userInfo");
      if (userInfo && dateParam) {
        const { sub: userId } = JSON.parse(userInfo);
        await createDiary(userId, {
          content,
          imageUrl,
          generatedDiary: data.diary,
          generatedImage: data.generatedImage,
          date: dateParam,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      alert("일기 생성에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const handleImageUpload = (url: string) => {
    setImageUrl(url);
  };

  return {
    imageUrl,
    content,
    generatedDiary,
    generatedImage,
    isLoading,
    generateDiary,
    handleContentChange,
    handleImageUpload,
  };
}
