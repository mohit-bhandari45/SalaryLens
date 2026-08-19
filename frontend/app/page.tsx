import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-50 selection:bg-neutral-800">
      <main className="max-w-6xl mx-auto px-6 pt-24 pb-20 relative">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />

        {/* Hero Section */}
        <div className="relative text-center space-y-8 max-w-5xl mx-auto mt-16 mb-32">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/50 border border-neutral-800 text-sm font-medium text-neutral-400 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            Context over comparison.
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 leading-tight md:leading-none">
            <span className="block whitespace-nowrap">Stop guessing your</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-400 pt-2 lg:pt-4">
              market value.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-neutral-400 mx-auto leading-relaxed max-w-2xl font-light">
            SalaryLens normalizes compensation by comparing your exact situation: role, experience, location, and company type. No more random Twitter FOMO.
          </p>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth" className="cursor-pointer px-8 py-4 bg-white text-black text-center font-bold text-lg rounded-xl hover:bg-neutral-200 transition-colors w-full sm:w-auto shadow-[0_0_40px_rgba(255,255,255,0.1)]">
              Check My Reality
            </Link>
            <Link href="/explore" className="cursor-pointer px-8 py-4 bg-neutral-900 border border-neutral-800 text-center text-white font-bold text-lg rounded-xl hover:bg-neutral-800 transition-colors w-full sm:w-auto">
              Explore Open Data
            </Link>
          </div>
        </div>

        {/* Feature Grid (Bento Box Style) */}
        <div className="relative mt-24">
          <h2 className="text-3xl font-bold mb-10 text-center tracking-tight">Everything you need, without the noise.</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Feature 1 */}
            <div className="col-span-1 md:col-span-2 p-10 rounded-3xl bg-neutral-900/40 border border-neutral-800/80 backdrop-blur-sm hover:border-neutral-700 transition-colors group">
              <div className="w-14 h-14 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center mb-6 text-2xl border border-indigo-500/20">🎯</div>
              <h3 className="text-2xl font-bold mb-3 text-white tracking-tight">Contextual Reality Check</h3>
              <p className="text-lg text-neutral-400 leading-relaxed font-light">
                We don't do "average software engineer". We match you with peers in your region, tech stack, and company size. Find exactly what an agency dev with 2 YOE in your city makes.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="col-span-1 p-10 rounded-3xl bg-neutral-900/40 border border-neutral-800/80 backdrop-blur-sm hover:border-neutral-700 transition-colors group">
              <div className="w-14 h-14 bg-cyan-500/10 text-cyan-400 rounded-2xl flex items-center justify-center mb-6 text-2xl border border-cyan-500/20">🤫</div>
              <h3 className="text-2xl font-bold mb-3 text-white tracking-tight">100% Anonymous</h3>
              <p className="text-lg text-neutral-400 leading-relaxed font-light">
                No public profiles, no names, no company identities. Your privacy is structurally enforced.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="col-span-1 p-10 rounded-3xl bg-neutral-900/40 border border-neutral-800/80 backdrop-blur-sm hover:border-neutral-700 transition-colors group">
              <div className="w-14 h-14 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mb-6 text-2xl border border-emerald-500/20">📈</div>
              <h3 className="text-2xl font-bold mb-3 text-white tracking-tight">Confidence Scores</h3>
              <p className="text-lg text-neutral-400 leading-relaxed font-light">
                Every percentile calculation comes with a statistical confidence score based on the dataset size. We prioritize data truth over hype.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="col-span-1 md:col-span-2 p-10 rounded-3xl bg-neutral-900/40 border border-neutral-800/80 backdrop-blur-sm hover:border-neutral-700 transition-colors group relative overflow-hidden">
              <div className="w-14 h-14 bg-pink-500/10 text-pink-400 rounded-2xl flex items-center justify-center mb-6 text-2xl border border-pink-500/20">📸</div>
              <h3 className="text-2xl font-bold mb-3 text-white tracking-tight">Shareable Salary Cards</h3>
              <p className="text-lg text-neutral-400 leading-relaxed font-light max-w-xl">
                Ready to flex (or vent) on Twitter? SalaryLens automatically generates beautiful, privacy-safe reality cards highlighting your percentile and market median. It's your career, wrapped.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="col-span-1 md:col-span-3 p-10 rounded-3xl bg-neutral-900/40 border border-neutral-800/80 backdrop-blur-sm hover:border-neutral-700 transition-colors flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1">
                <div className="w-14 h-14 bg-orange-500/10 text-orange-400 rounded-2xl flex items-center justify-center mb-6 text-2xl border border-orange-500/20">💼</div>
                <h3 className="text-3xl font-bold mb-3 text-white tracking-tight">Granular Market Insights</h3>
                <p className="text-lg text-neutral-400 leading-relaxed font-light">
                  Compare reported compensation by Remote vs On-Site. Discover which skills (like AWS or Docker) strongly correlate with higher percentiles in your specific niche, without the causation fallacy.
                </p>
              </div>
              <div className="w-full md:w-1/3 bg-neutral-950 border border-neutral-800 rounded-xl p-6 font-mono text-sm text-neutral-300">
                <div className="flex justify-between mb-3 pb-3 border-b border-neutral-800">
                  <span className="text-neutral-500">Remote</span> <span className="text-green-400">₹42k</span>
                </div>
                <div className="flex justify-between mb-3 pb-3 border-b border-neutral-800">
                  <span className="text-neutral-500">Hybrid</span> <span className="text-green-400">₹45k</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">On-site</span> <span className="text-green-400">₹38k</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
