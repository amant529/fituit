"use client";

import { useState } from "react";

import BottomNav from "@/components/BottomNav";
import TopNav from "@/components/TopNav";

import { logMealAction } from "./actions";

export default function Diet() {
  const [activeTab, setActiveTab] = useState<'search' | 'photo'>('search');
  const [searchQuery, setSearchQuery] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [analyzingPhoto, setAnalyzingPhoto] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [photoResult, setPhotoResult] = useState<any | null>(null);
  const [isLogging, setIsLogging] = useState(false);

  // Totals for today
  const targets = { kcal: 2400, pro: 160, carb: 250, fat: 70 };
  const consumed = { kcal: 1160, pro: 85, carb: 120, fat: 32 }; // mock

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLogMeal = async (item: any) => {
    setIsLogging(true);
    const res = await logMealAction(item);
    setIsLogging(false);
    if (res.error) {
      alert("Failed to log meal: " + res.error);
    } else {
      alert("Meal logged successfully!");
      setSearchResults([]);
      setSearchQuery('');
      setPhotoResult(null);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    setIsSearching(true);
    try {
      // Open Food Facts API integration for global/packaged foods
      const res = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(searchQuery)}&search_simple=1&action=process&json=1`);
      const data = await res.json();
      const mapped = (data.products || []).slice(0, 5).map((p: Record<string, unknown>) => {
        const nutriments = p.nutriments as Record<string, number> || {};
        return {
          name: p.product_name,
          kcal: nutriments['energy-kcal_100g'] || 0,
          pro: nutriments.proteins_100g || 0,
          carb: nutriments.carbohydrates_100g || 0,
          fat: nutriments.fat_100g || 0,
          serving: '100g'
        };
      });
      setSearchResults(mapped);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAnalyzingPhoto(true);
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64 = event.target?.result;
        try {
          const res = await fetch('/api/analyze-food', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageBase64: base64 })
          });
          const data = await res.json();
          if (data.success) {
            setPhotoResult(data.data);
          }
        } catch (err) {
          console.error(err);
        } finally {
          setAnalyzingPhoto(false);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D120E] text-white flex flex-col font-sans pb-24">
      <TopNav title="Nutrition" />

      <main className="flex-1 px-6 py-8 flex flex-col gap-8 max-w-2xl mx-auto w-full">
        
        {/* Macro Rings / Summary */}
        <section className="bg-gray-900 rounded-3xl p-6 border border-gray-800">
          <div className="flex justify-between items-end mb-6">
            <div>
              <p className="text-3xl font-extrabold">{targets.kcal - consumed.kcal}</p>
              <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider">Kcal Remaining</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-gray-500">{consumed.kcal} / {targets.kcal}</p>
              <p className="text-xs text-gray-500">Consumed</p>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex flex-col items-center">
              <div className="relative w-16 h-16 flex items-center justify-center mb-2">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-gray-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                  <path className="text-red-500" strokeDasharray={`${(consumed.pro / targets.pro) * 100}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                </svg>
                <div className="absolute text-xs font-bold">{consumed.pro}g</div>
              </div>
              <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Protein</span>
              <span className="text-xs text-gray-500">{targets.pro}g</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="relative w-16 h-16 flex items-center justify-center mb-2">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-gray-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                  <path className="text-blue-500" strokeDasharray={`${(consumed.carb / targets.carb) * 100}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                </svg>
                <div className="absolute text-xs font-bold">{consumed.carb}g</div>
              </div>
              <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Carbs</span>
              <span className="text-xs text-gray-500">{targets.carb}g</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="relative w-16 h-16 flex items-center justify-center mb-2">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-gray-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                  <path className="text-yellow-500" strokeDasharray={`${(consumed.fat / targets.fat) * 100}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                </svg>
                <div className="absolute text-xs font-bold">{consumed.fat}g</div>
              </div>
              <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Fat</span>
              <span className="text-xs text-gray-500">{targets.fat}g</span>
            </div>
          </div>
          
          <div className="mt-6 bg-blue-500/10 border border-blue-500/20 text-blue-400 p-3 rounded-xl text-sm font-medium">
            💡 AI Tip: You&apos;re lagging on protein today. Consider some paneer or a protein shake before bed.
          </div>
        </section>

        {/* Add Meal Area */}
        <section>
          <div className="flex bg-gray-900 rounded-full p-1 mb-6 border border-gray-800">
            <button 
              className={`flex-1 py-2 rounded-full text-sm font-bold transition-colors ${activeTab === 'search' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('search')}
            >
              Search Database
            </button>
            <button 
              className={`flex-1 py-2 rounded-full text-sm font-bold transition-colors ${activeTab === 'photo' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('photo')}
            >
              Scan Photo (AI)
            </button>
          </div>

          {activeTab === 'search' ? (
            <div>
              <form onSubmit={handleSearch} className="flex gap-2 mb-4">
                <input 
                  type="text" 
                  placeholder="Search Indian or Global foods..." 
                  className="flex-1 bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:border-white transition-colors"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="bg-gray-800 px-6 font-bold rounded-xl hover:bg-gray-700">Search</button>
              </form>
              
              {isSearching && <div className="text-center text-gray-500 py-4">Searching...</div>}
              
              <div className="space-y-3">
                {searchResults.map((item, i) => (
                  <div key={i} className="bg-gray-900 p-4 rounded-xl border border-gray-800 flex justify-between items-center">
                    <div>
                      <p className="font-bold">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.kcal} kcal • {item.pro}g Pro • {item.carb}g Carb • {item.fat}g Fat ({item.serving})</p>
                    </div>
                    <button 
                      onClick={() => handleLogMeal(item)}
                      disabled={isLogging}
                      className="bg-white text-black px-4 py-1 rounded-full text-sm font-bold disabled:opacity-50"
                    >
                      +
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <label className="w-full aspect-video rounded-3xl border-2 border-dashed border-gray-700 bg-gray-900 flex flex-col items-center justify-center cursor-pointer hover:border-white transition-colors">
                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                {analyzingPhoto ? (
                  <div className="animate-spin text-4xl">↻</div>
                ) : (
                  <>
                    <div className="text-4xl mb-2">📸</div>
                    <span className="font-bold">Snap your meal</span>
                  </>
                )}
              </label>

              {photoResult && (
                <div className="mt-6 w-full bg-gray-900 p-5 rounded-2xl border border-green-500/30">
                  <h3 className="font-bold text-lg mb-2 flex items-center justify-between">
                    {photoResult.name} 
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                      {photoResult.confidence}% match
                    </span>
                  </h3>
                  <div className="grid grid-cols-4 gap-2 mb-4 text-center text-sm">
                    <div className="bg-gray-800 rounded p-2"><span className="block font-bold">{photoResult.total_kcal}</span>Kcal</div>
                    <div className="bg-gray-800 rounded p-2 text-red-400"><span className="block font-bold">{photoResult.protein_g}</span>Pro</div>
                    <div className="bg-gray-800 rounded p-2 text-blue-400"><span className="block font-bold">{photoResult.carbs_g}</span>Carb</div>
                    <div className="bg-gray-800 rounded p-2 text-yellow-400"><span className="block font-bold">{photoResult.fat_g}</span>Fat</div>
                  </div>
                  <p className="text-sm text-gray-400 mb-4">&quot;{String(photoResult.ai_tip)}&quot;</p>
                  <button 
                    onClick={() => handleLogMeal({
                      name: photoResult.name,
                      kcal: photoResult.total_kcal,
                      pro: photoResult.protein_g,
                      carb: photoResult.carbs_g,
                      fat: photoResult.fat_g,
                      serving: '1 serving'
                    })}
                    disabled={isLogging}
                    className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-200 disabled:opacity-50"
                  >
                    {isLogging ? "Logging..." : "Log this meal"}
                  </button>
                </div>
              )}
            </div>
          )}
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
