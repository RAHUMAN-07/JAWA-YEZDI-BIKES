import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Activity, Zap } from 'lucide-react';

interface HeroProps {
  setActiveTab: (tab: string) => void;
}

const slides = [
  {
    id: 'jawa_350',
    title: 'JAWA CLASSIC 350',
    subtitle: 'TIMELESS HERITAGE',
    tagline: 'The timeless classic reborn. Chrome tanks, golden stripes, twin exhaust elegance.',
    tag: 'Classic Roadster',
    image: '/images/jawa_350.jpg',
    accentColor: 'from-amber-800 to-yellow-600',
    accentBorder: 'border-amber-700/30',
    glowColor: 'shadow-amber-700/20',
    specs: [
      { label: 'Power', value: '22.5 PS' },
      { label: 'Torque', value: '28.1 Nm' },
      { label: 'Engine', value: '349 cc' },
    ]
  },
  {
    id: 'jawa_42',
    title: 'JAWA 42',
    subtitle: 'CLASSIC REIMAGINED',
    tagline: 'A classic silhouette with modern engineering. Perfect for daily commutes and weekend runs.',
    tag: 'Neo-Classic Roadster',
    image: '/images/jawa_42.jpg',
    accentColor: 'from-blue-600 to-cyan-500',
    accentBorder: 'border-blue-500/30',
    glowColor: 'shadow-blue-500/20',
    specs: [
      { label: 'Power', value: '27.3 PS' },
      { label: 'Torque', value: '26.8 Nm' },
      { label: 'Engine', value: '294.7 cc' },
    ]
  },
  {
    id: 'jawa_bobber',
    title: 'JAWA 42 BOBBER',
    subtitle: 'RETRO REIMAGINED',
    tagline: 'A masterpiece of minimalism. Lower, louder, bolder factory-custom custom bobber.',
    tag: 'Factory Custom Bobber',
    image: '/images/jawa_bobber.jpg',
    accentColor: 'from-yellow-600 to-amber-500',
    accentBorder: 'border-yellow-600/30',
    glowColor: 'shadow-yellow-600/20',
    specs: [
      { label: 'Power', value: '30.6 PS' },
      { label: 'Torque', value: '32.7 Nm' },
      { label: 'Engine', value: '334 cc' },
    ]
  },
  {
    id: 'jawa_42_fj',
    title: 'JAWA 42 FJ',
    subtitle: 'BUILT FOR THE ROAD',
    tagline: 'Classic soul. Modern attitude. Engineered with the larger 334cc Alpha2 engine.',
    tag: 'Premium Roadster',
    image: '/images/jawa_42_fj.jpg',
    accentColor: 'from-red-600 to-rose-500',
    accentBorder: 'border-red-500/30',
    glowColor: 'shadow-red-500/20',
    specs: [
      { label: 'Power', value: '29.2 PS' },
      { label: 'Torque', value: '29.6 Nm' },
      { label: 'Engine', value: '334 cc' },
    ]
  },
  {
    id: 'jawa_perak',
    title: 'JAWA PERAK',
    subtitle: 'THE STEALTH WARRIOR',
    tagline: 'Pure retro-classic bobber wrapped in matte black. Dark, raw, and absolutely gorgeous.',
    tag: 'Factory Bobber',
    image: '/images/jawa_perak.png',
    accentColor: 'from-gray-800 to-zinc-600',
    accentBorder: 'border-zinc-700/30',
    glowColor: 'shadow-zinc-700/20',
    specs: [
      { label: 'Power', value: '29.9 PS' },
      { label: 'Torque', value: '30.0 Nm' },
      { label: 'Engine', value: '334 cc' },
    ]
  },
  {
    id: 'yezdi_adventure',
    title: 'YEZDI ADVENTURE',
    subtitle: 'BUILT FOR THE UNKNOWN',
    tagline: 'Explore more. Fear less. The ultimate adventure tourer built for every terrain.',
    tag: 'Adventure Tourer',
    image: '/images/yezdi_adventure.jpg',
    accentColor: 'from-slate-500 to-gray-400',
    accentBorder: 'border-slate-500/30',
    glowColor: 'shadow-slate-500/20',
    specs: [
      { label: 'Power', value: '29.6 PS' },
      { label: 'Torque', value: '29.6 Nm' },
      { label: 'Engine', value: '334 cc' },
    ]
  },
  {
    id: 'yezdi_scrambler',
    title: 'YEZDI SCRAMBLER',
    subtitle: 'REST IS NOT YOUR SPEED',
    tagline: 'Built for lawless paths, designed for thrill-seekers. Light weight and high torque scrambler.',
    tag: 'Urban Scrambler',
    image: '/images/yezdi_scrambler.jpg',
    accentColor: 'from-orange-600 to-amber-500',
    accentBorder: 'border-orange-500/30',
    glowColor: 'shadow-orange-500/20',
    specs: [
      { label: 'Power', value: '30 PS' },
      { label: 'Torque', value: '30 Nm' },
      { label: 'Engine', value: '334 cc' },
    ]
  },
  {
    id: 'yezdi_roadster',
    title: 'YEZDI ROADSTER',
    subtitle: 'THE ULTIMATE CRUISER',
    tagline: 'Classic roadster styling, relaxed cruiser stance, and pure chrome custom details.',
    tag: 'Cruiser Roadster',
    image: '/images/yezdi_roadster.jpg',
    accentColor: 'from-indigo-600 to-blue-500',
    accentBorder: 'border-indigo-500/30',
    glowColor: 'shadow-indigo-500/20',
    specs: [
      { label: 'Power', value: '29.1 PS' },
      { label: 'Torque', value: '29.6 Nm' },
      { label: 'Engine', value: '334 cc' },
    ]
  },
];

