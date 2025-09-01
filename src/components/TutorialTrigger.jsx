import React from 'react';

const TutorialTrigger = ({ onStartTutorial, onSkipTutorial }) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-white/10 max-w-md w-full p-8 text-center">
        {/* Welcome Icon */}
        <div className="text-6xl mb-6 animate-bounce">
          🎉
        </div>
        
        {/* Welcome Title */}
        <h2 className="text-3xl font-bold text-white aladin-regular mb-4">
          Welcome to WordPop!
        </h2>
        
        {/* Welcome Message */}
        <p className="text-slate-300 text-lg leading-relaxed mb-8 aladin-regular">
          Ready to challenge your vocabulary? Let me show you how to play this exciting word-guessing game!
        </p>
        
        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={onStartTutorial}
            className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl text-lg aladin-regular hover:from-purple-500 hover:to-blue-500 transition-all duration-300 active:scale-95 shadow-lg hover:shadow-purple-500/25"
          >
            🎮 Start Tutorial
          </button>
          
          <button
            onClick={onSkipTutorial}
            className="w-full px-6 py-3 text-slate-400 hover:text-white transition-colors aladin-regular"
          >
            Skip Tutorial
          </button>
        </div>
        
        {/* Quick Info */}
        <div className="mt-6 p-4 bg-slate-700/50 rounded-xl border border-white/10">
          <p className="text-slate-400 text-sm aladin-regular">
            💡 <strong>Quick Tip:</strong> You can always access the tutorial later from the menu!
          </p>
        </div>
      </div>
    </div>
  );
};

export default TutorialTrigger;
