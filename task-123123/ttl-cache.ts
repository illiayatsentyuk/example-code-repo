interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

export class TtlCache<T> {
  private readonly store = new Map<string, CacheEntry<T>>();

  constructor(private readonly ttlMs: number) {}

  set(key: string, value: T, now = Date.now()): void {
    this.store.set(key, { value, expiresAt: now + this.ttlMs });
  }

  get(key: string, now = Date.now()): T | undefined {
    const entry = this.store.get(key);
    if (!entry) return undefined;
    if (entry.expiresAt <= now) {
      this.store.delete(key);
      return undefined;
    }
    return entry.value;
  }

  sweep(now = Date.now()): number {
    let removed = 0;
    for (const [key, entry] of this.store) {
      if (entry.expiresAt <= now) {
        this.store.delete(key);
        removed += 1;
      }
    }
    return removed;
  }

  size(): number {
    return this.store.size;
  }
}
