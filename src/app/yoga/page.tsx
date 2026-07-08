import BottomNav from "@/components/BottomNav";

export default function Yoga() {
  return (
    <div className="min-h-screen bg-[#0D120E] text-[#C8F135] flex flex-col font-sans pb-24">
      <header className="px-6 pt-12 pb-6 border-b border-[#C8F135]/10">
        <h2 className="text-sm tracking-widest font-bold uppercase mb-4 text-[#C8F135]/80">Yoga & Recovery</h2>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter leading-[0.9] text-white mb-8">
          Find your<br/>center
        </h1>
        
        <div className="bg-[#1A2315] rounded-full p-1 inline-flex items-center mb-4 border border-[#C8F135]/20">
          <span className="px-4 py-1 rounded-full text-sm font-bold bg-[#C8F135] text-black">Grade 0 → 1</span>
        </div>
        
        <div className="flex justify-between text-sm font-bold text-[#C8F135]/60 mb-2">
          <span></span>
          <span>15% complete</span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-[#1A2315] h-2 rounded-full mb-2 overflow-hidden">
          <div className="bg-[#C8F135] h-full w-[15%] rounded-full shadow-[0_0_10px_#C8F135]"></div>
        </div>
      </header>

      <main className="flex-1 px-6 mt-8 flex flex-col gap-8">
        
        {/* Flow Selector */}
        <section>
          <div className="flex justify-between items-end mb-4">
            <h3 className="text-2xl font-bold text-white">Daily Flows</h3>
            <span className="text-sm font-bold text-[#C8F135] underline cursor-pointer">View All</span>
          </div>
          <div className="flex overflow-x-auto gap-4 pb-4 snap-x">
            <div className="min-w-[280px] bg-gradient-to-br from-[#1A2315] to-[#0D120E] rounded-3xl p-6 border border-[#C8F135]/20 snap-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#C8F135]/10 blur-2xl rounded-full"></div>
              <h4 className="text-xl font-bold text-white mb-2 relative z-10">Morning Awakening</h4>
              <p className="text-sm text-[#C8F135]/70 mb-4 relative z-10">15 min • Energizing</p>
              <button className="bg-[#C8F135] text-black text-sm font-bold px-4 py-2 rounded-full shadow-lg relative z-10">Start Flow</button>
            </div>
            <div className="min-w-[280px] bg-gradient-to-br from-[#1A2315] to-[#0D120E] rounded-3xl p-6 border border-[#C8F135]/10 snap-center">
              <h4 className="text-xl font-bold text-white mb-2">Deep Release</h4>
              <p className="text-sm text-[#C8F135]/70 mb-4">25 min • Restorative</p>
              <button className="bg-gray-800 text-white text-sm font-bold px-4 py-2 rounded-full">Start Flow</button>
            </div>
          </div>
        </section>

        {/* Asana Grid */}
        <section>
          <h3 className="text-xl font-bold mb-4 text-white">Asana Library</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#131A10] rounded-2xl p-4 border border-[#C8F135]/10 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#1A2315] rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl">🐕</span>
              </div>
              <p className="text-white font-bold text-sm">Downward Dog</p>
              <p className="text-[#C8F135]/60 text-xs italic">Adho Mukha Svanasana</p>
            </div>
            
            <div className="bg-[#131A10] rounded-2xl p-4 border border-[#C8F135]/10 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#1A2315] rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl">🌳</span>
              </div>
              <p className="text-white font-bold text-sm">Tree Pose</p>
              <p className="text-[#C8F135]/60 text-xs italic">Vrksasana</p>
            </div>
            
            <div className="bg-[#131A10] rounded-2xl p-4 border border-[#C8F135]/10 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#1A2315] rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl">🦅</span>
              </div>
              <p className="text-white font-bold text-sm">Eagle Pose</p>
              <p className="text-[#C8F135]/60 text-xs italic">Garudasana</p>
            </div>
            
            <div className="bg-[#131A10] rounded-2xl p-4 border border-[#C8F135]/10 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#1A2315] rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl">👶</span>
              </div>
              <p className="text-white font-bold text-sm">Child&apos;s Pose</p>
              <p className="text-[#C8F135]/60 text-xs italic">Balasana</p>
            </div>
          </div>
        </section>

      </main>

      <BottomNav />
    </div>
  );
}
