import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, Check, Save, ArrowRight, ArrowLeft } from 'lucide-react';
import { saveCustomBike } from '../firebase';
import type { CustomBike } from '../firebase';
import { fleetBikes } from './Fleet';

interface ConfiguratorProps {
  setActiveTab: (tab: string) => void;
  onBikeAdded: () => void;
}

const accessoryOptions = [
  { id: 'panniers', name: 'Leather Pannier Bags', price: 8500, description: 'Rugged classic storage bags.' },
  { id: 'mirrors', name: 'Bar-end Touring Mirrors', price: 3200, description: 'Sleek, low-profile visibility.' },
  { id: 'flyscreen', name: 'Smoked Flyscreen Visor', price: 2400, description: 'Streamlined wind deflection.' },
  { id: 'exhaust', name: 'Stealth Tracker Exhaust', price: 15000, description: 'Deep bass notes and weight reduction.' },
];

export default function Configurator({ setActiveTab, onBikeAdded }: ConfiguratorProps) {
  const configBikes = [fleetBikes[2], fleetBikes[4], fleetBikes[6]]; // Bobber, Perak, Scrambler

  const [step, setStep] = useState(1);
  const [selectedBike, setSelectedBike] = useState(configBikes[0]);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const activeColor = selectedBike.colors[selectedColorIdx] || selectedBike.colors[0];

  const handleBikeSelect = (bike: typeof configBikes[0]) => {
    setSelectedBike(bike);
    setSelectedColorIdx(0);
    setSelectedAccessories([]);
  };

  const toggleAccessory = (accId: string) => {
    if (selectedAccessories.includes(accId)) {
      setSelectedAccessories(selectedAccessories.filter(id => id !== accId));
    } else {
      setSelectedAccessories([...selectedAccessories, accId]);
    }
  };

  const getAccessoryPrice = () => {
    return selectedAccessories.reduce((total, accId) => {
      const acc = accessoryOptions.find(a => a.id === accId);
      return total + (acc ? acc.price : 0);
    }, 0);
  };

  const calculateTotalPrice = () => {
    return selectedBike.price + getAccessoryPrice();
  };

  const handleSaveToGarage = async () => {
    setIsSaving(true);
    
    // Save custom bike configuration

    const bikeData: CustomBike = {
      modelId: selectedBike.id,
      modelName: selectedBike.name,
      price: calculateTotalPrice(),
      colorName: activeColor.name,
      colorHex: activeColor.hex,
      exhaust: selectedAccessories.includes('exhaust') ? 'Stealth Tracker Exhaust' : 'Standard Factory Exhaust',
      mirrors: selectedAccessories.includes('mirrors') ? 'Bar-end Touring Mirrors' : 'Standard Factory Mirrors',
      seat: selectedBike.id === 'yezdi_scrambler' ? 'Dual Scramble Saddle' : 'Premium Leather Solo Seat',
      luggage: selectedAccessories.includes('panniers') ? 'Leather Pannier Bags' : 'None',
      createdAt: new Date().toISOString(),
    };

    try {
      await saveCustomBike(bikeData);
      onBikeAdded();
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        setStep(1);
        setSelectedAccessories([]);
        setActiveTab('garage');
      }, 2500);
    } catch (e) {
      console.error("Save to garage error: ", e);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary-dark pt-28 pb-16 relative">
      <div className="absolute inset-0 bg-grid-overlay opacity-25 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Step Indicator */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 w-full h-0.5 bg-white/5 -z-10"></div>
            <div 
              className="absolute left-0 top-1/2 h-0.5 bg-accent-orange -z-10 transition-all duration-500"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            ></div>

            {[1, 2, 3].map((num) => (
              <button
                key={num}
                onClick={() => num < step && setStep(num)}
                className={`w-10 h-10 rounded-full font-bold flex items-center justify-center transition border cursor-pointer ${
                  step === num
                    ? 'bg-accent-orange border-accent-orange text-white glow-orange scale-110'
                    : step > num
                    ? 'bg-white border-white text-black'
                    : 'bg-secondary-dark border-white/10 text-gray-500 hover:text-gray-300'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
          <div className="flex justify-between text-[10px] font-mono tracking-widest text-slate-500 uppercase mt-3">
            <span>1. Select Bike</span>
            <span>2. Styling & Finish</span>
            <span>3. Accessories</span>
          </div>
        </div>

        {/* Configurator Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Visual Showcase (Cols 7) */}
          <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-3xl flex flex-col justify-between relative min-h-[360px] sm:min-h-[480px]">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase block">Interactive Customizer</span>
                <h3 className="display-font text-2xl font-black text-slate-900">{selectedBike.name}</h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase block">Custom Config Price</span>
                <span className="text-2xl font-black text-accent-orange display-font">
                  ₹{calculateTotalPrice().toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Configured Bike Image */}
            <div className="my-8 flex justify-center items-center h-[240px] sm:h-[320px] relative">
              <img
                src={selectedBike.baseImage}
                alt={selectedBike.name}
                className="max-w-[95%] max-h-[90%] object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)] transition-all duration-300"
                style={{
                  filter: activeColor.filterStyle 
                    ? `${activeColor.filterStyle} drop-shadow(0 15px 30px rgba(0,0,0,0.85))`
                    : 'drop-shadow(0 15px 30px rgba(0,0,0,0.85))'
                }}
              />
              <div className="absolute bottom-2 w-[75%] h-5 bg-black/60 rounded-full blur-md -z-10"></div>
            </div>

            {/* Custom Accessories Badge display */}
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-slate-700 font-mono">
                🎨 Paint: {activeColor.name}
              </span>
              {selectedAccessories.map(accId => {
                const acc = accessoryOptions.find(a => a.id === accId);
                return (
                  <span key={accId} className="bg-accent-orange/15 border border-accent-orange/30 px-3 py-1.5 rounded-full text-accent-orange font-semibold">
                    ⚙️ {acc?.name}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Configuration Options (Cols 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            {/* Step 1 Content: Bike selector */}
            {step === 1 && (
              <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6 flex-grow">
                <div className="space-y-1">
                  <h4 className="display-font text-lg font-bold text-slate-900 uppercase tracking-wider">Choose Base Platform</h4>
                  <p className="text-xs text-slate-500">Select which vehicle chassis to customize.</p>
                </div>

                <div className="space-y-4">
                  {configBikes.map((bike) => (
                    <button
                      key={bike.id}
                      onClick={() => handleBikeSelect(bike)}
                      className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        selectedBike.id === bike.id
                          ? 'bg-accent-orange/15 border-accent-orange shadow-lg shadow-accent-orange/5'
                          : 'bg-secondary-dark border-white/5 hover:border-white/15'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-12 rounded-lg bg-primary-dark/80 flex items-center justify-center p-1">
                          <img src={bike.baseImage} alt={bike.name} className="max-h-full object-contain" />
                        </div>
                        <div>
                          <h5 className="display-font font-bold text-sm text-slate-800">{bike.name}</h5>
                          <p className="text-[10px] text-slate-500 font-mono mt-0.5 uppercase tracking-wider">334cc DOHC</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-slate-900 display-font block">
                          ₹{bike.price.toLocaleString('en-IN')}
                        </span>
                        {selectedBike.id === bike.id && (
                          <span className="text-[10px] text-accent-orange font-bold font-mono tracking-widest uppercase">
                            Selected
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2 Content: Colors / Styling */}
            {step === 2 && (
              <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6 flex-grow">
                <div className="space-y-1">
                  <h4 className="display-font text-lg font-bold text-slate-900 uppercase tracking-wider">Select Paint Finish</h4>
                  <p className="text-xs text-slate-500">Choose custom pigment schemes for fuel tank and side panels.</p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {selectedBike.colors.map((color, idx) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColorIdx(idx)}
                      className={`p-4 rounded-2xl border flex items-center justify-between transition cursor-pointer ${
                        selectedColorIdx === idx
                          ? 'bg-accent-orange/15 border-accent-orange'
                          : 'bg-secondary-dark border-white/5 hover:border-white/15'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full border border-white/10" style={{ backgroundColor: color.hex }}></div>
                        <span className="text-sm font-semibold text-slate-800">{color.name}</span>
                      </div>
                      {selectedColorIdx === idx && (
                        <Check className="h-5 w-5 text-accent-orange" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3 Content: Accessories */}
            {step === 3 && (
              <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6 flex-grow">
                <div className="space-y-1">
                  <h4 className="display-font text-lg font-bold text-slate-900 uppercase tracking-wider">Equip Accessories</h4>
                  <p className="text-xs text-slate-500">Enhance aesthetics, luggage capability, and exhaust notes.</p>
                </div>

                <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
                  {accessoryOptions.map((acc) => {
                    const isSelected = selectedAccessories.includes(acc.id);
                    return (
                      <button
                        key={acc.id}
                        onClick={() => toggleAccessory(acc.id)}
                        className={`w-full p-3.5 rounded-2xl border text-left flex justify-between items-center transition cursor-pointer ${
                          isSelected
                            ? 'bg-accent-orange/10 border-accent-orange/30'
                            : 'bg-secondary-dark border-white/5 hover:border-white/15'
                        }`}
                      >
                        <div className="flex items-start space-x-3 max-w-[70%]">
                          <div className={`mt-0.5 p-1 rounded bg-white/5 border ${isSelected ? 'border-accent-orange/45 text-accent-orange' : 'border-transparent text-slate-400'}`}>
                            <Check className={`h-3 w-3 ${isSelected ? 'opacity-100' : 'opacity-0'}`} />
                          </div>
                          <div>
                            <h5 className="font-bold text-xs sm:text-sm text-slate-800">{acc.name}</h5>
                            <p className="text-[10px] text-slate-500 font-light mt-0.5 leading-tight">{acc.description}</p>
                          </div>
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-slate-850 display-font shrink-0">
                          +₹{acc.price.toLocaleString('en-IN')}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Steps Controller Buttons */}
            <div className="flex gap-4">
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="w-1/3 py-3.5 px-4 rounded-xl font-bold border border-slate-200 bg-secondary-dark hover:bg-slate-200 text-slate-850 transition duration-300 flex items-center justify-center space-x-2 text-xs sm:text-sm uppercase tracking-wider cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>
              ) : (
                <button
                  onClick={() => setActiveTab('fleet')}
                  className="w-1/3 py-3.5 px-4 rounded-xl font-bold border border-slate-200 bg-secondary-dark hover:bg-slate-200 text-slate-850 transition duration-300 flex items-center justify-center space-x-2 text-xs sm:text-sm uppercase tracking-wider cursor-pointer"
                >
                  <span>Catalog</span>
                </button>
              )}

              {step < 3 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="flex-grow py-3.5 px-4 rounded-xl font-bold bg-accent-orange hover:bg-accent-orange-dark text-white shadow-lg transition duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 text-xs sm:text-sm uppercase tracking-wider cursor-pointer"
                >
                  <span>Next Step</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={handleSaveToGarage}
                  disabled={isSaving}
                  className="flex-grow py-3.5 px-4 rounded-xl font-bold bg-accent-orange hover:bg-accent-orange-dark text-white shadow-lg transition duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 text-xs sm:text-sm uppercase tracking-wider cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? (
                    <span>Saving...</span>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>Save to Garage</span>
                    </>
                  )}
                </button>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* Success Modal overlay */}
      <AnimatePresence>
        {saveSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: -30 }}
              className="glass-card max-w-sm w-full p-8 rounded-3xl text-center space-y-6 border border-accent-orange/30 shadow-2xl shadow-accent-orange/15"
            >
              <div className="w-16 h-16 rounded-full bg-accent-orange/20 text-accent-orange flex items-center justify-center mx-auto">
                <Wrench className="h-8 w-8 animate-bounce" />
              </div>
              <div className="space-y-2">
                <h3 className="display-font text-xl font-black text-slate-900 uppercase tracking-wider">Added to Garage!</h3>
                <p className="text-xs text-slate-500">
                  Your customized <strong className="text-slate-800">{selectedBike.name}</strong> has been successfully built and parked in your digital garage.
                </p>
              </div>
              <div className="h-px bg-white/5 w-full"></div>
              <p className="text-[10px] text-accent-orange font-mono uppercase tracking-widest">
                Redirecting to dashboard...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
