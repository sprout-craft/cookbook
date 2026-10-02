/**
 * Sprout Craft Engineering Cookbook
 * Recipe #46: Deep Clone with Circular Reference Resolution
 *
 * Problem: structuredClone may fail on functions; JSON.parse throws on circular structures.
 */

export function deepClone<T>(obj: T, seen = new WeakMap<object, any>()): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) return new Date(obj.getTime()) as any;
  if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags) as any;

  if (seen.has(obj as object)) {
    return seen.get(obj as object);
  }

  if (obj instanceof Set) {
    const copy = new Set();
    seen.set(obj, copy);
    obj.forEach((val) => copy.add(deepClone(val, seen)));
    return copy as any;
  }

  if (obj instanceof Map) {
    const copy = new Map();
    seen.set(obj, copy);
    obj.forEach((val, key) => copy.set(deepClone(key, seen), deepClone(val, seen)));
    return copy as any;
  }

  const copy = Array.isArray(obj) ? [] : Object.create(Object.getPrototypeOf(obj));
  seen.set(obj as object, copy);

  for (const key of Reflect.ownKeys(obj as object)) {
    copy[key] = deepClone((obj as any)[key], seen);
  }

  return copy;
}
