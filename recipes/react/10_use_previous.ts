/**
 * Sprout Craft Engineering Cookbook
 * Recipe #10: Tracking Previous State with usePrevious Hook
 *
 * Problem: Detecting changes between successive renders for animations or transition triggers.
 */

import { useRef, useEffect } from 'react';

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

// --- Usage Example ---
// const prevCount = usePrevious(count);
// const hasIncreased = prevCount !== undefined && count > prevCount;
