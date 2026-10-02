/**
 * Sprout Craft Engineering Cookbook
 * Recipe #47: Trie (Prefix Tree) for Fast Autocomplete Search
 *
 * Problem: Performing instant prefix searches across thousands of dictionary words with low latency.
 */

class TrieNode {
  children: Map<string, TrieNode> = new Map();
  isEndOfWord: boolean = false;
}

export class Trie {
  private root = new TrieNode();

  public insert(word: string): void {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char)!;
    }
    node.isEndOfWord = true;
  }

  public searchPrefix(prefix: string): string[] {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children.has(char)) return [];
      node = node.children.get(char)!;
    }

    const results: string[] = [];
    this.collectWords(node, prefix, results);
    return results;
  }

  private collectWords(node: TrieNode, current: string, results: string[]): void {
    if (node.isEndOfWord) results.push(current);
    for (const [char, child] of node.children.entries()) {
      this.collectWords(child, current + char, results);
    }
  }
}
