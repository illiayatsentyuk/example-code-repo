export interface Assignment {
  name: string;
  score: number;
  weight: number;
}

export class Gradebook {
  private readonly assignments: Assignment[] = [];

  record(assignment: Assignment): void {
    if (assignment.score < 0 || assignment.score > 100) {
      throw new Error("score must be between 0 and 100");
    }
    if (assignment.weight <= 0) throw new Error("weight must be positive");
    this.assignments.push(assignment);
  }

  weightedAverage(): number | undefined {
    const weight = this.assignments.reduce((sum, item) => sum + item.weight, 0);
    if (weight === 0) return undefined;
    const earned = this.assignments.reduce((sum, item) => sum + item.score * item.weight, 0);
    return earned / weight;
  }

  letter(): string | undefined {
    const average = this.weightedAverage();
    if (average === undefined) return undefined;
    if (average >= 90) return "A";
    if (average >= 80) return "B";
    if (average >= 70) return "C";
    if (average >= 60) return "D";
    return "F";
  }
}
