"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Paywall() {
  const router = useRouter();
  const [currency, setCurrency] = useState({ symbol: '$', code: 'USD' });
  const [prices, setPrices] = useState({ 
    monthly: { core: '5.99', elite: '12.99' }, 
    yearly: { core: '59.99', elite: '129.99' } 
  });
  const [billing, setBilling] = useState<'monthly'|'yearly'>('monthly');
  const [discountCode, setDiscountCode] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function detectLocation() {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        const country = data.country_code;

        if (country === 'IN') {
          setCurrency({ symbol: '₹', code: 'INR' });
          setPrices({ 
            monthly: { core: '499', elite: '999' },
            yearly: { core: '4,999', elite: '9,999' }
          });
        } else if (['US', 'CA', 'AU'].includes(country)) {
          setCurrency({ symbol: '$', code: 'USD' });
          setPrices({ 
            monthly: { core: '8.99', elite: '12.99' },
            yearly: { core: '89.99', elite: '129.99' }
          });
        } else {
          setCurrency({ symbol: '€', code: 'EUR' });
          setPrices({ 
            monthly: { core: '8.99', elite: '12.99' },
            yearly: { core: '89.99', elite: '129.99' }
          });
        }
      } catch (err) {
        // Fallback to USD
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    detectLocation();
  }, []);

  const handleSubscribe = async (tier: 'core' | 'elite') => {
    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier, billing, discountCode })
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to initiate checkout. Please try again.");
      }
    } catch (e) {
      console.error(e);
      alert("Something went wrong.");
    }
  };

  const handleApplyDiscount = () => {
    if (discountCode.trim()) {
      alert(`Coupon '${discountCode}' attached! The discount will be applied at checkout.`);
    }
  };

  if (loading) return <div className="min-h-screen bg-[#0B0B0F] flex items-center justify-center text-white"><div className="animate-spin text-4xl text-[#C8F135]">↻</div></div>;

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white flex flex-col font-sans p-6 selection:bg-[#C8F135] selection:text-black">
      <header className="py-4 flex justify-between items-center mb-8 max-w-7xl mx-auto w-full">
        <button onClick={() => router.back()} className="text-gray-400 hover:text-white transition-colors">← Back</button>
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="FITUIT Logo" width={32} height={32} className="drop-shadow-[0_0_10px_rgba(200,241,53,0.3)] object-contain" />
          <span className="text-xl font-black tracking-tighter uppercase bg-gradient-to-r from-white to-[#C8F135] bg-clip-text text-transparent italic">
            FITUIT
          </span>
        </div>
        <div className="w-16"></div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-center">Commit to Your Journey</h1>
        <p className="text-gray-400 text-center mb-8 max-w-lg">Unlock your personalized program, Coach AI insights, and daily check-ins. Cancel anytime.</p>

        {/* Toggle */}
        <div className="flex items-center bg-gray-900 rounded-full p-1 mb-12 border border-gray-800">
          <button 
            onClick={() => setBilling('monthly')}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-colors ${billing === 'monthly' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Monthly
          </button>
          <button 
            onClick={() => setBilling('yearly')}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-colors ${billing === 'yearly' ? 'bg-[#C8F135] text-black' : 'text-gray-400 hover:text-white'}`}
          >
            Yearly (Save ~15%)
          </button>
        </div>

        <div className="w-full max-w-md mb-8 flex gap-2">
          <input 
            type="text" 
            placeholder="Enter Discount Code" 
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            className="flex-1 bg-black border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C8F135] transition-colors"
          />
          <button 
            onClick={handleApplyDiscount}
            className="bg-gray-800 hover:bg-gray-700 text-white font-bold px-6 rounded-xl transition-colors"
          >
            Apply
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* Core Tier */}
          <div className="bg-gray-900 rounded-3xl p-8 border border-gray-800 flex flex-col relative">
            <h3 className="text-2xl font-bold mb-2">FITUIT Core</h3>
            <p className="text-gray-400 text-sm mb-6">The essentials to get started.</p>
            <div className="text-4xl font-extrabold mb-6">
              {currency.symbol}{prices[billing].core}
              <span className="text-lg text-gray-500 font-normal">/{billing === 'monthly' ? 'mo' : 'yr'}</span>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3">
                <span className="text-[#C8F135]">✓</span> Personalized program
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#C8F135]">✓</span> Standard macro tracking
              </li>
              <li className="flex items-center gap-3 text-gray-500">
                <span>✗</span> Coach AI WhatsApp
              </li>
              <li className="flex items-center gap-3 text-gray-500">
                <span>✗</span> Personalized coach if any problem
              </li>
            </ul>

            <button 
              onClick={() => handleSubscribe('core')}
              className="w-full bg-gray-800 text-white font-bold py-4 rounded-full text-lg hover:bg-gray-700 transition-colors"
            >
              Select Core
            </button>
          </div>

          {/* Elite Tier */}
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-3xl p-8 border border-[#C8F135]/30 flex flex-col relative transform md:-translate-y-4 shadow-[0_0_40px_rgba(200,241,53,0.05)]">
            <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#C8F135] text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
              Most Popular
            </div>
            <h3 className="text-2xl font-bold mb-2 text-white">FITUIT Elite</h3>
            <p className="text-gray-300 text-sm mb-6">Full access to Coach AI & Support.</p>
            <div className="text-4xl font-extrabold mb-6">
              {currency.symbol}{prices[billing].elite}
              <span className="text-lg text-gray-400 font-normal">/{billing === 'monthly' ? 'mo' : 'yr'}</span>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3">
                <span className="text-[#C8F135]">✓</span> Everything in Core
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#C8F135]">✓</span> AI Food Photo Analysis
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#C8F135]">✓</span> Daily WhatsApp Motivation
              </li>
              <li className="flex items-center gap-3 font-semibold text-white">
                <span className="text-[#C8F135]">✓</span> Personalized coach if any problem
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#C8F135]">✓</span> Adjust routines on the fly
              </li>
            </ul>

            <button 
              onClick={() => handleSubscribe('elite')}
              className="w-full bg-[#C8F135] text-black font-bold py-4 rounded-full text-lg hover:bg-[#b0d927] transition-colors shadow-[0_0_20px_rgba(200,241,53,0.3)]"
            >
              Select Elite
            </button>
          </div>
        </div>
        
        <p className="mt-8 text-xs text-gray-600 text-center max-w-sm">
          7-day money-back guarantee. Secure payment processing via LemonSqueezy. 
          By proceeding, you agree to our <a href="/legal/terms" className="underline hover:text-white transition-colors">Terms</a>.
        </p>
      </main>
    </div>
  );
}
