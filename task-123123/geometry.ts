#include <iostream>

using namespace std;

int main() {
  cout << "Hello, World!" << endl;
  return 0;
}
export function distance(a: Point, b: Point): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.hypot(dx, dy);
}

export abstract class Shape {
  constructor(public readonly name: string) {}

  abstract area(): number;
  abstract perimeter(): number;

  describe(): string {
    return `${this.name}: area ${this.area().toFixed(2)}, perimeter ${this.perimeter().toFixed(2)}`;
  }
}

export class Circle extends Shape {
  constructor(public readonly radius: number) {
    super("circle");
    if (radius < 0) throw new Error("radius must be non-negative");
  }

  area(): number {
    return Math.PI * this.radius * this.radius;
  }

  perimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}

export class Rectangle extends Shape {
  constructor(
    public readonly width: number,
    public readonly height: number,
  ) {
    super("rectangle");
    if (width < 0 || height < 0) throw new Error("sides must be non-negative");
  }

  area(): number {
    return this.width * this.height;
  }

  perimeter(): number {
    return 2 * (this.width + this.height);
  }

  isSquare(): boolean {
    return this.width === this.height;
  }
}

export function largestByArea(shapes: Shape[]): Shape | undefined {
  return shapes.reduce<Shape | undefined>((best, shape) => {
    if (!best || shape.area() > best.area()) return shape;
    return best;
  }, undefined);
}
