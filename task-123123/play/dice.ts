export interface Roll {
  sides: number;
  values: number[];
  total: number;
}

export class DiceCup {
  constructor(private readonly random: () => number = Math.random) {}

  roll(count: number, sides: number): Roll {
    if (count < 1 || sides < 2) throw new Error("need at least one die with 2 sides");
    const values = Array.from({ length: count }, () => 1 + Math.floor(this.random() * sides));
    const total = values.reduce((sum, value) => sum + value, 0);
    return { sides, values, total };
  }

  advantage(sides = 20): Roll {
    const first = this.roll(1, sides);
    const second = this.roll(1, sides);
    const best = Math.max(first.total, second.total);
    return { sides, values: [first.total, second.total], total: best };
  }
}

export function expectedAverage(count: number, sides: number): number {
  return (count * (sides + 1)) / 2;
}
