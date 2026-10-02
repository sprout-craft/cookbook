/**
 * Sprout Craft Engineering Cookbook
 * Recipe #09: Viewport Visibility Hook with IntersectionObserver
 *
 * Problem: Traditional scroll listeners cause layout thrashing; IntersectionObserver is non-blocking.
 */

import { useEffect, useState, useRef, RefObject } from 'react';

export interface IntersectionOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver(
  elementRef: RefObject<Element | null>,
  { threshold = 0, root = null, rootMargin = '0%', freezeOnceVisible = false }: IntersectionOptions = {}
): IntersectionObserverEntry | undefined {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const frozen = useRef(false);

  useEffect(() => {
    const node = elementRef.current;
    const hasIOSupport = !!window.IntersectionObserver;
    if (!hasIOSupport || !node || frozen.current) return;

    const observer = new IntersectionObserver(
      ([observedEntry]) => {
        setEntry(observedEntry);
        if (observedEntry.isIntersecting && freezeOnceVisible) {
          frozen.current = true;
          observer.disconnect();
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [elementRef, threshold, root, rootMargin, freezeOnceVisible]);

  return entry;
}
