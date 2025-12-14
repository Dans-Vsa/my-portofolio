import { motion } from 'framer-motion';
import { FaGithub, FaInstagram, FaWhatsapp, FaHeart, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  // ============================================
  // SOCIAL MEDIA LINKS - Ganti dengan link Anda
  // ============================================
  const socialLinks = [
    {
      icon: FaGithub,
      href: 'https://github.com/Dans-Vsa',
      label: 'GitHub',
    },
    {
      icon: FaInstagram,
      href: 'https://www.instagram.com/dasnhilo/',
      label: 'Instagram',
    },
    {
      icon: FaWhatsapp,
      href: 'https://wa.me/6281382449254',
      label: 'WhatsApp',
    },
  ];

  // ============================================
  // QUICK LINKS
  // ============================================
  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  // ============================================
  // SCROLL TO TOP FUNCTION
  // ============================================
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ============================================
  // SMOOTH SCROLL FUNCTION
  // ============================================
  const handleClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          
          {/* ============================================
              COLUMN 1 - BRAND & DESCRIPTION
              ============================================ */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
              Danish Vesa
            </h3>
            <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4">
              Frontend Developer & UI/UX Designer passionate about creating beautiful, 
              responsive web applications and exceptional user experiences.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex gap-3 sm:gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={20} className="sm:w-6 sm:h-6" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* ============================================
              COLUMN 2 - QUICK LINKS
              ============================================ */}
          <div>
            <h4 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm sm:text-base">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ============================================
              COLUMN 3 - CONTACT INFO
              ============================================ */}
          <div>
            <h4 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Get In Touch</h4>
            <ul className="space-y-2 text-sm sm:text-base text-gray-400">
              <li>
                <a
                  href="mailto:danishbintang75@gmail.com"
                  className="hover:text-white transition-colors break-all"
                >
                  danishbintang75@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/6281382449254"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  +62 813 8244 9254
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ============================================
            DIVIDER LINE
            ============================================ */}
        <div className="border-t border-gray-800 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
            
            {/* Copyright */}
            <p className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
              © {new Date().getFullYear()} Danish Vesa Bintang Parikesit. Made with{' '}
              <FaHeart className="inline text-red-500" /> using React & Tailwind CSS
            </p>

            {/* Back to Top Button */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-xs sm:text-sm font-semibold"
            >
              <span>Back to Top</span>
              <FaArrowUp className="w-3 h-3 sm:w-4 sm:h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// ============================================
// CARA CUSTOMIZE:
// ============================================
// 1. Ganti "Your Name" (line 67, 156)
// 2. Ganti social media links (line 12-24)
// 3. Ganti email & phone (line 129, 136)
// 4. Ganti tagline (line 70-72)
// 5. Tambah kolom baru:
//    - Copy struktur <div> column
//    - Ubah md:grid-cols-3 menjadi md:grid-cols-4 (line 61)
// 6. Ubah warna:
//    - bg-gray-900 → bg-[warna-lain]
//    - bg-blue-600 → bg-[warna-lain]-600
// ============================================