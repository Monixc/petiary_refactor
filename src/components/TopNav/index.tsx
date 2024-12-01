"use client";

import { X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function TopBar() {
  const pathname = usePathname();
  const router = useRouter();
  const isWritePage = pathname.includes("/diary/write");

  if (pathname.includes("/login")) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 max-w-md mx-auto h-14 bg-white border-b flex items-center justify-between px-4 z-50">
      <div className="flex-1">
        {!isWritePage && <h1 className="text-lg logo">Petiary</h1>}
      </div>
      <div>
        {isWritePage && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/diary")}
            className="text-gray-500">
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>
    </header>
  );
}
