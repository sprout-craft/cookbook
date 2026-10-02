/**
 * Sprout Craft Engineering Cookbook
 * Recipe #01: Exhaustive Type Narrowing with assertNever
 *
 * Problem: When adding a new variant to a discriminated union, you want the compiler
 * to fail if any switch/if branch fails to handle it.
 */

export function assertNever(x: never, message?: string): never {
  throw new Error(
    message ?? `Unexpected object received in exhaustive check: ${JSON.stringify(x)}`
  );
}

// --- Usage Example ---
export type OrderState = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export function getOrderStatusBadge(status: OrderState): { label: string; color: string } {
  switch (status) {
    case 'pending':
      return { label: 'Awaiting Payment', color: 'amber' };
    case 'processing':
      return { label: 'Packaging', color: 'blue' };
    case 'shipped':
      return { label: 'In Transit', color: 'indigo' };
    case 'delivered':
      return { label: 'Completed', color: 'emerald' };
    case 'cancelled':
      return { label: 'Voided', color: 'rose' };
    default:
      // If a new status like 'refunded' is added to OrderState, TypeScript will trigger a compile error here!
      return assertNever(status);
  }
}
