"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, BookOpen, User } from "lucide-react";
import { useMemo } from "react";

export default function BottomNavigation() {
  const pathname = usePathname();

  const navItems = useMemo(
    () => [
      { href: "/diary", label: "일기", icon: BookOpen },
      { href: "/community", label: "커뮤니티", icon: Calendar },
      { href: "/profile", label: "프로필", icon: User },
    ],
    []
  );

  if (pathname.includes("/login") || pathname.includes("/diary/write")) {
    return null;
  }

  const isActive = (href: string) => {
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t flex items-center justify-around py-2 px-4 z-50">
      {navItems.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className="flex flex-col items-center gap-1 py-1 px-3">
          <Icon
            className={isActive(href) ? "text-primary" : "text-gray-400"}
            size={20}
          />
          <span className={isActive(href) ? "text-primary" : "text-gray-400"}>
            {label}
          </span>
        </Link>
      ))}
    </nav>
  );
}
