/**
 * Sprout Craft Engineering Cookbook
 * Recipe #13: Vue 3 useClickOutside Composable
 *
 * Problem: Reliably closing dropdowns and context menus in Vue 3 with automatic cleanup on unmount.
 */

import { onMounted, onBeforeUnmount, type Ref } from 'vue';

export function useClickOutside(
  targetRef: Ref<HTMLElement | null>,
  callback: (e: MouseEvent) => void
) {
  const handler = (event: MouseEvent) => {
    if (!targetRef.value) return;
    if (!targetRef.value.contains(event.target as Node)) {
      callback(event);
    }
  };

  onMounted(() => {
    document.addEventListener('click', handler, true);
  });

  onBeforeUnmount(() => {
    document.removeEventListener('click', handler, true);
  });
}
