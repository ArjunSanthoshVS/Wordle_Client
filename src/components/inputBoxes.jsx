import React from 'react';
import clsx from 'clsx';

const InputBoxes = ({ guesses, currentGuess }) => {
  const getAnimationDelay = (index) => {
    return `${index * 0.1}s`;
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto">
      <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
        {Array.from({ length: 6 }).map((_, guessIndex) => (
          <div key={guessIndex} className="flex justify-center gap-1 sm:gap-2">
            {Array.from({ length: 5 }).map((_, index) => {
              const letter = guesses[guessIndex]?.guess?.[index] || (guessIndex === guesses.length ? currentGuess[index] : '');
              const status = guesses[guessIndex]?.statuses?.[index];
              const isCurrentGuessLetter = guessIndex === guesses.length && currentGuess[index];
              const isRevealed = guessIndex < guesses.length;
              const isCurrentRow = guessIndex === guesses.length;

              return (
                <div
                  key={index}
                  className={clsx(
                    'relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border-2 rounded-lg sm:rounded-xl flex items-center justify-center text-lg sm:text-xl md:text-2xl font-bold transition-all duration-300 ease-out',
                    'bg-slate-800/50 border-slate-600 text-white',
                    isCurrentGuessLetter && 'border-blue-400 bg-blue-500/20 scale-105 animate-bounce-in',
                    letter && !isCurrentGuessLetter && 'scale-100',
                    !letter && 'scale-95',
                    isRevealed && 'animate-flip-in',
                    isCurrentRow && letter && 'animate-scale-in',
                    'hover:shadow-lg hover:shadow-blue-500/10',
                    'backdrop-blur-sm'
                  )}
                  style={{
                    animationDelay: isRevealed ? getAnimationDelay(index) : '0s'
                  }}
                >
                  <span className="relative z-10 aladin-regular text-xl sm:text-2xl md:text-3xl tracking-wider">
                    {letter}
                  </span>

                  {/* Glow effect for current letter */}
                  {isCurrentGuessLetter && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400/20 to-purple-400/20 animate-pulse-glow" />
                  )}

                  {/* Color indicators for letters */}
                  {isRevealed && letter && (
                    <div
                      className={`absolute inset-0 rounded-xl ${status === 'correct'
                        ? 'bg-emerald-600'
                        : status === 'present'
                          ? 'bg-amber-600'
                          : 'bg-slate-700'
                        }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputBoxes;
