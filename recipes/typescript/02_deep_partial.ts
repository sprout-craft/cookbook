/**
 * Sprout Craft Engineering Cookbook
 * Recipe #02: Recursive DeepPartial & DeepReadonly Types
 *
 * Problem: Standard TypeScript Partial<T> and Readonly<T> only operate on top-level keys.
 * Deep configurations and immutable state trees require recursive narrowing.
 */

export type Primitive = string | number | boolean | bigint | symbol | undefined | null;

export type DeepPartial<T> = T extends Primitive
  ? T
  : T extends Function
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends Map<infer K, infer V>
  ? Map<K, DeepPartial<V>>
  : T extends Set<infer M>
  ? Set<DeepPartial<M>>
  : T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T;

export type DeepReadonly<T> = T extends Primitive
  ? T
  : T extends Function
  ? T
  : T extends Array<infer U>
  ? ReadonlyArray<DeepReadonly<U>>
  : T extends Map<infer K, infer V>
  ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
  : T extends Set<infer M>
  ? ReadonlySet<DeepReadonly<M>>
  : T extends object
  ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : T;

// --- Usage Example ---
export interface AppConfig {
  server: {
    host: string;
    port: number;
    ssl: { enabled: boolean; certPath?: string };
  };
  features: string[];
}

export function patchConfig(original: AppConfig, patch: DeepPartial<AppConfig>): AppConfig {
  return {
    ...original,
    ...patch,
    server: {
      ...original.server,
      ...(patch.server || {}),
      ssl: {
        ...original.server.ssl,
        ...(patch.server?.ssl || {}),
      },
    },
  };
}
