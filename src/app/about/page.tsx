import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans">
      <header className="px-6 py-6 flex items-center gap-4">
        <Link href="/" className="text-gray-400 hover:text-white">←</Link>
        <h1 className="text-2xl font-bold tracking-tighter">About FITUIT</h1>
      </header>

      <main className="flex-1 px-6 py-8 flex flex-col gap-12 max-w-2xl mx-auto w-full">
        
        <section>
          <h2 className="text-4xl font-extrabold tracking-tight mb-6">Our Story</h2>
          <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
            <p>
              FITUIT was born out of frustration with the modern fitness industry. Gym memberships, confusing supplements, and cookie-cutter routines that ignore biomechanics.
            </p>
            <p>
              We believe in <strong className="text-white">Strength</strong> and <strong className="text-white">Balance</strong>. A holistic approach that merges the raw power of Calisthenics with the deep mobility of Yoga. No gym. No weights. Just you and gravity.
            </p>
            <p>
              Built for India and the global athlete, FITUIT leverages cutting-edge AI to personalize every single session based on your fatigue, your joint pain, and your goals.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-extrabold tracking-tight mb-6">The Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <div className="w-16 h-16 bg-gray-800 rounded-full mb-4"></div>
              <h3 className="text-xl font-bold">Coach AI</h3>
              <p className="text-blue-400 text-sm font-semibold mb-2">Lead Programmer</p>
              <p className="text-gray-400 text-sm">Powered by GPT-4o Vision, processing your posture and daily check-ins to build the perfect routine.</p>
            </div>
            
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <div className="w-16 h-16 bg-gray-800 rounded-full mb-4"></div>
              <h3 className="text-xl font-bold">The Founders</h3>
              <p className="text-blue-400 text-sm font-semibold mb-2">Athletes & Engineers</p>
              <p className="text-gray-400 text-sm">A collective of calisthenics practitioners and engineers dedicated to human performance.</p>
            </div>
          </div>
        </section>

      </main>
      
      <footer className="py-8 text-center border-t border-gray-900">
        <p className="text-gray-500 text-sm mb-2">© 2025 FITUIT Inc. All rights reserved.</p>
        <p className="text-gray-600 text-xs max-w-sm mx-auto px-6">FITUIT is not a medical device. Consult your physician before starting.</p>
      </footer>
    </div>
  );
}
