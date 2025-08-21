'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import { useRef, useState, useEffect } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import AnimatedBackground from './components/AnimatedBackground'
import PasswordProtection from './components/PasswordProtection'
import { useRouter } from 'next/navigation'

const projects = [
  {
    id: 'loyalty-outcome',
    name: 'Loyalty Test Outcome',
    status: 'Available',
    image: '/logoNew.webp',
    description: 'Test your partner\'s loyalty with our interactive experiment.'
  },
  {
    id: 'cheater-buster',
    name: 'Cheater Buster',
    status: 'Available',
    image: '/logoNew.webp',
    description: 'Detect and expose cheaters with our advanced screening tools.'
  },
  {
    id: 'honesty-test',
    name: 'Honesty Test',
    status: 'Coming soon',
    image: '/logoNew.webp',
    description: 'Measure honesty and transparency.'
  },
  {
    id: 'commitment-verify',
    name: 'Commitment Verify',
    status: 'Coming soon',
    image: '/logoNew.webp',
    description: 'Check commitment levels in relationships.'
  }
]

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef<SwiperType | null>(null)
  const total = projects.length
  const [isLoaded, setIsLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingLogoStep, setLoadingLogoStep] = useState<'white'|'dark'>('white')
  const router = useRouter()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleCardClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setLoading(true)
    setLoadingLogoStep('white')
    setTimeout(() => setLoadingLogoStep('dark'), 300)
    setTimeout(() => {
      router.push(href)
    }, 1000)
  }

  if (!isLoaded || loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-transparent relative">
        <AnimatedBackground />
        <div className={`absolute inset-0 flex items-center justify-center z-20 backdrop-blur-sm transition-colors duration-500 ${loadingLogoStep === 'dark' ? 'bg-[#f9a8d4]' : 'bg-white/70'}`}>
          <div className="relative w-32 h-32 flex items-center justify-center">
            <img
              src="/logoOnWhite.png"
              alt="Lazo Logo White"
              className={`absolute inset-0 w-full h-full object-contain transition-all duration-500 ${loadingLogoStep === 'dark' ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}`}
            />
            <img
              src="/logoOnPink.png"
              alt="Lazo Logo Dark"
              className={`absolute inset-0 w-full h-full object-contain transition-all duration-500 ${loadingLogoStep === 'dark' ? 'opacity-100 scale-100' : 'opacity-0 scale-125'}`}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <PasswordProtection>
      <div className="w-full min-h-screen flex flex-col items-center justify-center overflow-x-hidden relative bg-transparent">
      <AnimatedBackground />
      <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-2 md:px-0" style={{height: '100vh'}}>
        <div className="flex flex-col items-center mb-0 md:mb-[-40px] mt-24 md:mt-8">
          <Image src="/logoNew.webp" alt="Lazo Logo" width={80} height={80} className="mb-14 md:mb-8 drop-shadow-xl" />
          <h1 className="text-3xl md:text-4xl font-extrabold mb-1 text-gray-900 text-center tracking-tight leading-tight">Lazo Content Experiments</h1>
          <p className="px-4 md:px-0 text-sm md:text-base text-gray-700 text-center max-w-xl">Explore mini-projects, test UIs and marketing tools designed by the Lazo team.</p>
        </div>
        <div className="w-full flex-1 flex flex-col justify-center items-center">
          <div className="w-full relative overflow-x-visible mx-auto">
            {/* Flèches custom visibles sur desktop et mobile */}
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center text-xl text-gray-700 border border-gray-200 transition-all"
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Previous"
              style={{ touchAction: 'manipulation' }}
            >
              &#8592;
            </button>
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center text-xl text-gray-700 border border-gray-200 transition-all"
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Next"
              style={{ touchAction: 'manipulation' }}
            >
              &#8594;
            </button>
            <Swiper
              modules={[EffectCoverflow, Navigation]}
              effect="coverflow"
              grabCursor
              centeredSlides
              slidesPerView={1.2}
              navigation={false}
              loop={false}
              onSlideChange={swiper => setActiveIndex(swiper.realIndex)}
              coverflowEffect={{
                rotate: 32,
                stretch: 0,
                depth: 180,
                modifier: 1.1,
                slideShadows: true,
              }}
              className="!overflow-visible"
              style={{ paddingBottom: 0, minHeight: 0 }}
              onSwiper={swiper => (swiperRef.current = swiper)}
            >
              {projects.map((project, idx) => {
                const isAvailable = project.status === 'Available';
                const CardContent = (
                  <div className="rounded-2xl bg-white shadow-2xl border border-gray-200 px-6 py-12 flex flex-col items-center justify-start transition-all duration-300 min-h-[280px] md:min-h-[320px] w-full h-full">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center mb-4 mt-2">
                      <Image src={project.image} alt={project.name} width={80} height={80} className="object-contain w-16 h-16" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-gray-900 text-center mb-3 leading-tight">{project.name}</h3>
                    <p className="text-base text-gray-700 text-center mb-4 leading-snug font-medium">{project.description}</p>
                    <span className={`px-6 py-3 rounded-2xl text-lg font-bold shadow-xl border border-white/30 mt-auto mb-2 ${
                      isAvailable
                        ? 'bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 text-white'
                        : 'bg-gradient-to-r from-orange-400 via-amber-500 to-orange-600 text-white opacity-80'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                );
                return (
                  <SwiperSlide key={project.id}>
                    <div className="sm:hidden w-full aspect-[26/31] flex items-center justify-center">
                      {isAvailable ? (
                        <Link href={`/${project.id}`} className="block w-full h-full" onClick={handleCardClick(`/${project.id}`)}>
                          <div className="rounded-2xl bg-white shadow-2xl border border-gray-200 w-full h-full flex flex-col items-center justify-center transition-all duration-300 relative">
                            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center absolute top-16 left-1/2 -translate-x-1/2">
                              <Image src={project.image} alt={project.name} width={64} height={64} className="object-contain w-16 h-16" />
                            </div>
                            <div className="flex flex-col items-center justify-center w-full h-full pt-24 px-4">
                              <h3 className="text-lg font-extrabold text-gray-900 text-center mb-2 leading-tight">{project.name}</h3>
                              <p className="text-base text-gray-700 text-center mb-2 leading-snug font-medium">{project.description}</p>
                            </div>
                            <span className={`px-4 py-2 rounded-2xl text-base font-bold shadow-xl border border-white/30 absolute bottom-6 left-1/2 -translate-x-1/2 ${
                              isAvailable
                                ? 'bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 text-white'
                                : 'bg-gradient-to-r from-orange-400 via-amber-500 to-orange-600 text-white opacity-80'
                            }`}>
                              {project.status}
                            </span>
                          </div>
                        </Link>
                      ) : (
                        <div className="block w-full h-full cursor-not-allowed opacity-80 select-none pointer-events-none">
                          <div className="rounded-2xl bg-white shadow-2xl border border-gray-200 w-full h-full flex flex-col items-center justify-center transition-all duration-300 relative">
                            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center absolute top-16 left-1/2 -translate-x-1/2">
                              <Image src={project.image} alt={project.name} width={64} height={64} className="object-contain w-16 h-16" />
                            </div>
                            <div className="flex flex-col items-center justify-center w-full h-full pt-24 px-4">
                              <h3 className="text-lg font-extrabold text-gray-900 text-center mb-2 leading-tight">{project.name}</h3>
                              <p className="text-base text-gray-700 text-center mb-2 leading-snug font-medium">{project.description}</p>
                            </div>
                            <span className={`px-4 py-2 rounded-2xl text-base font-bold shadow-xl border border-white/30 absolute bottom-6 left-1/2 -translate-x-1/2 ${
                              isAvailable
                                ? 'bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 text-white'
                                : 'bg-gradient-to-r from-orange-400 via-amber-500 to-orange-600 text-white opacity-80'
                            }`}>
                              {project.status}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="hidden sm:block">
                      {isAvailable ? (
                        <Link href={`/${project.id}`} className="block" onClick={handleCardClick(`/${project.id}`)}>
                          {CardContent}
                        </Link>
                      ) : (
                        <div className="block cursor-not-allowed opacity-80 select-none pointer-events-none">
                          {CardContent}
                        </div>
                      )}
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            {/* Barre de progression custom */}
            <div className="w-full mt-10 mb-2 flex items-center justify-center">
              <div className="relative w-2/3 h-2 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                <div
                  className="absolute left-0 top-0 h-full rounded-full animated-gradient-bar transition-all duration-500"
                  style={{ width: `${((activeIndex + 1) / total) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .animated-gradient-bar {
          background: linear-gradient(270deg, #ec4899, #a78bfa, #34d399, #f59e42, #ec4899);
          background-size: 400% 400%;
          animation: gradientMove 3s ease-in-out infinite;
        }
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      </div>
    </PasswordProtection>
  )
} 