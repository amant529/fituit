"use client";

import { useReducer } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Question = {
  id: number;
  type: "single" | "multiple" | "custom";
  title: string;
  subtitle?: string;
  options?: string[];
};

const QUESTIONS: Question[] = [
  { id: 1, type: "single", title: "What is your primary goal?", options: ["Build Muscle & Strength", "Lose Fat & Tone Up", "Improve Flexibility & Mobility", "Learn Calisthenics Skills"] },
  { id: 2, type: "single", title: "What's your current fitness level?", options: ["Beginner (I rarely work out)", "Intermediate (1-2 times a week)", "Advanced (3+ times a week)"] },
  { id: 3, type: "single", title: "Which body type best describes you?", options: ["Ectomorph (Slim)", "Mesomorph (Athletic)", "Endomorph (Stocky)"] },
  { id: 4, type: "single", title: "What is your desired body type?", options: ["Lean & Defined", "Athletic & Muscular", "Bulk & Mass"] },
  { id: 5, type: "multiple", title: "Which areas do you want to focus on?", options: ["Chest & Arms", "Belly & Core", "Legs & Glutes", "Back & Posture", "Full Body", "None of the above"] },
  { id: 6, type: "multiple", title: "Do you have any joint pain or injuries?", options: ["Lower Back", "Knees", "Shoulders", "Wrists", "None of the above"] },
  { id: 7, type: "single", title: "How much time can you commit to workouts?", options: ["15-20 mins (Quick routines)", "30-45 mins (Standard)", "60+ mins (Full sessions)"] },
  { id: 8, type: "single", title: "What is your typical daily activity level?", options: ["Sedentary (Desk job)", "Lightly Active (Some walking)", "Moderately Active", "Very Active (Physical job)"] },
  { id: 9, type: "single", title: "How many hours of sleep do you get?", options: ["Less than 5 hours", "5-6 hours", "7-8 hours", "More than 8 hours"] },
  { id: 10, type: "single", title: "How much water do you drink daily?", options: ["Less than 1 Liter", "1-2 Liters", "2-3 Liters", "More than 3 Liters"] },
  { id: 11, type: "single", title: "How would you describe your current diet?", options: ["I eat whatever I want", "I try to eat healthy", "I track my macros/calories", "I follow a specific diet (Keto, Vegan, etc.)"] },
  { id: 12, type: "multiple", title: "What are your biggest obstacles?", options: ["Lack of time", "Lack of motivation", "Don't know what to do", "Sugar cravings", "None of the above"] },
  { id: 13, type: "single", title: "What motivates you the most?", options: ["Feeling healthy and energetic", "Looking great in the mirror", "Building mental discipline", "Proving it to myself"] },
  { id: 14, type: "single", title: "When do you prefer to work out?", options: ["Early Morning", "Afternoon", "Evening / Night"] },
  { id: 15, type: "custom", title: "Let's check your posture.", subtitle: "We need a quick photo to analyze your spinal alignment using Coach AI." }
];

type State = {
  step: number;
  answers: Record<number, string | string[]>;
};

type Action = 
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "SET_ANSWER"; questionId: number; payload: string | string[] }
  | { type: "TOGGLE_MULTIPLE"; questionId: number; payload: string };

const initialState: State = {
  step: 1,
  answers: {},
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "NEXT_STEP":
      return { ...state, step: Math.min(QUESTIONS.length, state.step + 1) };
    case "PREV_STEP":
      return { ...state, step: Math.max(1, state.step - 1) };
    case "SET_ANSWER":
      return { 
        ...state, 
        answers: { ...state.answers, [action.questionId]: action.payload } 
      };
    case "TOGGLE_MULTIPLE":
      const currentAnswers = (state.answers[action.questionId] as string[]) || [];
      
      // Handle "None of the above" exclusively
      if (action.payload === "None of the above") {
        return {
          ...state,
          answers: { ...state.answers, [action.questionId]: ["None of the above"] }
        };
      }

      // Remove "None of the above" if another option is selected
      let newAnswers = currentAnswers.filter(a => a !== "None of the above");

      if (newAnswers.includes(action.payload)) {
        newAnswers = newAnswers.filter(a => a !== action.payload);
      } else {
        newAnswers = [...newAnswers, action.payload];
      }
      
      return { 
        ...state, 
        answers: { ...state.answers, [action.questionId]: newAnswers } 
      };
    default:
      return state;
  }
}

