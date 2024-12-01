export interface DiaryEntry {
  userId: string;
  date: string;
  imageUrl?: string;
  content?: string;
  generatedDiary?: string;
  generatedImage?: string;
}

export type ViewType = "human" | "pet";
