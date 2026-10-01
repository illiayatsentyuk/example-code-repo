export interface Lap {
  index: number;
  elapsedMs: number;
}

export class Stopwatch {
  private startedAt: number | undefined;
  private accumulatedMs = 0;
  private readonly laps: Lap[] = [];

  start(now = Date.now()): void {
    if (this.startedAt !== undefined) return;
    this.startedAt = now;
  }

  stop(now = Date.now()): number {
    if (this.startedAt === undefined) return this.accumulatedMs;
    this.accumulatedMs += now - this.startedAt;
    this.startedAt = undefined;
    return this.accumulatedMs;
  }

  lap(now = Date.now()): Lap {
    const lap: Lap = { index: this.laps.length + 1, elapsedMs: this.elapsed(now) };
    this.laps.push(lap);
    return lap;
  }

  reset(): void {
    this.startedAt = undefined;
    this.accumulatedMs = 0;
    this.laps.length = 0;
  }

  elapsed(now = Date.now()): number {
    const running = this.startedAt === undefined ? 0 : now - this.startedAt;
    return this.accumulatedMs + running;
  }

  history(): readonly Lap[] {
    return this.laps;
  }
}
