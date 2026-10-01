export type Direction = "up" | "down" | "idle";

export interface ElevatorState {
  floor: number;
  direction: Direction;
  doorOpen: boolean;
}

export class Elevator {
  private floor: number;
  private readonly stops = new Set<number>();
  private doorOpen = false;

  constructor(
    private readonly minFloor: number,
    private readonly maxFloor: number,
    startFloor = minFloor,
  ) {
    this.floor = startFloor;
  }

  call(floor: number): void {
    this.assertFloor(floor);
    this.stops.add(floor);
  }

  step(): ElevatorState {
    this.doorOpen = false;
    const next = this.nextStop();
    if (next === undefined) return this.state("idle");
    if (next > this.floor) this.floor += 1;
    else if (next < this.floor) this.floor -= 1;
    if (this.stops.has(this.floor)) {
      this.stops.delete(this.floor);
      this.doorOpen = true;
    }
    return this.state(this.directionToward(next));
  }

  state(direction: Direction = "idle"): ElevatorState {
    return { floor: this.floor, direction, doorOpen: this.doorOpen };
  }

  private nextStop(): number | undefined {
    const floors = [...this.stops];
    if (floors.length === 0) return undefined;
    return floors.sort((a, b) => Math.abs(a - this.floor) - Math.abs(b - this.floor))[0];
  }

  private directionToward(target: number): Direction {
    if (target > this.floor) return "up";
    if (target < this.floor) return "down";
    return "idle";
  }

  private assertFloor(floor: number): void {
    if (floor < this.minFloor || floor > this.maxFloor) {
      throw new Error("floor is outside the building");
    }
  }
}
