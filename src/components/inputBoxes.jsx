import React from 'react';
import clsx from 'clsx';

const InputBoxes = ({ guesses = [], currentGuess = '', isShaking = false }) => {
  return (
    <div className="w-full flex justify-center items-center select-none">
      <div className={clsx("flex flex-col gap-1.5 sm:gap-2.5", isShaking && "animate-shake")}>
        {Array.from({ length: 6 }).map((_, rowIndex) => {
          const isCurrentRow = rowIndex === guesses.length;
          const rowGuess = guesses[rowIndex]?.guess || (isCurrentRow ? currentGuess : '');
          const rowStatuses = guesses[rowIndex]?.statuses;
          const isRevealed = rowIndex < guesses.length;
          const isLatestRevealed = rowIndex === guesses.length - 1;

          return (
            <div key={rowIndex} className="flex justify-center gap-1.5 sm:gap-2.5">
              {Array.from({ length: 5 }).map((_, colIndex) => {
                const letter = rowGuess?.[colIndex] || '';
                const status = rowStatuses?.[colIndex];
                const isCurrentLetter = isCurrentRow && colIndex === currentGuess.length - 1 && letter;
                const isNextEmpty = isCurrentRow && colIndex === currentGuess.length;

                // Color mappings
                let tileBg = "bg-slate-800/40 border-slate-700/60 text-slate-100 shadow-inner";
                let flipStyle = {};

                if (isRevealed && status) {
                  if (status === 'correct') {
                    tileBg = "bg-gradient-to-b from-emerald-500 to-emerald-600 border-emerald-400/80 text-white shadow-lg shadow-emerald-500/20";
                  } else if (status === 'present') {
                    tileBg = "bg-gradient-to-b from-amber-500 to-amber-600 border-amber-400/80 text-white shadow-lg shadow-amber-500/20";
                  } else {
                    tileBg = "bg-slate-800/90 border-slate-700 text-slate-400";
                  }

                  // Only animate the flip on the latest submitted row
                  if (isLatestRevealed) {
                    flipStyle = {
                      animation: `tileFlipIn 0.45s ease-in-out forwards`,
                      animationDelay: `${colIndex * 100}ms`,
                    };
                  }
                } else if (letter) {
                  tileBg = "bg-slate-800/80 border-slate-500 text-white shadow-md border-2";
                }

                return (
                  <div
                    key={colIndex}
                    style={flipStyle}
                    className={clsx(
                      "relative flex items-center justify-center rounded-xl font-bold transition-all duration-150",
                      "w-[min(12.2vw,54px)] h-[min(12.2vw,54px)] sm:w-14 sm:h-14 md:w-15 md:h-15 lg:w-16 lg:h-16",
                      "border-2",
                      tileBg,
                      isCurrentLetter && "border-sky-400/90 animate-tile-pop shadow-[0_0_12px_rgba(56,189,248,0.35)]",
                      isNextEmpty && "border-slate-500/70",
                    )}
                  >
                    <span
                      className={clsx(
                        "font-display text-xl sm:text-2xl md:text-3xl tracking-wide",
                        isRevealed ? "text-white drop-shadow-sm" : "text-slate-100"
                      )}
                    >
                      {letter}
                    </span>
                    
                    {/* Top glass highlight reflection on revealed or filled tiles */}
                    {(isRevealed || letter) && (
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 rounded-t-lg bg-gradient-to-b from-white/15 to-transparent" />
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(InputBoxes);


