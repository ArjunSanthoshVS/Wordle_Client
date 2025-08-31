import React from 'react';

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] sm:min-h-[60vh]">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-12 h-12 sm:w-16 sm:h-16 border-3 sm:border-4 border-slate-600 border-t-blue-500 rounded-full animate-spin"></div>
        
        {/* Inner ring */}
        <div 
          className="absolute inset-0 w-12 h-12 sm:w-16 sm:h-16 border-3 sm:border-4 border-transparent border-t-purple-500 rounded-full animate-spin" 
          style={{ 
            animationDirection: 'reverse', 
            animationDuration: '1.5s' 
          }}
        ></div>
        
        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full animate-pulse"></div>
        </div>
      </div>
      
      <p className="text-slate-300 text-sm sm:text-base md:text-lg mt-4 sm:mt-6 font-medium animate-pulse px-4 text-center">
        {message}
      </p>
    </div>
  );
};

export default LoadingSpinner;
