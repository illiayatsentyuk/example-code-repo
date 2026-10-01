export interface StrengthReport {
  score: number;
  label: "weak" | "fair" | "strong";
  issues: string[];
}

export function assessPassword(password: string): StrengthReport {
  const issues: string[] = [];
  if (password.length < 8) issues.push("use at least 8 characters");
  if (!/[a-z]/.test(password)) issues.push("add a lowercase letter");
  if (!/[A-Z]/.test(password)) issues.push("add an uppercase letter");
  if (!/[0-9]/.test(password)) issues.push("add a digit");
  if (!/[^A-Za-z0-9]/.test(password)) issues.push("add a symbol");

  const score = 5 - issues.length;
  const label = score >= 4 ? "strong" : score >= 2 ? "fair" : "weak";
  return { score, label, issues };
}

export class PasswordPolicy {
  constructor(private readonly minScore: number) {}

  accepts(password: string): boolean {
    return assessPassword(password).score >= this.minScore;
  }
}
