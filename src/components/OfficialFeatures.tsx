import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, ChevronDown, Wrench, MapPin, Phone,
  Globe, Share2, ExternalLink, Shield,
  Headphones, Award
} from 'lucide-react';

interface OfficialFeaturesProps {
  setActiveTab: (tab: string) => void;
}

// ─────────────────────────────────────────
// DATA
// ─────────────────────────────────────────

// Platform types: 'youtube' | 'facebook' | 'instagram'
const videos = [
  {
    id: 'yt_vid',
    title: 'Jawa Yezdi — Official Film',
    subtitle: 'Ride the Legend',
    platform: 'youtube' as const,
    embedId: 'y8DTbANgGmg',
    thumb: 'https://img.youtube.com/vi/y8DTbANgGmg/maxresdefault.jpg',
    tag: 'YouTube',
    accent: '#ff0000',
    link: 'https://youtu.be/y8DTbANgGmg',
  },
  {
    id: 'fb_vid',
    title: 'Jawa Yezdi — Facebook Live',
    subtitle: 'Official Brand Story',
    platform: 'facebook' as const,
    embedId: '1460701168457822',
    thumb: '/images/jawa_bobber.jpg',
    tag: 'Facebook',
    accent: '#1877f2',
    link: 'https://www.facebook.com/watch/?v=1460701168457822',
  },
  {
    id: 'ig_vid',
    title: 'Yezdi Scrambler — Instagram Reel',
    subtitle: 'Rest is Not Your Speed',
    platform: 'instagram' as const,
    embedId: 'DQa7LgAAl-z',
    thumb: '/images/yezdi_scrambler.jpg',
    tag: 'Instagram',
    accent: '#e1306c',
    link: 'https://www.instagram.com/reel/DQa7LgAAl-z/',
  },
];

const modelGrid = [
  {
    id: 'jawa_350',
    name: 'Jawa Classic 350',
    category: 'JAWA',
    image: '/images/jawa_350.jpg',
    tab: 'fleet',
    accent: '#d4af37',
    desc: 'Timeless Heritage. Chrome Elegance.',
  },
  {
    id: 'jawa_42',
    name: 'Jawa 42',
    category: 'JAWA',
    image: '/images/jawa_42.jpg',
    tab: 'fleet',
    accent: '#3b82f6',
    desc: 'Classic Silhouette. Modern Roadster.',
  },
  {
    id: 'jawa_bobber',
    name: 'Jawa 42 Bobber',
    category: 'JAWA',
    image: '/images/jawa_bobber.jpg',
    tab: 'fleet',
    accent: '#b87333',
    desc: 'Low. Loud. Bold.',
  },
  {
    id: 'jawa_42_fj',
    name: 'Jawa 42 FJ',
    category: 'JAWA',
    image: '/images/jawa_42_fj.jpg',
    tab: 'fleet',
    accent: '#e53e3e',
    desc: 'Classic Soul. Modern Roadster.',
  },
  {
    id: 'jawa_perak',
    name: 'Jawa Perak',
    category: 'JAWA',
    image: '/images/jawa_perak.png',
    tab: 'fleet',
    accent: '#1e1e1e',
    desc: 'Stealth Bobber. Pure Vintage.',
  },
  {
    id: 'yezdi_adventure',
    name: 'Yezdi Adventure',
    category: 'YEZDI',
    image: '/images/yezdi_adventure.jpg',
    tab: 'fleet',
    accent: '#718096',
    desc: 'Built for the Unknown.',
  },
  {
    id: 'yezdi_scrambler',
    name: 'Yezdi Scrambler',
    category: 'YEZDI',
    image: '/images/yezdi_scrambler.jpg',
    tab: 'fleet',
    accent: '#ff5722',
    desc: 'Rest is Not Your Speed.',
  },
  {
    id: 'yezdi_roadster',
    name: 'Yezdi Roadster',
    category: 'YEZDI',
    image: '/images/yezdi_roadster.jpg',
    tab: 'fleet',
    accent: '#6366f1',
    desc: 'Classic Cruising Roadster.',
  },
];

