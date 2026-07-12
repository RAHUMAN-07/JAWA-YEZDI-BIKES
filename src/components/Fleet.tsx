import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Wrench, RefreshCw, BarChart4 } from 'lucide-react';

export interface BikeData {
  id: string;
  name: string;
  tagline: string;
  price: number;
  engine: string;
  power: string;
  torque: string;
  weight: string;
  tank: string;
  brakes: string;
  transmission: string;
  baseImage: string;
  colors: { name: string; hex: string; filterStyle: string }[];
  accentColor: string;
}

export const fleetBikes: BikeData[] = [
  {
    id: 'jawa_350',
    name: 'Jawa Classic 350',
    tagline: 'The timeless classic. Chrome tanks, golden stripes, signature twin exhausts.',
    price: 216000,
    engine: '349 cc, Air-Oil Cooled, Single-Cylinder, SOHC',
    power: '22.5 PS @ 6000 RPM',
    torque: '28.1 Nm @ 4000 RPM',
    weight: '194 kg',
    tank: '13.2 Litres',
    brakes: 'Disc brakes with Brembo Calipers & Dual Channel ABS',
    transmission: '5-Speed Manual',
    baseImage: '/images/jawa_350.jpg',
    colors: [
      { name: 'Chrome Maroon', hex: '#58111a', filterStyle: 'hue-rotate-[320deg] brightness-[0.6] sepia-[0.2]' },
      { name: 'Chrome Black', hex: '#121212', filterStyle: 'brightness-[0.35] saturate-[0.1]' },
      { name: 'Forest Green', hex: '#1e352f', filterStyle: 'hue-rotate-[130deg] brightness-[0.5] saturate-[0.8]' }
    ],
    accentColor: 'text-amber-700'
  },
  {
    id: 'jawa_42',
    name: 'Jawa 42',
    tagline: 'A classic silhouette with modern engineering. Nimble handling roadster.',
    price: 185000,
    engine: '294.72 cc, Liquid-Cooled, Single-Cylinder, DOHC',
    power: '27.32 PS @ 7500 RPM',
    torque: '26.84 Nm @ 5800 RPM',
    weight: '182 kg',
    tank: '13.2 Litres',
    brakes: 'Disc brakes front & rear with Dual Channel ABS',
    transmission: '6-Speed Manual',
    baseImage: '/images/jawa_42.jpg',
    colors: [
      { name: 'Orion Blue', hex: '#1e3c72', filterStyle: '' },
      { name: 'Sirius White', hex: '#f5f5f7', filterStyle: 'brightness-[1.5] saturate-[0.2]' },
      { name: 'Allstar Black', hex: '#111111', filterStyle: 'brightness-[0.4] saturate-[0.1]' }
    ],
    accentColor: 'text-blue-500'
  },
  {
    id: 'jawa_bobber',
    name: 'Jawa 42 Bobber',
    tagline: 'Unmistakable retro style, low seat stance, and pure factory custom aesthetic.',
    price: 228000,
    engine: '334 cc, Liquid-Cooled, Single-Cylinder, DOHC',
    power: '30.64 PS @ 7500 RPM',
    torque: '32.74 Nm @ 5500 RPM',
    weight: '175 kg',
    tank: '12.5 Litres',
    brakes: 'Disc Front & Rear with Dual-Channel ABS',
    transmission: '6-Speed Manual with Slipper Clutch',
    baseImage: '/images/jawa_bobber.jpg',
    colors: [
      { name: 'Mystic Copper', hex: '#b87333', filterStyle: '' },
      { name: 'Jasper Red', hex: '#8a1c1c', filterStyle: 'hue-rotate-[320deg] saturate-[1.4]' },
      { name: 'Obsidian Black', hex: '#111111', filterStyle: 'brightness-[0.45] saturate-[0.2]' },
    ],
    accentColor: 'text-amber-500'
  },
  {
    id: 'jawa_42_fj',
    name: 'Jawa 42 FJ',
    tagline: 'Modern roadster handling meets historical brand legacy and larger 334cc engine.',
    price: 193725,
    engine: '334 cc, Liquid-Cooled, Single-Cylinder, DOHC (Alpha2)',
    power: '29.2 PS @ 7500 RPM',
    torque: '29.6 Nm @ 6000 RPM',
    weight: '184 kg',
    tank: '12.0 Litres',
    brakes: 'Dual Channel ABS with 320mm front & 240mm rear discs',
    transmission: '6-Speed Constant Mesh with Assist Clutch',
    baseImage: '/images/jawa_42_fj.jpg',
    colors: [
      { name: 'Aurora Green', hex: '#0f523a', filterStyle: 'hue-rotate-[180deg] saturate-[0.8] brightness-[0.7]' },
      { name: 'Cosmo Blue', hex: '#1a3c61', filterStyle: 'hue-rotate-[240deg] saturate-[1.2]' },
      { name: 'Deep Crimson', hex: '#7c1212', filterStyle: 'hue-rotate-[340deg] saturate-[1.3] brightness-[0.8]' }
    ],
    accentColor: 'text-emerald-500'
  },
  {
    id: 'jawa_perak',
    name: 'Jawa Perak',
    tagline: 'The stealth warrior. Pure retro-classic bobber, bathed in matte black.',
    price: 220000,
    engine: '334 cc, Liquid-Cooled, Single-Cylinder, DOHC',
    power: '29.9 PS @ 7500 RPM',
    torque: '30.01 Nm @ 5500 RPM',
    weight: '185 kg',
    tank: '13.2 Litres',
    brakes: 'Bybre Dual Discs with Continental Dual Channel ABS',
    transmission: '6-Speed with Assist & Slipper Clutch',
    baseImage: '/images/jawa_perak.png',
    colors: [
      { name: 'Stealth Black', hex: '#1e1e1e', filterStyle: '' },
      { name: 'Gold Accent Grey', hex: '#444444', filterStyle: 'brightness-[1.3] sepia-[0.3]' }
    ],
    accentColor: 'text-red-500'
  },
  {
    id: 'yezdi_adventure',
    name: 'Yezdi Adventure',
    tagline: 'Explore more. Fear less. Built for the unknown, made for you.',
    price: 198000,
    engine: '334 cc, Liquid-Cooled, Single-Cylinder, DOHC',
    power: '29.6 PS @ 8000 RPM',
    torque: '29.6 Nm @ 5800 RPM',
    weight: '187 kg',
    tank: '15.5 Litres',
    brakes: 'Dual Channel ABS (Road, Rain, Off-road modes)',
    transmission: '6-Speed Constant Mesh',
    baseImage: '/images/yezdi_adventure.jpg',
    colors: [
      { name: 'Matte Black', hex: '#1a1a1a', filterStyle: '' },
      { name: 'Slate Grey', hex: '#4a5568', filterStyle: 'hue-rotate-[200deg] saturate-[0.5] brightness-[1.1]' },
      { name: 'Army Green', hex: '#2d4a22', filterStyle: 'hue-rotate-[120deg] saturate-[0.9] brightness-[0.6]' },
    ],
    accentColor: 'text-slate-400'
  },
  {
    id: 'yezdi_scrambler',
    name: 'Yezdi Scrambler',
    tagline: 'Born for the scrambler life. Lighter weight and dual-purpose capability.',
    price: 201000,
    engine: '334 cc, Liquid-Cooled, Single-Cylinder, DOHC (Katar)',
    power: '30 PS @ 8100 RPM',
    torque: '30 Nm @ 6750 RPM',
    weight: '174 kg',
    tank: '12.5 Litres',
    brakes: 'Dual Channel ABS (Road, Rain, Off-road modes)',
    transmission: '6-Speed Constant Mesh',
    baseImage: '/images/yezdi_scrambler.jpg',
    colors: [
      { name: 'Outlaw Orange', hex: '#ff5722', filterStyle: '' },
      { name: 'Desert Amber', hex: '#ffb300', filterStyle: 'hue-rotate-[45deg] saturate-[1.2]' },
      { name: 'Bold Black', hex: '#1a1a1a', filterStyle: 'brightness-[0.4] saturate-[0.1] contrast-[1.2]' },
    ],
    accentColor: 'text-orange-500'
  },
  {
    id: 'yezdi_roadster',
    name: 'Yezdi Roadster',
    tagline: 'Classic roadster styling, relaxed cruiser stance, and custom detailing.',
    price: 196950,
    engine: '334 cc, Liquid-Cooled, Single-Cylinder, DOHC',
    power: '29.1 PS @ 7500 RPM',
    torque: '29.63 Nm @ 6000 RPM',
    weight: '183.4 kg',
    tank: '12.5 Litres',
    brakes: 'Disc Front & Rear with Dual-Channel ABS',
    transmission: '6-Speed Constant Mesh',
    baseImage: '/images/yezdi_roadster.jpg',
    colors: [
      { name: 'Smoke Grey', hex: '#708090', filterStyle: '' },
      { name: 'Hunter Green', hex: '#355e3b', filterStyle: 'hue-rotate-[100deg] brightness-[0.7]' },
      { name: 'Steel Blue', hex: '#4682b4', filterStyle: 'hue-rotate-[210deg] saturate-[0.8]' }
    ],
    accentColor: 'text-indigo-500'
  },
];

