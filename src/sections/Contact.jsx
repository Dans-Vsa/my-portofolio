import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import { 
  FaEnvelope, 
  FaWhatsapp, 
  FaGithub, 
  FaInstagram,
  FaPaperPlane 
} from 'react-icons/fa';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // ============================================
  // FORM STATE
  // ============================================
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState('');

  // ============================================
  // CONTACT INFO - Ganti dengan info Anda
  // ============================================
  const contactInfo = [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'danishbintang75@gmail.com',
      link: 'mailto:danishbintang75@gmail.com',
    },
    {
      icon: FaWhatsapp,
      label: 'WhatsApp',
      value: '+62 813 8244 9254',
      link: 'https://wa.me/6281382449254',
    },
  ];

  // ============================================
  // SOCIAL MEDIA - Ganti dengan link Anda
  // ============================================
  const socialMedia = [
    {
      icon: FaGithub,
      name: 'GitHub',
      link: 'https://github.com/Dans-Vsa',
      color: 'hover:text-gray-900',
    },
    {
      icon: FaInstagram,
      name: 'Instagram',
      link: 'https://www.instagram.com/dasnhilo/',
      color: 'hover:text-pink-600',
    },
  ];

  // ============================================
  // HANDLE FORM CHANGE
  // ============================================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ============================================
  // HANDLE FORM SUBMIT
  // ============================================
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus('Please fill in all fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus('Please enter a valid email');
      return;
    }

    // TODO: Integrate with backend or email service
    // For now, just show success message
    setFormStatus('Message sent successfully! 🎉');
    
    // Reset form
    setFormData({ name: '', email: '', message: '' });

    // Clear status after 3 seconds
    setTimeout(() => setFormStatus(''), 3000);
  };

  // ============================================
  // ANIMATION VARIANTS
  // ============================================
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
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
      id="contact"
      ref={ref}
      className="py-20 bg-transparent"
    >
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white/90 backdrop-blur-md rounded-3xl p-8 sm:p-12 shadow-2xl"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* ============================================
            SECTION TITLE
            ============================================ */}
        <motion.div variants={itemVariants} className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mb-4"></div>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
          
          {/* ============================================
              LEFT SIDE - CONTACT INFO & SOCIAL
              ============================================ */}
          <motion.div variants={itemVariants} className="space-y-8">
            
            {/* Contact Info Cards */}
            <div className="space-y-3 sm:space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all"
                >
                  <div className="p-3 sm:p-4 bg-blue-100 rounded-lg flex-shrink-0">
                    <info.icon size={20} className="text-blue-600 sm:w-6 sm:h-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm text-gray-500 font-medium">
                      {info.label}
                    </p>
                    <p className="text-sm sm:text-lg text-gray-900 font-semibold truncate">
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Media */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                Connect With Me
              </h3>
              <div className="flex gap-3 sm:gap-4">
                {socialMedia.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className={`p-3 sm:p-4 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all text-gray-600 ${social.color}`}
                    aria-label={social.name}
                  >
                    <social.icon size={24} className="sm:w-7 sm:h-7" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Decorative Element */}
            <motion.div
              variants={itemVariants}
              className="relative p-6 sm:p-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl text-white"
            >
              <div className="relative z-10">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">Let's Work Together</h3>
                <p className="text-sm sm:text-base text-blue-100">
                  I'm always open to discussing new projects, creative ideas, or opportunities to 
                  create amazing user experiences.
                </p>
              </div>
              <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full blur-3xl"></div>
            </motion.div>
          </motion.div>

          {/* ============================================
              RIGHT SIDE - CONTACT FORM
              ============================================ */}
          <motion.div variants={itemVariants}>
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-4 sm:space-y-6"
            >
              {/* Name Input */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                />
              </div>

              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                />
              </div>

              {/* Message Input */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows="5"
                  className="w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <span>Send Message</span>
                <FaPaperPlane />
              </motion.button>

              {/* Form Status Message */}
              {formStatus && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-center p-4 rounded-lg ${
                    formStatus.includes('successfully')
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {formStatus}
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;

// ============================================
// CARA CUSTOMIZE:
// ============================================
// 1. Ganti email & phone (line 37, 43)
// 2. Ganti social media links (line 55-67)
// 3. Untuk integrasi backend:
//    - Uncomment line 105
//    - Tambahkan fetch/axios ke API endpoint
//    - Contoh: fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })
// 4. Tambah social media:
//    - Import icon dari react-icons
//    - Tambahkan ke array socialMedia
// 5. Ubah warna gradient (line 159, 243, 359)
// ============================================