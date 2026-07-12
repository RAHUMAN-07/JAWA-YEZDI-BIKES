import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BrandLogo from './BrandLogo';

export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'enter' | 'hold' | 'exit'>('enter');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('hold'), 1200);
    const t2 = setTimeout(() => setPhase('exit'), 2800);
    const t3 = setTimeout(() => onComplete(), 3800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'exit' ? (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ background: '#ffffff' }}
          exit={{ opacity: 0, transition: { duration: 0.9, ease: 'easeInOut' } }}
        >
          {/* Subtle noise layer inside the intro screen */}
          <div className="absolute inset-0 bg-grid-overlay opacity-[0.07] pointer-events-none" />

          {/* ── Spotlight Radial Glow ── */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'hold' ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            style={{
              background:
                'radial-gradient(circle 450px at 50% 50%, rgba(220,38,38,0.08) 0%, rgba(37,99,235,0.06) 50%, transparent 70%)',
            }}
          />

          {/* ── Rotating Deco Ring ── */}
          <motion.div
            className="absolute w-[600px] h-[600px] border border-accent-orange/5 rounded-full pointer-events-none flex items-center justify-center"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          >
            {/* Inner ticking outline rings */}
            <div className="w-[500px] h-[500px] border border-dashed border-accent-orange/10 rounded-full" />
            <div className="absolute w-[400px] h-[400px] border border-accent-orange/5 rounded-full" />
          </motion.div>

          {/* ── Glowing Center Ripple Ring ── */}
          <motion.div
            className="absolute w-24 h-24 rounded-full bg-accent-orange/10 blur-xl pointer-events-none"
            initial={{ scale: 0.8 }}
            animate={{ scale: [0.8, 4, 0.8] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          />

          {/* ── Horizontal scan line ── */}
          <motion.div
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-orange to-transparent pointer-events-none"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: phase === 'hold' ? 1 : 0, opacity: phase === 'hold' ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ top: '50%' }}
          />

          {/* ── Main brand content layout ── */}
          <div className="relative flex flex-col items-center select-none z-10">

            {/* Custom SVG logo shield entrance */}
            <motion.div
              initial={{ scale: 0, rotate: -45, opacity: 0 }}
              animate={{ scale: phase === 'hold' ? 1.05 : 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="mb-6 drop-shadow-xl"
            >
              <BrandLogo className="w-24 h-24" showText={false} />
            </motion.div>

            {/* Brand text row - JAWA | YEZDI */}
            <div className="flex items-center gap-6 sm:gap-10">

              {/* JAWA */}
              <motion.span
                className="display-font font-black text-slate-900 leading-none tracking-tighter"
                style={{ fontSize: 'clamp(3.5rem, 12vw, 9rem)', letterSpacing: '-0.04em' }}
                initial={{ x: -200, opacity: 0, filter: 'blur(12px)' }}
                animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              >
                JAWA
              </motion.span>

              {/* Central Divider vertical line */}
              <motion.div
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{
                  scaleY: phase === 'hold' ? 1 : 0,
                  opacity: phase === 'hold' ? 1 : 0,
                }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="w-[3px] rounded-full bg-gradient-to-b from-red-600 via-purple-600 to-blue-600"
                style={{ height: 'clamp(3rem, 8vw, 6.5rem)' }}
              />

              {/* YEZDI */}
              <motion.span
                className="display-font font-black leading-none tracking-tighter"
                style={{
                  fontSize: 'clamp(3.5rem, 12vw, 9rem)',
                  letterSpacing: '-0.04em',
                  color: '#2563eb',
                }}
                initial={{ x: 200, opacity: 0, filter: 'blur(12px)' }}
                animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              >
                YEZDI
              </motion.span>
            </div>

            {/* Sub-tagline */}
            <motion.p
              className="mt-4 text-xs sm:text-sm font-mono tracking-[0.45em] text-slate-500 uppercase font-medium"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: phase === 'hold' ? 1 : 0, y: phase === 'hold' ? 0 : 12 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Ride the Legend
            </motion.p>

            {/* Custom progress load line */}
            <motion.div
              className="mt-8 h-[2px] rounded-full bg-gradient-to-r from-red-600/10 to-blue-600/10 overflow-hidden"
              style={{ width: 'clamp(9rem, 24vw, 15rem)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 'hold' ? 1 : 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-red-600 to-blue-600 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: phase === 'hold' ? '100%' : '0%' }}
                transition={{ duration: 1.6, ease: 'easeInOut' }}
              />
            </motion.div>

            {/* Mahindra credits */}
            <motion.p
              className="mt-3 text-[10px] font-mono tracking-[0.2em] text-slate-400 uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 'hold' ? 1 : 0 }}
              transition={{ delay: 0.6 }}
            >
              A Mahindra &amp; Mahindra Company
            </motion.p>
          </div>

          {/* Corner frame borders */}
          {['top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'].map((pos) => (
            <motion.div
              key={pos}
              className={`absolute ${pos} w-6 h-6 border-accent-orange`}
              style={{
                borderWidth: 0,
                borderTopWidth: pos.includes('top') ? '1.5px' : 0,
                borderBottomWidth: pos.includes('bottom') ? '1.5px' : 0,
                borderLeftWidth: pos.includes('left') ? '1.5px' : 0,
                borderRightWidth: pos.includes('right') ? '1.5px' : 0,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: phase === 'hold' ? 0.75 : 0, scale: phase === 'hold' ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            />
          ))}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
