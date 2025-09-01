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
      content: 'I\'m here to help you learn how to play this exciting word-guessing game. Let\'s go through it step by step!',
      action: 'Next',
      demo: false
    },
    {
      id: 'objective',
      title: 'Your Mission 🎯',
      content: 'You have 6 attempts to guess a 5-letter word. Each guess will give you clues about the correct word using color-coded feedback.',
      action: 'Show me how!',
      demo: false
    },
    {
      id: 'demo-setup',
      title: 'Let\'s Practice! 🎮',
      content: 'I\'ll show you an example with the word "HEART". Watch as I type "STARE", then click the Enter button to see the color feedback!',
      action: 'Start Demo',
      demo: true
    },
    {
      id: 'green-explanation',
      title: 'Green Letters 🟢',
      content: 'Perfect! Now you can see the colors. Green means the letter is in the correct position! In "STARE", the "A" and "R" are green because they\'re in the right spots in "HEART".',
      action: 'Next',
      demo: true
    },
    {
      id: 'yellow-explanation',
      title: 'Yellow Letters 🟡',
      content: 'Yellow means the letter is in the word but in the wrong position. The "T" and "E" in "STARE" is yellow because "T" and "E" exists in "HEART" but not in that spot.',
      action: 'Next',
      demo: true
    },
    {
      id: 'gray-explanation',
      title: 'Gray Letters ⚫',
      content: 'Gray means the letter is not in the word at all. "S" in "STARE" are gray because they\'re not in "HEART".',
      action: 'Next',
      demo: true
    },
    {
      id: 'keyboard-explanation',
      title: 'Keyboard Colors ⌨️',
      content: 'The on-screen keyboard will also change colors to help you remember which letters you\'ve tried and their status.',
      action: 'Next',
      demo: true
    },
    {
      id: 'strategy',
      title: 'Pro Tips 💡',
      content: 'Start with words that have common letters like E, A, R, T, S. Use the feedback to eliminate possibilities and narrow down your next guess!',
      action: 'Next',
      demo: false
    },
    {
      id: 'final',
      title: 'You\'re Ready! 🚀',
      content: 'That\'s it! You now know how to play WordPop. Remember: you have 6 tries, use the color feedback wisely, and most importantly - have fun!',
      action: 'Start Playing!',
      demo: false
    }
  ];

  const demoWord = 'HEART';
  const demoGuessWord = 'STARE';

  useEffect(() => {
    // Scroll to top when step changes
    const modalContent = document.querySelector('.tutorial-modal-content');
    if (modalContent) {
      modalContent.scrollTop = 0;
    }

    if (currentStep === 2) { // demo-setup step
      setShowDemo(true);
      setDemoGuess('');
      setDemoGuesses([]);
      setDemoCompleted(false);

      // Simulate typing the demo word
      let currentTyping = '';
      const typeInterval = setInterval(() => {
        if (currentTyping.length < demoGuessWord.length) {
          currentTyping += demoGuessWord[currentTyping.length];
          setDemoGuess(currentTyping);
        } else {
          clearInterval(typeInterval);
          // Don't automatically show result - wait for user to click Enter
        }
      }, 200);
    }
  }, [currentStep]);

  // Handle Enter click for demo
  const handleDemoEnter = () => {
    if (demoGuess === demoGuessWord) {
      // Calculate correct statuses for "STARE" vs "HEART"
      const guess = demoGuessWord.split(''); // STARE
      const target = demoWord.split(''); // HEART
      const statuses = Array(5).fill('absent');
      const targetUsed = Array(5).fill(false);

      // Pass 1: Mark correct (green)
      for (let i = 0; i < 5; i++) {
        if (guess[i] === target[i]) {
          statuses[i] = 'correct';
          targetUsed[i] = true;
        }
      }

      // Pass 2: Mark present (yellow)
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

      const demoResult = {
        guess: demoGuessWord,
        statuses: statuses
      };
      setDemoGuesses([demoResult]);
      setDemoGuess('');
      setDemoCompleted(true);
    }
  };

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const currentStepData = tutorialSteps[currentStep];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-white/10 max-w-2xl w-full max-h-[90vh] overflow-y-auto tutorial-modal-content">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white aladin-regular">
              {currentStepData.title}
            </h2>
            <button
              onClick={handleSkip}
              className="text-slate-400 hover:text-white transition-colors"
            >
              Skip Tutorial
            </button>
          </div>
          <div className="mt-2 flex gap-1">
            {tutorialSteps.map((_, index) => (
              <div
                key={index}
                className={clsx(
                  'h-1 rounded-full transition-all duration-300',
                  index <= currentStep ? 'bg-gradient-to-r from-purple-500 to-blue-500' : 'bg-slate-600'
                )}
                style={{ width: `${100 / tutorialSteps.length}%` }}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-slate-300 text-lg leading-relaxed mb-6 aladin-regular">
            {currentStepData.content}
          </p>

          {/* Demo Game Board */}
          {showDemo && currentStep < 7 && (
            <div className="mb-6 p-4 bg-slate-700/50 rounded-xl border border-white/10">
              <h3 className="text-white font-semibold mb-3 aladin-regular">Demo: Guess "HEART"</h3>
              <div className="space-y-2">
                {Array.from({ length: 6 }).map((_, guessIndex) => (
                  <div key={guessIndex} className="flex justify-center gap-1">
                    {Array.from({ length: 5 }).map((_, index) => {
                      let letter = '';
                      let status = null;
                      let isCurrentGuessLetter = false;
                      let isRevealed = false;

                      if (guessIndex === 0) {
                        if (demoGuesses.length > 0) {
                          // First row with revealed result
                          letter = demoGuesses[0].guess[index];
                          status = demoGuesses[0].statuses[index];
                          isRevealed = true;
                        } else if (demoGuess.length > 0) {
                          // First row with current typing
                          letter = demoGuess[index] || '';
                          isCurrentGuessLetter = !!demoGuess[index];
                        }
                      }

                      return (
                        <div
                          key={index}
                          className={clsx(
                            'w-10 h-10 border-2 rounded-lg flex items-center justify-center text-lg font-bold transition-all duration-300',
                            'bg-slate-800 border-slate-600 text-white',
                            isCurrentGuessLetter && 'border-blue-400 bg-blue-500/20',
                            isRevealed && letter && (
                              status === 'correct' ? 'bg-emerald-600 border-emerald-500' :
                                status === 'present' ? 'bg-amber-600 border-amber-500' :
                                  'bg-slate-700 border-slate-600'
                            )
                          )}
                          style={{
                            backgroundColor: isRevealed && letter ? (
                              status === 'correct' ? '#059669' :
                                status === 'present' ? '#d97706' :
                                  '#374151'
                            ) : undefined,
                            borderColor: isRevealed && letter ? (
                              status === 'correct' ? '#10b981' :
                                status === 'present' ? '#f59e0b' :
                                  '#4b5563'
                            ) : undefined
                          }}
                        >
                          <span className="aladin-regular">{letter}</span>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Demo Enter Button */}
              {demoGuess === demoGuessWord && demoGuesses.length === 0 && (
                <div className="mt-4 text-center">
                  <div className="mb-3 p-3 bg-emerald-500/20 border border-emerald-400/30 rounded-lg">
                    <p className="text-emerald-300 font-semibold aladin-regular">✨ Ready! Click Enter to see the magic!</p>
                  </div>
                  <button
                    onClick={handleDemoEnter}
                    className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg hover:from-emerald-500 hover:to-green-500 transition-all duration-300 aladin-regular animate-pulse shadow-lg hover:shadow-emerald-500/25"
                  >
                    🎯 ENTER
                  </button>
                </div>
              )}

              {/* Demo Completed Indicator */}
              {demoCompleted && (
                <div className="mt-4 text-center">
                  <div className="mb-3 p-3 bg-green-500/20 border border-green-400/30 rounded-lg">
                    <p className="text-green-300 font-semibold aladin-regular">🎉 Perfect! Now you can see the color feedback!</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Demo Keyboard */}
          {showDemo && currentStep >= 6 && currentStep < 7 && (
            <div className="mb-6 p-4 bg-slate-700/50 rounded-xl border border-white/10">
              <h3 className="text-white font-semibold mb-3 aladin-regular">Keyboard Feedback</h3>
              <div className="grid grid-cols-10 gap-1 text-xs">
                {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map(letter => (
                  <div
                    key={letter}
                    className={clsx(
                      'w-6 h-6 rounded flex items-center justify-center font-bold',
                      letter === 'A' ? 'bg-emerald-600' :
                        letter === 'R' ? 'bg-emerald-600' :
                          letter === 'T' ? 'bg-amber-600' :
                            letter === 'E' ? 'bg-amber-600' :
                              letter === 'S' ? 'bg-slate-700' :
                                'bg-slate-800'
                    )}
                  >
                    {letter}
                  </div>
                ))}
                {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map(letter => (
                  <div
                    key={letter}
                    className={clsx(
                      'w-6 h-6 rounded flex items-center justify-center font-bold',
                      letter === 'A' ? 'bg-emerald-600' :
                        letter === 'E' ? 'bg-emerald-600' :
                          letter === 'R' ? 'bg-amber-600' :
                            letter === 'S' ? 'bg-slate-700' :
                              letter === 'T' ? 'bg-slate-700' :
                                'bg-slate-800'
                    )}
                  >
                    {letter}
                  </div>
                ))}
                {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map(letter => (
                  <div
                    key={letter}
                    className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center font-bold"
                  >
                    {letter}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 flex justify-between items-center">
          <div className="text-slate-400 text-sm aladin-regular">
            Step {currentStep + 1} of {tutorialSteps.length}
          </div>
          <div className="flex gap-3">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-4 py-2 text-slate-400 hover:text-white transition-colors aladin-regular"
              >
                Previous
              </button>
            )}
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-500 hover:to-blue-500 transition-all duration-300 aladin-regular"
            >
              {currentStepData.action}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialModal;
