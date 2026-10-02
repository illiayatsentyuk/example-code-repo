export interface Stop {
  name: string;
  kmFromStart: number;
}

export class Route {
  private readonly stops: Stop[] = [];

  addStop(stop: Stop): void {
    if (this.stops.some((item) => item.kmFromStart === stop.kmFromStart)) {
      throw new Error("a stop already exists at that distance");
    }
    this.stops.push(stop);
    this.stops.sort((a, b) => a.kmFromStart - b.kmFromStart);
  }

  lengthKm(): number {
    if (this.stops.length < 2) return 0;
    return this.stops[this.stops.length - 1].kmFromStart - this.stops[0].kmFromStart;
  }

  between(from: string, to: string): number {
    const start = this.stops.find((stop) => stop.name === from);
    const end = this.stops.find((stop) => stop.name === to);
    if (!start || !end) throw new Error("unknown stop");
    return Math.abs(end.kmFromStart - start.kmFromStart);
  }

  names(): string[] {
    return this.stops.map((stop) => stop.name);
  }
}
