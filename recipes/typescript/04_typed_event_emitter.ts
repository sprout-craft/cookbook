/**
 * Sprout Craft Engineering Cookbook
 * Recipe #04: Type-Safe Event Emitter Pattern
 *
 * Problem: Traditional EventEmitters take `string` event names and `any` arguments,
 * leading to silent payload mismatches across module boundaries.
 */

export type EventMap = Record<string, unknown>;
export type EventListener<T> = (payload: T) => void | Promise<void>;

export class TypedEventEmitter<Events extends EventMap> {
  private listeners: {
    [K in keyof Events]?: Set<EventListener<Events[K]>>;
  } = {};

  on<K extends keyof Events>(event: K, listener: EventListener<Events[K]>): () => void {
    if (!this.listeners[event]) {
      this.listeners[event] = new Set();
    }
    this.listeners[event]!.add(listener);

    // Return unbind subscription function
    return () => this.off(event, listener);
  }

  off<K extends keyof Events>(event: K, listener: EventListener<Events[K]>): void {
    this.listeners[event]?.delete(listener);
  }

  emit<K extends keyof Events>(event: K, payload: Events[K]): void {
    const handlers = this.listeners[event];
    if (handlers) {
      handlers.forEach((fn) => fn(payload));
    }
  }

  clear(): void {
    this.listeners = {};
  }
}

// --- Usage Example ---
export interface WorkspaceEvents {
  'user:joined': { userId: string; timestamp: number };
  'doc:saved': { docId: string; version: number };
}

export const eventHub = new TypedEventEmitter<WorkspaceEvents>();
