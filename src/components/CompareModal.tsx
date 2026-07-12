import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy } from 'lucide-react';
import type { BikeData } from './Fleet';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  compareList: BikeData[];
}

export default function CompareModal({ isOpen, onClose, compareList }: CompareModalProps) {
  if (!isOpen) return null;

  // Helper to parse numbers from spec strings to evaluate trophies
  const parsePower = (power: string) => parseFloat(power.split(' ')[0]) || 0;
  const parseTorque = (torque: string) => parseFloat(torque.split(' ')[0]) || 0;
  const parseWeight = (weight: string) => parseFloat(weight.split(' ')[0]) || 999; // lower is better

  const maxPower = Math.max(...compareList.map(b => parsePower(b.power)));
  const maxTorque = Math.max(...compareList.map(b => parseTorque(b.torque)));
  const minWeight = Math.min(...compareList.map(b => parseWeight(b.weight)));

  const isBestPower = (power: string) => parsePower(power) === maxPower;
  const isBestTorque = (torque: string) => parseTorque(torque) === maxTorque;
  const isBestWeight = (weight: string) => parseWeight(weight) === minWeight;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-sm"
        />

        {/* Modal Sheet */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-secondary-dark border border-white/10 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl relative z-10 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/5 flex justify-between items-center bg-primary-dark">
            <div>
              <h3 className="display-font text-lg sm:text-2xl font-black text-slate-900 uppercase tracking-wider">
                Motorcycle Comparison
              </h3>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                Comparing {compareList.length} legendary Jawa Yezdi models
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-250/50 text-slate-500 hover:text-slate-900 transition cursor-pointer"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Table Grid container */}
          <div className="p-6 overflow-y-auto flex-grow bg-secondary-dark scroll-thin">
            <div className="grid grid-cols-12 gap-4 items-stretch min-w-[640px]">
              
              {/* Row 1: Bike Cards */}
              <div className="col-span-3 flex flex-col justify-end pb-4 border-r border-white/5 pr-4">
                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Model Specifications</span>
              </div>
              
              {compareList.map((bike) => (
                <div key={bike.id} className="col-span-3 text-center flex flex-col items-center justify-between pb-4">
                  <div className="h-28 flex items-center justify-center relative w-full mb-3">
                    <img 
                      src={bike.baseImage} 
                      alt={bike.name} 
                      className="max-h-full max-w-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] scale-110"
                    />
                  </div>
                  <h4 className="display-font text-sm sm:text-base font-black text-slate-800 leading-tight">
                    {bike.name}
                  </h4>
                  <span className="text-sm font-bold text-accent-orange mt-1.5 display-font">
                    ₹{bike.price.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}

              {/* Specs Rows */}
              
              {/* Row: Engine */}
              <div className="col-span-12 h-px bg-white/5 my-2"></div>
              <div className="col-span-3 font-mono text-xs text-slate-500 uppercase flex items-center">Engine Displacement</div>
              {compareList.map((bike) => (
                <div key={bike.id} className="col-span-3 text-xs sm:text-sm text-slate-700 font-semibold flex items-center justify-center text-center">
                  {bike.engine}
                </div>
              ))}

              {/* Row: Power */}
              <div className="col-span-12 h-px bg-white/5 my-2"></div>
              <div className="col-span-3 font-mono text-xs text-slate-500 uppercase flex items-center">Max Horsepower</div>
              {compareList.map((bike) => {
                const isBest = isBestPower(bike.power);
                return (
                  <div 
                    key={bike.id} 
                    className={`col-span-3 text-xs sm:text-sm font-bold flex items-center justify-center space-x-1.5 p-2.5 rounded-xl border ${
                      isBest ? 'bg-accent-orange/10 border-accent-orange/20 text-accent-orange' : 'border-transparent text-slate-700'
                    }`}
                  >
                    <span>{bike.power}</span>
                    {isBest && <Trophy className="h-3.5 w-3.5" />}
                  </div>
                );
              })}

              {/* Row: Torque */}
              <div className="col-span-12 h-px bg-white/5 my-2"></div>
              <div className="col-span-3 font-mono text-xs text-slate-500 uppercase flex items-center">Peak Torque</div>
              {compareList.map((bike) => {
                const isBest = isBestTorque(bike.torque);
                return (
                  <div 
                    key={bike.id} 
                    className={`col-span-3 text-xs sm:text-sm font-bold flex items-center justify-center space-x-1.5 p-2.5 rounded-xl border ${
                      isBest ? 'bg-accent-orange/10 border-accent-orange/20 text-accent-orange' : 'border-transparent text-slate-700'
                    }`}
                  >
                    <span>{bike.torque}</span>
                    {isBest && <Trophy className="h-3.5 w-3.5" />}
                  </div>
                );
              })}

              {/* Row: Weight */}
              <div className="col-span-12 h-px bg-white/5 my-2"></div>
              <div className="col-span-3 font-mono text-xs text-slate-500 uppercase flex items-center">Kerb Weight (Lower = Lighter)</div>
              {compareList.map((bike) => {
                const isBest = isBestWeight(bike.weight);
                return (
                  <div 
                    key={bike.id} 
                    className={`col-span-3 text-xs sm:text-sm font-bold flex items-center justify-center space-x-1.5 p-2.5 rounded-xl border ${
                      isBest ? 'bg-accent-orange/10 border-accent-orange/20 text-accent-orange' : 'border-transparent text-slate-700'
                    }`}
                  >
                    <span>{bike.weight}</span>
                    {isBest && <Trophy className="h-3.5 w-3.5" />}
                  </div>
                );
              })}

              {/* Row: Fuel Tank */}
              <div className="col-span-12 h-px bg-white/5 my-2"></div>
              <div className="col-span-3 font-mono text-xs text-slate-500 uppercase flex items-center">Fuel Capacity</div>
              {compareList.map((bike) => (
                <div key={bike.id} className="col-span-3 text-xs sm:text-sm text-slate-700 font-semibold flex items-center justify-center text-center">
                  {bike.tank}
                </div>
              ))}

              {/* Row: Transmission */}
              <div className="col-span-12 h-px bg-white/5 my-2"></div>
              <div className="col-span-3 font-mono text-xs text-slate-500 uppercase flex items-center">Transmission Gearbox</div>
              {compareList.map((bike) => (
                <div key={bike.id} className="col-span-3 text-xs sm:text-sm text-slate-700 font-semibold flex items-center justify-center text-center">
                  {bike.transmission}
                </div>
              ))}

              {/* Row: Brakes */}
              <div className="col-span-12 h-px bg-white/5 my-2"></div>
              <div className="col-span-3 font-mono text-xs text-slate-500 uppercase flex items-center">Brake Assembly</div>
              {compareList.map((bike) => (
                <div key={bike.id} className="col-span-3 text-xs sm:text-sm text-slate-700 font-semibold flex items-center justify-center text-center">
                  {bike.brakes}
                </div>
              ))}

            </div>
          </div>

          {/* Footer Action buttons */}
          <div className="p-6 border-t border-white/5 bg-primary-dark flex justify-end">
            <button
              onClick={onClose}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-3.5 rounded-full shadow-lg transition duration-300 transform hover:scale-105 active:scale-95 text-xs sm:text-sm uppercase tracking-wider cursor-pointer"
            >
              Close Comparison
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
