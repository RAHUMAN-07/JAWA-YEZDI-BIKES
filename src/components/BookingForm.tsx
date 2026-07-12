import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, Mail, Phone, MapPin, Clock, Check, Download, ClipboardCheck } from 'lucide-react';
import { saveBooking } from '../firebase';
import type { Booking } from '../firebase';
import { fleetBikes } from './Fleet';

interface BookingFormProps {
  onBookingAdded: () => void;
}

const dealerNetwork: Record<string, string[]> = {
  Bengaluru: ['Jawa Yezdi Koramangala (Signature dealership)', 'Jawa Yezdi Indiranagar Hub', 'Whitefield Motors'],
  Mumbai: ['Bandra Speedways Classic', 'Andheri West Retro Bikes', 'Thane Highway Motors'],
  Delhi: ['Connaught Place Heritage Hub', 'Saket Performance Center', 'Dwarka Jawa Showroom'],
  Pune: ['Shivajinagar Classic Motors', 'Kalyani Nagar Yezdi Hub', 'Wakad Speedways'],
  Chennai: ['Adyar Coast Road Jawa', 'Anna Nagar Retro Showroom', 'OOMR Scrambler Base'],
};

const timeSlots = [
  '10:00 AM - 12:00 PM',
  '12:00 PM - 02:00 PM',
  '02:00 PM - 04:00 PM',
  '04:00 PM - 06:00 PM',
];

