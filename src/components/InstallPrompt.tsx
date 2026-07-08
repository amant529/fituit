"use client";

import { useState, useEffect } from "react";

export default function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showFallbackMsg, setShowFallbackMsg] = useState(false);

  useEffect(() => {
    // 1. Check if the app is already installed / running in standalone mode
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const checkStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;
    setIsStandalone(checkStandalone);

    if (checkStandalone) return; // Hide if already installed

    // 2. OS Detection
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    if (isIosDevice) {
      // Show iOS manual instructions
      setShowPrompt(true);
    }

    // 3. Android PWA Install Event
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault(); // Prevent native prompt
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    } else {
      setShowFallbackMsg(true);
      setTimeout(() => setShowPrompt(false), 3000);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  if (!showPrompt || isStandalone) return null;

  return (
    <div className="fixed bottom-0 w-full z-50">
      {isIOS ? (
        // iOS Prompt
        <div className="bg-[#111] border-t border-gray-800 p-6 rounded-t-3xl shadow-2xl">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#C8F135] rounded-xl flex items-center justify-center text-black font-extrabold text-2xl">F</div>
              <div>
                <h3 className="font-bold text-lg text-white">Install FITUIT</h3>
                <p className="text-sm text-gray-400">Add to your Home Screen</p>
              </div>
            </div>
            <button onClick={handleDismiss} className="text-gray-500 hover:text-white bg-gray-800 rounded-full p-2">
              ✕
            </button>
          </div>
          <div className="bg-[#222] p-4 rounded-xl text-sm text-gray-300">
            Tap the <span className="text-[#007AFF] font-bold">Share</span> icon at the bottom, then select <span className="text-white font-bold">Add to Home Screen</span>.
          </div>
        </div>
      ) : (
        // Android / Desktop Chrome Prompt
        <div className="bg-[#111] border-t border-gray-800 p-4 shadow-2xl">
          {showFallbackMsg ? (
            <div className="text-center py-2 text-[#C8F135] font-bold text-sm">
              Click the Install icon (⤓) in your browser URL bar!
            </div>
          ) : (
            <div className="max-w-md mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#C8F135] rounded-xl flex items-center justify-center text-black font-extrabold text-xl">F</div>
                <div>
                  <p className="font-bold text-sm text-white">FITUIT Native App</p>
                  <p className="text-xs text-gray-400">Install for offline access</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={handleDismiss} className="text-gray-500 hover:text-white text-sm font-bold">
                  Later
                </button>
                <button 
                  onClick={handleInstallClick} 
                  className="bg-[#C8F135] text-black px-5 py-2 rounded-full text-sm font-extrabold shadow-[0_0_15px_rgba(200,241,53,0.2)] hover:scale-105 transition-transform"
                >
                  Install
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
