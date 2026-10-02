export type HvacMode = "off" | "heat" | "cool";

export interface ClimateReading {
  roomC: number;
  targetC: number;
  mode: HvacMode;
}

export class Thermostat {
  constructor(
    private roomC: number,
    private targetC: number,
    private mode: HvacMode = "off",
  ) {}

  setTarget(celsius: number): void {
    this.targetC = celsius;
  }

  setMode(mode: HvacMode): void {
    this.mode = mode;
  }

  sense(roomC: number): ClimateReading {
    this.roomC = roomC;
    return this.reading();
  }

  reading(): ClimateReading {
    return { roomC: this.roomC, targetC: this.targetC, mode: this.activeMode() };
  }

  private activeMode(): HvacMode {
    if (this.mode === "off") return "off";
    if (this.mode === "heat" && this.roomC < this.targetC - 0.5) return "heat";
    if (this.mode === "cool" && this.roomC > this.targetC + 0.5) return "cool";
    return "off";
  }
}

export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}
