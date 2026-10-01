export type Rate = "standard" | "express" | "overnight";

export interface Parcel {
  id: string;
  grams: number;
  rate: Rate;
}

const gramsPerTier = 500;
const baseCents: Record<Rate, number> = {
  standard: 400,
  express: 900,
  overnight: 1800,
};
const extraCents: Record<Rate, number> = {
  standard: 150,
  express: 250,
  overnight: 400,
};

export function quoteCents(parcel: Parcel): number {
  if (parcel.grams <= 0) throw new Error("parcel must have weight");
  const extraTiers = Math.max(0, Math.ceil(parcel.grams / gramsPerTier) - 1);
  return baseCents[parcel.rate] + extraTiers * extraCents[parcel.rate];
}

export class Shipment {
  private readonly parcels: Parcel[] = [];

  add(parcel: Parcel): void {
    this.parcels.push(parcel);
  }

  totalCents(): number {
    return this.parcels.reduce((sum, parcel) => sum + quoteCents(parcel), 0);
  }

  heaviest(): Parcel | undefined {
    return this.parcels.reduce<Parcel | undefined>((best, parcel) => {
      if (!best || parcel.grams > best.grams) return parcel;
      return best;
    }, undefined);
  }
}
