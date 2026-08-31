import { useState } from 'react';
import { FaUserAlt, FaLaptopCode, FaLayerGroup, FaCertificate, FaEnvelope } from 'react-icons/fa';
import './App.css';
import InfiniteSpiral from './components/motion/InfiniteSpiral';
import Home from './sections/Home';
import PreviewTile from './sections/previews/PreviewTile';
import { portfolioData } from './data/portfolioData';
import { playReelClick } from './lib/reelClick';

const SPIRAL_ITEMS = [
  {
    id: 'about',
    label: 'About',
    preview: <PreviewTile icon={FaUserAlt} title="About" subtitle="Frontend Developer & UI/UX Designer" />,
  },
  {
    id: 'projects',
    label: 'Projects',
    preview: (
      <PreviewTile
        icon={FaLaptopCode}
        title="Projects"
        subtitle={`${portfolioData.projects.length} featured builds`}
      />
    ),
  },
  {
    id: 'tech-stack',
    label: 'Tech Stack',
    preview: (
      <PreviewTile
        icon={FaLayerGroup}
        title="Tech Stack"
        subtitle={`${portfolioData.techStack.length} tools & languages`}
      />
    ),
  },
  {
    id: 'certificates',
    label: 'Certificates',
    preview: (
      <PreviewTile
        icon={FaCertificate}
        title="Certificates"
        subtitle={`${portfolioData.certificates.length} certifications earned`}
      />
    ),
  },
  {
    id: 'contact',
    label: 'Contact',
    preview: <PreviewTile icon={FaEnvelope} title="Contact" subtitle="Let's build something together" />,
  },
];

function App() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <main className="App bg-bg text-text h-screen w-full overflow-hidden select-none">
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
    </main>
  );
}

export default App;
