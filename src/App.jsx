import { useState, useEffect, useMemo } from 'react';
import { FaUserAlt, FaLaptopCode, FaLayerGroup, FaCertificate, FaEnvelope } from 'react-icons/fa';
import { FiArrowLeft, FiUser, FiMessageCircle } from 'react-icons/fi';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import './App.css';
import InfiniteSpiral from './components/motion/InfiniteSpiral';
import MobileCardStage from './components/motion/MobileCardStage';
import Home, { HomeProfile } from './sections/Home';
import About from './sections/About';
import Projects from './sections/Projects';
import TechStack from './sections/TechStack';
import Certificates from './sections/Certificates';
import Contact from './sections/Contact';
import PreviewTile from './sections/previews/PreviewTile';
import { portfolioData } from './data/portfolioData';
import { playReelClick } from './lib/reelClick';
import LanguageToggle from './components/LanguageToggle';
import { useLanguage } from './i18n/languageContext';

// Spiral card id -> full-screen section it opens.
const SECTIONS = {
  about: About,
  projects: Projects,
  'tech-stack': TechStack,
  certificates: Certificates,
  contact: Contact,
};

const buildSpiralItems = (cards) => [
  {
    id: 'about',
    label: cards.about.label,
    preview: <PreviewTile icon={FaUserAlt} title={cards.about.label} subtitle={cards.about.subtitle} />,
  },
  {
    id: 'projects',
    label: cards.projects.label,
    preview: (
      <PreviewTile
        icon={FaLaptopCode}
        title={cards.projects.label}
        subtitle={cards.projects.subtitle(portfolioData.projects.length)}
      />
    ),
  },
  {
    id: 'tech-stack',
    label: cards.techStack.label,
    preview: (
      <PreviewTile
        icon={FaLayerGroup}
        title={cards.techStack.label}
        subtitle={cards.techStack.subtitle(portfolioData.techStack.length)}
      />
    ),
  },
  {
    id: 'certificates',
    label: cards.certificates.label,
    preview: (
      <PreviewTile
        icon={FaCertificate}
        title={cards.certificates.label}
        subtitle={cards.certificates.subtitle(portfolioData.certificates.length)}
      />
    ),
  },
  {
    id: 'contact',
    label: cards.contact.label,
    preview: <PreviewTile icon={FaEnvelope} title={cards.contact.label} subtitle={cards.contact.subtitle} />,
  },
];

