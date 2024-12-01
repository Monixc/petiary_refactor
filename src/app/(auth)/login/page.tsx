"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold mb-4">Petiary</h1>

        <div className="relative w-48 h-48">
          <img
            src="/logo.png"
            alt="Petiary Logo"
            className="object-contain w-full h-full"
          />
        </div>

        <Button
          variant="outline"
          className="w-full max-w-xs flex items-center justify-center gap-2 mt-8"
          onClick={() => router.push("/diary")}>
          <img src="/google-logo.svg" alt="Google" className="w-5 h-5" />
          Google로 계속하기
        </Button>
      </div>
    </div>
  );
}
