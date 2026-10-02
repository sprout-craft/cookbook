/**
 * Sprout Craft Engineering Cookbook
 * Recipe #44: O(1) LRU Cache via Hash Map & Doubly Linked List
 */

class Node<K, V> {
  key: K;
  value: V;
  prev: Node<K, V> | null = null;
  next: Node<K, V> | null = null;

  constructor(key: K, value: V) {
    this.key = key;
    this.value = value;
  }
}

export class LRUCache<K, V> {
  private capacity: number;
  private map: Map<K, Node<K, V>> = new Map();
  private head: Node<K, V>;
  private tail: Node<K, V>;

  constructor(capacity: number) {
    this.capacity = capacity;
    // Dummy sentinel nodes
    this.head = new Node<K, V>(null as any, null as any);
    this.tail = new Node<K, V>(null as any, null as any);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  public get(key: K): V | undefined {
    const node = this.map.get(key);
    if (!node) return undefined;
    this.moveToHead(node);
    return node.value;
  }

  public put(key: K, value: V): void {
    const existing = this.map.get(key);
    if (existing) {
      existing.value = value;
      this.moveToHead(existing);
      return;
    }

    const newNode = new Node(key, value);
    this.map.set(key, newNode);
    this.addNode(newNode);

    if (this.map.size > this.capacity) {
      const lru = this.popTail();
      this.map.delete(lru.key);
    }
  }

  private addNode(node: Node<K, V>): void {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next!.prev = node;
    this.head.next = node;
  }

  private removeNode(node: Node<K, V>): void {
    const prev = node.prev!;
    const next = node.next!;
    prev.next = next;
    next.prev = prev;
  }

  private moveToHead(node: Node<K, V>): void {
    this.removeNode(node);
    this.addNode(node);
  }

  private popTail(): Node<K, V> {
    const res = this.tail.prev!;
    this.removeNode(res);
    return res;
  }
}
