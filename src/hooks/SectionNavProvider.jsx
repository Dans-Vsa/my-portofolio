import { useCallback } from 'react';
import { SectionNavContext } from './sectionNavContext';
import { useLenis } from './lenisContext';

// Sections are cards in a fixed spiral stage, not elements at real scroll
// offsets, so navigation goes through Lenis.scrollTo against the virtual
// track height instead of anchor-link scrollIntoView.
export function SectionNavProvider({ sections, trackRef, children }) {
  const lenis = useLenis();

  const goToSection = useCallback(
    (id) => {
      const track = trackRef.current;
      if (!track || !lenis) return;

      if (id === 'home') {
        lenis.scrollTo(0);
        return;
      }

      const index = sections.findIndex((s) => s.id === id);
      if (index === -1) return;
      const start = track.offsetTop;
      const end = start + track.offsetHeight - window.innerHeight;
      const target =
        sections.length > 1 ? start + (index / (sections.length - 1)) * (end - start) : start;
      lenis.scrollTo(target);
    },
    [lenis, sections, trackRef]
  );

  return (
    <SectionNavContext.Provider value={{ sections, trackRef, goToSection }}>
      {children}
    </SectionNavContext.Provider>
  );
}
