"use client";
import { useState } from "react";

interface CheaterBusterSettings {
  targetImage: string;
  targetName: string;
  age: string;
}

export default function CheaterBusterEditor({ onClose }: { onClose: () => void }) {
  // Image and name settings
  const [imageSettings, setImageSettings] = useState<CheaterBusterSettings>({
    targetImage: "/targetTim.jpg",
    targetName: "CARSON",
    age: "28"
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImageSettings(prev => ({
          ...prev,
          targetImage: result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Store image settings in localStorage
    localStorage.setItem("lazo-cheater-buster-settings", JSON.stringify(imageSettings));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* Close button */}
      <button
        className="absolute top-4 left-4 text-3xl font-bold text-gray-500 hover:text-gray-800"
        onClick={onClose}
        aria-label="Close editor"
      >
        ❌
      </button>
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-8 text-gray-900">Edit Cheater Buster Settings</h2>
        <div className="w-full max-w-2xl flex flex-col gap-8">
          
          {/* Image Settings Section */}
          <div className="bg-gray-50 p-6 rounded-xl border">
            <h3 className="text-lg font-bold mb-4 text-gray-800">Image Settings</h3>
            <div className="flex flex-col gap-6">
              {/* Target Image */}
              <div className="flex flex-col gap-3">
                <label className="font-semibold text-gray-700">Target Image</label>
                <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-300 bg-gray-100">
                  <img 
                    src={imageSettings.targetImage} 
                    alt="Target" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
                />
              </div>
            </div>
            
            {/* Target Name */}
            <div className="mt-6">
              <label className="font-semibold text-gray-700 block mb-3">Target Name</label>
              <div className="relative">
                <input
                  type="text"
                  value={imageSettings.targetName}
                  onChange={(e) => setImageSettings(prev => ({ ...prev, targetName: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 text-lg font-medium transition-all bg-white shadow-sm hover:shadow-md"
                  placeholder="Enter target name..."
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Age */}
            <div className="mt-6">
              <label className="font-semibold text-gray-700 block mb-3">Age</label>
              <div className="relative">
                <input
                  type="text"
                  value={imageSettings.age}
                  onChange={(e) => setImageSettings(prev => ({ ...prev, age: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-300 text-lg font-medium transition-all bg-white shadow-sm hover:shadow-md"
                  placeholder="e.g., 28"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <button
            className="mt-8 px-6 py-3 bg-pink-500 text-white rounded-full font-bold shadow hover:bg-pink-600 transition-all fixed bottom-8 left-1/2 -translate-x-1/2"
            onClick={handleSave}
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
