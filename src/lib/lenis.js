import Lenis from 'lenis';

let lenisInstance = null;
let rafId = null;

export function createLenis() {
  if (lenisInstance) return lenisInstance;

  const lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true,
  });

  const raf = (time) => {
    lenis.raf(time);
    rafId = requestAnimationFrame(raf);
  };
  rafId = requestAnimationFrame(raf);

  lenisInstance = lenis;
  return lenis;
}

export function destroyLenis() {
  if (!lenisInstance) return;
  if (rafId) cancelAnimationFrame(rafId);
  lenisInstance.destroy();
  lenisInstance = null;
  rafId = null;
}
