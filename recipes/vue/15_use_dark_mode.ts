/**
 * Sprout Craft Engineering Cookbook
 * Recipe #15: Vue 3 useDark Theme Switcher Composable
 *
 * Problem: Seamless dark mode toggle with CSS class injection and system sync.
 */

import { ref, watchEffect } from 'vue';

export function useDarkMode(storageKey = 'sprout-theme') {
  const getInitialPreference = (): boolean => {
    const stored = localStorage.getItem(storageKey);
    if (stored !== null) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  const isDark = ref(getInitialPreference());

  watchEffect(() => {
    const root = document.documentElement;
    if (isDark.value) {
      root.classList.add('dark');
      localStorage.setItem(storageKey, 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem(storageKey, 'light');
    }
  });

  const toggle = () => {
    isDark.value = !isDark.value;
  };

  return { isDark, toggle };
}
