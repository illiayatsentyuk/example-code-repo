export type LengthUnit = "mm" | "cm" | "m" | "km" | "in" | "ft";

const toMillimeters: Record<LengthUnit, number> = {
  mm: 1,
  cm: 10,
  m: 1000,
  km: 1_000_000,
  in: 25.4,
  ft: 304.8,
};

export function convertLength(value: number, from: LengthUnit, to: LengthUnit): number {
  const millimeters = value * toMillimeters[from];
  return millimeters / toMillimeters[to];
}

export interface Temperature {
  value: number;
  scale: "C" | "F" | "K";
}

export function convertTemperature(input: Temperature, scale: Temperature["scale"]): Temperature {
  const celsius = toCelsius(input);
  if (scale === "C") return { value: celsius, scale };
  if (scale === "F") return { value: (celsius * 9) / 5 + 32, scale };
  return { value: celsius + 273.15, scale };
}

function toCelsius(input: Temperature): number {
  if (input.scale === "C") return input.value;
  if (input.scale === "F") return ((input.value - 32) * 5) / 9;
  return input.value - 273.15;
}