export default function Onboarding() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  const currentQuestion = QUESTIONS[state.step - 1];
  const progress = (state.step / QUESTIONS.length) * 100;

  const handleNext = () => {
    if (state.step === QUESTIONS.length) {
      // Finalize and go to posture analysis which will then route to paywall
      router.push('/onboarding/posture');
    } else {
      dispatch({ type: "NEXT_STEP" });
    }
  };

  const handleSingleSelect = (option: string) => {
    dispatch({ type: "SET_ANSWER", questionId: currentQuestion.id, payload: option });
    // Auto-advance for single select
    setTimeout(() => {
      handleNext();
    }, 300);
  };

  const handleMultipleSelect = (option: string) => {
    dispatch({ type: "TOGGLE_MULTIPLE", questionId: currentQuestion.id, payload: option });
  };

  const canProceed = () => {
    if (currentQuestion.type === "custom") return true;
    const answer = state.answers[currentQuestion.id];
    if (currentQuestion.type === "single") return !!answer;
    if (currentQuestion.type === "multiple") return Array.isArray(answer) && answer.length > 0;
    return false;
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white flex flex-col font-sans selection:bg-[#C8F135] selection:text-black">
      {/* Progress Bar */}
      <div className="w-full bg-gray-900 h-1.5">
        <div className="bg-[#C8F135] h-1.5 transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
      </div>
      
      {/* Header with Logo */}
      <header className="px-6 py-5 flex justify-between items-center relative">
        <button 
          onClick={() => dispatch({ type: "PREV_STEP" })}
          className="text-gray-400 hover:text-white disabled:opacity-30 p-2 -ml-2 transition-colors z-10"
          disabled={state.step === 1}
        >
          ← Back
        </button>
        
        {/* Centered Logo */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <Image src="/logo.png" alt="FITUIT Logo" width={32} height={32} className="rounded object-contain" />
        </div>

        <div className="w-10"></div> {/* spacer for flex balance */}
      </header>

      {/* Main Questionnaire */}
      <main className="flex-1 flex flex-col items-center px-6 mt-8 max-w-xl mx-auto w-full">
        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500" key={currentQuestion.id}>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-center tracking-tight leading-tight">
            {currentQuestion.title}
          </h1>
          {currentQuestion.subtitle && (
            <p className="text-gray-400 text-center mb-8 text-lg">{currentQuestion.subtitle}</p>
          )}

          <div className="space-y-3 mt-8">
            {currentQuestion.type === "single" && currentQuestion.options?.map(option => (
              <button
                key={option}
                onClick={() => handleSingleSelect(option)}
                className={`w-full p-5 rounded-2xl border transition-all text-left font-semibold text-lg ${state.answers[currentQuestion.id] === option ? 'border-[#C8F135] bg-[#C8F135]/10 text-[#C8F135]' : 'border-gray-800 hover:border-gray-600 bg-gray-900/50 text-white'}`}
              >
                {option}
              </button>
            ))}

            {currentQuestion.type === "multiple" && currentQuestion.options?.map(option => {
              const isSelected = (state.answers[currentQuestion.id] as string[] || []).includes(option);
              return (
                <button
                  key={option}
                  onClick={() => handleMultipleSelect(option)}
                  className={`w-full p-5 rounded-2xl border transition-all text-left font-semibold text-lg flex justify-between items-center ${isSelected ? 'border-[#C8F135] bg-[#C8F135]/10 text-[#C8F135]' : 'border-gray-800 hover:border-gray-600 bg-gray-900/50 text-white'}`}
                >
                  {option}
                  {isSelected && <span className="text-[#C8F135]">✓</span>}
                </button>
              )
            })}

            {currentQuestion.type === "custom" && (
              <div className="flex flex-col items-center justify-center p-8 bg-gray-900/50 border border-gray-800 rounded-3xl mt-4">
                <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-6">
                  <span className="text-4xl">📸</span>
                </div>
                <p className="text-center text-gray-400">Our AI needs a side-profile photo to detect structural imbalances.</p>
              </div>
            )}
          </div>

          {(currentQuestion.type === "multiple" || currentQuestion.type === "custom") && (
            <button 
              onClick={handleNext}
              disabled={!canProceed()}
              className="mt-10 w-full bg-[#C8F135] text-black font-bold py-4 rounded-full text-lg hover:bg-[#b0d927] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(200,241,53,0.15)]"
            >
              Continue
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
