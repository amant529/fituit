import Link from "next/link";
import Image from "next/image";
import { getServerDictionary } from "@/i18n/server";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Home() {
  const dict = getServerDictionary();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans">
      <header className="px-6 py-6 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="FITUIT Logo" width={48} height={48} className="drop-shadow-[0_0_15px_rgba(200,241,53,0.3)] object-contain" />
          <span className="text-2xl font-black tracking-tighter uppercase bg-gradient-to-r from-white to-[#C8F135] bg-clip-text text-transparent italic">
            FITUIT
          </span>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Link href="/onboarding" className="text-sm font-bold bg-white text-black px-5 py-2.5 rounded-full hover:bg-gray-200 transition-colors shadow-lg">
            {dict.landing.join_now}
          </Link>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-br from-white to-gray-500 bg-clip-text text-transparent">
          {dict.landing.headline}
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10">
          {dict.landing.subheadline}
        </p>
        
        <Link 
          href="/onboarding" 
          className="bg-white text-black text-lg font-bold px-8 py-4 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform duration-300 mb-12 inline-block"
        >
          {dict.landing.start_assessment}
        </Link>
        
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center opacity-80">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0a0a0a] bg-gray-700 flex items-center justify-center text-xs overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" />
                </div>
              ))}
            </div>
            <div className="text-sm text-left ml-2">
              <p className="font-bold">10,000+</p>
              <p className="text-gray-400">{dict.landing.active_members}</p>
            </div>
          </div>
          
          <div className="h-12 w-[1px] bg-gray-800 hidden md:block"></div>
          
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-400">
              {['★', '★', '★', '★', '★'].map((star, i) => <span key={i}>{star}</span>)}
            </div>
            <div className="text-sm text-left">
              <p className="font-bold">4.9/5</p>
              <p className="text-gray-400">{dict.landing.reviews}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
