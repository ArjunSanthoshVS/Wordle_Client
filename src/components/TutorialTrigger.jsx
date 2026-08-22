import React from 'react';

const TutorialTrigger = ({ onStartTutorial, onSkipTutorial }) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 select-none">
      <div className="bg-[#121826] border border-white/10 rounded-2xl max-w-sm w-full p-6 sm:p-7 text-center shadow-2xl animate-scale-in">
        {/* Welcome Icon */}
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-sky-500/20 to-purple-500/20 border border-sky-400/30 flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(56,189,248,0.25)] animate-bounce-subtle">
          🎯
        </div>
        
        {/* Welcome Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-white font-display mb-2">
          Welcome to WordPop!
        </h2>
        
        {/* Welcome Message */}
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
          Ready to test your vocabulary? Guess the secret 5-letter word in 6 attempts with real-time feedback.
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5">
          <button
            onClick={onStartTutorial}
            className="w-full py-3 px-4 bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 hover:from-sky-400 hover:to-purple-500 text-white font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-indigo-500/25 active:scale-95 transition-all duration-150 flex items-center justify-center gap-2"
          >
            <span>🎮</span> How to Play (1 Min)
          </button>
          
          <button
            onClick={onSkipTutorial}
            className="w-full py-2.5 px-4 text-slate-400 hover:text-white text-xs sm:text-sm font-medium transition-colors rounded-lg hover:bg-white/5"
          >
            Skip, I know how to play
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorialTrigger;

