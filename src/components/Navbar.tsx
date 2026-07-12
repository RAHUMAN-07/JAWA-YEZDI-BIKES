import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bike, Calendar, ShieldCheck, Users, History, Wrench, Menu, X, Compass } from 'lucide-react';
import BrandLogo from './BrandLogo';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  bookingCount: number;
  garageCount: number;
}

export default function Navbar({ activeTab, setActiveTab, bookingCount, garageCount }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'fleet', label: 'Fleet', icon: Bike },
    { id: 'configurator', label: 'Configurator', icon: Wrench },
    { id: 'booking', label: 'Book Ride', icon: Calendar },
    { id: 'heritage', label: 'Heritage', icon: History },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'garage', label: 'Garage', icon: ShieldCheck, badge: bookingCount + garageCount },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand Name */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => setActiveTab('home')}>
            <BrandLogo />
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex space-x-1 items-center">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium tracking-wide transition-colors flex items-center space-x-2 cursor-pointer z-10 ${
                    isActive ? 'text-accent-orange font-bold' : 'text-slate-500 hover:text-slate-900 font-medium'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabGlow"
                      className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-blue-600/10 border border-red-600/20 rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="ml-1 bg-accent-orange text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Booking CTA */}
          <div className="hidden lg:block">
            <button
              onClick={() => setActiveTab('booking')}
              className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white font-bold px-6 py-2.5 rounded-full shadow-lg shadow-blue-600/25 transition duration-300 transform hover:scale-105 active:scale-95 flex items-center space-x-2 text-sm tracking-wider uppercase cursor-pointer"
            >
              <Calendar className="h-4 w-4" />
              <span>Book Test Ride</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden bg-secondary-dark border-b border-white/5 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium flex items-center space-x-3 transition-colors ${
                      isActive
                        ? 'bg-accent-orange/10 text-accent-orange border-l-4 border-accent-orange'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="ml-auto bg-accent-orange text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
              <div className="pt-4 px-4">
                <button
                  onClick={() => {
                    setActiveTab('booking');
                    setIsOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white font-bold py-3 rounded-lg shadow-lg flex items-center justify-center space-x-2 text-sm tracking-wider uppercase cursor-pointer"
                >
                  <Calendar className="h-5 w-5" />
                  <span>Book Test Ride</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
