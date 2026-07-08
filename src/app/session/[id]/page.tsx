"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SessionPlayer({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [currentExercise, setCurrentExercise] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [restTime, setRestTime] = useState(60);

  const exercises = [
    { name: "Pike Pushups", reps: "8-10", sets: 3, notes: "Keep elbows tucked in" },
    { name: "Pull-up Negatives", reps: "5", sets: 3, notes: "5 second descent" },
    { name: "L-Sit Holds", reps: "15s", sets: 4, notes: "Keep legs straight" },
    { name: "Bulgarian Split Squats", reps: "12/leg", sets: 3, notes: "Knee tracks over toes" }
  ];

  const handleNext = () => {
    if (isResting) {
      setIsResting(false);
      setRestTime(60);
      if (currentExercise < exercises.length - 1) {
        setCurrentExercise(prev => prev + 1);
      } else {
        // Finished workout
        alert("Workout Complete!");
        router.push("/dashboard");
      }
    } else {
      setIsResting(true);
    }
  };

  const exercise = exercises[currentExercise];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans">
      <header className="px-6 py-6 flex justify-between items-center border-b border-gray-900">
        <button onClick={() => router.back()} className="text-gray-400 hover:text-white">✕ End</button>
        <div className="font-bold tracking-tighter">Session {params.id === 'today' ? '13' : params.id}</div>
        <div className="text-sm font-semibold text-gray-500">{currentExercise + 1} / {exercises.length}</div>
      </header>

      <main className="flex-1 flex flex-col justify-center px-6 max-w-xl mx-auto w-full text-center pb-24">
        {isResting ? (
          <div className="animate-in fade-in duration-300">
            <h2 className="text-5xl font-extrabold text-blue-500 mb-4">REST</h2>
            <div className="text-8xl font-black mb-8 font-mono">{restTime}s</div>
            <p className="text-gray-400 mb-2">Up Next:</p>
            <p className="text-2xl font-bold">{currentExercise < exercises.length - 1 ? exercises[currentExercise + 1].name : 'Done!'}</p>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-4xl font-extrabold mb-8">{exercise.name}</h2>
            
            <div className="flex gap-4 justify-center mb-12">
              <div className="bg-gray-900 px-8 py-6 rounded-3xl border border-gray-800">
                <div className="text-4xl font-black mb-1">{exercise.reps}</div>
                <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Reps</div>
              </div>
              <div className="bg-gray-900 px-8 py-6 rounded-3xl border border-gray-800">
                <div className="text-4xl font-black mb-1">{exercise.sets}</div>
                <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Sets</div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 text-blue-400 p-4 rounded-xl font-medium inline-block mx-auto">
              💡 {exercise.notes}
            </div>
          </div>
        )}
      </main>

      <div className="fixed bottom-0 w-full bg-black/90 backdrop-blur-md p-6 max-w-xl left-1/2 -translate-x-1/2">
        <button 
          onClick={handleNext}
          className="w-full bg-white text-black font-extrabold py-5 rounded-full text-xl hover:bg-gray-200 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.15)] active:scale-95"
        >
          {isResting ? "Skip Rest" : "Complete Set"}
        </button>
      </div>
    </div>
  );
}
