import { createContext, useContext } from 'react';

export const SectionNavContext = createContext(null);

export function useSectionNav() {
  return useContext(SectionNavContext);
}
