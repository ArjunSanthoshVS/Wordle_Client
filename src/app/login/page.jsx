"use client";

import { useState } from 'react';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState({ type: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    setIsSubmitting(true);

    try {
      const { data } = await axios.post('/api/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (data.success) {
        setMessage({ type: 'success', text: 'Login successful! Redirecting...' });
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      } else {
        setMessage({ type: 'error', text: data.message || 'Login failed' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Something went wrong' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/' });
  };

  return (
    <div className="h-[100dvh] max-h-[100dvh] w-full game-bg flex flex-col justify-between items-center overflow-hidden relative select-none px-4 py-4 safe-top safe-bottom">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-1/4 w-80 h-40 bg-sky-500/10 blur-3xl rounded-full" />
        <div className="absolute bottom-10 right-1/4 w-80 h-40 bg-purple-500/10 blur-3xl rounded-full" />
      </div>

      {/* Top Header */}
      <header className="relative z-10 text-center flex-shrink-0">
        <Link href="/" className="inline-flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-400 to-purple-600 flex items-center justify-center text-white font-display shadow-md">
            W
          </div>
          <h1 className="text-2xl sm:text-3xl font-display tracking-wider bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
            WORDPOP
          </h1>
        </Link>
      </header>

      {/* Centered Form Card */}
      <div className="relative z-10 w-full max-w-sm glass-panel-elevated rounded-2xl p-5 sm:p-6 my-auto shadow-2xl animate-scale-in">
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold font-display text-white">Welcome Back</h2>
          <p className="text-xs text-slate-400 mt-0.5">Sign in to save your streaks & stats</p>
        </div>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-slate-300 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-semibold text-slate-300 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 rounded-xl bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:from-sky-400 hover:to-purple-500 active:scale-95 disabled:opacity-60"
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="my-3.5 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-[11px] text-slate-500 font-medium">OR</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <button
          onClick={handleGoogleSignIn}
          type="button"
          className="w-full rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 text-xs font-semibold text-slate-200 transition-all flex items-center justify-center gap-2 active:scale-95"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z" />
            <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
            <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.1s.7 5.4 1.9 7.8l3.7-2.9z" />
            <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z" />
          </svg>
          Continue with Google
        </button>

        {message.text && (
          <p className={`mt-3 text-xs text-center font-medium ${message.type === 'error' ? 'text-rose-400' : 'text-emerald-400'}`}>
            {message.text}
          </p>
        )}

        <div className="mt-4 text-center text-xs text-slate-400">
          <p>
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-sky-400 hover:text-sky-300 font-semibold underline underline-offset-2">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 text-center text-[11px] text-slate-500 flex-shrink-0">
        <Link href="/terms" className="hover:text-slate-400 underline underline-offset-2">Terms & Conditions</Link>
      </footer>
    </div>
  );
}

