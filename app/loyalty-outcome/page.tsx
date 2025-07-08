"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import AnimatedBackground from '../components/AnimatedBackground';

export default function LoyaltyOutcomeSelect() {
  const router = useRouter();
  const [showAnim, setShowAnim] = useState<null | 'failed' | 'passed'>(null);

  const handleClick = (type: 'failed' | 'passed') => {
    setShowAnim(type);
    setTimeout(() => {
      router.push(`/loyalty-outcome/${type}`);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full relative overflow-hidden px-0">
      <AnimatedBackground inverse />
      {/* Overlay animation */}
      {showAnim && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm animate-fadein-fast">
          <div className="flex flex-col items-center justify-center">
            {/* Animated emoji SVG */}
            <div className="mb-6 animate-bounce-scale">
              {showAnim === 'passed' ? (
                <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="45" cy="45" r="45" fill="#34d399"/>
                  <path d="M28 48l12 12 22-22" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="45" cy="45" r="45" fill="#f43f5e"/>
                  <path d="M32 32l26 26M58 32L32 58" stroke="#fff" strokeWidth="6" strokeLinecap="round"/>
                </svg>
              )}
            </div>
            <div className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg animate-pop">Good choice!</div>
          </div>
        </div>
      )}
      {/* Titre et sous-titre */}
      <div className="flex flex-col items-center mb-10 mt-12">
        <Image src="/logoNew.webp" alt="Lazo Logo" width={120} height={120} className="mb-4 drop-shadow-xl" />
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 text-center tracking-tight">Loyalty Test Outcome</h1>
        <p className="text-lg md:text-xl text-gray-700 text-center max-w-2xl">Select the result of your loyalty test. This will generate a TikTok-ready result page.</p>
      </div>
      {/* Cards modernes */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 w-full max-w-2xl justify-center items-center px-4 pb-8 z-10">
        {/* Card Failed */}
        <button
          onClick={() => handleClick('failed')}
          disabled={!!showAnim}
          className="group w-full max-w-[300px] md:max-w-none md:w-1/2 rounded-3xl bg-gradient-to-br from-red-400 via-pink-500 to-pink-600 text-white shadow-2xl border-0 px-6 py-8 md:px-8 md:py-14 flex flex-col items-center gap-4 md:gap-6 transition-all duration-200 hover:scale-105 hover:shadow-3xl focus:outline-none focus:ring-4 focus:ring-pink-200 mx-auto"
        >
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/30 flex items-center justify-center mb-1 md:mb-2">
            <svg className="w-7 h-7 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>
          </div>
          <span className="text-xl md:text-3xl font-extrabold tracking-tight">Test Failed</span>
          <span className="text-sm md:text-base font-medium opacity-90">Target cheated</span>
        </button>
        {/* Card Passed */}
        <button
          onClick={() => handleClick('passed')}
          disabled={!!showAnim}
          className="group w-full max-w-[300px] md:max-w-none md:w-1/2 rounded-3xl bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 text-white shadow-2xl border-0 px-6 py-8 md:px-8 md:py-14 flex flex-col items-center gap-4 md:gap-6 transition-all duration-200 hover:scale-105 hover:shadow-3xl focus:outline-none focus:ring-4 focus:ring-green-200 mx-auto"
        >
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/30 flex items-center justify-center mb-1 md:mb-2">
            <svg className="w-7 h-7 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
          </div>
          <span className="text-xl md:text-3xl font-extrabold tracking-tight">Test Passed</span>
          <span className="text-sm md:text-base font-medium opacity-90">Target rejected the bait</span>
        </button>
      </div>
      {/* Animations CSS */}
      <style jsx global>{`
        @keyframes fadein-fast { from { opacity: 0; } to { opacity: 1; } }
        .animate-fadein-fast { animation: fadein-fast 0.2s both; }
        @keyframes pop { 0% { transform: scale(0.7) rotate(-8deg); opacity: 0; } 60% { transform: scale(1.1) rotate(4deg); opacity: 1; } 100% { transform: scale(1) rotate(0deg); opacity: 1; } }
        .animate-pop { animation: pop 0.7s cubic-bezier(0.4,0,0.2,1) both; }
        @keyframes bounce-scale { 0% { transform: scale(0.7); } 60% { transform: scale(1.2); } 100% { transform: scale(1); } }
        .animate-bounce-scale { animation: bounce-scale 0.7s cubic-bezier(0.4,0,0.2,1) both; }
      `}</style>
    </div>
  );
} 