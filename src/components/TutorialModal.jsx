import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

const TutorialModal = ({ isOpen, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [demoGuess, setDemoGuess] = useState('');
  const [demoGuesses, setDemoGuesses] = useState([]);
  const [showDemo, setShowDemo] = useState(false);
  const [demoCompleted, setDemoCompleted] = useState(false);

  const tutorialSteps = [
    {
      id: 'welcome',
      title: 'Welcome to WordPop! 🎉',
      content: "Guess the hidden 5-letter word in 6 attempts. After each guess, the tile colors will pop to reveal how close you are!",
      action: 'Next',
      demo: false
    },
    {
      id: 'objective',
      title: 'Your Mission 🎯',
      content: 'Each guess must be a valid 5-letter English word. Hit Enter to submit and watch the clues unfold.',
      action: 'Show me how!',
      demo: false
    },
    {
      id: 'demo-setup',
      title: 'Interactive Practice 🎮',
      content: 'Here the secret word is "HEART". We entered "STARE". Tap the ENTER button below to see the color clues!',
      action: 'Next step',
      demo: true
    },
    {
      id: 'green-explanation',
      title: 'Green = Spot On! 🟢',
      content: 'Green means the letter is in the word AND in the exact correct position! (In STARE, "A" and "R" are in the exact spots in HEART).',
      action: 'Next',
      demo: true
    },
    {
      id: 'yellow-explanation',
      title: 'Yellow = In The Word 🟡',
      content: 'Yellow means the letter is in the secret word, but belongs in a different position. ("T" and "E" exist in HEART but in different spots).',
      action: 'Next',
      demo: true
    },
    {
      id: 'gray-explanation',
      title: 'Gray = Not In Word 🔘',
      content: 'Gray means the letter is not anywhere in the secret word. ("S" does not appear in HEART at all).',
      action: 'Next',
      demo: true
    },
    {
      id: 'keyboard-explanation',
      title: 'Smart Keyboard ⌨️',
      content: 'The on-screen keyboard also tracks your tested letters in real-time, making it effortless to see remaining possibilities!',
      action: 'Next',
      demo: true
    },
    {
      id: 'strategy',
      title: 'Pro Player Tip 💡',
      content: 'Start with vowel-rich starter words like CRANE, AUDIO, or STARE to quickly reveal key letters!',
      action: 'Next',
      demo: false
    },
    {
      id: 'final',
      title: "You're Ready to Pop! 🚀",
      content: 'You are all set. Test your vocabulary, build your daily streak, and have fun!',
      action: 'Start Playing!',
      demo: false
    }
  ];

  const demoWord = 'HEART';
  const demoGuessWord = 'STARE';

  useEffect(() => {
    if (currentStep === 2) {
      setShowDemo(true);
      setDemoGuess('');
      setDemoGuesses([]);
      setDemoCompleted(false);

      let currentTyping = '';
      const typeInterval = setInterval(() => {
        if (currentTyping.length < demoGuessWord.length) {
          currentTyping += demoGuessWord[currentTyping.length];
          setDemoGuess(currentTyping);
        } else {
          clearInterval(typeInterval);
        }
      }, 150);

      return () => clearInterval(typeInterval);
    }
  }, [currentStep]);

  const handleDemoEnter = () => {
    const guess = demoGuessWord.split('');
    const target = demoWord.split('');
    const statuses = Array(5).fill('absent');
    const targetUsed = Array(5).fill(false);

    for (let i = 0; i < 5; i++) {
      if (guess[i] === target[i]) {
        statuses[i] = 'correct';
        targetUsed[i] = true;
      }
    }

    for (let i = 0; i < 5; i++) {
      if (statuses[i] === 'correct') continue;
      for (let j = 0; j < 5; j++) {
        if (!targetUsed[j] && guess[i] === target[j]) {
          statuses[i] = 'present';
          targetUsed[j] = true;
          break;
        }
      }
    }

    setDemoGuesses([{ guess: demoGuessWord, statuses }]);
    setDemoGuess('');
    setDemoCompleted(true);
  };

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  if (!isOpen) return null;

  const currentStepData = tutorialSteps[currentStep];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4 select-none">
      <div className="bg-[#121826] border border-white/10 rounded-2xl max-w-lg w-full max-h-[92dvh] flex flex-col shadow-2xl overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
            <h2 className="text-lg sm:text-xl font-bold text-white font-display">
              {currentStepData.title}
            </h2>
          </div>
          <button
            onClick={onClose || onComplete}
            className="text-xs font-semibold text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            Skip
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="w-full bg-slate-800 h-1">
          <div
            className="bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 h-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }}
          />
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 flex flex-col justify-between">
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-4">
            {currentStepData.content}
          </p>

          {/* Interactive Mini Demo */}
          {showDemo && currentStep >= 2 && currentStep <= 6 && (
            <div className="my-2 p-3 sm:p-4 bg-slate-900/80 rounded-xl border border-white/10 flex flex-col items-center">
              <div className="text-xs font-semibold text-slate-400 mb-2.5 uppercase tracking-wider">
                Target: <span className="text-sky-300 font-bold">H E A R T</span>
              </div>
              
              <div className="flex justify-center gap-1.5 sm:gap-2 mb-3">
                {Array.from({ length: 5 }).map((_, index) => {
                  let letter = '';
                  let status = null;

                  if (demoGuesses.length > 0) {
                    letter = demoGuesses[0].guess[index];
                    status = demoGuesses[0].statuses[index];
                  } else {
                    letter = demoGuess[index] || '';
                  }

                  let bgClass = "bg-slate-800 border-slate-700 text-slate-200";
                  if (status === 'correct') bgClass = "bg-emerald-500 border-emerald-400 text-white";
                  if (status === 'present') bgClass = "bg-amber-500 border-amber-400 text-white";
                  if (status === 'absent') bgClass = "bg-slate-700 border-slate-600 text-slate-400";

                  return (
                    <div
                      key={index}
                      className={clsx(
                        "w-10 h-10 sm:w-12 sm:h-12 border-2 rounded-xl flex items-center justify-center font-display text-xl font-bold transition-all duration-200",
                        bgClass
                      )}
                    >
                      {letter}
                    </div>
                  );
                })}
              </div>

              {/* Demo Enter Button */}
              {demoGuess === demoGuessWord && demoGuesses.length === 0 && (
                <button
                  onClick={handleDemoEnter}
                  className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-all duration-150 animate-bounce-subtle"
                >
                  ⚡ Press ENTER to reveal clues
                </button>
              )}

              {demoCompleted && (
                <div className="text-emerald-400 text-xs font-semibold flex items-center gap-1.5 animate-scale-in">
                  <span>✓</span> Feedback revealed! Green is correct, Yellow is wrong spot.
                </div>
              )}
            </div>
          )}

          {/* Footer Controls */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
            <span className="text-xs text-slate-400 font-medium">
              Step {currentStep + 1} of {tutorialSteps.length}
            </span>
            <div className="flex gap-2">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  Back
                </button>
              )}
              <button
                type="button"
                onClick={handleNext}
                className="px-5 py-2 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-95"
              >
                {currentStepData.action}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialModal;

