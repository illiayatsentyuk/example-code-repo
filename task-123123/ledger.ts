export type EntryKind = "credit" | "debit";

export interface LedgerEntry {
  id: number;
  kind: EntryKind;
  amountCents: number;
  note: string;
  at: Date;
}

export class Ledger {
  private balanceCents = 0;
  private seq = 0;
  private readonly entries: LedgerEntry[] = [];

  deposit(amountCents: number, note: string): LedgerEntry {
    return this.record("credit", amountCents, note);
  }

  withdraw(amountCents: number, note: string): LedgerEntry {
    if (amountCents > this.balanceCents) {
      throw new Error("insufficient balance");
    }
    return this.record("debit", amountCents, note);
  }

  balance(): number {
    return this.balanceCents;
  }

  history(): readonly LedgerEntry[] {
    return this.entries;
  }

  statement(): string {
    const lines = this.entries.map((entry) => {
      const sign = entry.kind === "credit" ? "+" : "-";
      return `${entry.at.toISOString()} ${sign}${(entry.amountCents / 100).toFixed(2)} ${entry.note}`;
    });
    lines.push(`balance ${(this.balanceCents / 100).toFixed(2)}`);
    return lines.join("\n");
  }

  private record(kind: EntryKind, amountCents: number, note: string): LedgerEntry {
    if (!Number.isInteger(amountCents) || amountCents <= 0) {
      throw new Error("amount must be a positive integer number of cents");
    }
    const entry: LedgerEntry = {
      id: ++this.seq,
      kind,
      amountCents,
      note,
      at: new Date(),
    };
    this.balanceCents += kind === "credit" ? amountCents : -amountCents;
    this.entries.push(entry);
    return entry;
  }
}
