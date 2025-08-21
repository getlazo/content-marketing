'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import CheaterBusterEditor from '../components/CheaterBusterEditor'

export default function CheaterBusterPage() {
  const router = useRouter()
  const [showEditor, setShowEditor] = useState(false)
  
  // Custom image and name settings
  const [customSettings, setCustomSettings] = useState({
    targetImage: "/targetTim.jpg",
    targetName: "CARSON",
    age: "28"
  });

  // Load custom settings from localStorage
  const loadSettings = () => {
    const stored = localStorage.getItem("lazo-cheater-buster-settings");
    if (stored) {
      const settings = JSON.parse(stored);
      setCustomSettings(settings);
    }
  };

  // Load settings on mount
  useEffect(() => {
    loadSettings();
  }, []);

  const handleBack = () => {
    router.push('/')
  }

  const handleEditorClose = () => {
    setShowEditor(false)
    // Reload settings after editor closes
    loadSettings();
  }

  return (
    <div className="min-h-screen bg-white flex flex-col w-full">
      {/* Header - Lazo pink background with icons, logo, and title */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-6 w-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex space-x-3">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div 
              className="cursor-pointer hover:opacity-80 transition-opacity" 
              onClick={() => setShowEditor(true)} 
              title="Edit settings"
            >
              <Image 
                src="/logoNew.webp" 
                alt="Lazo Logo" 
                width={40} 
                height={40} 
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
        
        {/* Title in header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">LOYALTY TEST</h1>
        </div>
      </div>

      {/* Main Content Area - Central Image */}
      <div className="relative w-full flex-1">
        <div className="relative w-full h-[70vh] md:h-[60vh] md:max-w-2xl md:mx-auto">
          {/* Main Image */}
          <Image
            src={customSettings.targetImage}
            alt="Cheater Profile"
            fill
            className="object-cover md:object-contain"
            priority
          />
        </div>
      </div>

      {/* Footer - Lazo pink background with profile info */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-6 w-full -mt-8 md:mt-0">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2">{customSettings.targetName}</h2>
          <p className="text-white text-lg">AGE {customSettings.age}</p>
        </div>
      </div>

      {/* Overlay editor */}
      {showEditor && <CheaterBusterEditor onClose={handleEditorClose} />}
    </div>
  )
}
