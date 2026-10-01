export interface BudgetLine {
  category: string;
  plannedCents: number;
  spentCents: number;
}

export class MonthlyBudget {
  private readonly lines = new Map<string, BudgetLine>();

  plan(category: string, plannedCents: number): void {
    const existing = this.lines.get(category);
    if (existing) {
      existing.plannedCents = plannedCents;
      return;
    }
    this.lines.set(category, { category, plannedCents, spentCents: 0 });
  }

  spend(category: string, amountCents: number): void {
    const line = this.lines.get(category);
    if (!line) throw new Error(`no plan for ${category}`);
    line.spentCents += amountCents;
  }

  remaining(category: string): number {
    const line = this.lines.get(category);
    if (!line) throw new Error(`no plan for ${category}`);
    return line.plannedCents - line.spentCents;
  }

  overspent(): BudgetLine[] {
    return [...this.lines.values()].filter((line) => line.spentCents > line.plannedCents);
  }
}
