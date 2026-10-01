export class Stack<T> {
  private readonly items: T[] = [];

  push(value: T): void {
    this.items.push(value);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  size(): number {
    return this.items.length;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

export function isBalanced(source: string): boolean {
  const pairs: Record<string, string> = { ")": "(", "]": "[", "}": "{" };
  const stack = new Stack<string>();
  for (const char of source) {
    if (char === "(" || char === "[" || char === "{") {
      stack.push(char);
      continue;
    }
    const opener = pairs[char];
    if (!opener) continue;
    if (stack.pop() !== opener) return false;
  }
  return stack.isEmpty();
}
