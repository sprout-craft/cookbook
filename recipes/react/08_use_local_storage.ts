/**
 * Sprout Craft Engineering Cookbook
 * Recipe #08: Type-Safe useLocalStorage Hook with Cross-Tab Sync
 *
 * Problem: Persisting client state while reacting to updates made in other tabs.
 */

import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const readValue = useCallback((): T => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const newValue = value instanceof Function ? value(storedValue) : value;
        window.localStorage.setItem(key, JSON.stringify(newValue));
        setStoredValue(newValue);
        window.dispatchEvent(new Event('local-storage-change'));
      } catch (err) {
        console.warn(`Error setting localStorage key "${key}":`, err);
      }
    },
    [key, storedValue]
  );

  useEffect(() => {
    const handleStorageChange = () => setStoredValue(readValue());
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('local-storage-change', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('local-storage-change', handleStorageChange);
    };
  }, [readValue]);

  return [storedValue, setValue];
}
