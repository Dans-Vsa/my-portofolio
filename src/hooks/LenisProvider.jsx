import { useEffect, useState } from 'react';
import { LenisContext } from './lenisContext';
import { createLenis, destroyLenis } from '../lib/lenis';

export function LenisProvider({ children }) {
  const [lenis] = useState(() => createLenis());

  useEffect(() => {
    return () => destroyLenis();
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
