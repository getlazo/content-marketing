'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import AnimatedBackground from './AnimatedBackground';

interface PasswordProtectionProps {
  children: React.ReactNode;
}

export default function PasswordProtection({ children }: PasswordProtectionProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Récupérer le mot de passe depuis les variables d'environnement
  const correctPassword = process.env.NEXT_PUBLIC_APP_PASSWORD || 'lazo2024';

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà authentifié
    const authStatus = sessionStorage.getItem('lazo-authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === correctPassword) {
      sessionStorage.setItem('lazo-authenticated', 'true');
      setIsAuthenticated(true);
      setError('');
    } else {
             setError('Incorrect password');
      setPassword('');
      // Animation d'erreur
      setTimeout(() => setError(''), 3000);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-transparent relative">
        <AnimatedBackground />
        <div className="absolute inset-0 flex items-center justify-center z-20 backdrop-blur-sm bg-white/20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-transparent relative overflow-hidden">
      <AnimatedBackground />
      
      {/* Overlay backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-pink-100/30 backdrop-blur-sm z-10" />
      
      {/* Main popup container */}
      <div className="relative z-20 w-full max-w-md mx-4">
        {/* Glassmorphism popup */}
        <div className="bg-white/20 backdrop-blur-2xl rounded-3xl border border-white/30 shadow-2xl p-8 transform transition-all duration-500 hover:scale-[1.02]">
          
          {/* Logo and title */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/30 rounded-2xl backdrop-blur-sm border border-white/40">
                <Image src="/logoNew.webp" alt="Lazo Logo" width={60} height={60} className="drop-shadow-lg" />
              </div>
            </div>
                         <h1 className="text-2xl md:text-3xl font-black text-gray-800 mb-2 tracking-tight">
               Secure Access
             </h1>
             <p className="text-gray-600 font-medium">
               Enter password to continue
             </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Password input */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                                 placeholder="Password"
                className="w-full px-6 py-4 bg-white/30 backdrop-blur-sm border border-white/50 rounded-2xl text-gray-800 placeholder-gray-500 font-medium focus:outline-none focus:ring-4 focus:ring-pink-200 focus:border-pink-300 transition-all duration-300 text-lg"
                autoFocus
              />
              
              {/* Show/Hide password toggle */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors p-1"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Error message */}
            {error && (
              <div className="bg-red-100/50 backdrop-blur-sm border border-red-200/50 text-red-700 px-4 py-3 rounded-xl text-center font-medium animate-pulse">
                {error}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={!password.trim()}
              className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 hover:from-pink-600 hover:via-purple-600 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg shadow-lg"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
                                 Unlock
              </span>
            </button>
          </form>

          {/* Decorative elements */}
          <div className="absolute -top-1 -left-1 w-4 h-4 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 -left-2 w-2 h-2 bg-gradient-to-br from-pink-300 to-purple-400 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Floating particles */}
        <div className="absolute -top-10 left-10 w-8 h-8 bg-pink-200/30 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute -bottom-8 right-12 w-6 h-6 bg-purple-200/40 rounded-full animate-bounce opacity-50" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/3 -right-6 w-4 h-4 bg-pink-300/50 rounded-full animate-bounce opacity-40" style={{ animationDelay: '2.5s' }}></div>
      </div>

      {/* Additional background effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-pink-50/20 via-transparent to-transparent pointer-events-none z-5"></div>
    </div>
  );
} 