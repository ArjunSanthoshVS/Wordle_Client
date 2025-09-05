"use client"

import React, { useState, useEffect, useCallback } from 'react';
import InputBoxes from '../components/inputBoxes';
import Keyboard from '../components/keyboard';
import LoadingSpinner from '../components/loadingSpinner';
import TutorialModal from '../components/TutorialModal';
import TutorialTrigger from '../components/TutorialTrigger';
import TutorialButton from '../components/TutorialButton';
import wordsList from '../words.json';
// Removed external dictionary API usage; validation uses local words.json

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stats, setStats] = useState({
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    bestStreak: 0
  });
  const [showTutorial, setShowTutorial] = useState(false);
  const [showTutorialTrigger, setShowTutorialTrigger] = useState(false);

  const loadStats = () => {
    const savedStats = localStorage.getItem('wordpopStats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  };

  const checkFirstTimeUser = () => {
    const hasSeenTutorial = localStorage.getItem('wordpopTutorialSeen');
    if (!hasSeenTutorial) {
      setShowTutorialTrigger(true);
    }
  };

  const checkAndUpdateWord = useCallback(async () => {
    const cached = localStorage.getItem('wordpopData');
    const now = new Date().getTime();

    if (cached) {
      const { word, meaning, timestamp } = JSON.parse(cached);
      const hoursPassed = (now - timestamp) / (1000 * 60 * 60);

      if (hoursPassed < 1) {
        setWordToGuess(word);
        setWordMeaning(meaning);
        setIsLoading(false);
        return;
      }
    }

    // Get new word if cache expired or doesn't exist
    await selectNewWord();
  }, []);

  useEffect(() => {
    checkAndUpdateWord();
    loadStats();
    checkFirstTimeUser();
  }, [checkAndUpdateWord]);

  const saveStats = useCallback((newStats) => {
    localStorage.setItem('wordpopStats', JSON.stringify(newStats));
    setStats(newStats);
  }, []);

  const selectNewWord = async () => {
    const words = (wordsList.words || []).filter(w => (w || '').length === 5);

    // Get random word and its meaning
    const randomWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
    const lower = randomWord.toLowerCase();
    const meaning = (wordsList.meanings?.[lower]) || (wordsList.meanings_extra?.[lower]) || '';

    // Cache the word with timestamp and meaning
    localStorage.setItem('wordpopData', JSON.stringify({
      word: randomWord,
      meaning: meaning,
      timestamp: new Date().getTime()
    }));

    setWordToGuess(randomWord);
    setWordMeaning(meaning);
    setIsLoading(false);
  };


  const showTemporaryNotification = useCallback((message, type = 'info') => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  }, []);

  // Validate a word using dictionaryapi.dev
  const validateWordWithDictionaryAPI = async (word) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word.toLowerCase())}`,
        { signal: controller.signal }
      );
      clearTimeout(timeoutId);
      if (res.ok) return true; // 200 -> valid word
      if (res.status === 404) return false; // not found -> invalid
      // For other status codes, treat as temporary failure
      throw new Error(`Dictionary API error: ${res.status}`);
    } catch (err) {
      clearTimeout(timeoutId);
      // Network/timeout/API error – surface a friendly error to user upstream
      throw err;
    }
  };

  const handleKeyPress = useCallback((letter) => {
    if (isSubmitting || gameStatus !== 'playing') return;
    if (currentGuess.length < 5) {
      setCurrentGuess((prev) => prev + letter);
    }
  }, [currentGuess.length, isSubmitting, gameStatus]);

  // Inside handleEnter
  const handleEnter = useCallback(async () => {
    if (isSubmitting || gameStatus !== 'playing') return;
    setIsSubmitting(true);
    if (currentGuess.length !== 5) {
      showTemporaryNotification('Word must be 5 letters!', 'error');
      setIsSubmitting(false);
      return;
    }

    try {
      // Validate using dictionary API
      const isValid = await validateWordWithDictionaryAPI(currentGuess);
      if (!isValid) {
        showTemporaryNotification('Not a valid English word.', 'error');
        return;
      }

      const guess = currentGuess.toUpperCase().split('');
      const target = wordToGuess.toUpperCase().split('');
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

      // Update used letters for keyboard coloring
      const newUsedLetters = { ...usedLetters };
      for (let i = 0; i < 5; i++) {
        const letter = guess[i];
        const status = statuses[i];

        if (status === 'correct') {
          newUsedLetters[letter] = 'correct';
        } else if (status === 'present' && newUsedLetters[letter] !== 'correct') {
          newUsedLetters[letter] = 'present';
        } else if (status === 'absent' && !newUsedLetters[letter]) {
          newUsedLetters[letter] = 'absent';
        }
      }

      setUsedLetters(newUsedLetters);
      setGuesses(prev => [...prev, { guess: currentGuess, statuses }]);

      if (currentGuess === wordToGuess) {
        setGameStatus('won');
        const newStats = {
          ...stats,
          gamesPlayed: stats.gamesPlayed + 1,
          gamesWon: stats.gamesWon + 1,
          currentStreak: stats.currentStreak + 1,
          bestStreak: Math.max(stats.bestStreak, stats.currentStreak + 1),
        };
        saveStats(newStats);
        showTemporaryNotification(`🎉 Congratulations! You found the word!`, 'success');
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

      setCurrentGuess('');
      setCurrentAttempt(prev => prev + 1);
    } catch (error) {
      showTemporaryNotification('Validation service unavailable. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  }, [currentGuess, currentAttempt, guesses, wordToGuess, stats, showTemporaryNotification, saveStats, usedLetters, isSubmitting, gameStatus]);

  const handleDelete = useCallback(() => {
    if (isSubmitting || gameStatus !== 'playing') return;
    setCurrentGuess((prev) => prev.slice(0, -1));
  }, [isSubmitting, gameStatus]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (gameStatus !== 'playing' || isSubmitting) return;

      const { key } = event;
      if (key === 'Enter') {
        handleEnter();
      } else if (key === 'Backspace') {
        handleDelete();
      } else if (/^[a-zA-Z]$/.test(key) && currentGuess.length < 5) {
        handleKeyPress(key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentGuess, gameStatus, handleEnter, handleDelete, handleKeyPress, isSubmitting]);

  const handleReset = () => {
    setUsedLetters({});
    setGuesses([]);
    setCurrentGuess('');
    setCurrentAttempt(0);
    setGameStatus('playing');
    setIsLoading(true);
    selectNewWord(); // Always select a new word instead of checking cache
  };

  const handleTutorialComplete = () => {
    setShowTutorial(false);
    setShowTutorialTrigger(false);
    localStorage.setItem('wordpopTutorialSeen', 'true');
  };

  const handleStartTutorial = () => {
    setShowTutorialTrigger(false);
    setShowTutorial(true);
  };

  const handleSkipTutorial = () => {
    setShowTutorialTrigger(false);
    localStorage.setItem('wordpopTutorialSeen', 'true');
  };

  const getNotificationStyles = () => {
    const baseStyles = "fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-4 sm:px-6 py-3 sm:py-4 rounded-xl shadow-2xl transition-all duration-500 backdrop-blur-sm max-w-[90vw] sm:max-w-md";

    switch (notificationType) {
      case 'success':
        return `${baseStyles} bg-gradient-to-r from-emerald-500 to-green-500 text-white border border-emerald-400/30`;
      case 'error':
        return `${baseStyles} bg-gradient-to-r from-red-500 to-pink-500 text-white border border-red-400/30`;
      default:
        return `${baseStyles} bg-gradient-to-r from-blue-500 to-purple-500 text-white border border-blue-400/30`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%239C92AC&quot; fill-opacity=&quot;0.05&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>

      {/* Tutorial Components */}
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

      {/* Tutorial Button for returning users */}
      {!showTutorialTrigger && !showTutorial && gameStatus === 'playing' && (
        <TutorialButton onClick={() => setShowTutorial(true)} />
      )}

      {/* Header */}
      <header className="relative z-10 pt-6 sm:pt-10 md:pt-14 pb-4 sm:pb-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="text-center">
            {/* Main Title */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl aladin-regular 
                   bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
                   bg-clip-text text-transparent drop-shadow-lg 
                   animate-slide-up"
            >
              WORDPOP
            </h1>

            {/* Subtitle */}
            <p
              className="text-slate-400 text-base sm:text-lg md:text-xl lg:text-2xl 
                   aladin-regular mt-2 sm:mt-3 animate-fade-in"
              style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
            >
              🎯 Guess the word in 6 tries!
            </p>
          </div>
        </div>
      </header>

      {/* Notification */}
      <div
        className={`${getNotificationStyles()} ${showNotification ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
      >
        <div className="flex items-center gap-2 sm:gap-3">
          {notificationType === 'success' && <span className="text-xl sm:text-2xl">🎉</span>}
          {notificationType === 'error' && <span className="text-xl sm:text-2xl">❌</span>}
          {notificationType === 'info' && <span className="text-xl sm:text-2xl">💡</span>}
          <span className="font-semibold aladin-regular text-sm sm:text-base md:text-lg">{notificationMessage}</span>
        </div>
      </div>

      {/* Main Game Container */}
      <main className="relative z-10 flex-1 flex items-center py-4 sm:py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 w-full">
          {isLoading ? (
            <LoadingSpinner message="Loading new word..." className="aladin-regular" />
          ) : (
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center min-h-[calc(100vh-200px)] sm:min-h-[calc(100vh-250px)] lg:min-h-[calc(100vh-300px)]">
              {/* Left Column - Game Board */}
              <div className="flex flex-col items-center w-full">
                <div className="w-full max-w-sm sm:max-w-md">
                  <InputBoxes
                    guesses={guesses}
                    wordToGuess={wordToGuess}
                    currentGuess={currentGuess}
                  />
                </div>
              </div>

              {/* Right Column - Keyboard or Game Status */}
              <div className="flex flex-col items-center w-full">
                {gameStatus === 'playing' ? (
                  /* Keyboard */
                  <div className="w-full max-w-lg sm:max-w-xl lg:max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.3s' }}>
                    <Keyboard
                      onKeyPress={handleKeyPress}
                      onEnter={handleEnter}
                      onDelete={handleDelete}
                      usedLetters={usedLetters}
                      isSubmitting={isSubmitting}
                    />
                  </div>
                ) : (
                  /* Game Status Card */
                  <div className="w-full max-w-sm sm:max-w-md p-4 sm:p-6 md:p-8 glass rounded-2xl border border-white/10 animate-slide-up text-center">
                    <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6">
                      {gameStatus === 'won' ? '🎉' : '😔'}
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl aladin-regular text-white mb-4 sm:mb-6">
                      {gameStatus === 'won' ? 'You Won!' : 'Game Over'}
                    </h2>
                    <div className="space-y-3 sm:space-y-4 text-sm sm:text-base md:text-lg text-slate-300 mb-6 sm:mb-8 aladin-regular">
                      <p><span className="font-semibold">Word:</span> {wordToGuess}</p>
                      <p><span className="font-semibold">Meaning:</span> {wordMeaning}</p>
                    </div>
                    <button
                      onClick={handleReset}
                      className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl text-base sm:text-lg md:text-xl aladin-regular hover:from-purple-500 hover:to-blue-500 transition-all duration-300 active:scale-95 shadow-lg hover:shadow-purple-500/25"
                    >
                      Play Again
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-8 sm:mt-12 pb-6 sm:pb-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="text-center text-slate-500 text-sm sm:text-base aladin-regular">
            <p className="px-2">Challenge your vocabulary • Improve your word skills</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
