import { useRef } from 'react';
import { gsap } from '../../lib/gsap';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import SpiralCard from './SpiralCard';

// Renders About/Portfolio/Contact as a cascading stack of square preview
// tiles (see design.md reference) next to the persistent identity panel.
// Position/blur/scale are a pure function of scroll progress — there is no
// ticker/autoplay, so the stage is fully idle whenever the user isn't
// scrolling.
const SpiralStage = ({ sections, trackRef, identity }) => {
  const cardEls = useRef([]);
  const setters = useRef([]);
  const dotEls = useRef([]);

  const registerCard = (index, el) => {
    cardEls.current[index] = el;
    if (!el || setters.current[index]) return;
    setters.current[index] = {
      x: gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' }),
      y: gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' }),
      rotate: gsap.quickTo(el, 'rotate', { duration: 0.6, ease: 'power3.out' }),
      scale: gsap.quickTo(el, 'scale', { duration: 0.6, ease: 'power3.out' }),
      opacity: gsap.quickTo(el, 'opacity', { duration: 0.4, ease: 'power2.out' }),
    };
  };

  const applyProgress = (activeFloat) => {
    const active = Math.round(activeFloat);

    sections.forEach((_, i) => {
      const setter = setters.current[i];
      const el = cardEls.current[i];
      if (!setter || !el) return;
      const offset = i - activeFloat;
      const abs = Math.abs(offset);

      setter.x(offset * 70);
      setter.y(offset * -60);
      setter.rotate(offset * 10);
      setter.scale(Math.max(1 - abs * 0.4, 0.35));
      setter.opacity(Math.max(1 - abs * 0.6, 0.12));
      el.style.filter = `blur(${Math.min(abs * 8, 16)}px)`;
      el.style.zIndex = String(100 - Math.round(abs * 10));
      el.style.pointerEvents = abs < 0.5 ? 'auto' : 'none';
    });

    dotEls.current.forEach((dot, i) => {
      if (!dot) return;
      dot.style.backgroundColor = i === active ? 'var(--color-text)' : 'var(--color-border)';
      dot.style.transform = i === active ? 'scale(1.4)' : 'scale(1)';
    });
  };

  useScrollProgress(trackRef, sections.length, applyProgress);

  return (
    <div className="sticky top-0 h-screen w-full overflow-hidden bg-bg">
      <div className="max-w-7xl mx-auto h-full px-6 sm:px-10 lg:px-16 grid md:grid-cols-2 items-center gap-md md:gap-lg py-md">
        <div className="order-1">{identity}</div>

        <div className="order-2 flex items-center justify-center gap-sm">
          <div
            className="relative w-full max-w-[420px] aspect-square"
            style={{ perspective: '1200px' }}
          >
            {sections.map((section, i) => (
              <SpiralCard key={section.id} ref={(el) => registerCard(i, el)}>
                {section.content}
              </SpiralCard>
            ))}
          </div>

          <div className="flex flex-col items-center gap-2 shrink-0">
            {sections.map((section, i) => (
              <span
                key={section.id}
                ref={(el) => (dotEls.current[i] = el)}
                className="w-1.5 h-1.5 rounded-full transition-transform"
                style={{ backgroundColor: 'var(--color-border)' }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpiralStage;
