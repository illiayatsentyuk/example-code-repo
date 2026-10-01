export type StockStatus = "in_stock" | "low" | "out";

export interface Product {
  sku: string;
  name: string;
  priceCents: number;
  quantity: number;
}

export class Inventory {
  private readonly items = new Map<string, Product>();

  add(product: Product): void {
    const existing = this.items.get(product.sku);
    if (existing) {
      existing.quantity += product.quantity;
      existing.priceCents = product.priceCents;
      existing.name = product.name;
      return;
    }
    this.items.set(product.sku, { ...product });
  }

  remove(sku: string, amount: number): boolean {
    const item = this.items.get(sku);
    if (!item || amount <= 0 || item.quantity < amount) {
      return false;
    }
    item.quantity -= amount;
    return true;
  }

  status(sku: string, lowThreshold = 5): StockStatus | undefined {
    const item = this.items.get(sku);
    if (!item) return undefined;
    if (item.quantity === 0) return "out";
    if (item.quantity <= lowThreshold) return "low";
    return "in_stock";
  }

  totalValueCents(): number {
    let total = 0;
    for (const item of this.items.values()) {
      total += item.priceCents * item.quantity;
    }
    return total;
  }

  list(): Product[] {
    return [...this.items.values()].sort((a, b) => a.name.localeCompare(b.name));
  }
}
