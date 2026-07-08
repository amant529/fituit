import Link from "next/link";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0D120E] text-white flex flex-col font-sans">
      <header className="px-6 py-6 border-b border-gray-900 flex items-center gap-4 sticky top-0 bg-[#0D120E]/90 backdrop-blur-md z-10">
        <Link href="/" className="text-gray-400 hover:text-white font-bold tracking-tighter text-xl">FITUIT</Link>
        <span className="text-gray-600">/</span>
        <span className="text-gray-400 text-sm font-semibold tracking-widest uppercase">Legal</span>
      </header>

      <main className="flex-1 px-6 py-12 max-w-3xl mx-auto w-full prose prose-invert prose-p:text-gray-300 prose-headings:text-white prose-a:text-blue-400 hover:prose-a:text-blue-300">
        {children}
      </main>

      <footer className="py-8 text-center border-t border-gray-900 mt-12">
        <p className="text-gray-500 text-sm">© 2025 FITUIT Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