export default function Hero({ setActiveTab }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 7000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleNext = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slideVariants: any = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 }
      }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 }
      }
    })
  };

  const current = slides[currentSlide];

  return (
    <div className="relative min-h-screen bg-primary-dark overflow-hidden flex items-center pt-20">
      {/* Background Grid Overlay */}
      <div className="absolute inset-0 bg-grid-overlay opacity-30 z-0"></div>

      {/* Background Animated Gradient Glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent-orange/10 blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] rounded-full bg-accent-orange/5 blur-[120px] pointer-events-none z-0"></div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-12 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Details / Text column */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left order-2 lg:order-1">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current.id}
                custom={direction}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="space-y-6"
              >
                {/* Badge Tag */}
                <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-widest text-accent-orange uppercase">
                  <Zap className="h-3.5 w-3.5 text-accent-orange animate-pulse" />
                  <span>{current.tag}</span>
                </div>

                {/* Subtitle */}
                <span className="block text-sm font-semibold tracking-[0.3em] text-slate-500 font-mono">
                  {current.subtitle}
                </span>

                {/* Main Dynamic Big Title */}
                <h1 className="display-font text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-slate-900">
                  {current.title.split(' ')[0]} <br />
                  <span className={`bg-gradient-to-r ${current.accentColor} bg-clip-text text-fill-transparent text-gradient-orange`}>
                    {current.title.split(' ').slice(1).join(' ')}
                  </span>
                </h1>

                {/* Description Tagline */}
                <p className="text-slate-600 text-base sm:text-lg max-w-md font-sans font-light leading-relaxed">
                  {current.tagline}
                </p>

                {/* Performance Specs Dashboard Inside Hero */}
                <div className="grid grid-cols-3 gap-4 pt-4">
                  {current.specs.map((spec, i) => (
                    <div
                      key={i}
                      className={`glass-card p-3 rounded-xl border ${current.accentBorder} flex flex-col items-start`}
                    >
                      <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider mb-1">
                        {spec.label}
                      </span>
                      <span className="text-base sm:text-lg font-bold text-slate-900 display-font">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-6">
                  <button
                    onClick={() => setActiveTab('fleet')}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-3.5 rounded-full shadow-lg transition duration-300 transform hover:scale-105 active:scale-95 flex items-center space-x-2 text-sm tracking-wider uppercase cursor-pointer"
                  >
                    <span>Explore Fleet</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setActiveTab('booking')}
                    className={`border border-slate-200 hover:border-accent-orange hover:bg-accent-orange/5 text-slate-800 font-bold px-8 py-3.5 rounded-full shadow-lg transition duration-300 transform hover:scale-105 active:scale-95 flex items-center space-x-2 text-sm tracking-wider uppercase cursor-pointer`}
                  >
                    <span>Book Test Ride</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bike Display Column */}
          <div className="lg:col-span-7 flex justify-center items-center relative order-1 lg:order-2">
            {/* Pulsing Radial Background Glow */}
            <div className="absolute w-[80%] h-[80%] rounded-full bg-gradient-to-tr from-accent-orange/5 to-transparent blur-3xl -z-10 pointer-events-none"></div>

            {/* Carousel Images with Framer Motion */}
            <div className="w-full max-w-[580px] h-[300px] sm:h-[400px] flex justify-center items-center relative">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full h-full relative flex items-center justify-center"
                >
                  {/* Floating shadow beneath the bike */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0.3 }}
                    animate={{ scale: [0.8, 1, 0.8], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                    className="absolute bottom-6 w-[80%] h-6 bg-black/75 rounded-full blur-md -z-10"
                  />
                  {/* The main photorealistic bike image */}
                  <motion.img
                    src={current.image}
                    alt={current.title}
                    className="max-w-[95%] max-h-[85%] object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] cursor-pointer"
                    drag
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    dragElastic={0.2}
                    whileTap={{ scale: 0.98 }}
                    whileHover={{ scale: 1.03 }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Floating Quick Feature Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 50, scale: 0.9 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="absolute bottom-0 right-4 sm:right-12 glass-card p-4 rounded-2xl flex items-center space-x-3 max-w-[200px]"
              >
                <div className="p-2.5 rounded-xl bg-accent-orange/10 text-accent-orange">
                  <Activity className="h-5 w-5 animate-pulse" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-mono uppercase">Top Speed</div>
                  <div className="text-base font-bold text-slate-800 display-font">140 km/h</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Carousel Navigation Controllers */}
        <div className="flex items-center justify-between sm:justify-start sm:space-x-8 mt-12 sm:mt-16 border-t border-white/5 pt-8 relative z-20">
          <div className="flex space-x-3">
            <button
              onClick={handlePrev}
              className="p-3.5 rounded-full border border-slate-200 hover:border-accent-orange bg-secondary-dark/50 hover:bg-accent-orange/10 text-slate-700 hover:text-red-600 transition cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-3.5 rounded-full border border-slate-200 hover:border-accent-orange bg-secondary-dark/50 hover:bg-accent-orange/10 text-slate-700 hover:text-red-600 transition cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Bullet Indicators */}
          <div className="flex space-x-2">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => {
                  setDirection(index > currentSlide ? 1 : -1);
                  setCurrentSlide(index);
                }}
                className="h-2.5 rounded-full transition-all duration-300 cursor-pointer"
                style={{
                  width: index === currentSlide ? '32px' : '10px',
                  backgroundColor: index === currentSlide ? '#dc2626' : '#cbd5e1'
                }}
              />
            ))}
          </div>

          {/* Mouse Scroll Down Indicator */}
          <div className="hidden lg:flex justify-center ml-auto mr-auto absolute bottom-4 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
            <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">Scroll Down</span>
            <div className="scroll-indicator-mouse">
              <div className="scroll-indicator-wheel" />
            </div>
          </div>

          <div className="hidden sm:block text-right ml-auto">
            <span className="font-mono text-sm text-gray-500">
              0{currentSlide + 1} / 0{slides.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
