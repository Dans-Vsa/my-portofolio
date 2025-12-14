import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 2 }}
      className="fixed inset-0 z-[10000] bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center"
      onAnimationComplete={() => setIsLoading(false)}
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">
            DV
          </h1>
          <p className="text-xl text-white/80">Danish Vesa</p>
        </motion.div>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 2, ease: 'easeInOut' }}
          className="w-64 h-2 bg-white/20 rounded-full mx-auto overflow-hidden"
        >
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            className="h-full w-full bg-white rounded-full"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;