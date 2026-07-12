import { motion } from 'framer-motion';
import { Award, Milestone, History } from 'lucide-react';

const historyTimeline = [
  {
    year: '1929',
    title: 'František Janeček starts JAWA',
    location: 'Prague, Czechoslovakia',
    desc: 'Founder František Janeček buys the motorcycle division of Wanderer and merges the names Janeček + Wanderer to create JAWA.',
  },
  {
    year: '1950s',
    title: 'Global Export expansion',
    location: '60+ Countries',
    desc: 'The iconic Jawa 250/350 twin-port two-stroke motorcycles are exported globally, becoming legendary for durability, speed, and sleek design.',
  },
  {
    year: '1960',
    title: 'Ideal Jawa begins Indian Journey',
    location: 'Mysore, India',
    desc: 'Jawa motorcycles enter India. Ideal Jawa (India) Ltd. starts importing, then sets up local manufacturing of the beloved Jawa 250 in Mysore.',
  },
  {
    year: '1973',
    title: 'The Birth of YEZDI',
    location: 'Mysore Factory',
    desc: 'To reflect complete localization, Ideal Jawa rebrands Indian motorcycles as YEZDI. Iconic models like Roadking, Classic, and Monarch sweep the nation.',
  },
  {
    year: '1996',
    title: 'End of Two-Stroke Era',
    location: 'Mysore, India',
    desc: 'Tightening emission norms and financial challenges force the Mysore factory doors to close. The bikes enter legendary status, forming strong cult clubs.',
  },
  {
    year: '2018',
    title: 'The Resurrection',
    location: 'Classic Legends, India',
    desc: 'Classic Legends (backed by Mahindra Group) resurrects the JAWA brand. The legendary twin exhausts return with a modern liquid-cooled engine.',
  },
  {
    year: '2022',
    title: 'YEZDI Reborn',
    location: 'Adventure, Scrambler, Roadster',
    desc: 'The Yezdi brand makes a massive comeback. Classic Legends launches three all-new models built for dual-purpose trails and touring.',
  },
  {
    year: '2026',
    title: 'Modern Neo-Classic Fleet',
    location: 'Flagship Innovations',
    desc: 'Launch of the Yezdi Scrambler 2026, Jawa 42 Bobber upgrades, and custom configurators, keeping retro spirit alive with modern technology.',
  }
];

export default function Heritage() {
  return (
    <div className="min-h-screen bg-primary-dark pt-28 pb-16 relative">
      <div className="absolute inset-0 bg-grid-overlay opacity-20 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 bg-accent-orange/10 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-accent-orange">
            <History className="h-3.5 w-3.5" />
            <span>BRAND HERITAGE</span>
          </div>
          <h2 className="display-font text-3xl sm:text-5xl font-black tracking-tight text-slate-900 uppercase">
            A Legend <span className="text-gradient-orange">Since 1929</span>
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto text-xs sm:text-sm font-light">
            Step through the decade milestones that defined motorcycle culture across Czechoslovakia and India.
          </p>
        </div>

        {/* Timeline Line */}
        <div className="relative">
          {/* Vertical central path line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2 z-0"></div>

          {/* Timeline Cards */}
          <div className="space-y-12">
            {historyTimeline.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div 
                  key={item.year}
                  className={`flex flex-col sm:flex-row items-stretch relative z-10 ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  
                  {/* Timeline Bullet Node */}
                  <div className="absolute left-4 sm:left-1/2 top-6 -translate-x-1/2 flex items-center justify-center">
                    <motion.div
                      whileInView={{ scale: [0.8, 1.2, 1], opacity: 1 }}
                      viewport={{ once: true }}
                      className="w-8 h-8 rounded-full bg-secondary-dark border-2 border-accent-orange flex items-center justify-center glow-orange"
                    >
                      <Milestone className="h-3.5 w-3.5 text-accent-orange" />
                    </motion.div>
                  </div>

                  {/* Empty Spacer Side for Desktop layout */}
                  <div className="hidden sm:block w-1/2"></div>

                  {/* Content Card (Side 2) */}
                  <div className="w-full sm:w-1/2 pl-12 sm:pl-0 sm:px-8">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -40 : 40, y: 15 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className="glass-card p-6 sm:p-7 rounded-2xl relative"
                    >
                      {/* Triangle Pointer */}
                      <div className={`hidden sm:block absolute top-6 w-3 h-3 bg-secondary-dark border border-slate-200 transform rotate-45 border-r-0 border-t-0 -z-10 ${
                        isEven ? 'right-[-7px] border-b-0 border-l-0 border-r border-t' : 'left-[-7px]'
                      }`} />

                      <div className="flex justify-between items-start mb-3">
                        <span className="mono-font text-2xl font-black text-accent-orange tracking-tighter">
                          {item.year}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded border border-slate-200 mt-1.5">
                          {item.location}
                        </span>
                      </div>

                      <h4 className="display-font text-base sm:text-lg font-bold text-slate-800 mb-2 leading-tight">
                        {item.title}
                      </h4>
                      <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </motion.div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* Heritage Footer */}
        <div className="mt-20 text-center glass-card p-8 rounded-3xl max-w-xl mx-auto space-y-4">
          <Award className="h-8 w-8 text-accent-orange mx-auto animate-pulse" />
          <h4 className="display-font font-bold text-slate-900 text-lg">THE CULT LIVES ON</h4>
          <p className="text-slate-500 text-xs leading-relaxed">
            From the classic two-stroke smoke of Mysore to the roaring performance roadsters of today, the Jawa Yezdi legacy remains a symbol of absolute freedom on two wheels.
          </p>
        </div>

      </div>
    </div>
  );
}
