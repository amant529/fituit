"use client";

import Image from "next/image";

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-white p-4 text-center">
      <div className="mb-6 flex flex-col items-center gap-3">
        <Image src="/logo.png" alt="FITUIT Logo" width={64} height={64} className="rounded-xl" />
        <h1 className="text-4xl font-bold tracking-tighter">FITUIT</h1>
      </div>
      <h2 className="text-2xl font-semibold mb-2">You&apos;re Offline</h2>
      <p className="text-gray-400 text-center max-w-md mb-8">
        We couldn&apos;t connect to the server. Your cached sessions are still available.
      </p>
      <button 
        onClick={() => window.location.reload()}
        className="px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors"
      >
        Retry Connection
      </button>
    </div>
  );
}
