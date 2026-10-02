/**
 * Sprout Craft Engineering Cookbook
 * Recipe #45: Generic Binary Search with Lower & Upper Bound
 *
 * Problem: Finding first element >= target without boundary off-by-one errors.
 */

export function lowerBound<T>(arr: readonly T[], target: T, compare: (a: T, b: T) => number): number {
  let low = 0;
  let high = arr.length;

  while (low < high) {
    const mid = (low + high) >>> 1;
    if (compare(arr[mid], target) < 0) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  return low;
}

export function upperBound<T>(arr: readonly T[], target: T, compare: (a: T, b: T) => number): number {
  let low = 0;
  let high = arr.length;

  while (low < high) {
    const mid = (low + high) >>> 1;
    if (compare(arr[mid], target) <= 0) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  return low;
}
