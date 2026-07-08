import TopNav from "@/components/TopNav";
import BottomNav from "@/components/BottomNav";

export default function Progress() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans pb-20">
      <TopNav title="Progress" />

      <main className="flex-1 px-6 py-8 flex flex-col gap-8 max-w-2xl mx-auto w-full">
        
        {/* Grade Progress */}
        <section>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Grade Progress</h2>
          <div className="bg-gray-900 rounded-3xl p-6 border border-gray-800 flex justify-between items-center">
            <div className="flex-1">
              <p className="text-sm text-gray-400 mb-1">Calisthenics</p>
              <p className="text-3xl font-extrabold text-white mb-2">Grade 2</p>
              <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                <div className="bg-white h-full w-[65%]"></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Next: Tuck Front Lever</p>
            </div>
            
            <div className="w-[1px] h-20 bg-gray-800 mx-6"></div>
            
            <div className="flex-1">
              <p className="text-sm text-gray-400 mb-1">Yoga</p>
              <p className="text-3xl font-extrabold text-blue-400 mb-2">Grade 1</p>
              <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-400 h-full w-[80%]"></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Next: Crow Pose</p>
            </div>
          </div>
        </section>

        {/* Weekly Pain Score Chart (Mock UI) */}
        <section>
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Pain Tracking (Lower Back)</h2>
            <span className="text-xs text-green-500 font-bold">-15% this week</span>
          </div>
          <div className="bg-gray-900 rounded-3xl p-6 border border-gray-800 h-48 flex items-end justify-between gap-2">
            {[6, 5, 5, 4, 3, 4, 2].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className={`w-full rounded-t-sm ${val > 4 ? 'bg-red-500/50' : 'bg-green-500/50'}`} 
                  style={{ height: `${val * 15}%` }}
                ></div>
                <span className="text-xs text-gray-600 font-semibold">{['M','T','W','T','F','S','S'][i]}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Consistency Calendar (Mock UI) */}
        <section>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Consistency</h2>
          <div className="bg-gray-900 rounded-3xl p-6 border border-gray-800 flex flex-wrap gap-2 justify-center">
            {Array.from({ length: 28 }).map((_, i) => (
              <div 
                key={i} 
                className={`w-6 h-6 rounded-md ${i < 13 ? 'bg-white' : i === 13 ? 'bg-gray-700' : 'bg-gray-800'}`}
              ></div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-400 mt-4">13 workouts completed this month</p>
        </section>
      </main>

      {/* Bottom Nav */}
      <BottomNav />
    </div>
  );
}
