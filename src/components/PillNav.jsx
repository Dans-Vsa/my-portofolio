import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const PillNav = ({
  logo,
  logoAlt = "Logo",
  items = [],
  activeHref = "/",
  className = "",
  ease = "power2.easeOut",
  baseColor = "#000000",
  pillColor = "#3b82f6",
  hoveredPillTextColor = "#ffffff",
  pillTextColor = "#000000",
}) => {
  const [activeItem, setActiveItem] = useState(activeHref);
  const pillRef = useRef(null);
  const linksRef = useRef([]);

  // Sync activeItem with activeHref prop when it changes
  useEffect(() => {
    setActiveItem(activeHref);
  }, [activeHref]);

  useEffect(() => {
    // Initialize pill position on mount and when activeItem changes
    const activeIndex = items.findIndex(item => item.href === activeItem);
    if (activeIndex !== -1 && linksRef.current[activeIndex]) {
      const activeLink = linksRef.current[activeIndex];
      gsap.to(pillRef.current, {
        width: activeLink.offsetWidth,
        x: activeLink.offsetLeft,
        duration: 0.3,
        ease: ease,
      });
    }
  }, [activeItem, items, ease]);

  const handleClick = (e, href, index) => {
    e.preventDefault();
    setActiveItem(href);

    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }

    // Animate pill to new position
    const targetLink = linksRef.current[index];
    gsap.to(pillRef.current, {
      width: targetLink.offsetWidth,
      x: targetLink.offsetLeft,
      duration: 0.6,
      ease: ease,
    });
  };

  return (
    <nav className={`flex items-center gap-8 ${className}`}>
      {/* Logo */}
      {logo && (
        <a href="#home" className="flex items-center">
          <img src={logo} alt={logoAlt} className="h-8 w-auto" />
        </a>
      )}

      {/* Navigation Links with Pill Background */}
      <div className="relative flex items-center bg-gray-100 rounded-full p-1">
        {/* Animated Pill Background */}
        <div
          ref={pillRef}
          className="absolute h-[calc(100%-8px)] rounded-full transition-colors"
          style={{
            backgroundColor: pillColor,
            top: '4px',
            left: '4px',
          }}
        />

        {/* Navigation Items */}
        {items.map((item, index) => {
          const isActive = activeItem === item.href;
          return (
            <a
              key={item.href}
              ref={el => (linksRef.current[index] = el)}
              href={item.href}
              onClick={(e) => handleClick(e, item.href, index)}
              className="relative z-10 px-6 py-2 text-sm font-medium transition-colors duration-300"
              style={{
                color: isActive ? hoveredPillTextColor : baseColor,
              }}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
};

export default PillNav;