interface FleetProps {
  setActiveTab: (tab: string) => void;
  compareList: BikeData[];
  addToCompare: (bike: BikeData) => void;
  removeFromCompare: (id: string) => void;
  openCompareModal: () => void;
}

export default function Fleet({ 
  setActiveTab, 
  compareList, 
  addToCompare, 
  removeFromCompare, 
  openCompareModal 
}: FleetProps) {
  const [selectedBike, setSelectedBike] = useState<BikeData>(fleetBikes[0]);
  const [selectedColorIdx, setSelectedColorIdx] = useState<number>(0);

  const activeColor = selectedBike.colors[selectedColorIdx] || selectedBike.colors[0];

  const handleBikeChange = (bike: BikeData) => {
    setSelectedBike(bike);
    setSelectedColorIdx(0);
  };

  const isComparing = (bikeId: string) => compareList.some(b => b.id === bikeId);

  const toggleCompare = (bike: BikeData) => {
    if (isComparing(bike.id)) {
      removeFromCompare(bike.id);
    } else {
      addToCompare(bike);
    }
  };

  // Convert raw values for the animated graph (approximate percentages)
  const getPowerPercent = (powerStr: string) => {
    const num = parseFloat(powerStr);
    return Math.min((num / 35) * 100, 100);
  };

  const getTorquePercent = (torqueStr: string) => {
    const num = parseFloat(torqueStr);
    return Math.min((num / 40) * 100, 100);
  };

  const getWeightPercent = (weightStr: string) => {
    const num = parseFloat(weightStr);
    // Lower weight is better, so invert percentage
    return Math.min((170 / num) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-primary-dark pt-28 pb-16 relative">
      <div className="absolute inset-0 bg-grid-overlay opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center space-x-2 bg-accent-orange/10 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-accent-orange">
            <span>FLEET OF LEGENDS</span>
          </div>
          <h2 className="display-font text-3xl sm:text-5xl font-black tracking-tight text-slate-900 uppercase">
            Choose Your <span className="text-gradient-orange">Ride</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base font-light">
            Browse through our classic retro bobbers, adventurous scramblers, and vintage street roadsters.
          </p>
        </div>

        {/* Bike Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {fleetBikes.map((bike) => (
            <button
              key={bike.id}
              onClick={() => handleBikeChange(bike)}
              className={`px-5 py-3 rounded-full text-sm font-semibold tracking-wider uppercase transition cursor-pointer ${
                selectedBike.id === bike.id
                  ? 'bg-accent-orange text-white shadow-lg shadow-accent-orange/30'
                  : 'bg-secondary-dark/65 hover:bg-gray-800 text-slate-500 hover:text-slate-900 border border-white/5'
              }`}
            >
              {bike.name.replace('Jawa ', '').replace('Yezdi ', '')}
            </button>
          ))}
        </div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Visual Customizer */}
          <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden">
            {/* Holographic scanning background lines */}
            <div className="absolute inset-0 scanner-line bg-gradient-to-b from-transparent via-accent-orange/5 to-transparent w-full h-[150px] -z-10 pointer-events-none"></div>

            <div className="flex justify-between items-start">
              <div>
                <h3 className="display-font text-2xl sm:text-3xl font-black text-slate-900">{selectedBike.name}</h3>
                <p className="text-xs text-slate-500 font-mono mt-1 uppercase tracking-widest">{selectedBike.engine.split(',')[0]}</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 font-mono uppercase tracking-wider block">Ex-Showroom Price</span>
                <span className="text-xl sm:text-2xl font-black text-accent-orange display-font">
                  ₹{selectedBike.price.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Main Interactive Interactive Color Changing Bike Image */}
            <div className="my-8 flex justify-center items-center h-[260px] sm:h-[340px] relative">
              <AnimatePresence mode="wait">
                <motion.img
                  key={`${selectedBike.id}-${activeColor.name}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  src={selectedBike.baseImage}
                  alt={selectedBike.name}
                  className={`max-w-full max-h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)]`}
                  style={{
                    filter: activeColor.filterStyle 
                      ? `${activeColor.filterStyle} drop-shadow(0 12px 24px rgba(0,0,0,0.85))`
                      : 'drop-shadow(0 12px 24px rgba(0,0,0,0.85))'
                  }}
                />
              </AnimatePresence>
              
              {/* Floor Shadow */}
              <div className="absolute bottom-4 w-[75%] h-5 bg-black/60 rounded-full blur-md -z-10"></div>
            </div>

            {/* Customizer Panel */}
            <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-2">
                <span className="text-xs font-mono text-slate-500 uppercase tracking-widest block">Select Paint Finish</span>
                <span className="text-sm font-semibold text-slate-800">{activeColor.name}</span>
              </div>
              
              <div className="flex space-x-2.5">
                {selectedBike.colors.map((color, idx) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColorIdx(idx)}
                    className={`w-9 h-9 rounded-full border-2 transition transform hover:scale-110 active:scale-90 flex items-center justify-center cursor-pointer ${
                      selectedColorIdx === idx ? 'border-accent-orange scale-105' : 'border-white/10 hover:border-white/40'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  >
                    {selectedColorIdx === idx && (
                      <Check className="h-4 w-4 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Spec Details Chart & CTAs */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            {/* Overview / Tagline Card */}
            <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-4">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block">Heritage Roadster Spirit</span>
              <p className="text-slate-600 font-sans leading-relaxed text-sm sm:text-base">
                {selectedBike.tagline}
              </p>
            </div>

            {/* Specs progress bar dashboard */}
            <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6 flex-grow">
              <h4 className="display-font text-sm font-bold text-slate-900 tracking-widest uppercase mb-4 flex items-center space-x-2">
                <BarChart4 className="h-4 w-4 text-accent-orange" />
                <span>Performance DNA</span>
              </h4>
              
              <div className="space-y-4.5">
                {/* Power Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 font-mono">Max Power Output</span>
                    <span className="text-slate-800 font-bold">{selectedBike.power}</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${getPowerPercent(selectedBike.power)}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full bg-accent-orange rounded-full"
                    />
                  </div>
                </div>

                {/* Torque Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 font-mono">Max Torque Force</span>
                    <span className="text-slate-800 font-bold">{selectedBike.torque}</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${getTorquePercent(selectedBike.torque)}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full bg-accent-orange rounded-full"
                    />
                  </div>
                </div>

                {/* Weight Bar (Inverted, lighter is better) */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 font-mono">Kerb Weight (Agility Index)</span>
                    <span className="text-slate-800 font-bold">{selectedBike.weight}</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${getWeightPercent(selectedBike.weight)}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full bg-accent-orange rounded-full"
                    />
                  </div>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5 mt-6 text-xs sm:text-sm">
                <div>
                  <span className="text-slate-500 block font-mono">Fuel Tank Capacity</span>
                  <span className="text-slate-800 font-bold display-font">{selectedBike.tank}</span>
                </div>
                <div>
                  <span className="text-slate-500 block font-mono">Transmission Gearbox</span>
                  <span className="text-slate-800 font-bold display-font">{selectedBike.transmission}</span>
                </div>
                <div className="col-span-2 pt-2">
                  <span className="text-slate-500 block font-mono">Brake Mechanism</span>
                  <span className="text-slate-800 font-bold display-font">{selectedBike.brakes}</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => toggleCompare(selectedBike)}
                className={`py-3.5 px-4 rounded-xl font-bold border transition duration-300 transform hover:scale-105 active:scale-95 text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer ${
                  isComparing(selectedBike.id)
                    ? 'border-accent-orange bg-accent-orange/15 text-accent-orange hover:bg-accent-orange/25'
                    : 'border-slate-200 bg-secondary-dark text-slate-800 hover:bg-slate-200'
                }`}
              >
                <RefreshCw className={`h-4 w-4 ${isComparing(selectedBike.id) ? 'animate-spin' : ''}`} />
                <span>{isComparing(selectedBike.id) ? 'Remove Compare' : 'Add to Compare'}</span>
              </button>

              <button
                onClick={() => setActiveTab('configurator')}
                className="py-3.5 px-4 rounded-xl font-bold bg-accent-orange hover:bg-accent-orange-dark text-white shadow-lg transition duration-300 transform hover:scale-105 active:scale-95 text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Wrench className="h-4 w-4" />
                <span>Build Yours</span>
              </button>
            </div>

          </div>

        </div>

        {/* Compare Floating Bar / Tray */}
        <AnimatePresence>
          {compareList.length > 0 && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-secondary-dark/95 border border-white/10 rounded-2xl px-6 py-4 flex items-center gap-6 shadow-2xl shadow-black/80 max-w-[90%] sm:max-w-xl"
            >
              <div className="flex items-center space-x-4">
                <div className="hidden sm:block">
                  <span className="text-xs text-slate-500 font-mono uppercase tracking-wider block">Comparison Tray</span>
                  <span className="text-xs text-slate-900 font-bold">{compareList.length} model(s) selected</span>
                </div>
                <div className="flex -space-x-2.5">
                  {compareList.map((bike) => (
                    <div 
                      key={bike.id} 
                      className="w-10 h-10 rounded-full border border-gray-800 overflow-hidden bg-primary-dark relative group"
                    >
                      <img 
                        src={bike.baseImage} 
                        alt={bike.name} 
                        className="w-full h-full object-cover p-1 scale-125"
                      />
                      <button 
                        onClick={() => removeFromCompare(bike.id)}
                        className="absolute inset-0 bg-black/70 flex items-center justify-center text-red-500 font-bold opacity-0 group-hover:opacity-100 transition cursor-pointer"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {compareList.length >= 2 ? (
                  <button
                    onClick={openCompareModal}
                    className="bg-accent-orange hover:bg-accent-orange-dark text-white font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider transition transform hover:scale-105 active:scale-95 cursor-pointer flex items-center space-x-1.5"
                  >
                    <span>Compare Now</span>
                  </button>
                ) : (
                  <span className="text-xs text-gray-500 font-mono italic">Add 1 more to compare</span>
                )}
                
                <button
                  onClick={() => compareList.forEach(b => removeFromCompare(b.id))}
                  className="text-slate-500 hover:text-red-600 px-3 py-2 text-xs font-bold rounded-lg hover:bg-white/5 cursor-pointer"
                >
                  Clear
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
