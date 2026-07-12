import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Calendar, MapPin, MessageSquare, Send, Heart } from 'lucide-react';

interface GroupRide {
  id: string;
  title: string;
  date: string;
  route: string;
  distance: string;
  registeredCount: number;
  image: string;
  difficulty: 'Leisure' | 'Moderate' | 'Challenging';
  difficultyColor: string;
}

const initialRides: GroupRide[] = [
  {
    id: 'deccan_scramble',
    title: 'Deccan Odyssey Scramble',
    date: 'July 18, 2026',
    route: 'Bengaluru - Chikmagalur Hills',
    distance: '240 km',
    registeredCount: 42,
    image: '/images/yezdi_scrambler.png',
    difficulty: 'Moderate',
    difficultyColor: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20'
  },
  {
    id: 'bobber_brotherhood',
    title: 'Bobber Brotherhood Beach Cruise',
    date: 'August 02, 2026',
    route: 'Mumbai Bandra - Alibaug Coast',
    distance: '110 km',
    registeredCount: 29,
    image: '/images/jawa_bobber.png',
    difficulty: 'Leisure',
    difficultyColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'
  },
  {
    id: 'himalayan_climb',
    title: 'Himalayan High Pass Quest',
    date: 'September 12, 2026',
    route: 'Leh - Khardung La Loop',
    distance: '180 km (Offroad)',
    registeredCount: 15,
    image: '/images/yezdi_scrambler.png',
    difficulty: 'Challenging',
    difficultyColor: 'text-red-500 bg-red-500/10 border-red-500/20'
  }
];

interface Comment {
  id: string;
  user: string;
  bike: string;
  content: string;
  likes: number;
  time: string;
  liked?: boolean;
}

const initialComments: Comment[] = [
  {
    id: 'c1',
    user: 'Aditya Vardhan',
    bike: 'Jawa 42 Bobber',
    content: 'Took my Bobber to the Western Ghats last weekend. The lower seat makes carving corners absolute bliss, and the exhaust sound gets everyone looking!',
    likes: 24,
    time: '2 hours ago'
  },
  {
    id: 'c2',
    user: 'Riya Kulkarni',
    bike: 'Yezdi Scrambler',
    content: 'Just finished the Ibex Trail run. The Scrambler absorbed all the gravel hits effortlessly. Best dual-purpose machine in this segment.',
    likes: 18,
    time: '5 hours ago'
  },
  {
    id: 'c3',
    user: 'Captain Bikram',
    bike: 'Jawa Perak',
    content: 'Perak is a work of art on wheels. The stealth matte black finish combined with the custom chrome details turns heads wherever it is parked.',
    likes: 31,
    time: '1 day ago'
  }
];

