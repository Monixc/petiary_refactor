import { ImageUpload } from "@/components/ImageUpload";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

interface DiaryContentProps {
  content: string;
  imageUrl: string | null;
  onContentChange: (value: string) => void;
  onImageUpload: (url: string) => void;
}

export function DiaryContent({
  content,
  imageUrl,
  onContentChange,
  onImageUpload,
}: DiaryContentProps) {
  return (
    <div className="space-y-4">
      <Textarea
        placeholder="오늘 하루는 어땠나요?"
        className="min-h-[150px] resize-none p-4 text-base w-full"
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
      />
      <div className="border-2 border-dashed border-gray-200 rounded-lg p-4">
        {imageUrl ? (
          <div className="w-full h-auto max-h-[400px] relative">
            <Image
              src={imageUrl}
              alt="Uploaded"
              className="rounded-lg object-contain w-full h-full"
              width={0}
              height={0}
              sizes="100vw"
              style={{
                maxHeight: "400px",
                width: "auto",
                margin: "0 auto",
              }}
            />
          </div>
        ) : (
          <ImageUpload onUploadComplete={onImageUpload} />
        )}
      </div>
    </div>
  );
}
