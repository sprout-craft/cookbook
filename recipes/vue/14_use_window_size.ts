/**
 * Sprout Craft Engineering Cookbook
 * Recipe #14: Vue 3 useWindowSize Composable with Throttle
 *
 * Problem: Listening to window resize events without triggering layout thrashing on every tick.
 */

import { ref, onMounted, onBeforeUnmount, readonly } from 'vue';

export function useWindowSize() {
  const width = ref(typeof window !== 'undefined' ? window.innerWidth : 0);
  const height = ref(typeof window !== 'undefined' ? window.innerHeight : 0);

  let ticking = false;

  const updateSize = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        width.value = window.innerWidth;
        height.value = window.innerHeight;
        ticking = false;
      });
      ticking = true;
    }
  };

  onMounted(() => {
    window.addEventListener('resize', updateSize, { passive: true });
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateSize);
  });

  return {
    width: readonly(width),
    height: readonly(height),
  };
}
