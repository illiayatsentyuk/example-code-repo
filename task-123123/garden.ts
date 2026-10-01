export interface Plant {
  name: string;
  waterEveryDays: number;
  lastWatered: Date;
}

export class Garden {
  private readonly plants: Plant[] = [];

  plant(entry: Plant): void {
    this.plants.push({ ...entry });
  }

  water(name: string, on = new Date()): boolean {
    const plant = this.plants.find((item) => item.name === name);
    if (!plant) return false;
    plant.lastWatered = on;
    return true;
  }

  thirsty(on = new Date()): Plant[] {
    return this.plants.filter((plant) => {
      const elapsedDays = (on.getTime() - plant.lastWatered.getTime()) / 86_400_000;
      return elapsedDays >= plant.waterEveryDays;
    });
  }
}
