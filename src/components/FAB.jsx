import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { 
  FaWhatsapp, 
  FaEnvelope, 
  FaArrowUp, 
  FaPlus, 
  FaTimes 
} from 'react-icons/fa';

const FAB = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      icon: FaWhatsapp,
      label: 'WhatsApp',
      href: 'https://wa.me/6281382449254',
      color: 'bg-green-500 hover:bg-green-600',
    },
    {
      icon: FaEnvelope,
      label: 'Email',
      href: 'mailto:danishbintang75@gmail.com',
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      icon: FaArrowUp,
      label: 'Back to Top',
      onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
      color: 'bg-purple-500 hover:bg-purple-600',
    },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-20 right-0 flex flex-col gap-3"
          >
            {actions.map((action, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <span className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap">
                  {action.label}
                </span>
                <motion.a
                  href={action.href}
                  onClick={action.onClick}
                  target={action.href ? '_blank' : undefined}
                  rel={action.href ? 'noopener noreferrer' : undefined}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`${action.color} text-white p-4 rounded-full shadow-lg`}
                >
                  <action.icon size={20} />
                </motion.a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-5 rounded-full shadow-2xl"
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <FaTimes size={24} /> : <FaPlus size={24} />}
        </motion.div>
      </motion.button>
    </div>
  );
};

export default FAB;