import { motion } from 'framer-motion';
import { FaGithub, FaInstagram, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import { HiArrowDown } from 'react-icons/hi';
import { TypeAnimation } from 'react-type-animation';

const Hero = () => {
  // ============================================
  // ANIMATION VARIANTS
  // ============================================
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden"
    >
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* ============================================
              LEFT SIDE - TEXT CONTENT WITH BACKDROP
              ============================================ */}
          <motion.div variants={itemVariants} className="space-y-6 bg-gray-900/80 backdrop-blur-md p-8 rounded-2xl border border-white/10">
            
            {/* Greeting */}
            <motion.p
              className="text-lg text-gray-300 font-medium"
              variants={itemVariants}
            >
              👋 Hi, I'm
            </motion.p>

            {/* Name - Ganti dengan nama Anda */}
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight"
              variants={itemVariants}
            >
              Danish Vesa Bintang Parikesit
            </motion.h1>

            {/* Role/Tagline - Ganti dengan role Anda */}
            <motion.div
              className="text-xl sm:text-2xl md:text-3xl font-semibold text-blue-400 h-8 sm:h-10 md:h-12"
              variants={itemVariants}
            >
              <TypeAnimation
                sequence={[
                  'Frontend Developer',
                  2000,
                  'UI/UX Designer',
                  2000,
                  'Web Developer',
                  2000,
                  'Creative Designer',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </motion.div>

            {/* Description - Ganti dengan deskripsi singkat */}
            <motion.p
              className="text-lg text-gray-300 leading-relaxed"
              variants={itemVariants}
            >
              I specialize in crafting beautiful, responsive, and user-friendly web interfaces. 
              With a passion for clean design and seamless user experiences, I transform ideas 
              into interactive digital solutions using modern frontend technologies.
            </motion.p>

            {/* ============================================
                CTA BUTTONS
                ============================================ */}
            <motion.div
              className="flex flex-wrap gap-4"
              variants={itemVariants}
            >
              {/* Primary Button - View Portfolio */}
              <a
                href="#portfolio"
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
              >
                View My Work
              </a>

              {/* Secondary Button - Contact */}
              <a
                href="#contact"
                className="px-8 py-3 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-blue-600 transition-colors"
              >
                Get In Touch
              </a>
            </motion.div>

            {/* ============================================
                SOCIAL LINKS
                ============================================ */}
            {/* Social Links - GANTI SEMUA LINK DI BAWAH */}
            <motion.div
              className="flex gap-4 pt-4"
              variants={itemVariants}
            >
              <a
                href="https://github.com/Dans-Vsa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-400 transition-colors"
                aria-label="GitHub"
              >
                <FaGithub size={28} />
              </a>

              <a
                href="https://www.instagram.com/dasnhilo/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-400 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={28} />
              </a>

              <a
                href="https://wa.me/6281382449254"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-400 transition-colors"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={28} />
              </a>

              <a
                href="mailto:danishbintang75@gmail.com"
                className="text-gray-300 hover:text-blue-400 transition-colors"
                aria-label="Email"
              >
                <FaEnvelope size={28} />
              </a>
            </motion.div>
          </motion.div>

          {/* ============================================
              RIGHT SIDE - PROFILE IMAGE
              ============================================ */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            
            {/* Profile Image Container */}
            {/* Profile Image - GANTI LINK FOTO */}
            <div className="relative">
              <motion.img
                src="/profile.jpg"
                alt="Profile Danish Vesa"
                className="w-full max-w-xs mx-auto rounded-full shadow-2xl border-8 border-white ring-4 ring-blue-500/50"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        </div>

        {/* ============================================
            SCROLL DOWN INDICATOR
            ============================================ */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <a
            href="#about"
            className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors"
          >
            <span className="text-sm font-medium mb-2">Scroll Down</span>
            <HiArrowDown size={24} />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;

// ============================================
// CARA CUSTOMIZE:
// ============================================
// 1. Ganti "Your Name" (line 64) dengan nama Anda
// 2. Ganti "Full-Stack Developer" (line 72) dengan role Anda
// 3. Ganti deskripsi (line 80-82) dengan bio Anda
// 4. Ganti social media links (line 123, 134, 145)
// 5. Ganti foto profil (line 163):
//    - Upload foto ke folder public/ → gunakan "/profile.jpg"
//    - Atau gunakan link eksternal
// 6. Ubah warna gradient background (line 32):
//    - from-blue-50 → from-[warna]-50
// ============================================