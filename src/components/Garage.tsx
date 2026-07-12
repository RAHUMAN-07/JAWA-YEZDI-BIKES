import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Calendar, Wrench, FileText, ShieldCheck, MapPin, Clock, ArrowRight } from 'lucide-react';
import { getBookings, getGarageBikes, cancelBooking, deleteGarageBike } from '../firebase';
import type { Booking, CustomBike } from '../firebase';
import { fleetBikes } from './Fleet';

interface GarageProps {
  setActiveTab: (tab: string) => void;
  bookingRefreshKey: number;
  garageRefreshKey: number;
  triggerRefresh: () => void;
}

export default function Garage({ setActiveTab, bookingRefreshKey, garageRefreshKey, triggerRefresh }: GarageProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [customBikes, setCustomBikes] = useState<CustomBike[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const bData = await getBookings();
        const gData = await getGarageBikes();
        setBookings(bData);
        setCustomBikes(gData);
      } catch (err) {
        console.error("Error loading garage data:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [bookingRefreshKey, garageRefreshKey]);

  const handleCancelBooking = async (id: string) => {
    if (confirm("Are you sure you want to cancel this scheduled test ride?")) {
      await cancelBooking(id);
      triggerRefresh();
    }
  };

  const handleDeleteBike = async (id: string) => {
    if (confirm("Are you sure you want to delete this custom bike build from your garage?")) {
      await deleteGarageBike(id);
      triggerRefresh();
    }
  };

  const getBikeImage = (modelId: string) => {
    const bike = fleetBikes.find(b => b.id === modelId);
    return bike ? bike.baseImage : '/images/jawa_bobber.png';
  };

  const getBikeFilter = (modelId: string, colorName: string) => {
    const bike = fleetBikes.find(b => b.id === modelId);
    if (!bike) return '';
    const colorObj = bike.colors.find(c => c.name === colorName);
    return colorObj ? colorObj.filterStyle : '';
  };

  return (
    <div className="min-h-screen bg-primary-dark pt-28 pb-16 relative">
      <div className="absolute inset-0 bg-grid-overlay opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-6 border-b border-white/5">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 bg-accent-orange/10 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-accent-orange">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>USER DASHBOARD</span>
            </div>
            <h2 className="display-font text-3xl font-black text-slate-900 uppercase">
              My Digital <span className="text-gradient-orange">Garage</span>
            </h2>
          </div>
          
          {/* Stats Bar */}
          <div className="flex gap-4">
            <div className="bg-secondary-dark border border-white/5 px-4 py-2.5 rounded-2xl flex flex-col justify-center">
              <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Custom Builds</span>
              <span className="text-xl font-bold text-slate-900 display-font text-center mt-0.5">{customBikes.length}</span>
            </div>
            <div className="bg-secondary-dark border border-white/5 px-4 py-2.5 rounded-2xl flex flex-col justify-center">
              <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Test Rides</span>
              <span className="text-xl font-bold text-slate-900 display-font text-center mt-0.5">{bookings.length}</span>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-gray-400 font-mono text-sm">
            Retrieving Garage records...
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Custom Builds Section (Cols 7) */}
            <div className="lg:col-span-7 space-y-6">
              <h3 className="display-font text-base sm:text-lg font-bold text-slate-900 uppercase tracking-widest flex items-center space-x-2">
                <Wrench className="h-5 w-5 text-accent-orange" />
                <span>Bespoke Configurations</span>
              </h3>

              {customBikes.length === 0 ? (
                <div className="glass-card p-8 rounded-3xl text-center space-y-5 py-12">
                  <div className="p-4 rounded-full bg-white/5 w-16 h-16 flex items-center justify-center mx-auto text-gray-400">
                    <Wrench className="h-7 w-7" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="display-font text-sm sm:text-base font-bold text-slate-900">NO CUSTOM BUILDS YET</h4>
                    <p className="text-xs text-slate-550 max-w-xs mx-auto">
                      Use the bike configurator to choose paint colors, exhaust upgrades, and luggage packages.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('configurator')}
                    className="inline-flex items-center space-x-1 bg-accent-orange hover:bg-accent-orange-dark text-white font-bold px-5 py-2.5 rounded-full text-xs uppercase tracking-wider transition transform hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <span>Configure Bike</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <AnimatePresence>
                    {customBikes.map((bike) => (
                      <motion.div
                        key={bike.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="glass-card p-5 rounded-2xl flex flex-col justify-between relative overflow-hidden"
                      >
                        {/* Custom Color Pip indicator */}
                        <div className="absolute top-4 right-4 w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: bike.colorHex }}></div>

                        <div>
                          <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase block">Custom Spec</span>
                          <h4 className="display-font font-black text-slate-800 text-base leading-snug mt-0.5">{bike.modelName}</h4>
                          <span className="text-xs font-bold text-accent-orange display-font">
                            ₹{bike.price.toLocaleString('en-IN')}
                          </span>

                          {/* Image */}
                          <div className="h-28 my-3 flex items-center justify-center relative">
                            <img
                              src={getBikeImage(bike.modelId)}
                              alt={bike.modelName}
                              className="max-h-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]"
                              style={{ filter: getBikeFilter(bike.modelId, bike.colorName) + ' drop-shadow(0 4px 8px rgba(0,0,0,0.6))' }}
                            />
                          </div>

                          {/* Options specifications List */}
                          <ul className="space-y-1 text-[10px] font-mono text-slate-500 border-t border-white/5 pt-3">
                            <li>🎨 Paint: {bike.colorName}</li>
                            <li>💨 Pipes: {bike.exhaust.replace(' Factory Exhaust', '').replace(' Factory Mirrors', '')}</li>
                            <li>🧳 Luggage: {bike.luggage}</li>
                            <li>🪞 Mirrors: {bike.mirrors.replace(' Factory Mirrors', '')}</li>
                          </ul>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 mt-4 pt-3 border-t border-white/5">
                          <button
                            onClick={() => handleDeleteBike(bike.id!)}
                            className="p-2.5 rounded-lg border border-slate-200 bg-secondary-dark text-slate-400 hover:text-red-500 transition cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          
                          <button
                            onClick={() => {
                              setActiveTab('booking');
                            }}
                            className="flex-grow bg-accent-orange hover:bg-accent-orange-dark text-white font-bold py-2 rounded-lg text-xs uppercase tracking-wider transition transform active:scale-95 flex items-center justify-center space-x-1 cursor-pointer"
                          >
                            <Calendar className="h-3.5 w-3.5" />
                            <span>Book Test Ride</span>
                          </button>
                        </div>

                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Test Rides Section (Cols 5) */}
            <div className="lg:col-span-5 space-y-6">
              <h3 className="display-font text-base sm:text-lg font-bold text-slate-900 uppercase tracking-widest flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-accent-orange" />
                <span>Scheduled Test Rides</span>
              </h3>

              {bookings.length === 0 ? (
                <div className="glass-card p-8 rounded-3xl text-center space-y-5 py-12">
                  <div className="p-4 rounded-full bg-white/5 w-16 h-16 flex items-center justify-center mx-auto text-gray-400">
                    <Calendar className="h-7 w-7" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="display-font text-sm sm:text-base font-bold text-slate-900">NO BOOKED RIDES</h4>
                    <p className="text-xs text-slate-550 max-w-xs mx-auto">
                      Schedule a test ride at a local showroom to feel the retro power for yourself.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('booking')}
                    className="inline-flex items-center space-x-1 bg-accent-orange hover:bg-accent-orange-dark text-white font-bold px-5 py-2.5 rounded-full text-xs uppercase tracking-wider transition transform hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <span>Schedule Ride</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence>
                    {bookings.map((booking) => (
                      <motion.div
                        key={booking.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="glass-card p-5 rounded-2xl flex flex-col justify-between space-y-4"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[9px] text-slate-500 font-mono uppercase block">RESERVATION CONFIRMED</span>
                            <h4 className="display-font font-black text-slate-800 text-base mt-0.5">
                              {booking.bikeName.replace('Jawa ', '').replace('Yezdi ', '')}
                            </h4>
                          </div>
                          <span className="text-[10px] font-mono text-gray-500 bg-white/5 border border-white/5 px-2 py-0.5 rounded">
                            {booking.id?.slice(0, 12)}
                          </span>
                        </div>

                        {/* Timing / Location Details */}
                        <div className="space-y-2 text-xs text-slate-650">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-accent-orange shrink-0" />
                            <span className="font-mono">{booking.date}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-accent-orange shrink-0" />
                            <span className="font-mono">{booking.timeSlot}</span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <MapPin className="h-4 w-4 text-accent-orange shrink-0 mt-0.5" />
                            <span className="font-medium">{booking.dealership}</span>
                          </div>
                        </div>

                        <div className="border-t border-white/5 pt-3.5 flex justify-between items-center">
                          <button
                            onClick={() => alert(`Specifications boarding pass print simulated for ID: ${booking.id}`)}
                            className="text-xs text-slate-500 hover:text-slate-900 font-mono flex items-center space-x-1.5 cursor-pointer"
                          >
                            <FileText className="h-3.5 w-3.5" />
                            <span>View Pass</span>
                          </button>
                          
                          <button
                            onClick={() => handleCancelBooking(booking.id!)}
                            className="text-xs text-red-500 hover:text-red-400 font-semibold uppercase tracking-wider flex items-center space-x-1 cursor-pointer"
                          >
                            <span>Cancel Booking</span>
                          </button>
                        </div>

                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
