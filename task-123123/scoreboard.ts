export interface PlayerScore {
  name: string;
  points: number;
  wins: number;
  losses: number;
}

export class Scoreboard {
  private readonly players = new Map<string, PlayerScore>();

  register(name: string): PlayerScore {
    const existing = this.players.get(name);
    if (existing) return existing;
    const created: PlayerScore = { name, points: 0, wins: 0, losses: 0 };
    this.players.set(name, created);
    return created;
  }

  recordWin(winner: string, loser: string, points = 3): void {
    if (winner === loser) throw new Error("winner and loser must differ");
    const win = this.register(winner);
    const loss = this.register(loser);
    win.wins += 1;
    win.points += points;
    loss.losses += 1;
  }

  ranking(): PlayerScore[] {
    return [...this.players.values()].sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.wins !== a.wins) return b.wins - a.wins;
      return a.name.localeCompare(b.name);
    });
  }

  leader(): PlayerScore | undefined {
    return this.ranking()[0];
  }
}

export const defaultRules = {
  winPoints: 3,
  drawPoints: 1,
  lossPoints: 0,
} as const;
