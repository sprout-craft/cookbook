/**
 * Sprout Craft Engineering Cookbook
 * Recipe #05: Functional Result<T, E> Pattern
 *
 * Problem: Throwing errors in business logic makes control flow invisible in function signatures.
 * Result<T, E> forces explicit handling of error states.
 */

export type Result<T, E = Error> =
  | { readonly ok: true; readonly value: T; readonly error?: never }
  | { readonly ok: false; readonly error: E; readonly value?: never };

export const Ok = <T>(value: T): Result<T, never> => ({ ok: true, value });
export const Err = <E>(error: E): Result<never, E> => ({ ok: false, error });

export async function wrapAsync<T, E = Error>(
  promise: Promise<T>
): Promise<Result<T, E>> {
  try {
    const data = await promise;
    return Ok(data);
  } catch (err) {
    return Err(err as E);
  }
}

// --- Usage Example ---
export async function fetchUserById(id: string): Promise<Result<{ id: string; name: string }, string>> {
  if (!id) return Err('User ID must not be empty');
  return Ok({ id, name: 'Alice' });
}
