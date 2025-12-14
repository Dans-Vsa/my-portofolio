import { useState, useEffect } from 'react';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');

  const menuItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const welcomeSection = document.getElementById('welcome');
      if (welcomeSection) {
        const welcomeHeight = welcomeSection.offsetHeight;
        const scrollPosition = window.scrollY;
        
        // Show navbar when scrolled past welcome page
        setShowNavbar(scrollPosition > welcomeHeight - 100);
      }
      setScrolled(window.scrollY > 50);
      
      // Simple and reliable scroll spy
      const sections = ['contact', 'portfolio', 'about', 'home']; // reverse order untuk priority
      const scrollPosition = window.scrollY + 100;
      
      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(`#${sectionId}`);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        showNavbar ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo/Brand - Left */}
          <a
            href="#home"
            onClick={(e) => handleClick(e, '#home')}
            className="text-xl font-bold text-white hover:text-blue-400 transition-colors flex items-center gap-2"
          >
            <span className="text-2xl">&lt;/&gt;</span>
          </a>

          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-2 shadow-lg">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className={`px-4 md:px-6 py-2 text-sm md:text-base rounded-full font-medium transition-all duration-300 ${
                  activeSection === item.href
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:text-blue-500'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
          
          {/* Spacer for right side */}
          <div className="w-10"></div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-blue-400 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-md border-t border-gray-800">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className="block px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-blue-400 rounded-lg transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;