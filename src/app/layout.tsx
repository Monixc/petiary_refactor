import type { Metadata } from "next";

import "./globals.css";
import TopBar from "@/components/TopNav";
import BottomNavigation from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "Petiary",
  description: "Pet Diary Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className="mx-auto max-w-md min-h-screen bg-background shadow-[0_0_15px_rgba(0,0,0,0.1)] relative">
          <TopBar />
          <main className="pt-14 pb-16">{children}</main>
          <BottomNavigation />
        </div>
      </body>
    </html>
  );
}
