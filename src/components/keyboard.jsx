import React from 'react';

const Keyboard = ({ onKeyPress, onEnter, onDelete, usedLetters = {}, isSubmitting = false }) => {
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  const handleKeyClick = (key) => {
    onKeyPress(key);
  };

  const handleEnterClick = () => {
    if (!isSubmitting) onEnter();
  };

  const handleDeleteClick = () => {
    onDelete();
  };

  return (
    <div className="w-full max-w-lg sm:max-w-xl lg:max-w-2xl mx-auto px-2 sm:px-4">
      <div className="space-y-2 sm:space-y-3 mb-3">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-1 sm:gap-2">
            {/* ENTER button for row 3 - visible on sm+ */}
            {rowIndex === 2 && (
              <button
                onClick={handleEnterClick}
                disabled={isSubmitting}
                className={`hidden sm:flex items-center justify-center px-3 md:px-4 h-12 md:h-14 
                  bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl 
                  font-semibold text-sm transition-all duration-200 
                  ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:from-blue-500 hover:to-blue-600 active:scale-95'} 
                  shadow-lg hover:shadow-blue-500/25 border border-blue-500/20 
                  aladin-regular`}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Validating
                  </span>
                ) : (
                  'ENTER'
                )}
              </button>
            )}

            {/* Letter buttons */}
            {row.map((letter) => {
              const status = usedLetters[letter] || null;

              let bgClass = 'bg-gradient-to-br from-slate-700 to-slate-800';
              let borderClass = 'border border-slate-600/20';
              let hoverClass = 'hover:from-slate-600 hover:to-slate-700';
              let textClass = 'text-white';

              if (status === 'correct') {
                bgClass = 'bg-green-600';
                borderClass = 'border-green-500';
                textClass = 'text-white';
                hoverClass = '';
              } else if (status === 'present') {
                bgClass = 'bg-yellow-500';
                borderClass = 'border-yellow-400';
                textClass = 'text-white';
                hoverClass = '';
              } else if (status === 'absent') {
                bgClass = 'bg-slate-500';
                borderClass = 'border-slate-400';
                textClass = 'text-white opacity-60';
                hoverClass = '';
              }

              return (
                <button
                  key={letter}
                  onClick={() => status !== 'absent' && !isSubmitting && onKeyPress(letter)}
                  disabled={status === 'absent' || isSubmitting}
                  className={`flex items-center justify-center w-8 h-10 sm:w-10 sm:h-12 md:w-12 md:h-14 
                    ${bgClass} ${borderClass} ${textClass} ${hoverClass} 
                    rounded-lg sm:rounded-xl font-bold text-sm sm:text-base md:text-lg 
                    transition-all duration-200 active:scale-95 shadow-lg aladin-regular`}
                >
                  {letter}
                </button>
              );
            })}

            {/* DELETE button for row 3 - visible on sm+ */}
            {rowIndex === 2 && (
              <button
                onClick={handleDeleteClick}
                disabled={isSubmitting}
                className={`hidden sm:flex items-center justify-center px-3 md:px-4 h-12 md:h-14 
                  bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl 
                  font-semibold text-sm transition-all duration-200 
                  ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:from-red-500 hover:to-red-600 active:scale-95'} 
                  shadow-lg hover:shadow-red-500/25 border border-red-500/20 
                  aladin-regular`}
              >
                DELETE
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Mobile-only ENTER + DELETE buttons */}
      <div className="flex justify-center gap-4 sm:hidden mt-3">
        <button
          onClick={handleEnterClick}
          disabled={isSubmitting}
          className={`flex-grow max-w-[140px] h-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white 
            rounded-xl font-bold text-base transition-all duration-200 
            ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:from-blue-500 hover:to-blue-600 active:scale-95'} 
            shadow-lg hover:shadow-blue-500/25 border border-blue-500/20 
            aladin-regular`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              Validating
            </span>
          ) : (
            'ENTER'
          )}
        </button>
        <button
          onClick={handleDeleteClick}
          disabled={isSubmitting}
          className={`flex-grow max-w-[140px] h-12 bg-gradient-to-r from-red-600 to-red-700 text-white 
            rounded-xl font-bold text-base transition-all duration-200 
            ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:from-red-500 hover:to-red-600 active:scale-95'} 
            shadow-lg hover:shadow-red-500/25 border border-red-500/20 
            aladin-regular`}
        >
          DELETE
        </button>
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