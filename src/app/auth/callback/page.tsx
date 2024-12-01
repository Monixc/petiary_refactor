"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { handleCallback } from "@/lib/auth/cognito";

export default function CallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");

    if (code) {
      handleCallback(code)
        .then(() => {
          router.push("/diary"); // 로그인 성공 후 리다이렉트
        })
        .catch((error) => {
          console.error("Callback handling failed:", error);
          router.push("/login");
        });
    }
  }, [router, searchParams]);

  return <div>로그인 처리중...</div>;
}
