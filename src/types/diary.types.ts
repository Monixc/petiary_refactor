export interface DiaryEntry {
  date: string;
  imageUrl?: string;
  content?: string;
  generatedDiary?: string;
  generatedImage?: string;
}

export type ViewType = "human" | "pet";
