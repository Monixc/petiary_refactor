"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import TopBar from "@/components/TopNav";
import BottomNavigation from "@/components/BottomNav";

export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="mx-auto max-w-md min-h-screen bg-background shadow-[0_0_15px_rgba(0,0,0,0.1)] relative">
      <TopBar />
      <main className="pt-14 pb-16">{children}</main>
      <BottomNavigation />
    </div>
  );
}