export default function Community() {
  const [rides, setRides] = useState<GroupRide[]>(initialRides);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [chosenBike, setChosenBike] = useState('Yezdi Scrambler');
  const [registeredRides, setRegisteredRides] = useState<string[]>([]);

  const handleRegisterRide = (rideId: string) => {
    if (registeredRides.includes(rideId)) {
      setRegisteredRides(registeredRides.filter(id => id !== rideId));
      setRides(rides.map(r => r.id === rideId ? { ...r, registeredCount: r.registeredCount - 1 } : r));
    } else {
      setRegisteredRides([...registeredRides, rideId]);
      setRides(rides.map(r => r.id === rideId ? { ...r, registeredCount: r.registeredCount + 1 } : r));
    }
  };

  const handleLikeComment = (cId: string) => {
    setComments(comments.map(c => {
      if (c.id === cId) {
        return {
          ...c,
          likes: c.liked ? c.likes - 1 : c.likes + 1,
          liked: !c.liked
        };
      }
      return c;
    }));
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comm: Comment = {
      id: `comm-${Date.now()}`,
      user: 'You (Legendary Rider)',
      bike: chosenBike,
      content: newComment,
      likes: 0,
      time: 'Just now'
    };

    setComments([comm, ...comments]);
    setNewComment('');
  };

  return (
    <div className="min-h-screen bg-primary-dark pt-28 pb-16 relative">
      <div className="absolute inset-0 bg-grid-overlay opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-14">
          <div className="inline-flex items-center space-x-2 bg-accent-orange/10 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-accent-orange">
            <Users className="h-3.5 w-3.5" />
            <span>COMMUNITY PORTAL</span>
          </div>
          <h2 className="display-font text-3xl sm:text-5xl font-black tracking-tight text-slate-900 uppercase">
            The Ride <span className="text-gradient-orange">Brotherhood</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-xs sm:text-sm font-light">
            Connect with fellow owners, join scheduled trail explorations, and share your customization projects.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Scheduled Group Rides (Cols 7) */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="display-font text-base sm:text-lg font-bold text-slate-900 uppercase tracking-widest flex items-center space-x-2.5">
              <Calendar className="h-5 w-5 text-accent-orange" />
              <span>Upcoming Brotherhood Rides</span>
            </h3>

            <div className="space-y-6">
              {rides.map((ride) => {
                const isRegistered = registeredRides.includes(ride.id);
                return (
                  <div 
                    key={ride.id}
                    className="glass-card p-6 rounded-3xl grid grid-cols-1 sm:grid-cols-12 gap-6 items-center"
                  >
                    {/* Visual Thumbnail */}
                    <div className="sm:col-span-4 h-36 rounded-2xl bg-primary-dark flex items-center justify-center p-2 relative overflow-hidden border border-white/5">
                      <img src={ride.image} alt={ride.title} className="max-h-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] scale-110" />
                    </div>

                    {/* Details */}
                    <div className="sm:col-span-8 flex flex-col justify-between space-y-4">
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-start">
                          <span className={`text-[10px] font-mono font-bold tracking-widest px-2 py-0.5 border rounded uppercase ${ride.difficultyColor}`}>
                            {ride.difficulty}
                          </span>
                          <span className="text-xs font-semibold text-slate-400 font-mono">{ride.date}</span>
                        </div>
                        <h4 className="display-font text-base sm:text-lg font-black text-slate-800">{ride.title}</h4>
                        
                        <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 pt-1 font-mono">
                          <div className="flex items-center space-x-1.5">
                            <MapPin className="h-3.5 w-3.5 text-accent-orange shrink-0" />
                            <span className="line-clamp-1">{ride.route.split(' - ')[1]}</span>
                          </div>
                          <div className="flex items-center space-x-1.5 justify-end">
                            <Users className="h-3.5 w-3.5 text-accent-orange shrink-0" />
                            <span>{ride.registeredCount} riders</span>
                          </div>
                        </div>
                      </div>

                      {/* Registration button */}
                      <button
                        onClick={() => handleRegisterRide(ride.id)}
                        className={`w-full py-2.5 rounded-xl font-bold transition duration-300 transform active:scale-95 text-xs uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer ${
                          isRegistered
                            ? 'bg-emerald-600/20 border border-emerald-600/40 text-emerald-500 hover:bg-emerald-600/30'
                            : 'bg-accent-orange hover:bg-accent-orange-dark text-white shadow-lg'
                        }`}
                      >
                        {isRegistered ? 'Registered! (Leave Ride)' : 'Register For Ride'}
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Forum Reviews Stream (Cols 5) */}
          <div className="lg:col-span-5 glass-card p-6 sm:p-8 rounded-3xl space-y-6">
            <h3 className="display-font text-base sm:text-lg font-bold text-slate-900 uppercase tracking-widest flex items-center space-x-2.5">
              <MessageSquare className="h-5 w-5 text-accent-orange" />
              <span>Rider Forum Stream</span>
            </h3>

            {/* Comment Post Form */}
            <form onSubmit={handlePostComment} className="space-y-4 border-b border-white/5 pb-6">
              <div className="flex gap-2">
                <select
                  value={chosenBike}
                  onChange={(e) => setChosenBike(e.target.value)}
                  className="bg-secondary-dark border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none cursor-pointer"
                >
                  <option value="Yezdi Scrambler" className="text-slate-900">Yezdi Scrambler</option>
                  <option value="Jawa 42 Bobber" className="text-slate-900">Jawa 42 Bobber</option>
                  <option value="Jawa Perak" className="text-slate-900">Jawa Perak</option>
                  <option value="Jawa 42 FJ" className="text-slate-900">Jawa 42 FJ</option>
                  <option value="Jawa 350" className="text-slate-900">Jawa 350</option>
                </select>
                <span className="text-[10px] text-slate-500 font-mono self-center">selected machine</span>
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share a story or ask a question..."
                  className="w-full bg-secondary-dark border border-slate-200 hover:border-slate-300 focus:border-accent-orange focus:outline-none rounded-xl pl-4 pr-12 py-3.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 transition"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-accent-orange hover:bg-accent-orange-dark text-white transition active:scale-90 cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>

            {/* Comments List Stream */}
            <div className="space-y-5 max-h-[360px] overflow-y-auto pr-1 scroll-thin">
              <AnimatePresence>
                {comments.map((comm) => (
                  <motion.div
                    key={comm.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2 text-xs sm:text-sm border-b border-white/5 pb-4 last:border-0"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <strong className="text-slate-800 font-bold block">{comm.user}</strong>
                        <span className="text-[9px] text-accent-orange font-mono uppercase tracking-wide">
                          🏍️ {comm.bike}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">{comm.time}</span>
                    </div>

                    <p className="text-slate-600 font-light leading-relaxed">
                      {comm.content}
                    </p>

                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleLikeComment(comm.id)}
                        className={`flex items-center space-x-1 text-xs cursor-pointer ${
                          comm.liked ? 'text-rose-500 font-bold' : 'text-slate-400 hover:text-rose-500'
                        }`}
                      >
                        <Heart className="h-3.5 w-3.5 fill-current" />
                        <span>{comm.likes}</span>
                      </button>
                    </div>

                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
