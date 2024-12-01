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
      <body>{children}</body>
    </html>
  );
}