function App() {
  const { t } = useLanguage();
  const SPIRAL_ITEMS = useMemo(
    () => buildSpiralItems(t.cards).map((item) => ({ ...item, openLabel: `${t.home.goTo} ${item.label}` })),
    [t],
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeSection, setActiveSection] = useState(null);
  const ActiveSection = activeSection ? SECTIONS[activeSection] : null;
  const [transitioningBack, setTransitioningBack] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth < 768 : false));

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleBack = (e) => {
    if (transitioningBack || isTransitioning) return;
    playReelClick();

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setActiveSection(null);
      return;
    }

    let rect = null;
    if (e?.currentTarget && typeof e.currentTarget.getBoundingClientRect === 'function') {
      rect = e.currentTarget.getBoundingClientRect();
    } else if (typeof document !== 'undefined') {
      const btn = document.querySelector('button[aria-label="Back to Homepage"]');
      if (btn) rect = btn.getBoundingClientRect();
    }

    if (!rect || rect.width === 0 || rect.height === 0) {
      const size = isMobile ? 48 : 56;
      rect = {
        top: window.innerHeight / 2 - size / 2,
        left: window.innerWidth / 2 - size / 2,
        width: size,
        height: size,
      };
    }

    setIsTransitioning(true);
    setTransitioningBack({
      rect: {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      },
    });

    // At 420ms: white circle has expanded to cover the screen, mount Home underneath
    setTimeout(() => {
      setActiveSection(null);
    }, 420);

    // At 950ms: circle has finished expanding and dissolved, cleanup
    setTimeout(() => {
      setTransitioningBack(null);
      setIsTransitioning(false);
    }, 950);
  };

  // Keyboard shortcut: Escape to return to home
  useEffect(() => {
    if (!activeSection) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleBack();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, isTransitioning, transitioningBack]);

  const handleCardClick = (item) => {
    if (transitioningBack || isTransitioning) return;
    playReelClick();

    if (SECTIONS[item.id]) {
      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        setActiveSection(item.id);
        return;
      }

      setIsTransitioning(true);
      setActiveSection(item.id);

      setTimeout(() => {
        setIsTransitioning(false);
      }, 700);
    }
  };

  return (
    <main className="App bg-bg text-text h-screen w-full overflow-hidden select-none relative">
      <AnimatePresence>
        {ActiveSection ? (
          <Motion.div
            key={`section-${activeSection}`}
            initial={isMobile ? { y: '-100%', x: 0 } : { x: '-100%', y: 0 }}
            animate={isMobile ? { y: '0%', x: 0 } : { x: '0%', y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] } }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute inset-0 w-full h-full z-20 overflow-hidden ${
              isMobile ? 'shadow-[0_24px_60px_rgba(0,0,0,0.7)]' : 'shadow-[24px_0_60px_rgba(0,0,0,0.6)]'
            }`}
          >
            <ActiveSection onBack={handleBack} isBackTransitioning={!!transitioningBack} />
          </Motion.div>
        ) : isMobile ? (
          /* Mobile layout: identity, vertical 3D reel, and profile/contact actions. */
          <Motion.div
            key="mobile-home"
            initial={{ opacity: 0, scale: 0.96, y: 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{
              y: '40%',
              opacity: 0,
              transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
            }}
            transition={{
              duration: 0.38,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mobile-home absolute inset-0 z-10 overflow-hidden"
          >
            {/* Top: Name Component */}
            <div className="mobile-home__header">
              <HomeProfile />
            </div>

            {/* Cards fold into the top and bottom stacks while scrolling. */}
            <div className="mobile-home__stage">
              <MobileCardStage
                items={SPIRAL_ITEMS}
                activeIndex={activeIndex}
                onChange={setActiveIndex}
                onStep={playReelClick}
                onCardClick={handleCardClick}
              />
            </div>

            <nav className="mobile-home__actions" aria-label="Profile and contact">
              <button type="button" aria-label={t.home.aboutMe} onClick={() => handleCardClick(SPIRAL_ITEMS[0])}>
                <FiUser aria-hidden="true" />
              </button>
              <button type="button" aria-label={t.home.contactMe} onClick={() => handleCardClick(SPIRAL_ITEMS[4])}>
                <FiMessageCircle aria-hidden="true" />
              </button>
            </nav>

            {/* Mobile Right Navigation Dots */}
            <nav className="mobile-home__dots" aria-label="Portfolio sections">
              {SPIRAL_ITEMS.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveIndex(i);
                    playReelClick();
                  }}
                  aria-label={`${t.home.goTo} ${item.label}`}
                  aria-current={i === activeIndex ? 'true' : undefined}
                >
                  <span
                    aria-hidden="true"
                  />
                </button>
              ))}
            </nav>
          </Motion.div>
        ) : (
          /* Desktop Layout: 100% Original untouched layout */
          <Motion.div
            key="desktop-home"
            initial={{ opacity: 0, scale: 0.96, x: 0 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{
              x: '40%',
              opacity: 0,
              transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
            }}
            transition={{
              duration: 0.38,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute inset-0 w-full h-full z-10 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto h-full px-6 sm:px-10 lg:px-16 flex flex-col md:flex-row items-center gap-lg relative">
              {/* Left Side: Identity Panel */}
              <div className="w-full md:w-[340px] md:shrink-0 pt-8 md:pt-0 z-20">
                <Home />
              </div>

              {/* Right Side: Fluid 3D Spiral Carousel with original sizing */}
              <div className="relative h-full w-full flex-1 overflow-hidden flex items-center justify-center">
                <InfiniteSpiral
                  items={SPIRAL_ITEMS}
                  animationMode="scroll"
                  speed={0.55}
                  radius={200}
                  cardWidth={300}
                  cardHeight={190}
                  verticalSpacing={140}
                  perspective={1000}
                  cardRadius={24}
                  cardsPerTurn={5}
                  centerScale={1.15}
                  edgeBlur={6}
                  onActiveIndexChange={setActiveIndex}
                  onStep={playReelClick}
                  onCardClick={handleCardClick}
                  stepsPerCard={4}
                />
              </div>

              {/* Right Navigation Dots */}
              <div className="hidden sm:flex flex-col gap-2 fixed right-6 top-1/2 -translate-y-1/2 z-40">
                {SPIRAL_ITEMS.map((item, i) => (
                  <span
                    key={item.id}
                    className="w-1 h-1 rounded-full transition-all duration-300 pointer-events-none"
                    style={{
                      backgroundColor: i === activeIndex ? 'var(--color-text)' : 'var(--color-border)',
                      transform: i === activeIndex ? 'scale(1.4)' : 'scale(1)',
                    }}
                  />
                ))}
              </div>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>

      {/* Home-screen language switch. About and Projects render their own in their headers. */}
      {!activeSection && (
        <div className="absolute top-3 right-3 sm:top-6 sm:right-6 z-40">
          <LanguageToggle tone="light" />
        </div>
      )}

      {/* Zoom Out & Circle Expansion Back Transition Overlay */}
      {transitioningBack && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {/* Only the circle expands to fill the screen */}
          <Motion.div
            key="transitioning-back-circle"
            initial={{
              scale: 1,
              opacity: 1,
            }}
            animate={{
              scale: [1, 0.88, 80],
              opacity: [1, 1, 1, 0],
            }}
            transition={{
              scale: {
                duration: 0.95,
                times: [0, 0.24, 1],
                ease: ['easeInOut', [0.22, 1, 0.36, 1]],
              },
              opacity: {
                duration: 0.95,
                times: [0, 0.24, 0.68, 1],
                ease: 'easeOut',
              },
            }}
            style={{
              position: 'fixed',
              top: transitioningBack.rect.top,
              left: transitioningBack.rect.left,
              width: transitioningBack.rect.width,
              height: transitioningBack.rect.height,
              transformOrigin: 'center center',
              borderRadius: '9999px',
              backgroundColor: '#ffffff',
              boxShadow: '0 0 50px rgba(0, 0, 0, 0.15)',
              willChange: 'transform, opacity',
            }}
          />

          {/* The arrow stays at fixed size, takes subtle anticipation, and fades out without growing */}
          <Motion.div
            key="transitioning-back-arrow"
            initial={{
              scale: 1,
              opacity: 1,
            }}
            animate={{
              scale: [1, 0.88, 0.88],
              opacity: [1, 1, 0],
            }}
            transition={{
              duration: 0.32,
              times: [0, 0.24, 1],
              ease: 'easeOut',
            }}
            style={{
              position: 'fixed',
              top: transitioningBack.rect.top,
              left: transitioningBack.rect.left,
              width: transitioningBack.rect.width,
              height: transitioningBack.rect.height,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#000000',
              zIndex: 10,
              pointerEvents: 'none',
              transformOrigin: 'center center',
            }}
          >
            <FiArrowLeft size={18} className="sm:text-[20px]" />
          </Motion.div>
        </div>
      )}
    </main>
  );
}

export default App;
