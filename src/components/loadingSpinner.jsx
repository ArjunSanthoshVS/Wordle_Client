import React from 'react';

const LoadingSpinner = ({ message = "Loading secret word..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 select-none">
      <div className="relative w-14 h-14 flex items-center justify-center">
        {/* Outer pulsating glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-sky-500 to-purple-600 blur-md opacity-30 animate-pulse" />
        
        {/* Main rotating track */}
        <div className="w-12 h-12 border-3 border-slate-700/80 border-t-sky-400 border-r-purple-500 rounded-full animate-spin" />
        
        {/* Inner dot */}
        <div className="absolute w-2.5 h-2.5 bg-gradient-to-r from-sky-400 to-purple-400 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
      </div>
      
      <p className="text-slate-300 font-medium text-sm sm:text-base mt-4 tracking-wide">
        {message}
      </p>
    </div>
  );
};

export default LoadingSpinner;

