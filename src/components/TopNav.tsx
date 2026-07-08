"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";

export default function TopNav({ title }: { title: string }) {
  const [streak, setStreak] = useState(0);
  const [isPremium, setIsPremium] = useState(false);
  const [avatarInitials, setAvatarInitials] = useState("U");
  const supabase = createClient();

  useEffect(() => {
    async function loadUserData() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: profile } = await supabase
            .from("users")
            .select("full_name, is_premium")
            .eq("id", user.id)
            .single();

          if (profile) {
            setIsPremium(profile.is_premium || false);
            // Hardcoding streak for demo, could be fetched from DB
            setStreak(12);
            if (profile.full_name) {
              setAvatarInitials(profile.full_name.substring(0, 1).toUpperCase());
            }
          }
        }
      } catch (_err) {
        console.log("Supabase not configured yet, using default values");
      }
    }
    loadUserData();
  }, [supabase]);

  return (
    <div className="sticky top-0 w-full bg-[#0D120E]/95 backdrop-blur-md border-b border-gray-900 z-50">
      <div className="px-6 py-4 flex justify-between items-center max-w-2xl mx-auto">
        
        {/* Left: Profile & Logo */}
        <div className="flex items-center gap-3">
          <Link href="/settings" className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-800 border border-gray-700 hover:border-gray-500 transition-colors shadow-sm">
            <span className="font-bold text-gray-300 text-sm">{avatarInitials}</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="FITUIT Logo" width={28} height={28} className="drop-shadow-[0_0_8px_rgba(200,241,53,0.3)] object-contain" />
            <span className="text-lg font-black tracking-tighter uppercase bg-gradient-to-r from-white to-[#C8F135] bg-clip-text text-transparent italic hidden sm:inline-block">
              FITUIT
            </span>
          </div>
        </div>

        {/* Center: Title (Optional, keeping small for context) */}
        <h1 className="text-sm font-bold tracking-tight uppercase text-gray-400 absolute left-1/2 transform -translate-x-1/2 hidden md:block">{title}</h1>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* Streak */}
          <div className="flex items-center gap-1 bg-orange-500/10 px-3 py-1.5 rounded-full border border-orange-500/20">
            <span className="text-orange-500 text-sm">🔥</span>
            <span className="text-orange-400 font-bold text-sm">{streak}</span>
          </div>

          {/* Upsell Button (Only show if not premium) */}
          {!isPremium && (
            <Link 
              href="/paywall" 
              className="bg-[#C8F135] text-black px-3 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wide shadow-[0_0_15px_rgba(200,241,53,0.3)] hover:scale-105 transition-transform"
            >
              Get Elite
            </Link>
          )}
        </div>
        
      </div>
    </div>
  );
}
