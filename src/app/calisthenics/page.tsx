import BottomNav from "@/components/BottomNav";
import TopNav from "@/components/TopNav";

export default function Calisthenics() {
  return (
    <div className="min-h-screen bg-[#0D120E] text-[#C8F135] flex flex-col font-sans pb-24">
      <TopNav title="Workout" />
      <header className="px-6 pt-6 pb-6">
        <h2 className="text-sm tracking-widest font-bold uppercase mb-4 text-[#C8F135]/80">Calisthenics</h2>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter leading-[0.9] text-[#C8F135] mb-8">
          Build strength<br/>without iron
        </h1>
        
        <div className="bg-[#1A2315] rounded-full p-1 inline-flex items-center mb-4 border border-[#C8F135]/20">
          <span className="px-4 py-1 rounded-full text-sm font-bold bg-[#C8F135] text-black">Grade 0 → 1</span>
        </div>
        
        <div className="flex justify-between text-sm font-bold text-[#C8F135]/60 mb-2">
          <span></span>
          <span>23% complete</span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-[#1A2315] h-2 rounded-full mb-2 overflow-hidden">
          <div className="bg-[#C8F135] h-full w-[23%] rounded-full shadow-[0_0_10px_#C8F135]"></div>
        </div>
        
        <div className="flex justify-between text-xs font-bold text-[#C8F135]/40 mt-2 px-1">
          <span className="text-[#C8F135]/80">Beginner</span>
          <span>Foundation</span>
          <span>Intermediate</span>
          <span>Elite</span>
        </div>
      </header>

      <main className="flex-1 px-6 mt-8 flex flex-col gap-6">
        {/* Exercise List */}
        <div className="bg-[#131A10] rounded-3xl p-5 border border-[#C8F135]/10">
          <h3 className="text-xl font-bold mb-4">Core Fundamentals</h3>
          
          <div className="flex gap-4 items-center mb-6 border-b border-[#C8F135]/10 pb-4">
            <div className="w-20 h-20 bg-[#1A2315] rounded-xl flex items-center justify-center relative overflow-hidden">
              {/* SVG Placeholder for Video */}
              <svg className="w-8 h-8 text-[#C8F135] animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-lg mb-1">Hollow Body Hold</h4>
              <div className="flex gap-2">
                <span className="px-2 py-0.5 rounded bg-[#C8F135]/10 text-[#C8F135] text-xs font-bold">3 Sets</span>
                <span className="px-2 py-0.5 rounded bg-[#C8F135]/10 text-[#C8F135] text-xs font-bold">45 sec</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <div className="w-20 h-20 bg-[#1A2315] rounded-xl flex items-center justify-center relative overflow-hidden">
              <svg className="w-8 h-8 text-[#C8F135] animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-lg mb-1">Push-up Negatives</h4>
              <div className="flex gap-2">
                <span className="px-2 py-0.5 rounded bg-[#C8F135]/10 text-[#C8F135] text-xs font-bold">4 Sets</span>
                <span className="px-2 py-0.5 rounded bg-[#C8F135]/10 text-[#C8F135] text-xs font-bold">5-8 reps</span>
              </div>
            </div>
          </div>
        </div>

        {/* Coach Cue */}
        <div className="bg-[#C8F135] text-[#0D120E] rounded-2xl p-5 shadow-[0_0_20px_rgba(200,241,53,0.1)]">
          <p className="font-bold mb-1">Coach Cue</p>
          <p className="font-medium">Keep your lower back glued to the floor during hollow holds. If it arches, bend your knees slightly.</p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
