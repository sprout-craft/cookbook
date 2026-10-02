/**
 * Sprout Craft Engineering Cookbook
 * Recipe #18: Vue 3 v-copy Clipboard Directive
 *
 * Problem: Adding seamless copy-to-clipboard functionality to any button or element without boilerplate.
 */

import type { Directive } from 'vue';

export const vCopy: Directive<HTMLElement, string> = {
  mounted(el, binding) {
    el.style.cursor = 'pointer';
    el.addEventListener('click', async () => {
      const textToCopy = binding.value;
      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy);
        el.setAttribute('data-copied', 'true');
        setTimeout(() => el.removeAttribute('data-copied'), 2000);
      } catch (err) {
        console.error('Failed to copy text to clipboard:', err);
      }
    });
  },
};
