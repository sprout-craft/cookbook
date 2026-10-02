/**
 * Sprout Craft Engineering Cookbook
 * Recipe #17: Vue 3 v-focus Custom Directive
 *
 * Problem: Automatically focusing input fields inside newly opened modals or steps.
 */

import type { Directive, DirectiveBinding } from 'vue';

export const vFocus: Directive<HTMLElement, number | undefined> = {
  mounted(el: HTMLElement, binding: DirectiveBinding<number | undefined>) {
    const delay = binding.value ?? 0;
    const focusTarget = el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' ? el : el.querySelector<HTMLElement>('input, textarea') ?? el;

    if (delay > 0) {
      setTimeout(() => focusTarget.focus(), delay);
    } else {
      focusTarget.focus();
    }
  },
};
