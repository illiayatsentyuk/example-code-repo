export class Histogram {
  private readonly counts = new Map<string, number>();

  add(key: string, amount = 1): void {
    this.counts.set(key, (this.counts.get(key) ?? 0) + amount);
  }

  count(key: string): number {
    return this.counts.get(key) ?? 0;
  }

  top(limit: number): Array<{ key: string; count: number }> {
    return [...this.counts.entries()]
      .map(([key, count]) => ({ key, count }))
      .sort((a, b) => b.count - a.count || a.key.localeCompare(b.key))
      .slice(0, limit);
  }

  total(): number {
    let sum = 0;
    for (const count of this.counts.values()) sum += count;
    return sum;
  }
}
