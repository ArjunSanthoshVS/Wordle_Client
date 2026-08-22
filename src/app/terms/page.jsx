import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="h-[100dvh] max-h-[100dvh] w-full game-bg flex flex-col justify-between overflow-hidden relative select-none px-4 py-4 safe-top safe-bottom">
      {/* Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-1/3 w-96 h-40 bg-sky-500/10 blur-3xl rounded-full" />
      </div>

      {/* Header */}
      <header className="relative z-10 text-center flex-shrink-0">
        <Link href="/" className="inline-flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-400 to-purple-600 flex items-center justify-center text-white font-display shadow-md">
            W
          </div>
          <h1 className="text-2xl sm:text-3xl font-display tracking-wider bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
            WORDPOP
          </h1>
        </Link>
        <p className="text-xs text-slate-400 mt-0.5">Terms & Conditions</p>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 mx-auto w-full max-w-2xl flex-1 min-h-0 my-2">
        <div className="glass-panel-elevated rounded-2xl h-full p-4 sm:p-6 overflow-y-auto shadow-2xl text-slate-300 text-xs sm:text-sm leading-relaxed space-y-4">
          <section>
            <h2 className="text-base font-bold text-white font-display">1. Introduction</h2>
            <p className="mt-1">
              Welcome to WordPop. By accessing or playing our game, you agree to these Terms & Conditions.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white font-display">2. Gameplay & Fair Play</h2>
            <p className="mt-1">
              WordPop is provided for personal entertainment and vocabulary learning. Automated scraping or disrupting the service is prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white font-display">3. Accounts & Privacy</h2>
            <p className="mt-1">
              Your streak statistics are stored locally on your device and synchronized when authenticated. We respect your data privacy.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white font-display">4. Intellectual Property</h2>
            <p className="mt-1">
              All visual designs, game concepts, animations, and branding elements are proprietary to WordPop.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white font-display">5. Contact</h2>
            <p className="mt-1">
              For feedback or inquiries, reach out through our community channel or support portal.
            </p>
          </section>
        </div>
      </main>

      {/* Footer Back Link */}
      <footer className="relative z-10 text-center flex-shrink-0">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl border border-white/10 text-xs font-semibold shadow-md transition-all active:scale-95"
        >
          <span>←</span> Back to Game
        </Link>
      </footer>
    </div>
  );
}



