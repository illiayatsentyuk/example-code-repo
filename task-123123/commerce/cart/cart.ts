export interface CartLine {
  sku: string;
  name: string;
  unitCents: number;
  quantity: number;
}

export class ShoppingCart {
  private readonly lines = new Map<string, CartLine>();

  add(line: Omit<CartLine, "quantity">, quantity = 1): void {
    const existing = this.lines.get(line.sku);
    if (existing) {
      existing.quantity += quantity;
      existing.unitCents = line.unitCents;
      return;
    }
    this.lines.set(line.sku, { ...line, quantity });
  }

  setQuantity(sku: string, quantity: number): void {
    if (quantity <= 0) {
      this.lines.delete(sku);
      return;
    }
    const line = this.lines.get(sku);
    if (line) line.quantity = quantity;
  }

  subtotalCents(): number {
    let total = 0;
    for (const line of this.lines.values()) {
      total += line.unitCents * line.quantity;
    }
    return total;
  }

  applyPercentOff(percent: number): number {
    const discount = Math.round(this.subtotalCents() * (percent / 100));
    return this.subtotalCents() - discount;
  }

  items(): CartLine[] {
    return [...this.lines.values()];
  }
}
