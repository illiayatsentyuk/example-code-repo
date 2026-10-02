export interface CountdownSnapshot {
  remainingMs: number;
  finished: boolean;
}

export class Countdown {
  private endsAt: number | undefined;

  constructor(private readonly durationMs: number) {
    if (durationMs <= 0) throw new Error("duration must be positive");
  }

  start(now = Date.now()): void {
    this.endsAt = now + this.durationMs;
  }

  snapshot(now = Date.now()): CountdownSnapshot {
    if (this.endsAt === undefined) {
      return { remainingMs: this.durationMs, finished: false };
    }
    const remainingMs = Math.max(0, this.endsAt - now);
    return { remainingMs, finished: remainingMs === 0 };
  }
}

export function formatRemaining(ms: number): string {
  const totalSeconds = Math.ceil(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
