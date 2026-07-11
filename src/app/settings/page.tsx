"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "../login/actions";
import { createClient } from "@/utils/supabase/client";
import { useDictionary } from "@/i18n/LanguageProvider";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Settings() {
  const router = useRouter();
  const dict = useDictionary();
  const [whatsapp, setWhatsapp] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [referralCode, setReferralCode] = useState("");
  const [referralsCount, setReferralsCount] = useState(0);
  const [isPremium, setIsPremium] = useState(false);
  
  useEffect(() => {
    async function loadData() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("users")
          .select("referral_code, referrals_count, is_premium, subscription_expires_at")
          .eq("id", user.id)
          .single();
        if (profile) {
          setReferralCode(profile.referral_code || "");
          setReferralsCount(profile.referrals_count || 0);
          
          let hasPremium = profile.is_premium || false;
          if (hasPremium && profile.subscription_expires_at) {
            const expiresAt = new Date(profile.subscription_expires_at);
            if (expiresAt < new Date()) {
              hasPremium = false;
            }
          }
          setIsPremium(hasPremium);
        }
      }
    }
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans pb-20">
      <header className="px-6 py-6 border-b border-gray-900 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="text-gray-400 hover:text-white">←</button>
          <h1 className="text-2xl font-bold tracking-tighter">{dict.nav.settings}</h1>
        </div>
        <LanguageSwitcher />
      </header>

      <main className="flex-1 px-6 py-8 flex flex-col gap-8 max-w-xl mx-auto w-full">
        
        <section>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Account & Subscription</h2>
          <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="font-bold">{isPremium ? "FITUIT Elite" : "FITUIT Core"}</p>
                <p className="text-sm text-gray-400">{isPremium ? "Active" : "Free Tier"}</p>
              </div>
              {isPremium && <span className="bg-white text-black text-xs font-bold px-2 py-1 rounded">PRO</span>}
            </div>
            {!isPremium && (
              <Link href="/paywall" className="block w-full py-3 bg-[#C8F135] text-black text-center transition-colors rounded-xl font-bold text-sm">
                Upgrade to Elite
              </Link>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">{dict.settings.referral_engine}</h2>
          <div className="bg-gray-900 rounded-2xl p-5 border border-[#C8F135]/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C8F135]/10 rounded-full blur-3xl"></div>
            <p className="font-bold mb-1 relative z-10">Get 1 Month Free 🎁</p>
            <p className="text-sm text-gray-400 mb-4 relative z-10">
              {dict.settings.referral_desc}
            </p>
            
            <div className="flex gap-2 items-center mb-4 relative z-10">
              <div className="bg-black border border-gray-700 px-4 py-3 rounded-xl flex-1 text-center font-mono text-[#C8F135] font-bold tracking-widest">
                {referralCode || "LOADING..."}
              </div>
              <button 
                onClick={() => navigator.clipboard.writeText(referralCode)}
                className="bg-gray-800 hover:bg-gray-700 p-3 rounded-xl transition-colors border border-gray-700"
              >
                📋
              </button>
            </div>

            <div className="relative z-10">
              <div className="flex justify-between text-xs font-bold text-gray-400 mb-2">
                <span>{referralsCount} / 3 Friends Joined</span>
                <span>{Math.max(0, 3 - referralsCount)} left</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-[#C8F135] h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min(100, (referralsCount / 3) * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Daily Follow-up</h2>
          <div className="bg-gray-900 rounded-2xl border border-gray-800 divide-y divide-gray-800">
            <div className="p-5 flex justify-between items-center">
              <div>
                <p className="font-bold">Push Notifications</p>
                <p className="text-sm text-gray-400">Evening recovery reminders</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={notifications} 
                  onChange={() => setNotifications(!notifications)} 
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white peer-checked:after:bg-black"></div>
              </label>
            </div>
            
            <div className="p-5">
              <p className="font-bold mb-1">WhatsApp Motivation</p>
              <p className="text-sm text-gray-400 mb-4">Receive a short text from Coach AI before your session.</p>
              <input 
                type="tel" 
                placeholder="+91 98765 43210"
                className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
              />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Legal</h2>
          <div className="bg-gray-900 rounded-2xl border border-gray-800 divide-y divide-gray-800">
            {[
              { label: 'Terms & Conditions', path: '/legal/terms' },
              { label: 'Privacy Policy', path: '/legal/privacy' },
              { label: 'Medical Disclaimer', path: '/legal/medical-disclaimer' },
              { label: 'Refund Policy', path: '/legal/refund' },
              { label: 'Cookie Policy', path: '/legal/cookies' }
            ].map((item) => (
              <Link key={item.path} href={item.path} className="flex justify-between items-center p-4 hover:bg-gray-800 transition-colors">
                <span className="font-medium">{item.label}</span>
                <span className="text-gray-500">→</span>
              </Link>
            ))}
          </div>
        </section>

        <form action={logout}>
          <button className="w-full text-red-500 font-bold py-4 text-center hover:bg-red-500/10 rounded-xl transition-colors">
            {dict.settings.logout}
          </button>
        </form>

      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 w-full bg-black/90 backdrop-blur-md border-t border-gray-900 px-6 py-4 flex justify-between items-center max-w-md left-1/2 -translate-x-1/2 z-50">
        <Link href="/dashboard" className="text-gray-500 hover:text-white font-bold flex flex-col items-center transition-colors">
          <span className="text-xl mb-1">🏠</span>
          <span className="text-[10px] uppercase tracking-wider">{dict.nav.home}</span>
        </Link>
        <Link href="/progress" className="text-gray-500 hover:text-white font-bold flex flex-col items-center transition-colors">
          <span className="text-xl mb-1">📈</span>
          <span className="text-[10px] uppercase tracking-wider">{dict.nav.progress}</span>
        </Link>
        <Link href="/diet" className="text-gray-500 hover:text-white font-bold flex flex-col items-center transition-colors">
          <span className="text-xl mb-1">🥗</span>
          <span className="text-[10px] uppercase tracking-wider">{dict.nav.food}</span>
        </Link>
        <Link href="/settings" className="text-[#C8F135] font-bold flex flex-col items-center">
          <span className="text-xl mb-1">⚙️</span>
          <span className="text-[10px] uppercase tracking-wider">{dict.nav.settings}</span>
        </Link>
      </nav>
    </div>
  );
}
