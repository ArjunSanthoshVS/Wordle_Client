import React from 'react';

const TutorialButton = ({ onClick, className = '' }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-9 px-3 bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl border border-white/10 shadow-md backdrop-blur-md transition-all active:scale-95 flex items-center justify-center gap-1.5 text-xs font-semibold ${className}`}
      title="How to Play"
      aria-label="How to Play"
    >
      <span className="text-sm">💡</span>
      <span>Help</span>
    </button>
  );
};

export default TutorialButton;


