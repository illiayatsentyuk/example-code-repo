export type Currency = "USD" | "EUR" | "GBP";

export class Wallet {
  private readonly balances = new Map<Currency, number>();

  constructor(initial: Partial<Record<Currency, number>> = {}) {
    for (const [currency, amount] of Object.entries(initial) as [Currency, number][]) {
      this.balances.set(currency, amount);
    }
  }

  get(currency: Currency): number {
    return this.balances.get(currency) ?? 0;
  }

  credit(currency: Currency, amount: number): void {
    this.requirePositive(amount);
    this.balances.set(currency, this.get(currency) + amount);
  }

  debit(currency: Currency, amount: number): void {
    this.requirePositive(amount);
    if (this.get(currency) < amount) throw new Error(`not enough ${currency}`);
    this.balances.set(currency, this.get(currency) - amount);
  }

  snapshot(): Record<string, number> {
    return Object.fromEntries(this.balances);
  }

  private requirePositive(amount: number): void {
    if (amount <= 0) throw new Error("amount must be positive");
  }
}
