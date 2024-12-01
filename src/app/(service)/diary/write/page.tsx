"use client";

import { Suspense } from "react";
import DiaryWriteContent from "./_components/DiaryWriteContent";

export default function DiaryWritePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DiaryWriteContent />
    </Suspense>
  );
}