export default function BookingForm({ onBookingAdded }: BookingFormProps) {
  const [selectedBike, setSelectedBike] = useState(fleetBikes[0]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: 'Bengaluru',
    dealership: dealerNetwork['Bengaluru'][0],
    date: '',
    timeSlot: timeSlots[0],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  const handleCityChange = (city: string) => {
    const dealerships = dealerNetwork[city] || [];
    setFormData({
      ...formData,
      city,
      dealership: dealerships[0] || '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.date) {
      alert("Please fill in all details.");
      return;
    }

    setIsSubmitting(true);

    const bookingData: Booking = {
      bikeId: selectedBike.id,
      bikeName: selectedBike.name,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
      dealership: formData.dealership,
      date: formData.date,
      timeSlot: formData.timeSlot,
      createdAt: new Date().toISOString(),
    };

    try {
      const saved = await saveBooking(bookingData);
      setConfirmedBooking(saved);
      onBookingAdded();
    } catch (err) {
      console.error("Booking error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setConfirmedBooking(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      city: 'Bengaluru',
      dealership: dealerNetwork['Bengaluru'][0],
      date: '',
      timeSlot: timeSlots[0],
    });
  };

  return (
    <div className="min-h-screen bg-primary-dark pt-28 pb-16 relative">
      <div className="absolute inset-0 bg-grid-overlay opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <AnimatePresence mode="wait">
          {!confirmedBooking ? (
            // The Booking Portal Form
            <motion.div
              key="booking-portal"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              
              {/* Left Column: Bike Selection & Specs Recap (Cols 5) */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-4">
                  <div className="inline-flex items-center space-x-2 bg-accent-orange/10 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-accent-orange">
                    <span>TEST RIDE SCHEDULER</span>
                  </div>
                  <h3 className="display-font text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
                    Ride the <span className="text-gradient-orange">Legend</span>
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm font-light leading-relaxed">
                    Schedule a complimentary test ride at your nearest authorized Jawa Yezdi dealership. Select your legendary ride from the carousel.
                  </p>
                </div>

                {/* Bike Card Carousel list */}
                <div className="glass-card p-6 sm:p-8 rounded-3xl flex-grow space-y-4">
                  <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase block">Selected Machine</span>
                  
                  <div className="flex gap-4 overflow-x-auto pb-4 scroll-thin">
                    {fleetBikes.map((bike) => (
                      <button
                        key={bike.id}
                        type="button"
                        onClick={() => setSelectedBike(bike)}
                        className={`flex-shrink-0 w-32 p-3 rounded-2xl border text-center transition flex flex-col items-center justify-between cursor-pointer ${
                          selectedBike.id === bike.id
                            ? 'bg-accent-orange/15 border-accent-orange'
                            : 'bg-primary-dark/50 border-slate-200 hover:border-slate-350'
                        }`}
                      >
                        <div className="h-16 flex items-center justify-center p-1">
                          <img src={bike.baseImage} alt={bike.name} className="max-h-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
                        </div>
                        <span className="text-[10px] font-bold text-slate-800 mt-2 block tracking-tight line-clamp-1">
                          {bike.name.replace('Jawa ', '').replace('Yezdi ', '')}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Summary of Chosen Bike Specs */}
                  <div className="border-t border-white/5 pt-4 space-y-2.5 text-xs text-slate-550">
                    <div className="flex justify-between">
                      <span className="font-mono">Chassis Engine:</span>
                      <strong className="text-slate-800 font-semibold">{selectedBike.engine.split(',')[0]}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-mono">Maximum Power:</span>
                      <strong className="text-slate-800 font-semibold">{selectedBike.power}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-mono">Peak Torque:</span>
                      <strong className="text-slate-800 font-semibold">{selectedBike.torque}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Reservation Details (Cols 7) */}
              <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-3xl">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h4 className="display-font text-lg font-bold text-slate-900 uppercase tracking-wider mb-6 pb-2 border-b border-white/5 flex items-center space-x-2">
                    <ClipboardCheck className="h-5 w-5 text-accent-orange" />
                    <span>Booking Reservation Details</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-slate-500 font-mono uppercase tracking-widest block">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your Name"
                          className="w-full bg-secondary-dark border border-slate-200 hover:border-slate-350 focus:border-accent-orange focus:outline-none rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-slate-500 font-mono uppercase tracking-widest block">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@email.com"
                          className="w-full bg-secondary-dark border border-slate-200 hover:border-slate-350 focus:border-accent-orange focus:outline-none rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-slate-500 font-mono uppercase tracking-widest block">Contact Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full bg-secondary-dark border border-slate-200 hover:border-slate-350 focus:border-accent-orange focus:outline-none rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition"
                        />
                      </div>
                    </div>

                    {/* City */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-slate-500 font-mono uppercase tracking-widest block">Select City</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <select
                          value={formData.city}
                          onChange={(e) => handleCityChange(e.target.value)}
                          className="w-full bg-secondary-dark border border-slate-200 hover:border-slate-350 focus:border-accent-orange focus:outline-none rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 transition appearance-none cursor-pointer"
                        >
                          {Object.keys(dealerNetwork).map(city => (
                            <option key={city} value={city} className="text-slate-900">{city}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Dealership */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-500 font-mono uppercase tracking-widest block">Preferred Dealership</label>
                    <select
                      value={formData.dealership}
                      onChange={(e) => setFormData({ ...formData, dealership: e.target.value })}
                      className="w-full bg-secondary-dark border border-slate-200 hover:border-slate-350 focus:border-accent-orange focus:outline-none rounded-xl px-4 py-3 text-sm text-slate-900 transition appearance-none cursor-pointer"
                    >
                      {(dealerNetwork[formData.city] || []).map(dealer => (
                        <option key={dealer} value={dealer} className="text-slate-900">{dealer}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Date */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-slate-500 font-mono uppercase tracking-widest block">Preferred Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 z-10" />
                        <input
                          type="date"
                          required
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full bg-secondary-dark border border-slate-200 hover:border-slate-350 focus:border-accent-orange focus:outline-none rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 transition cursor-pointer relative z-0"
                        />
                      </div>
                    </div>

                    {/* Time Slot */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-slate-500 font-mono uppercase tracking-widest block">Preferred Time Slot</label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <select
                          value={formData.timeSlot}
                          onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                          className="w-full bg-secondary-dark border border-slate-200 hover:border-slate-350 focus:border-accent-orange focus:outline-none rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 transition appearance-none cursor-pointer"
                        >
                          {timeSlots.map(slot => (
                            <option key={slot} value={slot} className="text-slate-900">{slot}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-accent-orange hover:bg-accent-orange-dark text-white font-bold py-4 rounded-xl shadow-lg transition duration-300 transform hover:scale-105 active:scale-95 text-sm uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Validating Availability...</span>
                      ) : (
                        <>
                          <Calendar className="h-4 w-4 animate-pulse" />
                          <span>Request Test Ride Reservation</span>
                        </>
                      )}
                    </button>
                  </div>

                </form>
              </div>

            </motion.div>
          ) : (
            // Boarding Pass Animated Confirmation Ticket!
            <motion.div
              key="booking-success"
              initial={{ opacity: 0, scale: 0.95, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -50 }}
              className="max-w-2xl mx-auto flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mb-6">
                <Check className="h-8 w-8" />
              </div>
                            <div className="text-center space-y-2 mb-8">
                <h3 className="display-font text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-wider">
                  Reservation Confirmed!
                </h3>
                <p className="text-xs text-slate-500">
                  Your ride pass is ready. Please present this ticket at the dealership.
                </p>
              </div>

              {/* Boarding Pass Container */}
              <div className="w-full glass-card rounded-3xl overflow-hidden shadow-2xl relative border border-slate-200">
                {/* Visual side-cut punch marks of a ticket */}
                <div className="absolute top-1/2 left-[-10px] w-5 h-5 bg-primary-dark rounded-full -translate-y-1/2 border-r border-white/10 z-20"></div>
                <div className="absolute top-1/2 right-[-10px] w-5 h-5 bg-primary-dark rounded-full -translate-y-1/2 border-l border-white/10 z-20"></div>

                {/* Ticket Header */}
                <div className="bg-gradient-to-r from-accent-orange/20 to-secondary-dark p-6 border-b border-dashed border-white/10 flex justify-between items-center">
                  <div>
                    <span className="display-font text-lg font-black tracking-widest text-gradient-orange">
                      JAWA YEZDI
                    </span>
                    <span className="text-[9px] tracking-widest font-mono text-slate-500 block">TEST RIDE PASS</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 font-mono uppercase block">PASS NO</span>
                    <span className="font-mono text-sm text-slate-900 font-bold">{confirmedBooking.id}</span>
                  </div>
                </div>

                {/* Ticket Body */}
                <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
                  
                  {/* Column 1: Rider details */}
                  <div className="space-y-4">
                    <div>
                      <span className="text-[9px] text-slate-500 font-mono uppercase tracking-widest block">Rider Name</span>
                      <span className="text-sm font-bold text-slate-800 display-font">{confirmedBooking.name}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-500 font-mono uppercase tracking-widest block">Contact Phone</span>
                      <span className="text-sm font-bold text-slate-700 font-mono">{confirmedBooking.phone}</span>
                    </div>
                  </div>

                  {/* Column 2: Motorcycle Details */}
                  <div className="space-y-4">
                    <div>
                      <span className="text-[9px] text-slate-500 font-mono uppercase tracking-widest block">Motorcycle Class</span>
                      <span className="text-sm font-bold text-accent-orange display-font">
                        {confirmedBooking.bikeName.replace('Jawa ', '').replace('Yezdi ', '')}
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-500 font-mono uppercase tracking-widest block">Dealership Zone</span>
                      <span className="text-sm font-bold text-slate-600 display-font">{confirmedBooking.city}</span>
                    </div>
                  </div>

                  {/* Column 3: Timing */}
                  <div className="space-y-4">
                    <div>
                      <span className="text-[9px] text-slate-500 font-mono uppercase tracking-widest block">Booking Date</span>
                      <span className="text-sm font-bold text-slate-800 font-mono">{confirmedBooking.date}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-500 font-mono uppercase tracking-widest block">Time Schedule</span>
                      <span className="text-sm font-bold text-slate-600 font-mono">{confirmedBooking.timeSlot}</span>
                    </div>
                  </div>

                  {/* Dealership Address Footer inside Ticket */}
                  <div className="col-span-1 sm:col-span-3 border-t border-white/5 pt-4">
                    <span className="text-[9px] text-slate-500 font-mono uppercase tracking-widest block">Dealership Station Location</span>
                    <p className="text-xs text-slate-850 font-medium mt-1">
                      {confirmedBooking.dealership}
                    </p>
                  </div>
                </div>

                {/* Ticket Barcode section */}
                <div className="bg-primary-dark/85 p-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="space-y-1">
                    <span className="text-[9px] text-slate-500 font-mono uppercase tracking-widest block">Safety Warning</span>
                    <p className="text-[10px] text-slate-500 font-light leading-snug">
                      Please carry a valid driving license and helmet. Arrive 10 minutes prior.
                    </p>
                  </div>
                  
                  {/* Pseudo Barcode */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className="h-10 flex items-center space-x-0.5 bg-white p-2.5 rounded">
                      {[1,3,1,2,4,2,1,3,2,1,4,1,2,3,1,2,1,4,1].map((width, i) => (
                        <div 
                          key={i} 
                          className="bg-black h-full"
                          style={{ width: `${width}px` }}
                        />
                      ))}
                    </div>
                    <span className="text-[8px] text-gray-500 font-mono mt-1">*{confirmedBooking.id}*</span>
                  </div>
                </div>

              </div>

              {/* Actions below ticket */}
              <div className="flex gap-4 mt-8">
                <button
                  onClick={resetForm}
                  className="bg-accent-orange hover:bg-accent-orange-dark text-white font-bold px-6 py-3 rounded-xl shadow-lg transition duration-300 transform hover:scale-105 active:scale-95 text-xs uppercase tracking-wider flex items-center space-x-2 cursor-pointer"
                >
                  <span>Book Another</span>
                </button>
                <button
                  onClick={() => alert("Specification Ticket Print simulation complete!")}
                  className="border border-slate-200 bg-secondary-dark hover:bg-slate-200 text-slate-800 font-bold px-6 py-3 rounded-xl transition duration-300 transform hover:scale-105 active:scale-95 text-xs uppercase tracking-wider flex items-center space-x-2 cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Pass</span>
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
