export type Suit = "hearts" | "diamonds" | "clubs" | "spades";
export type Rank = "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K";

export interface Card {
  suit: Suit;
  rank: Rank;
}

const suits: Suit[] = ["hearts", "diamonds", "clubs", "spades"];
const ranks: Rank[] = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

export class Deck {
  private cards: Card[];

  constructor(private readonly random: () => number = Math.random) {
    this.cards = suits.flatMap((suit) => ranks.map((rank) => ({ suit, rank })));
  }

  shuffle(): void {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(this.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  draw(count = 1): Card[] {
    if (count > this.cards.length) throw new Error("not enough cards");
    return this.cards.splice(0, count);
  }

  remaining(): number {
    return this.cards.length;
  }
}

export function cardLabel(card: Card): string {
  return `${card.rank} of ${card.suit}`;
}
