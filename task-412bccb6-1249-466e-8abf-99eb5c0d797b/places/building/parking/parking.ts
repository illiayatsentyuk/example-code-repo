export interface Spot {
  id: string;
  level: number;
  occupiedBy?: string;
}

export class ParkingGarage {
  private readonly spots: Spot[];

  constructor(levels: number, spotsPerLevel: number) {
    this.spots = [];
    for (let level = 1; level <= levels; level++) {
      for (let n = 1; n <= spotsPerLevel; n++) {
        this.spots.push({ id: `L${level}-${n}`, level });
      }
    }
  }

  park(plate: string): Spot | undefined {
    const free = this.spots.find((spot) => !spot.occupiedBy);
    if (!free) return undefined;
    free.occupiedBy = plate;
    return free;
  }

  leave(plate: string): boolean {
    const spot = this.spots.find((item) => item.occupiedBy === plate);
    if (!spot) return false;
    spot.occupiedBy = undefined;
    return true;
  }

  available(): number {
    return this.spots.filter((spot) => !spot.occupiedBy).length;
  }

  find(plate: string): Spot | undefined {
    return this.spots.find((spot) => spot.occupiedBy === plate);
  }
}
