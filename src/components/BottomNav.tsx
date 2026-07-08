"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  const tabs = [
    { name: "HOME", href: "/dashboard", icon: "🏠" },
    { name: "WORKOUT", href: "/calisthenics", icon: "💪" },
    { name: "NUTRITION", href: "/food", icon: "🥗" },
    { name: "PROGRESS", href: "/progress", icon: "📈" },
  ];

  return (
    <nav className="fixed bottom-0 w-full bg-[#0D120E]/95 backdrop-blur-md border-t border-gray-900 px-6 py-4 flex justify-between items-center max-w-md left-1/2 -translate-x-1/2 z-50">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link 
            key={tab.name} 
            href={tab.href} 
            className={`flex flex-col items-center transition-colors ${isActive ? "text-[#C8F135]" : "text-gray-500 hover:text-white"}`}
          >
            <span className="text-xl mb-1 filter drop-shadow-sm">{tab.icon}</span>
            <span className="text-[10px] font-bold tracking-wider">{tab.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
