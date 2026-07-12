
interface BrandLogoProps {
  className?: string;
  showText?: boolean;
}

export default function BrandLogo({ className = "w-10 h-10", showText = true }: BrandLogoProps) {
  return (
    <div className="flex items-center space-x-2 select-none group">
      <div className={`relative ${className} flex-shrink-0 transition-transform duration-300 group-hover:scale-105`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="logoGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
            <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          {/* Custom shield border shape */}
          <path 
            d="M50 6 L 88 28 V 68 L 50 94 L 12 68 V 28 Z" 
            stroke="url(#logoGrad)" 
            strokeWidth="5" 
            strokeLinejoin="round"
            className="drop-shadow-[0_0_8px_rgba(37,99,235,0.4)]"
          />
          
          {/* Inner concentric dotted shield line */}
          <path 
            d="M50 14 L 80 32 V 64 L 50 86 L 20 64 V 32 Z" 
            stroke="url(#logoGrad)" 
            strokeWidth="1.5" 
            strokeDasharray="4 3" 
            opacity="0.65" 
          />

          {/* Central stylized J and Y intertwined */}
          {/* Stylized 'J' shape (Red) */}
          <path 
            d="M42 26 H 48 V 58 C 48 64, 40 67, 34 63 C 37 61, 40 58, 40 54 V 26 Z" 
            fill="#dc2626" 
          />
          
          {/* Stylized 'Y' shape (Blue) */}
          <path 
            d="M66 26 L 54 46 V 68 H 48 V 46 L 36 26 H 43.5 L 51 38 L 58.5 26 H 66 Z" 
            fill="#2563eb" 
          />
          
          {/* Speed line accents */}
          <path d="M12 48 H 88" stroke="url(#logoGrad)" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
        </svg>
      </div>
      {showText && (
        <div className="flex flex-col">
          <div className="display-font text-xl font-black tracking-widest leading-none flex items-center">
            <span className="text-red-600 font-extrabold drop-shadow-sm">JAWA</span>
            <span className="text-slate-300 mx-1 font-light">|</span>
            <span className="text-blue-600 font-black drop-shadow-sm">YEZDI</span>
          </div>
          <span className="text-[8px] tracking-[0.3em] font-mono text-slate-500 uppercase font-black leading-none mt-1">
            EST. 1929 • CZECH SOUL
          </span>
        </div>
      )}
    </div>
  );
}
