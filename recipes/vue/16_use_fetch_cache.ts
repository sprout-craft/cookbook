/**
 * Sprout Craft Engineering Cookbook
 * Recipe #16: Vue 3 Stale-While-Revalidate useFetchCache Composable
 *
 * Problem: Redundant network requests for identical API responses during page navigation.
 */

import { ref, shallowRef } from 'vue';

const cache = new Map<string, { data: unknown; timestamp: number }>();

export function useFetchCache<T>(url: string, ttlMs = 60_000) {
  const data = shallowRef<T | null>(null);
  const loading = ref(false);
  const error = ref<Error | null>(null);

  const execute = async () => {
    const cached = cache.get(url);
    const now = Date.now();

    if (cached && now - cached.timestamp < ttlMs) {
      data.value = cached.data as T;
      return;
    }

    loading.value = true;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const json = await res.json();
      data.value = json;
      cache.set(url, { data: json, timestamp: now });
    } catch (err) {
      error.value = err as Error;
    } finally {
      loading.value = false;
    }
  };

  execute();

  return { data, loading, error, refresh: execute };
}
