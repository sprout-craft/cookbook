/**
 * Sprout Craft Engineering Cookbook
 * Recipe #03: Nominal / Branded Types for Domain IDs
 *
 * Problem: Primitives like `string` or `number` can be accidentally swapped in function calls,
 * e.g. `transferFunds(fromUserId, toUserId, amount)` passing orderId instead of userId.
 */

declare const __brand: unique symbol;

export type Brand<K, T> = K & { readonly [__brand]: T };

export type UserId = Brand<string, 'UserId'>;
export type OrderId = Brand<string, 'OrderId'>;
export type EmailAddress = Brand<string, 'EmailAddress'>;

// Type-safe constructor functions / validators
export function parseEmail(value: string): EmailAddress {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    throw new Error(`Invalid email format: "${value}"`);
  }
  return value as EmailAddress;
}

export function makeUserId(rawId: string): UserId {
  if (!rawId || rawId.trim().length === 0) {
    throw new Error('UserId cannot be empty');
  }
  return rawId as UserId;
}

// --- Usage Example ---
export function sendReceipt(userId: UserId, email: EmailAddress) {
  return `Receipt dispatched to ${email} for user ${userId}`;
}
