import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, VolumeX } from 'lucide-react';

export default function FloatingVideoPlayer() {
  const [show, setShow] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if dismissed in this session
    const isDismissed = sessionStorage.getItem('jy_floating_video_dismissed');
    if (isDismissed) {
      setDismissed(true);
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem('jy_floating_video_dismissed', '1');
    setDismissed(true);
    setShow(false);
  };

  const handleUnmute = () => {
    setIsMuted(false);
  };

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50, x: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50, x: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-6 right-6 z-50 w-[300px] sm:w-[360px] p-[3px] rounded-3xl bg-gradient-to-tr from-red-600 via-purple-600 to-blue-600 shadow-2xl overflow-hidden"
        >
          <div className="relative bg-white rounded-[21px] overflow-hidden p-2 flex flex-col">
            {/* Header bar */}
            <div className="flex items-center justify-between px-2 py-1.5 border-b border-slate-100">
              <span className="display-font text-xs font-black tracking-widest text-slate-800 uppercase flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
                Official Film
              </span>
              <button
                onClick={handleDismiss}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                title="Dismiss Video"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Video Player Frame Container */}
            <div className="relative aspect-video w-full mt-2 rounded-xl overflow-hidden bg-black shadow-inner">
              <iframe
                src={`https://www.youtube.com/embed/y8DTbANgGmg?autoplay=1&mute=${isMuted ? '1' : '0'}&controls=1&modestbranding=1&loop=1&playlist=y8DTbANgGmg`}
                title="Jawa Yezdi Floating Video"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full h-full border-0 absolute inset-0"
              />

              {/* Autoplay Full Sound Overlay (if muted) */}
              {isMuted && (
                <div 
                  onClick={handleUnmute}
                  className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-black/50 group"
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 1.8 }}
                    className="w-14 h-14 rounded-full bg-gradient-to-tr from-red-600 to-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-600/30 group-hover:scale-105 transition-transform"
                  >
                    <VolumeX className="h-6 w-6" />
                  </motion.div>
                  <span className="mt-3 display-font text-[10px] font-black text-white tracking-[0.2em] uppercase select-none text-center px-4">
                    Tap for Full Sound
                  </span>
                  <span className="text-[8px] font-mono text-slate-300 mt-1 select-none">
                    Hear the classic engine roar! 🏍️
                  </span>
                </div>
              )}
            </div>

            {/* Bottom info section */}
            <div className="px-2 pt-2 pb-1 flex items-center justify-between text-[10px] text-slate-500 font-medium">
              <span className="font-mono">JAWA YEZDI MOTORCYCLES</span>
              {!isMuted && (
                <span className="text-blue-600 flex items-center gap-1">
                  <Volume2 className="h-3 w-3 animate-bounce" /> Playing with Sound
                </span>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
