import { Suspense } from "react";
import CallbackContent from "./_components/CallbackContent";

export default function CallbackPage() {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <CallbackContent />
    </Suspense>
  );
}
