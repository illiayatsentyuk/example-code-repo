export interface Definition {
  word: string;
  partOfSpeech: string;
  meaning: string;
}

export class Dictionary {
  private readonly entries = new Map<string, Definition>();

  add(entry: Definition): void {
    this.entries.set(entry.word.toLowerCase(), { ...entry, word: entry.word.toLowerCase() });
  }

  lookup(word: string): Definition | undefined {
    return this.entries.get(word.toLowerCase());
  }

  search(fragment: string): Definition[] {
    const needle = fragment.toLowerCase();
    return [...this.entries.values()].filter(
      (entry) => entry.word.includes(needle) || entry.meaning.toLowerCase().includes(needle),
    );
  }

  size(): number {
    return this.entries.size;
  }
}

export const starterWords: Definition[] = [
  { word: "ledger", partOfSpeech: "noun", meaning: "a book of financial accounts" },
  { word: "orbit", partOfSpeech: "noun", meaning: "a curved path around a body" },
  { word: "queue", partOfSpeech: "noun", meaning: "a line of items waiting in order" },
];
