"use client";

import React, { useState, useEffect, useCallback } from 'react';
import InputBoxes from '../components/inputBoxes';
import Keyboard from '../components/keyboard';
import LoadingSpinner from '../components/loadingSpinner';
import TutorialModal from '../components/TutorialModal';
import TutorialTrigger from '../components/TutorialTrigger';
import TutorialButton from '../components/TutorialButton';
import { isValidWord, computeWordStatuses, getRandomTargetWord } from '../lib/dictionary';

export default function Home() {
  const [wordToGuess, setWordToGuess] = useState('');
  const [wordMeaning, setWordMeaning] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won', 'lost'
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('info'); // 'success', 'error', 'info'
  const [isLoading, setIsLoading] = useState(true);
  const [usedLetters, setUsedLetters] = useState({});
  const [isShaking, setIsShaking] = useState(false);
  const [stats, setStats] = useState({
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    bestStreak: 0
  });
  const [showTutorial, setShowTutorial] = useState(false);
  const [showTutorialTrigger, setShowTutorialTrigger] = useState(false);

  const loadStats = () => {
    try {
      const savedStats = localStorage.getItem('wordpopStats');
      if (savedStats) {
        setStats(JSON.parse(savedStats));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const checkFirstTimeUser = () => {
    try {
      const hasSeenTutorial = localStorage.getItem('wordpopTutorialSeen');
      if (!hasSeenTutorial) {
        setShowTutorialTrigger(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const selectNewWord = useCallback(() => {
    setIsLoading(true);
    const { word, meaning } = getRandomTargetWord();

    try {
      localStorage.setItem('wordpopData', JSON.stringify({
        word,
        meaning,
        timestamp: new Date().getTime()
      }));
    } catch (e) {
      console.error(e);
    }

    setWordToGuess(word);
    setWordMeaning(meaning);
    setIsLoading(false);
  }, []);

  const checkAndUpdateWord = useCallback(() => {
    try {
      const cached = localStorage.getItem('wordpopData');
      const now = new Date().getTime();

      if (cached) {
        const { word, meaning, timestamp } = JSON.parse(cached);
        const hoursPassed = (now - timestamp) / (1000 * 60 * 60);

        if (hoursPassed < 1 && word && word.length === 5) {
          setWordToGuess(word);
          setWordMeaning(meaning || '');
          setIsLoading(false);
          return;
        }
      }
    } catch (e) {
      console.error(e);
    }

    selectNewWord();
  }, [selectNewWord]);

  useEffect(() => {
    checkAndUpdateWord();
    loadStats();
    checkFirstTimeUser();
  }, [checkAndUpdateWord]);

  const saveStats = useCallback((newStats) => {
    try {
      localStorage.setItem('wordpopStats', JSON.stringify(newStats));
    } catch (e) {
      console.error(e);
    }
    setStats(newStats);
  }, []);

  const showTemporaryNotification = useCallback((message, type = 'info') => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
    const timer = setTimeout(() => setShowNotification(false), 2400);
    return () => clearTimeout(timer);
  }, []);

  const triggerShake = useCallback(() => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  }, []);

  const handleKeyPress = useCallback((letter) => {
    if (gameStatus !== 'playing') return;
    if (currentGuess.length < 5) {
      setCurrentGuess((prev) => prev + letter);
    }
  }, [currentGuess.length, gameStatus]);

  const handleEnter = useCallback(() => {
    if (gameStatus !== 'playing') return;
    
    if (currentGuess.length !== 5) {
      triggerShake();
      showTemporaryNotification('Word must be 5 letters!', 'error');
      return;
    }

    // Instant in-memory O(1) word lookup (< 0.01ms)
    if (!isValidWord(currentGuess)) {
      triggerShake();
      showTemporaryNotification('Not in word list!', 'error');
      return;
    }

    // Immediate synchronous computation (< 0.05ms)
    const upperGuess = currentGuess.toUpperCase();
    const statuses = computeWordStatuses(upperGuess, wordToGuess);

    // Update keyboard used letter colors
    const newUsedLetters = { ...usedLetters };
    for (let i = 0; i < 5; i++) {
      const letter = upperGuess[i];
      const status = statuses[i];

      if (status === 'correct') {
        newUsedLetters[letter] = 'correct';
      } else if (status === 'present' && newUsedLetters[letter] !== 'correct') {
        newUsedLetters[letter] = 'present';
      } else if (status === 'absent' && !newUsedLetters[letter]) {
        newUsedLetters[letter] = 'absent';
      }
    }

    // Atomic state update for instant visual response
    setUsedLetters(newUsedLetters);
    setGuesses(prev => [...prev, { guess: upperGuess, statuses }]);
    setCurrentGuess('');
    setCurrentAttempt(prev => prev + 1);

    if (upperGuess === wordToGuess) {
      setGameStatus('won');
      const newStats = {
        ...stats,
        gamesPlayed: stats.gamesPlayed + 1,
        gamesWon: stats.gamesWon + 1,
        currentStreak: stats.currentStreak + 1,
        bestStreak: Math.max(stats.bestStreak, stats.currentStreak + 1),
      };
      saveStats(newStats);
      showTemporaryNotification('🎉 Splendid! You solved it!', 'success');
    } else if (currentAttempt >= 5) {
      setGameStatus('lost');
      const newStats = {
        ...stats,
        gamesPlayed: stats.gamesPlayed + 1,
        currentStreak: 0,
      };
      saveStats(newStats);
      showTemporaryNotification(`Game Over! The word was "${wordToGuess}"`, 'error');
    }
  }, [currentGuess, currentAttempt, wordToGuess, stats, showTemporaryNotification, saveStats, usedLetters, gameStatus, triggerShake]);


  const handleDelete = useCallback(() => {
    if (gameStatus !== 'playing') return;
    setCurrentGuess((prev) => prev.slice(0, -1));
  }, [gameStatus]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (gameStatus !== 'playing' || showTutorial || showTutorialTrigger) return;

      const { key } = event;
      if (key === 'Enter') {
        event.preventDefault();
        handleEnter();
      } else if (key === 'Backspace') {
        event.preventDefault();
        handleDelete();
      } else if (/^[a-zA-Z]$/.test(key) && currentGuess.length < 5) {
        handleKeyPress(key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentGuess, gameStatus, handleEnter, handleDelete, handleKeyPress, showTutorial, showTutorialTrigger]);

  const handleReset = () => {
    setUsedLetters({});
    setGuesses([]);
    setCurrentGuess('');
    setCurrentAttempt(0);
    setGameStatus('playing');
    selectNewWord();
  };

  const handleTutorialComplete = () => {
    setShowTutorial(false);
    setShowTutorialTrigger(false);
    try {
      localStorage.setItem('wordpopTutorialSeen', 'true');
    } catch (e) {
      console.error(e);
    }
  };

  const handleStartTutorial = () => {
    setShowTutorialTrigger(false);
    setShowTutorial(true);
  };

  const handleSkipTutorial = () => {
    setShowTutorialTrigger(false);
    try {
      localStorage.setItem('wordpopTutorialSeen', 'true');
    } catch (e) {
      console.error(e);
    }
  };

  const winRate = stats.gamesPlayed > 0 ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) : 0;

  return (
    <div className="h-[100dvh] max-h-[100dvh] w-screen overflow-hidden flex flex-col justify-between relative bg-game-board font-sans">
      {/* Background Subtle Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-96 h-44 bg-sky-500/10 blur-3xl rounded-full" />
        <div className="absolute bottom-10 right-4 w-72 h-40 bg-purple-500/10 blur-3xl rounded-full" />
      </div>

      {/* Tutorial Modals */}
      {showTutorialTrigger && (
        <TutorialTrigger
          onStartTutorial={handleStartTutorial}
          onSkipTutorial={handleSkipTutorial}
        />
      )}

      {showTutorial && (
        <TutorialModal
          isOpen={showTutorial}
          onClose={() => setShowTutorial(false)}
          onComplete={handleTutorialComplete}
        />
      )}

      {/* Toast Notification Banner */}
      {showNotification && (
        <div className="fixed top-3 sm:top-5 left-1/2 transform -translate-x-1/2 z-50 animate-bounce-subtle pointer-events-none">
          <div className="px-4 py-2 rounded-xl bg-slate-900/90 border border-white/10 shadow-2xl backdrop-blur-md flex items-center gap-2 text-xs sm:text-sm font-medium">
            {notificationType === 'success' && <span className="text-emerald-400">✨</span>}
            {notificationType === 'error' && <span className="text-rose-400">⚠️</span>}
            {notificationType === 'info' && <span className="text-sky-400">💡</span>}
            <span className="text-white">{notificationMessage}</span>
          </div>
        </div>
      )}

      {/* Top Header Bar */}
      <header className="relative z-10 w-full px-3 sm:px-6 py-2.5 sm:py-3 border-b border-white/5 bg-slate-900/40 backdrop-blur-md safe-top flex-shrink-0">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-400 to-purple-600 flex items-center justify-center text-base shadow-md shadow-sky-500/20 font-display text-white">
              W
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-display tracking-wider bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent leading-none">
                WORDPOP
              </h1>
            </div>
          </div>

          {/* Header Controls: Streak, Help, and New Game buttons with identical height & padding */}
          <div className="flex items-center gap-2">
            {/* Streak Badge */}
            <div className="h-9 px-3 bg-slate-800/80 border border-white/10 rounded-xl text-xs font-semibold text-slate-200 shadow-md backdrop-blur-md flex items-center justify-center gap-1.5">
              <span className="text-amber-400 text-sm">🔥</span>
              <span>{stats.currentStreak} <span className="hidden sm:inline">Streak</span></span>
            </div>

            {/* Help/Tutorial Button */}
            <TutorialButton onClick={() => setShowTutorial(true)} />
            
            {/* New Game Button */}
            <button
              type="button"
              onClick={handleReset}
              title="New Word"
              className="h-9 px-3 bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl border border-white/10 shadow-md backdrop-blur-md transition-all active:scale-95 flex items-center justify-center gap-1.5 text-xs font-semibold"
              aria-label="New Word"
            >
              <span className="text-sm">🔄</span>
              <span>New</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Play Area */}
      <main className="relative z-10 flex-1 min-h-0 w-full max-w-4xl mx-auto px-2 sm:px-4 py-1 sm:py-2 flex flex-col justify-center items-center">
        {isLoading ? (
          <LoadingSpinner message="Generating next puzzle..." />
        ) : (
          <div className="w-full h-full flex flex-col justify-evenly items-center">
            {/* Input Grid Container */}
            <div className="flex-shrink-0 my-auto py-1">
              <InputBoxes
                guesses={guesses}
                wordToGuess={wordToGuess}
                currentGuess={currentGuess}
                isShaking={isShaking}
              />
            </div>

            {/* Keyboard or Victory Overlay */}
            <div className="w-full flex-shrink-0 my-auto pt-1 pb-1">
              {gameStatus === 'playing' ? (
                <Keyboard
                  onKeyPress={handleKeyPress}
                  onEnter={handleEnter}
                  onDelete={handleDelete}
                  usedLetters={usedLetters}
                />
              ) : (
                /* Result Card */
                <div className="w-full max-w-md mx-auto p-4 sm:p-5 glass-panel-elevated rounded-2xl text-center animate-scale-in">
                  <div className="text-3xl sm:text-4xl mb-1 animate-bounce-subtle">
                    {gameStatus === 'won' ? '🏆' : '🎯'}
                  </div>
                  
                  <h2 className="text-xl sm:text-2xl font-bold font-display text-white mb-1">
                    {gameStatus === 'won' ? 'Spectacular Win!' : 'Game Over'}
                  </h2>

                  <div className="my-2 py-2 px-3 bg-slate-900/80 rounded-xl border border-white/10 text-left">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-semibold text-slate-400 uppercase">Secret Word:</span>
                      <span className="text-lg font-bold text-sky-400 font-display tracking-wider">{wordToGuess}</span>
                    </div>
                    {wordMeaning && (
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed line-clamp-2">
                        {wordMeaning}
                      </p>
                    )}
                  </div>

                  {/* Compact Stats Row */}
                  <div className="grid grid-cols-3 gap-2 my-3">
                    <div className="bg-slate-800/60 rounded-xl p-2 border border-white/5">
                      <div className="text-base font-bold text-white">{stats.gamesPlayed}</div>
                      <div className="text-[10px] text-slate-400 uppercase font-medium">Played</div>
                    </div>
                    <div className="bg-slate-800/60 rounded-xl p-2 border border-white/5">
                      <div className="text-base font-bold text-emerald-400">{winRate}%</div>
                      <div className="text-[10px] text-slate-400 uppercase font-medium">Win Rate</div>
                    </div>
                    <div className="bg-slate-800/60 rounded-xl p-2 border border-white/5">
                      <div className="text-base font-bold text-amber-400">{stats.currentStreak}</div>
                      <div className="text-[10px] text-slate-400 uppercase font-medium">Streak</div>
                    </div>
                  </div>

                  <button
                    onClick={handleReset}
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 hover:from-sky-400 hover:to-purple-500 text-white font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-indigo-500/25 active:scale-95 transition-all duration-150"
                  >
                    Play Another Word ⚡
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Sleek Bottom Bar */}
      <footer className="relative z-10 w-full py-1 text-center text-[11px] text-slate-500 safe-bottom flex-shrink-0 bg-slate-900/20">
        <span>WordPop • 5-letter daily word puzzle</span>
      </footer>
    </div>
  );
}