const faqs = [
  {
    q: 'Which models are available under Jawa Yezdi?',
    a: 'The official Jawa lineup includes Jawa Classic 350, Jawa 42, Jawa 42 Bobber, Jawa 42 FJ, and Jawa Perak. The Yezdi lineup includes Yezdi Adventure, Yezdi Scrambler, and Yezdi Roadster.',
  },
  {
    q: 'Where can I get service for Jawa Yezdi motorcycles?',
    a: 'Jawa Yezdi has a wide service network across India with 300+ authorized service centers for easy maintenance and support. You can locate your nearest service center through the official dealer portal.',
  },
  {
    q: 'Why should I choose Jawa Yezdi motorcycles?',
    a: 'Jawa Yezdi motorcycles combine heritage design rooted in 1929 with modern liquid-cooled technology, powerful engines, slip & assist clutch, dual-channel ABS, and strong road presence — all built for Indian enthusiasts.',
  },
  {
    q: 'Are spare parts easily available for Jawa Yezdi?',
    a: 'Yes, genuine spare parts are readily available through all authorized Jawa Yezdi service centers and dealers across India. The supply chain ensures minimal downtime for your motorcycle.',
  },
  {
    q: 'What makes Jawa Yezdi motorcycles unique?',
    a: 'They uniquely combine 90+ years of European retro heritage with Mahindra-backed engineering quality. Each model has a distinct character — from the low-slung Bobber to the dirt-ready Scrambler and the touring-capable Adventure.',
  },
  {
    q: 'How do I book a test ride?',
    a: 'You can book a test ride directly through this website on the "Book Ride" tab, or visit any authorized Jawa Yezdi dealership. Our test ride experience is designed to let you feel the bike on real roads.',
  },
];

const serviceFeatures = [
  { icon: Wrench, title: '300+ Service Centers', desc: 'Authorized centers across India for quick turnaround' },
  { icon: Shield, title: '2-Year Warranty', desc: 'Standard manufacturer warranty on all new models' },
  { icon: Headphones, title: '24/7 Roadside Assist', desc: 'Emergency support wherever you ride in India' },
  { icon: Award, title: 'Genuine Parts', desc: 'OEM spare parts available at all dealerships' },
];

// ─────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────

/*
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center space-x-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className="h-3.5 w-3.5"
          fill={s <= Math.floor(rating) ? '#d4af37' : s - 0.5 <= rating ? '#d4af37' : 'none'}
          stroke={s <= rating ? '#d4af37' : '#4a5568'}
        />
      ))}
      <span className="text-xs text-gray-400 ml-1 font-mono">{rating.toFixed(1)}</span>
    </div>
  );
}
*/

// ─────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────

