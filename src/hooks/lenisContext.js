import { createContext, useContext } from 'react';

export const LenisContext = createContext(null);

export function useLenis() {
  return useContext(LenisContext);
}
