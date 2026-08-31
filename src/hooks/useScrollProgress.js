import { useEffect } from 'react';
import { useLenis } from './lenisContext';

/**
 * Calls onProgress(activeIndexFloat) on every Lenis scroll tick, where
 * activeIndexFloat runs from 0 to sectionCount - 1 across the height of
 * trackRef's element. Purely imperative (no React state) so callers can
 * drive GSAP transforms without triggering re-renders per scroll frame.
 */
export function useScrollProgress(trackRef, sectionCount, onProgress) {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis || !trackRef.current || sectionCount < 1) return;

    const handleScroll = ({ scroll }) => {
      const track = trackRef.current;
      if (!track) return;
      const start = track.offsetTop;
      const end = start + track.offsetHeight - window.innerHeight;
      const raw = end > start ? (scroll - start) / (end - start) : 0;
      const clamped = Math.min(Math.max(raw, 0), 1);
      onProgress(clamped * (sectionCount - 1));
    };

    lenis.on('scroll', handleScroll);
    handleScroll({ scroll: window.scrollY });

    return () => lenis.off('scroll', handleScroll);
  }, [lenis, trackRef, sectionCount, onProgress]);
}
