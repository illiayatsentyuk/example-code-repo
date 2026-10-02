export interface Phrase {
  source: string;
  target: string;
}

export class PhraseBook {
  private readonly phrases: Phrase[] = [];

  add(phrase: Phrase): void {
    const existing = this.phrases.find(
      (item) => item.source.toLowerCase() === phrase.source.toLowerCase(),
    );
    if (existing) {
      existing.target = phrase.target;
      return;
    }
    this.phrases.push({ ...phrase });
  }

  translate(source: string): string | undefined {
    return this.phrases.find((item) => item.source.toLowerCase() === source.toLowerCase())?.target;
  }

  all(): readonly Phrase[] {
    return this.phrases;
  }
}

export const greetings: Phrase[] = [
  { source: "hello", target: "привіт" },
  { source: "thanks", target: "дякую" },
  { source: "goodbye", target: "до побачення" },
];
