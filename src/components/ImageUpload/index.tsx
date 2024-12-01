"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { uploadToS3 } from "@/lib/s3";

interface ImageUploadProps {
  onUploadComplete?: (url: string) => void;
}

export function ImageUpload({ onUploadComplete }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const imageUrl = await uploadToS3(file);
      onUploadComplete?.(imageUrl);
    } catch (error) {
      console.error("Upload error:", error);
      alert("업로드에 실패했습니다.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={uploading}
      />
      {uploading && <p>업로드 중...</p>}
    </div>
  );
}
