import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaGithub, FaUser, FaCode } from 'react-icons/fa';

// Simple animated particles background
const Particles = () => {
  const numParticles = 36;
  const particles = Array.from({ length: numParticles });
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {particles.map((_, i) => {
        const size = Math.random() * 2 + 1;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = Math.random() * 2 + 2;
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0.2, 0.7, 0.2], y: [0, -10, 0] }}
            transition={{ duration, repeat: Infinity, delay: i * 0.1 }}
            style={{
              position: 'absolute',
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.7)',
              filter: 'blur(1px)',
            }}
          />
        );
      })}
    </div>
  );
};

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let percent = 0;
    const interval = setInterval(() => {
      percent += Math.random() * 8 + 2;
      if (percent >= 100) {
        percent = 100;
        clearInterval(interval);
        setTimeout(() => setIsLoading(false), 500);
      }
      setProgress(percent);
    }, 60);
    return () => clearInterval(interval);
  }, []);

  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.6, delay: 2.2 }}
      className="fixed inset-0 z-[10000] bg-gradient-to-br from-[#0a1837] via-[#1a225a] to-[#232b4d] flex items-center justify-center overflow-hidden"
      onAnimationComplete={() => setIsLoading(false)}
    >
      <Particles />
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md mx-auto p-8 rounded-3xl bg-white/5 backdrop-blur-md shadow-2xl border border-white/10">
        {/* Tech icons */}
        <div className="flex gap-6 mb-8 animate-fadeInUp">
          <FaCode className="text-blue-400 text-2xl drop-shadow-glow" />
          <FaUser className="text-purple-400 text-2xl drop-shadow-glow" />
          <FaGithub className="text-gray-300 text-2xl drop-shadow-glow" />
        </div>
        {/* Logo and Name */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="mb-8 text-center"
        >
          <h1 className="text-6xl md:text-7xl font-extrabold text-white tracking-tight mb-2 drop-shadow-glow">DV</h1>
          <p className="text-lg md:text-xl text-white/80 font-medium tracking-wide">Danish Vesa</p>
        </motion.div>
        {/* Circular Spinner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mb-6 flex items-center justify-center"
        >
          <span className="relative flex h-16 w-16">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-30"></span>
            <svg className="w-16 h-16" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="20" stroke="#3b82f6" strokeWidth="4" fill="none" opacity="0.2" />
              <motion.circle
                cx="24"
                cy="24"
                r="20"
                stroke="#3b82f6"
                strokeWidth="4"
                fill="none"
                strokeDasharray={125.6}
                strokeDashoffset={125.6 - (progress / 100) * 125.6}
                strokeLinecap="round"
                initial={false}
                animate={{ strokeDashoffset: 125.6 - (progress / 100) * 125.6 }}
                transition={{ duration: 0.2 }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-lg font-bold drop-shadow-glow">{Math.round(progress)}%</span>
            </span>
          </span>
        </motion.div>
        {/* Progress Bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="w-full h-2 bg-white/20 rounded-full mx-auto overflow-hidden mb-2"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-lg"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;