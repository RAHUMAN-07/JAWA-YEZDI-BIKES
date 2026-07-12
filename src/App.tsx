import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Share2, ExternalLink } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Fleet from './components/Fleet';
import type { BikeData } from './components/Fleet';
import Configurator from './components/Configurator';
import BookingForm from './components/BookingForm';
import Heritage from './components/Heritage';
import Garage from './components/Garage';
import Community from './components/Community';
import CompareModal from './components/CompareModal';
import OfficialFeatures from './components/OfficialFeatures';
import IntroAnimation from './components/IntroAnimation';
import { getBookings, getGarageBikes } from './firebase';
import FloatingVideoPlayer from './components/FloatingVideoPlayer';
import BrandLogo from './components/BrandLogo';

export default function App() {
  // Show intro animation once per browser session
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    return !sessionStorage.getItem('jy_intro_seen');
  });

  const handleIntroComplete = () => {
    sessionStorage.setItem('jy_intro_seen', '1');
    setShowIntro(false);
  };

  const [activeTab, setActiveTab] = useState<string>('home');
  const [compareList, setCompareList] = useState<BikeData[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);
  
  // Refresh toggles
  const [bookingRefreshKey, setBookingRefreshKey] = useState<number>(0);
  const [garageRefreshKey, setGarageRefreshKey] = useState<number>(0);
  const [bookingCount, setBookingCount] = useState<number>(0);
  const [garageCount, setGarageCount] = useState<number>(0);

  // Load stats counts for navbar badges
  useEffect(() => {
    async function loadStats() {
      try {
        const bookings = await getBookings();
        const customBikes = await getGarageBikes();
        setBookingCount(bookings.length);
        setGarageCount(customBikes.length);
      } catch (err) {
        console.warn("Failed to load badge stats:", err);
      }
    }
    loadStats();
  }, [bookingRefreshKey, garageRefreshKey]);

  const triggerRefresh = () => {
    setBookingRefreshKey(prev => prev + 1);
    setGarageRefreshKey(prev => prev + 1);
  };

  const addToCompare = (bike: BikeData) => {
    if (compareList.length >= 3) {
      alert("You can compare up to three motorcycles at a time.");
      return;
    }
    if (!compareList.some(b => b.id === bike.id)) {
      setCompareList([...compareList, bike]);
    }
  };

  const removeFromCompare = (id: string) => {
    setCompareList(compareList.filter(b => b.id !== id));
  };

  // Page animation settings
  const pageVariants: any = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.3, ease: 'easeIn' } }
  };

  return (
    <div className="bg-primary-dark min-h-screen text-slate-900 flex flex-col justify-between relative overflow-hidden">
      {/* Cinematic Grain Overlay */}
      <div className="noise-overlay" />

      {/* Global Ambient Glow Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-accent-orange/8 blur-[150px] pointer-events-none blob-glow-1 -z-10" />
      <div className="absolute bottom-[20%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-accent-gold/8 blur-[180px] pointer-events-none blob-glow-2 -z-10" />

      {/* Brand intro animation (once per session) */}
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}

      {/* Translucent Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        bookingCount={bookingCount}
        garageCount={garageCount}
      />

      {/* Main Sections Wrapper with Page Transitions */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div key="home" variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <Hero setActiveTab={setActiveTab} />
              <OfficialFeatures setActiveTab={setActiveTab} />
            </motion.div>
          )}
          {activeTab === 'fleet' && (
            <motion.div key="fleet" variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <Fleet 
                setActiveTab={setActiveTab}
                compareList={compareList}
                addToCompare={addToCompare}
                removeFromCompare={removeFromCompare}
                openCompareModal={() => setIsCompareOpen(true)}
              />
            </motion.div>
          )}
          {activeTab === 'configurator' && (
            <motion.div key="configurator" variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <Configurator 
                setActiveTab={setActiveTab}
                onBikeAdded={triggerRefresh}
              />
            </motion.div>
          )}
          {activeTab === 'booking' && (
            <motion.div key="booking" variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <BookingForm 
                onBookingAdded={triggerRefresh}
              />
            </motion.div>
          )}
          {activeTab === 'heritage' && (
            <motion.div key="heritage" variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <Heritage />
            </motion.div>
          )}
          {activeTab === 'community' && (
            <motion.div key="community" variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <Community />
            </motion.div>
          )}
          {activeTab === 'garage' && (
            <motion.div key="garage" variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <Garage 
                setActiveTab={setActiveTab}
                bookingRefreshKey={bookingRefreshKey}
                garageRefreshKey={garageRefreshKey}
                triggerRefresh={triggerRefresh}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Specs Comparison Modal overlay */}
      <CompareModal 
        isOpen={isCompareOpen} 
        onClose={() => setIsCompareOpen(false)} 
        compareList={compareList}
      />

      {/* Scroll-triggered YouTube floating player */}
      <FloatingVideoPlayer />

      {/* Footer */}
      <footer className="bg-secondary-dark border-t border-white/5 relative z-20">
        {/* Main footer grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="mb-3">
                <BrandLogo className="w-8 h-8" />
              </div>
              <p className="text-xs text-slate-500 font-light leading-relaxed">
                A Classic Legends Private Limited brand, backed by Mahindra &amp; Mahindra. Reviving legendary motorcycles for the modern rider.
              </p>
              {/* Social icons */}
              <div className="flex items-center gap-3 mt-4">
                <a href="https://www.youtube.com/@jawayezdimotorcycles" target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-red-600/20 border border-white/10 hover:border-red-600/40 flex items-center justify-center text-gray-400 hover:text-red-400 transition">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current"><path d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.941-.262-1.684-1.037-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.941.262 1.684 1.037 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z"/></svg>
                </a>
                <a href="https://www.instagram.com/jawayezdimotorcycles/" target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-pink-600/20 border border-white/10 hover:border-pink-600/40 flex items-center justify-center text-gray-400 hover:text-pink-400 transition">
                  <Globe className="h-3.5 w-3.5" />
                </a>
                <a href="https://www.linkedin.com/company/classic-legends-pvt-ltd/" target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-blue-600/20 border border-white/10 hover:border-blue-600/40 flex items-center justify-center text-gray-400 hover:text-blue-400 transition">
                  <Share2 className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Brand links */}
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-widest mb-3">Brand</p>
              <ul className="space-y-2 text-xs text-gray-400">
                <li><a href="https://www.jawayezdimotorcycles.com/pages/jawa" target="_blank" rel="noopener noreferrer" className="hover:text-white transition flex items-center gap-1">Jawa Motorcycles <ExternalLink className="h-2.5 w-2.5" /></a></li>
                <li><a href="https://www.jawayezdimotorcycles.com/pages/yezdi" target="_blank" rel="noopener noreferrer" className="hover:text-white transition flex items-center gap-1">Yezdi Motorcycles <ExternalLink className="h-2.5 w-2.5" /></a></li>
                <li><a href="https://www.jawayezdimotorcycles.com/pages/community" target="_blank" rel="noopener noreferrer" className="hover:text-white transition flex items-center gap-1">Rides &amp; Kommuniti <ExternalLink className="h-2.5 w-2.5" /></a></li>
                <li><a href="https://www.jawayezdimotorcycles.com/blogs/discovery" target="_blank" rel="noopener noreferrer" className="hover:text-white transition flex items-center gap-1">Official Blog <ExternalLink className="h-2.5 w-2.5" /></a></li>
              </ul>
            </div>

            {/* Service links */}
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-widest mb-3">Service</p>
              <ul className="space-y-2 text-xs text-gray-400">
                <li><a href="https://dealer.jawayezdimotorcycles.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition flex items-center gap-1">Find a Dealer <ExternalLink className="h-2.5 w-2.5" /></a></li>
                <li><a href="https://www.jawayezdimotorcycles.com/pages/service" target="_blank" rel="noopener noreferrer" className="hover:text-white transition flex items-center gap-1">Service Centers <ExternalLink className="h-2.5 w-2.5" /></a></li>
                <li><a href="https://www.jawayezdimotorcycles.com/pages/book-a-test-ride" target="_blank" rel="noopener noreferrer" className="hover:text-white transition flex items-center gap-1">Book Test Ride <ExternalLink className="h-2.5 w-2.5" /></a></li>
                <li><a href="https://www.jawayezdimotorcycles.com/pages/become-a-dealer" target="_blank" rel="noopener noreferrer" className="hover:text-white transition flex items-center gap-1">Become a Dealer <ExternalLink className="h-2.5 w-2.5" /></a></li>
              </ul>
            </div>

            {/* Explore links */}
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-widest mb-3">Explore</p>
              <ul className="space-y-2 text-xs text-gray-400">
                <li><button onClick={() => setActiveTab('heritage')} className="hover:text-white cursor-pointer transition text-left">Heritage Timeline</button></li>
                <li><button onClick={() => setActiveTab('fleet')} className="hover:text-white cursor-pointer transition text-left">Explore Models</button></li>
                <li><button onClick={() => setActiveTab('configurator')} className="hover:text-white cursor-pointer transition text-left">3D Configurator</button></li>
                <li><button onClick={() => setActiveTab('community')} className="hover:text-white cursor-pointer transition text-left">Rider Community</button></li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-600 font-mono">
              © 2026 Classic Legends Private Limited — A Mahindra &amp; Mahindra Company. All Rights Reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-600">
              <a href="https://www.jawayezdimotorcycles.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">Privacy Policy</a>
              <a href="https://www.jawayezdimotorcycles.com/policies/terms-of-service" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">Terms of Service</a>
              <a href="https://www.jawayezdimotorcycles.com/policies/refund-policy" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">Refund Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
