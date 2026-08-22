import React from 'react';
import clsx from 'clsx';

const Keyboard = ({ onKeyPress, onEnter, onDelete, usedLetters = {}, isSubmitting = false }) => {
  const row1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  const row2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
  const row3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

  const getKeyStyle = (letter) => {
    const status = usedLetters[letter];
    if (status === 'correct') {
      return "bg-gradient-to-b from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white border-emerald-400/50 shadow-[0_3px_0_0_#065f46] active:shadow-none";
    }
    if (status === 'present') {
      return "bg-gradient-to-b from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white border-amber-400/50 shadow-[0_3px_0_0_#92400e] active:shadow-none";
    }
    if (status === 'absent') {
      return "bg-slate-800/80 hover:bg-slate-700/80 text-slate-400 hover:text-slate-200 border-slate-700/70 shadow-[0_2.5px_0_0_#090d16] active:shadow-none";
    }
    return "bg-gradient-to-b from-slate-700/90 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-slate-100 border-slate-600/40 shadow-[0_3px_0_0_#0f172a] active:shadow-none";
  };

  const renderKeyButton = (letter) => {
    const status = usedLetters[letter];
    return (
      <button
        key={letter}
        type="button"
        onClick={() => !isSubmitting && onKeyPress(letter)}
        disabled={isSubmitting}
        aria-label={status ? `${letter}, ${status}` : letter}
        className={clsx(
          "key-cap flex-1 max-w-[42px] h-11 sm:h-12 md:h-13 rounded-lg sm:rounded-xl",
          "font-semibold text-sm sm:text-base md:text-lg flex items-center justify-center border transition-all duration-75",
          getKeyStyle(letter)
        )}
      >
        {letter}
      </button>
    );
  };

  return (
    <div className="w-full max-w-lg lg:max-w-xl mx-auto px-1 sm:px-2 select-none flex flex-col gap-1.5 sm:gap-2">
      {/* Row 1 */}
      <div className="flex justify-center gap-1 sm:gap-1.5 w-full">
        {row1.map(renderKeyButton)}
      </div>

      {/* Row 2 */}
      <div className="flex justify-center gap-1 sm:gap-1.5 w-full px-[3%] sm:px-[4%]">
        {row2.map(renderKeyButton)}
      </div>

      {/* Row 3 with Enter and Delete */}
      <div className="flex justify-center gap-1 sm:gap-1.5 w-full">
        {/* Enter Key */}
        <button
          type="button"
          onClick={() => !isSubmitting && onEnter()}
          disabled={isSubmitting}
          aria-label="Enter"
          className={clsx(
            "key-cap flex-[1.4] max-w-[66px] sm:max-w-[76px] h-11 sm:h-12 md:h-13 rounded-lg sm:rounded-xl",
            "bg-gradient-to-b from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500",
            "text-white font-bold text-xs sm:text-sm md:text-base flex items-center justify-center",
            "border border-indigo-400/40 shadow-[0_3px_0_0_#312e81] active:shadow-none transition-all duration-75",
            isSubmitting && "opacity-70"
          )}
        >
          <span>ENTER</span>
        </button>

        {/* Row 3 Letters */}
        {row3.map(renderKeyButton)}

        {/* Backspace Key */}
        <button
          type="button"
          onClick={() => !isSubmitting && onDelete()}
          disabled={isSubmitting}
          aria-label="Delete"
          className={clsx(
            "key-cap flex-[1.3] max-w-[62px] sm:max-w-[72px] h-11 sm:h-12 md:h-13 rounded-lg sm:rounded-xl",
            "bg-gradient-to-b from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500",
            "text-white font-bold text-sm sm:text-base flex items-center justify-center",
            "border border-rose-400/40 shadow-[0_3px_0_0_#881337] active:shadow-none transition-all duration-75",
            isSubmitting && "opacity-70"
          )}
          title="Delete"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414-6.414A2 2 0 0110.828 5H20a2 2 0 012 2v10a2 2 0 01-2 2h-9.172a2 2 0 01-1.414-.586L3 12z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default React.memo(Keyboard);