import { motion } from 'framer-motion';
import TextPressure from './TextPressure';

const Welcome = () => {
  return (
    <section 
      id="welcome" 
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
    >
      {/* Content Container with TextPressure */}
      <motion.div 
        className="relative z-10 w-full px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="max-w-7xl mx-auto" style={{ height: '300px' }}>
          <TextPressure
            text="HI, I'M VESA"
            flex={true}
            alpha={false}
            stroke={true}
            width={true}
            weight={true}
            italic={true}
            textColor="#FFFFFF"
            strokeColor="#3B82F6"
            strokeWidth={3}
            minFontSize={36}
          />
        </div>
        
        {/* Scroll Down Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="flex flex-col items-center gap-2 text-blue-400">
            <span className="text-sm font-medium">Scroll Down</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Welcome;
