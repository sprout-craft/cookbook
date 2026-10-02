/**
 * Sprout Craft Engineering Cookbook
 * Recipe #12: Reactive Responsive Media Query Hook
 *
 * Problem: Conditional rendering based on viewport size or device capabilities.
 */

import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const documentChangeHandler = (e: MediaQueryListEvent) => setMatches(e.matches);

    setMatches(mediaQueryList.matches);
    mediaQueryList.addEventListener('change', documentChangeHandler);

    return () => {
      mediaQueryList.removeEventListener('change', documentChangeHandler);
    };
  }, [query]);

  return matches;
}

// --- Usage Example ---
// const isMobile = useMediaQuery('(max-width: 768px)');