export default function OfficialFeatures({ setActiveTab }: OfficialFeaturesProps) {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const featuredVideoRef = useRef<HTMLDivElement>(null);
  const [isPlayingFeatured, setIsPlayingFeatured] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsPlayingFeatured(true);
        } else {
          setIsPlayingFeatured(false);
        }
      },
      { threshold: 0.3 }
    );

    if (featuredVideoRef.current) {
      observer.observe(featuredVideoRef.current);
    }

    return () => {
      if (featuredVideoRef.current) {
        observer.unobserve(featuredVideoRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-primary-dark">

      {/* ═══════════════════════════════════════ */}
      {/* 1. YOUTUBE VIDEO SECTION                */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-overlay opacity-10 pointer-events-none" />
        {/* ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent-orange/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-red-600/10 border border-red-600/20 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest text-red-600 uppercase mb-4">
              <Globe className="h-3.5 w-3.5" />
              <span>Watch the Legend in Motion</span>
            </div>
            <h2 className="display-font text-3xl sm:text-5xl font-black tracking-tight text-slate-900 uppercase">
              Official <span className="text-gradient-orange">Videos</span>
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm mt-3 font-light">
              Experience the thrill through official brand films and launch videos.
            </p>
          </div>

          {/* Large Auto-playing Featured Video */}
          <div className="mb-16 max-w-5xl mx-auto" ref={featuredVideoRef}>
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-200/40 bg-black">
              {isPlayingFeatured ? (
                <iframe
                  src="https://www.youtube.com/embed/y8DTbANgGmg?autoplay=1&mute=1&controls=1&modestbranding=1&loop=1&playlist=y8DTbANgGmg"
                  title="Featured Jawa Yezdi Brand Film"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('https://img.youtube.com/vi/y8DTbANgGmg/maxresdefault.jpg')" }}>
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="relative z-10 w-20 h-20 bg-red-600 rounded-full flex items-center justify-center animate-pulse">
                    <Play className="h-9 w-9 text-white fill-white ml-1" />
                  </div>
                </div>
              )}
            </div>
            <p className="text-center text-xs text-slate-400 font-mono mt-3 uppercase tracking-widest">
              ★ FEATURED FILM: SCROLLS TO AUTO-PLAY (MUTED)
            </p>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videos.map((vid) => {
              const isPlaying = playingVideo === vid.id;
              const platformIcon = {
                youtube: (
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.941-.262-1.684-1.037-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.941.262 1.684 1.037 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z"/></svg>
                ),
                facebook: (
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                ),
                instagram: (
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                ),
              }[vid.platform];

              return (
                <motion.div
                  key={vid.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="glass-card rounded-2xl overflow-hidden group"
                >
                  {/* Video embed area */}
                  <div className="relative aspect-video">
                    {vid.platform === 'youtube' && isPlaying ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${vid.embedId}?autoplay=1&controls=1&modestbranding=1`}
                        title={vid.title}
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    ) : vid.platform === 'facebook' && isPlaying ? (
                      <iframe
                        src={`https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fwatch%2F%3Fv%3D${vid.embedId}&show_text=false&width=560&t=0`}
                        className="w-full h-full"
                        style={{ border: 'none', overflow: 'hidden' }}
                        scrolling="no"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        allowFullScreen
                        title={vid.title}
                      />
                    ) : (
                      /* Thumbnail + play / link overlay */
                      <div
                        className="relative w-full h-full overflow-hidden cursor-pointer"
                        onClick={() => {
                          if (vid.platform === 'instagram') {
                            window.open(vid.link, '_blank', 'noopener,noreferrer');
                          } else {
                            setPlayingVideo(isPlaying ? null : vid.id);
                          }
                        }}
                      >
                        <img
                          src={vid.thumb}
                          alt={vid.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => { (e.target as HTMLImageElement).src = '/images/jawa_bobber.jpg'; }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        {/* Platform badge */}
                        <div
                          className="absolute top-3 left-3 flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full text-white"
                          style={{ backgroundColor: vid.accent + 'dd' }}
                        >
                          {platformIcon}
                          {vid.tag}
                        </div>

                        {/* Play / open button */}
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <div
                            className="w-16 h-16 rounded-full flex items-center justify-center shadow-xl transition-all"
                            style={{ backgroundColor: vid.accent }}
                          >
                            {vid.platform === 'instagram' ? (
                              <ExternalLink className="h-6 w-6 text-white" />
                            ) : (
                              <Play className="h-7 w-7 text-white fill-white ml-1" />
                            )}
                          </div>
                        </motion.div>

                        {/* Instagram open hint */}
                        {vid.platform === 'instagram' && (
                          <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                            <span className="text-[10px] bg-black/60 text-white px-3 py-1 rounded-full backdrop-blur-sm font-mono tracking-wider">
                              Opens in Instagram ↗
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mb-1">
                      {vid.subtitle}
                    </p>
                    <h3 className="font-bold text-white display-font text-base">{vid.title}</h3>
                    <a
                      href={vid.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs mt-2 font-semibold hover:underline"
                      style={{ color: vid.accent }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Watch on {vid.tag} <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <a
              href="https://www.youtube.com/@jawayezdimotorcycles"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 border border-red-600/40 hover:bg-red-600/10 text-red-400 hover:text-red-300 font-semibold px-6 py-3 rounded-full transition text-sm"
            >
              <Share2 className="h-4 w-4" />
              <span>View All Videos on YouTube</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* 2. VISUAL MODEL GRID                    */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-20 bg-secondary-dark relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest text-accent-orange uppercase mb-4">
              <span>Explore the Lineup</span>
            </div>
            <h2 className="display-font text-3xl sm:text-5xl font-black tracking-tight text-slate-900 uppercase">
              Our <span className="text-gradient-orange">Fleet</span>
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm mt-3 font-light">
              From classic retro to rugged adventure — find your perfect ride.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {modelGrid.map((model, i) => (
              <motion.div
                key={model.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                onClick={() => setActiveTab(model.tab)}
                className="relative overflow-hidden rounded-2xl cursor-pointer group aspect-[3/4]"
              >
                <img
                  src={model.image}
                  alt={model.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                {/* Category badge */}
                <div
                  className="absolute top-2 left-2 text-[10px] font-black tracking-widest px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: model.accent + 'dd' }}
                >
                  {model.category}
                </div>
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-[10px] text-gray-400 font-mono mb-0.5 leading-tight">{model.desc}</p>
                  <h3 className="text-sm font-black text-white display-font leading-tight">{model.name}</h3>
                  {/* Hover CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    className="mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <span
                      className="text-[10px] font-bold px-2.5 py-1 rounded-full text-white"
                      style={{ backgroundColor: model.accent }}
                    >
                      Explore →
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => setActiveTab('fleet')}
              className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white font-bold px-10 py-3.5 rounded-full shadow-lg shadow-blue-600/25 transition duration-300 transform hover:scale-105 active:scale-95 text-sm tracking-wider uppercase cursor-pointer"
            >
              View All Specs & Compare →
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* 3. SERVICE FEATURE BANNER               */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-orange/5 via-transparent to-steel-grey/30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10">
            <h2 className="display-font text-2xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight">
              World-Class <span className="text-gradient-orange">Service Network</span>
            </h2>
            <p className="text-slate-500 text-sm mt-2 max-w-lg mx-auto">
              Backed by Classic Legends Private Limited — A Mahindra & Mahindra Company
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {serviceFeatures.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="glass-card p-5 rounded-2xl text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent-orange/15 text-accent-orange mb-3">
                  <feat.icon className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm display-font mb-1">{feat.title}</h4>
                <p className="text-slate-500 text-xs font-light">{feat.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Service CTA row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://dealer.jawayezdimotorcycles.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-slate-900 text-white font-bold px-8 py-3 rounded-full hover:bg-slate-800 transition text-sm tracking-wider uppercase"
            >
              <MapPin className="h-4 w-4" />
              <span>Find a Dealer</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://www.jawayezdimotorcycles.com/pages/service"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 border border-slate-200 hover:border-accent-orange text-slate-800 font-bold px-8 py-3 rounded-full hover:bg-accent-orange/5 transition text-sm tracking-wider uppercase"
            >
              <Wrench className="h-4 w-4" />
              <span>Service Info</span>
            </a>
            <a
              href="tel:18001033705"
              className="inline-flex items-center space-x-2 border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold px-6 py-3 rounded-full transition text-sm"
            >
              <Phone className="h-4 w-4" />
              <span>1800-103-3705</span>
            </a>
          </div>
        </div>
      </section>



      {/* ═══════════════════════════════════════ */}
      {/* 5. FAQ ACCORDION                        */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-overlay opacity-10 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest text-slate-600 uppercase mb-4">
              <span>Got Questions?</span>
            </div>
            <h2 className="display-font text-3xl sm:text-5xl font-black tracking-tight text-slate-900 uppercase">
              FAQ
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm mt-3 font-light">
              Explore frequently asked questions about Jawa Yezdi motorcycles — covering model lineup, service, spare parts, and unique features.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="glass-card rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer group"
                >
                  <span className="font-semibold text-slate-800 text-sm sm:text-base pr-4 group-hover:text-accent-orange transition-colors">
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex-shrink-0 text-accent-orange"
                  >
                    <ChevronDown className="h-5 w-5" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 border-t border-white/5">
                        <p className="text-slate-600 text-sm leading-relaxed pt-4 font-light">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* 6. SOCIAL MEDIA STRIP                   */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-12 bg-secondary-dark border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="display-font text-xl font-black text-slate-900">Stay Connected</h3>
              <p className="text-slate-500 text-sm mt-1">Follow the official Jawa Yezdi channels for the latest updates and community rides.</p>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://www.youtube.com/@jawayezdimotorcycles"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-red-600/10 hover:bg-red-600/20 border border-red-600/30 text-red-400 hover:text-red-300 px-5 py-2.5 rounded-full transition font-semibold text-sm"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.941-.262-1.684-1.037-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.941.262 1.684 1.037 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z"/></svg>
                <span>YouTube</span>
              </a>
              <a
                href="https://www.instagram.com/jawayezdimotorcycles/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-pink-600/10 hover:bg-pink-600/20 border border-pink-600/30 text-pink-400 hover:text-pink-300 px-5 py-2.5 rounded-full transition font-semibold text-sm"
              >
                <Globe className="h-4 w-4" />
                <span>Instagram</span>
              </a>
              <a
                href="https://www.linkedin.com/company/classic-legends-pvt-ltd/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-600/30 text-blue-400 hover:text-blue-300 px-5 py-2.5 rounded-full transition font-semibold text-sm"
              >
                <Share2 className="h-4 w-4" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
