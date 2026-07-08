"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PostureUpload() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleContinue = () => {
    // In a real app, save image to state management or localStorage
    if (image) {
      localStorage.setItem("posture_image", image);
    }
    // Go to next step in onboarding (e.g. step 17)
    // For simplicity, we just push back to onboarding? Wait, onboarding state would be lost if not in Context.
    // Assuming context or local storage handles it, we can just jump to paywall for this prototype.
    router.push("/paywall");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans p-6">
      <header className="py-4 mb-8 flex justify-between items-center">
        <button onClick={() => router.back()} className="text-gray-400 hover:text-white">← Back</button>
        <div className="text-sm font-bold text-gray-500">STEP 16 OF 30</div>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 flex flex-col items-center max-w-xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-4 text-center">Posture Assessment</h1>
        <p className="text-gray-400 text-center mb-8">
          Upload a full-body photo so our AI can analyze your posture and customize your program.
        </p>

        <label className="w-full aspect-[3/4] rounded-2xl border-2 border-dashed border-gray-600 bg-gray-900 flex flex-col items-center justify-center cursor-pointer hover:border-white transition-colors overflow-hidden relative">
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          
          {image ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={image} alt="Posture" className="w-full h-full object-cover" />
          ) : (
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center">📷</div>
              <p className="font-semibold text-lg">Tap to upload photo</p>
              <p className="text-sm text-gray-500 mt-2">Front or side profile works best</p>
            </div>
          )}
        </label>

        <div className="w-full mt-auto pt-8">
          <button 
            onClick={handleContinue}
            className="w-full bg-white text-black font-bold py-4 rounded-full text-lg hover:bg-gray-200 transition-colors"
          >
            {image ? "Analyze & Continue" : "Skip this step"}
          </button>
        </div>
      </main>
    </div>
  );
}
