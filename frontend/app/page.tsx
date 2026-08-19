export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 selection:bg-neutral-800">
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-16 relative">
        {/* Glow effect */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full point-events-none" />

        <div className="relative text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-sm text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            A reality check for career comparison
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
            Stop guessing your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              market value.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Don't compare your salary with a random person on Twitter. Compare your exact situation: role, experience, location, and company type.
          </p>

          <div className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-neutral-200 transition-colors w-full sm:w-auto">
              Check My Salary Reality
            </button>
            <button className="px-8 py-4 bg-neutral-900 border border-neutral-800 text-white font-semibold rounded-lg hover:bg-neutral-800 transition-colors w-full sm:w-auto">
              Explore Open Data
            </button>
          </div>
        </div>

        {/* Feature Teaser */}
        <div className="mt-32 grid md:grid-cols-2 gap-6 relative">
          <div className="p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800 backdrop-blur-sm">
            <div className="w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center mb-6 text-xl">🤫</div>
            <h3 className="text-xl font-semibold mb-2 text-white">100% Anonymous</h3>
            <p className="text-neutral-400">No public profiles, no names, no company disclosures required. Ever.</p>
          </div>
          <div className="p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800 backdrop-blur-sm">
            <div className="w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center mb-6 text-xl">🎯</div>
            <h3 className="text-xl font-semibold mb-2 text-white">Contextual Precision</h3>
            <p className="text-neutral-400">We match you with peers in your region, tech stack, and company size.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
