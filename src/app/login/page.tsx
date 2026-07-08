import Link from "next/link";
import Image from "next/image";
import { login, signup } from "./actions";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { message: string; type?: string };
}) {
  const isSignup = searchParams.type === 'signup';

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white flex flex-col font-sans p-6 selection:bg-[#C8F135] selection:text-black">
      <header className="py-4 flex justify-between items-center mb-8 max-w-7xl mx-auto w-full">
        <Link href="/" className="text-gray-400 hover:text-white transition-colors">← Back</Link>
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="FITUIT Logo" width={32} height={32} className="drop-shadow-[0_0_10px_rgba(200,241,53,0.3)] object-contain" />
          <span className="text-xl font-black tracking-tighter uppercase bg-gradient-to-r from-white to-[#C8F135] bg-clip-text text-transparent italic">
            FITUIT
          </span>
        </div>
        <div className="w-16"></div>
      </header>

      <main className="flex-1 max-w-md mx-auto w-full flex flex-col justify-center mb-20">
        <div className="bg-gray-900 rounded-3xl p-8 border border-gray-800 shadow-[0_0_40px_rgba(200,241,53,0.03)]">
          
          <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-center">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-gray-400 text-center mb-8">
            {isSignup ? "Start your journey today." : "Log in to view your program."}
          </p>

          <form className="flex flex-col gap-5">
            {isSignup && (
              <>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-300 ml-1" htmlFor="fullName">Full Name</label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Athlete Name"
                    className="bg-[#0B0B0F] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C8F135] transition-colors"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-300 ml-1" htmlFor="referralCode">Referral Code (Optional)</label>
                  <input
                    id="referralCode"
                    name="referralCode"
                    type="text"
                    placeholder="Friend's code"
                    className="bg-[#0B0B0F] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C8F135] transition-colors"
                  />
                </div>
              </>
            )}
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-300 ml-1" htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="athlete@example.com"
                className="bg-[#0B0B0F] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C8F135] transition-colors"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-300 ml-1" htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                className="bg-[#0B0B0F] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C8F135] transition-colors"
                required
              />
            </div>

            {searchParams?.message && (
              <p className="text-red-400 text-sm text-center font-semibold bg-red-500/10 py-2 rounded-lg mt-2">
                {searchParams.message}
              </p>
            )}

            <button
              formAction={isSignup ? signup : login}
              className="mt-4 bg-[#C8F135] text-black font-bold py-4 rounded-xl text-lg hover:bg-[#b0d927] transition-colors shadow-[0_0_20px_rgba(200,241,53,0.2)]"
            >
              {isSignup ? "Sign Up" : "Log In"}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-gray-800 pt-6">
            {isSignup ? (
              <p className="text-gray-400 text-sm">
                Already have an account? <Link href="/login" className="text-white font-bold hover:text-[#C8F135] transition-colors">Log In</Link>
              </p>
            ) : (
              <p className="text-gray-400 text-sm">
                Don&apos;t have an account? <Link href="/login?type=signup" className="text-white font-bold hover:text-[#C8F135] transition-colors">Sign Up</Link>
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
