'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function CheaterBusterSettingsPage() {
  const [selectedImage, setSelectedImage] = useState('/targetTim.jpg')
  const [profileName, setProfileName] = useState('CARSON')
  const [profileAge, setProfileAge] = useState('28')
  const [overlayText, setOverlayText] = useState('on a date with my boyfriend and HIS best friend sends me his tinder')
  const [showOverlayText, setShowOverlayText] = useState(false)
  const [customImage, setCustomImage] = useState<File | null>(null)
  const [customImageUrl, setCustomImageUrl] = useState<string>('')
  const router = useRouter()

  const availableImages = [
    '/targetTim.jpg',
    '/targetEduardo.jpg',
    '/checkerTiago.png',
    '/checkerTrinity.png',
    '/checkerValentina.png',
    '/checkerZelgin.png'
  ]

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setCustomImage(file)
      const url = URL.createObjectURL(file)
      setCustomImageUrl(url)
      setSelectedImage(url)
    }
  }

  const handleBack = () => {
    router.push('/cheater-buster')
  }

  const handleSave = () => {
    // Ici vous pourriez sauvegarder les paramètres dans localStorage ou une base de données
    alert('Settings saved!')
    router.push('/cheater-buster')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Cheater Buster Settings</h1>
          <button
            onClick={handleBack}
            className="text-white font-bold text-lg hover:bg-white/20 px-3 py-1 rounded-lg transition-colors"
          >
            ← Back
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Confirmation Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSave}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 px-8 rounded-2xl hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
          >
            Confirm & Return
          </button>
        </div>

        {/* Image Selection */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Select Profile Image</h2>
          
          {/* Custom Image Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Custom Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {availableImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(image)}
                className={`relative rounded-lg overflow-hidden border-4 transition-all ${
                  selectedImage === image 
                    ? 'border-pink-500 scale-105' 
                    : 'border-gray-200 hover:border-pink-300'
                }`}
              >
                <Image
                  src={image}
                  alt={`Profile option ${index + 1}`}
                  width={150}
                  height={150}
                  className="w-full h-32 object-cover"
                />
                {selectedImage === image && (
                  <div className="absolute top-2 right-2 bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                    ✓
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Profile Information */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Profile Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Name
              </label>
              <input
                type="text"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Enter profile name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age
              </label>
              <input
                type="text"
                value={profileAge}
                onChange={(e) => setProfileAge(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Enter age"
              />
            </div>
          </div>
        </div>

        {/* Overlay Text Settings */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Overlay Text</h2>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showOverlayText}
                onChange={(e) => setShowOverlayText(e.target.checked)}
                className="w-4 h-4 text-pink-500 focus:ring-pink-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">Show overlay text</span>
            </label>
          </div>
          {showOverlayText && (
            <textarea
              value={overlayText}
              onChange={(e) => setOverlayText(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Enter overlay text to display on the image"
            />
          )}
        </div>

        {/* Preview */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Preview</h2>
          <div className="relative w-full max-w-md mx-auto">
            <div className="relative w-full h-64 rounded-lg overflow-hidden">
              <Image
                src={selectedImage}
                alt="Profile Preview"
                fill
                className="object-cover"
              />
              {showOverlayText && overlayText && (
                <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-3 rounded-lg">
                  <p className="text-sm font-medium text-center">
                    {overlayText}
                  </p>
                </div>
              )}
            </div>
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-3 rounded-lg mt-4 text-center">
              <h3 className="text-xl font-bold text-white">{profileName}</h3>
              <p className="text-white">AGE {profileAge}</p>
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}
