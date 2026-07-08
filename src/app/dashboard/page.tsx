import { createClient } from '@/utils/supabase/server'
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import TopNav from "@/components/TopNav";

export default async function Dashboard() {
  const supabase = createClient()
  
  // Fetch their profile name from our users table
  let user = null;
  let dailyLog = null;
  
  try {
    const { data } = await supabase.auth.getUser()
    user = data.user;
    
    if (user) {
      // We don't use profile name right now, but here's how you'd fetch it
      // const { data: profile } = await supabase
      //   .from('users')
      //   .select('full_name')
      //   .eq('id', user.id)
      //   .single()

      // Fetch today's food log
      const today = new Date().toISOString().split('T')[0];
      const { data: log } = await supabase
        .from('daily_logs')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', today)
        .single();
        
      if (log) {
        dailyLog = log;
      }
    }
  } catch {
    console.log("Supabase not configured yet, using default values");
  }

  // Totals for today (mock targets, real consumed if available)
  const targets = { kcal: 2400, pro: 160, carb: 250, fat: 70 };
  const consumed = { 
    kcal: dailyLog?.total_kcal || 1160, 
    pro: dailyLog?.protein_g || 85, 
    carb: dailyLog?.carbs_g || 120, 
    fat: dailyLog?.fat_g || 32 
  };

  return (
    <div className="min-h-screen bg-[#0D120E] text-white flex flex-col font-sans pb-20">
      <TopNav title="Home" />

      <main className="flex-1 px-6 py-8 flex flex-col gap-8 max-w-2xl mx-auto w-full">
        
        {/* Coach Message */}
        <section className="bg-gray-900 rounded-2xl p-5 border border-gray-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
          <h2 className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider">Message from Coach AI</h2>
          <p className="text-lg font-medium leading-relaxed">
            &quot;Your lower back was tight yesterday. Today&apos;s session includes targeted mobility work before we load the core. Focus on form over reps.&quot;
          </p>
        </section>

        {/* Today's Session */}
        <section>
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-2xl font-bold">Today&apos;s Session</h2>
            <span className="text-sm font-semibold text-gray-500">Session 13</span>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-6 border border-gray-800 relative group overflow-hidden">
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity"></div>
            
            <div className="flex justify-between items-start mb-12 relative z-10">
              <div>
                <span className="inline-block px-3 py-1 bg-white/10 text-white rounded-full text-xs font-bold tracking-wide mb-3">
                  STRENGTH + MOBILITY
                </span>
                <h3 className="text-3xl font-bold mb-1">Core Integrity</h3>
                <p className="text-gray-400">45 Min • Medium Intensity</p>
              </div>
            </div>

            <div className="flex gap-2 relative z-10">
              <Link 
                href="/session/today" 
                className="flex-1 bg-white text-black text-center font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                Start Workout
              </Link>
            </div>
          </div>
        </section>

        {/* Mini Diet Summary */}
        <section>
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-xl font-bold">Nutrition</h2>
            <Link href="/diet" className="text-sm font-semibold text-blue-400 hover:text-blue-300">Log Meal</Link>
          </div>
          <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-400 mb-1">Calories Remaining</p>
              <p className="text-2xl font-bold">{targets.kcal - consumed.kcal} <span className="text-sm text-gray-500 font-normal">/ {targets.kcal} kcal</span></p>
            </div>
            <div className="flex gap-3">
              <div className="text-center">
                <div className="w-10 h-10 rounded-full border-4 border-red-500 flex items-center justify-center text-xs font-bold mb-1">{consumed.pro}g</div>
                <span className="text-[10px] text-gray-500 uppercase font-bold">Pro</span>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 rounded-full border-4 border-blue-500 flex items-center justify-center text-xs font-bold mb-1">{consumed.carb}g</div>
                <span className="text-[10px] text-gray-500 uppercase font-bold">Carb</span>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 rounded-full border-4 border-yellow-500 flex items-center justify-center text-xs font-bold mb-1">{consumed.fat}g</div>
                <span className="text-[10px] text-gray-500 uppercase font-bold">Fat</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
