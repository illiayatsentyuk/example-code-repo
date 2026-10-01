export interface Track {
  id: string;
  title: string;
  artist: string;
  durationSec: number;
}

export class Playlist {
  private readonly tracks: Track[] = [];
  private cursor = 0;

  add(track: Track): void {
    if (this.tracks.some((item) => item.id === track.id)) {
      throw new Error(`track ${track.id} already exists`);
    }
    this.tracks.push(track);
  }

  remove(id: string): boolean {
    const index = this.tracks.findIndex((item) => item.id === id);
    if (index === -1) return false;
    this.tracks.splice(index, 1);
    if (this.cursor >= this.tracks.length) {
      this.cursor = Math.max(0, this.tracks.length - 1);
    }
    return true;
  }

  current(): Track | undefined {
    return this.tracks[this.cursor];
  }

  next(): Track | undefined {
    if (this.tracks.length === 0) return undefined;
    this.cursor = (this.cursor + 1) % this.tracks.length;
    return this.current();
  }

  previous(): Track | undefined {
    if (this.tracks.length === 0) return undefined;
    this.cursor = (this.cursor - 1 + this.tracks.length) % this.tracks.length;
    return this.current();
  }

  durationSec(): number {
    return this.tracks.reduce((sum, track) => sum + track.durationSec, 0);
  }

  shuffle(random = Math.random): void {
    for (let i = this.tracks.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [this.tracks[i], this.tracks[j]] = [this.tracks[j], this.tracks[i]];
    }
    this.cursor = 0;
  }
}

export function formatDuration(totalSec: number): string {
  const minutes = Math.floor(totalSec / 60);
  const seconds = totalSec % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
