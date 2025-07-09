'use client';

import Image from "next/image";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { useChatMessages } from "./ChatMessagesContext";
import ChatMessageEditor from "./ChatMessageEditor";

interface LoyaltyResultScreenProps {
  result: "passed" | "failed";
  targetImg: string;
  checkerImg: string;
  message: string;
  checkerLabel?: string;
  targetName?: string;
}

export default function LoyaltyResultScreen({
  result,
  targetImg,
  checkerImg,
  message,
  checkerLabel = "Checker",
  targetName = "Eduardo",
}: LoyaltyResultScreenProps) {
  const isPassed = result === "passed";
  const { messages } = useChatMessages();
  const [showEditor, setShowEditor] = useState(false);
  const [editorClosed, setEditorClosed] = useState(0); // Track when editor closes
  
  // Custom image and name settings
  const [customSettings, setCustomSettings] = useState({
    targetImage: targetImg,
    checkerImage: checkerImg,
    targetName: targetName,
    message: message
  });

  // Load custom settings from localStorage
  const loadSettings = () => {
    const stored = localStorage.getItem("lazo-image-settings");
    if (stored) {
      const settings = JSON.parse(stored);
      setCustomSettings(settings);
    }
  };

  // Load settings on mount and when editor closes
  useEffect(() => {
    loadSettings();
  }, [editorClosed]);

  const handleEditorClose = () => {
    setShowEditor(false);
    // Trigger settings reload by incrementing the counter
    setEditorClosed(prev => prev + 1);
  };

  return (
          <div
        className={clsx(
          "min-h-screen w-full flex flex-col items-center justify-start md:justify-between px-0 py-2 relative overflow-hidden",
          isPassed
            ? "bg-gradient-to-br from-purple-400 via-pink-500 to-purple-600"
            : "bg-gradient-to-br from-rose-400 via-pink-500 to-purple-600"
        )}
      >
      {/* Logo - now clickable */}
      <div className="w-full flex justify-center items-center mb-6 md:mb-4 mt-12 md:mt-2">
        <div 
          className="cursor-pointer hover:opacity-80 transition-opacity" 
          onClick={() => setShowEditor(true)} 
          title="Edit settings"
        >
          <Image src="/logoOnPink.png" alt="Lazo Logo" width={100} height={50} className="object-contain" />
        </div>
      </div>

      {/* Result label - moved here under logo */}
      <div className="w-full flex justify-center mb-0">
        <div
          className={clsx(
            "px-4 py-2 md:px-6 md:py-3 rounded-2xl shadow-2xl text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold tracking-wide flex items-center gap-2 md:gap-3 uppercase animate-scalein",
            isPassed
              ? "bg-gradient-to-r from-green-600 to-emerald-500 text-white border-4 border-emerald-300 shadow-2xl"
              : "bg-gradient-to-r from-red-600 to-rose-400 text-white border-4 border-rose-300 shadow-2xl"
          )}
          style={{ maxWidth: '90vw' }}
        >
          {isPassed ? (
            <>
              LOYALTY TEST PASSED <span className="text-sm sm:text-lg md:text-xl lg:text-2xl">✅</span>
            </>
          ) : (
            <>
              LOYALTY TEST FAILED <span className="text-sm sm:text-lg md:text-xl lg:text-2xl">❌</span>
            </>
          )}
        </div>
      </div>

      {/* Main Result Section */}
      <div className="flex flex-col items-center justify-center flex-1 md:flex-1 w-full animate-fadein -mt-12 md:mt-1">
        {/* Target name and label */}
        <div className="mb-2 md:mb-3 text-center -mt-8 md:mt-3">
          <div className="text-xl md:text-2xl font-semibold text-white uppercase tracking-wider mb-1 drop-shadow-lg">Your Partner</div>
          <div className="inline-block px-3 py-1 md:px-4 md:py-2 bg-gradient-to-r from-white/20 via-white/30 to-white/20 backdrop-blur-sm text-white text-lg md:text-xl font-bold rounded-xl shadow-lg border border-white/40">
            {customSettings.targetName}
          </div>
        </div>
        {/* Target + Checker */}
        <div className="relative flex items-center justify-center mb-4 md:mb-6 mt-1">
          {/* Target (bigger on mobile, smaller on desktop) */}
          <div className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[280px] md:h-[280px] lg:w-[320px] lg:h-[320px] rounded-3xl overflow-hidden border-6 border-white shadow-2xl bg-gray-200 flex items-center justify-center">
            <img 
              src={customSettings.targetImage} 
              alt="Target" 
              className="object-cover w-full h-full"
            />
          </div>
          {/* Checker bubble with modern gradient */}
          <div className="absolute -top-6 -left-6 flex flex-col items-center animate-float z-10">
            <div className="w-20 h-20 rounded-full overflow-hidden shadow-xl bg-gradient-to-br from-purple-500 via-violet-600 to-purple-700 p-1">
              <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-purple-400 to-violet-500">
                <img 
                  src={customSettings.checkerImage} 
                  alt="Checker" 
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <span className="mt-1 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-violet-600 text-white text-xs font-bold shadow-lg uppercase tracking-wider backdrop-blur-sm">
              {checkerLabel}
            </span>
          </div>
        </div>
        {/* Subtitle/message */}
        <div className="mb-4 md:mb-6">
          <p className="text-sm md:text-base lg:text-xl font-semibold text-white text-center drop-shadow-xl animate-fadein-slow">
            {customSettings.message}
          </p>
        </div>
      </div>

      {/* Overlay editor */}
      {showEditor && <ChatMessageEditor onClose={handleEditorClose} />}

      {/* Back button */}
      <div className="w-full flex justify-center mb-2 md:mb-4 animate-fadein-slow">
        <a
          href="/"
          className="px-6 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-base font-bold shadow-lg hover:bg-white/30 transition-all border-2 border-white/30"
        >
          Back to Home
        </a>
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes fadein {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fadein { animation: fadein 0.8s cubic-bezier(0.4,0,0.2,1) both; }
        @keyframes fadein-slow {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadein-slow { animation: fadein-slow 1.2s 0.5s both; }
        @keyframes scalein {
          from { opacity: 0; transform: scale(0.7); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scalein { animation: scalein 0.7s cubic-bezier(0.4,0,0.2,1) both; }
      `}</style>
    </div>
  );
} 