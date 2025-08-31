import React from 'react';

const Keyboard = ({ onKeyPress, onEnter, onDelete }) => {
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  const handleKeyClick = (key) => {
    onKeyPress(key);
  };

  const handleEnterClick = () => {
    onEnter();
  };

  const handleDeleteClick = () => {
    onDelete();
  };

  return (
    <div className="w-full max-w-lg sm:max-w-xl lg:max-w-2xl mx-auto px-2 sm:px-4">
      <div className="space-y-2 sm:space-y-3">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-1 sm:gap-2">
            {rowIndex === 2 && (
              <button
                onClick={handleEnterClick}
                className="flex items-center justify-center px-2 sm:px-3 md:px-4 h-10 sm:h-12 md:h-14 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 hover:from-blue-500 hover:to-blue-600 active:scale-95 shadow-lg hover:shadow-blue-500/25 border border-blue-500/20 aladin-regular"
              >
                <span className="hidden sm:inline">ENTER</span>
                <span className="sm:hidden">↵</span>
              </button>
            )}
            
            {row.map((letter) => (
              <button
                key={letter}
                onClick={() => handleKeyClick(letter)}
                className="flex items-center justify-center w-8 h-10 sm:w-10 sm:h-12 md:w-12 md:h-14 bg-gradient-to-br from-slate-700 to-slate-800 text-white rounded-lg sm:rounded-xl font-bold text-sm sm:text-base md:text-lg transition-all duration-200 hover:from-slate-600 hover:to-slate-700 active:scale-95 shadow-lg hover:shadow-slate-500/20 border border-slate-600/20 hover:border-slate-500/40 aladin-regular"
              >
                {letter}
              </button>
            ))}
            
            {rowIndex === 2 && (
              <button
                onClick={handleDeleteClick}
                className="flex items-center justify-center px-2 sm:px-3 md:px-4 h-10 sm:h-12 md:h-14 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 hover:from-red-500 hover:to-red-600 active:scale-95 shadow-lg hover:shadow-red-500/25 border border-red-500/20 aladin-regular"
              >
                <span className="hidden sm:inline">DELETE</span>
                <span className="sm:hidden">⌫</span>
              </button>
            )}
          </div>
        ))}
      </div>
      
      {/* Mobile-friendly instructions */}
      <div className="mt-4 sm:mt-6 text-center">
        <p className="text-slate-400 text-xs sm:text-sm aladin-regular px-2">
          💡 Use your keyboard or tap the buttons above
        </p>
      </div>
    </div>
  );
};

export default Keyboard;
