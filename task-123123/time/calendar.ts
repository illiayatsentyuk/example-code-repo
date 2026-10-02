export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
}

export class DayCalendar {
  private readonly events: CalendarEvent[] = [];

  add(event: CalendarEvent): void {
    if (event.end.getTime() <= event.start.getTime()) {
      throw new Error("event must end after it starts");
    }
    const clash = this.events.find((existing) => overlaps(existing, event));
    if (clash) throw new Error(`overlaps ${clash.title}`);
    this.events.push(event);
    this.events.sort((a, b) => a.start.getTime() - b.start.getTime());
  }

  onDate(day: Date): CalendarEvent[] {
    const start = new Date(day);
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);
    return this.events.filter(
      (event) => event.start.getTime() < end.getTime() && event.end.getTime() > start.getTime(),
    );
  }

  freeMinutes(day: Date, dayStartHour = 9, dayEndHour = 17): number {
    const windowStart = new Date(day);
    windowStart.setHours(dayStartHour, 0, 0, 0);
    const windowEnd = new Date(day);
    windowEnd.setHours(dayEndHour, 0, 0, 0);
    const busy = this.onDate(day).reduce((sum, event) => {
      const from = Math.max(event.start.getTime(), windowStart.getTime());
      const to = Math.min(event.end.getTime(), windowEnd.getTime());
      return sum + Math.max(0, to - from);
    }, 0);
    return (windowEnd.getTime() - windowStart.getTime() - busy) / 60_000;
  }
}

function overlaps(a: CalendarEvent, b: CalendarEvent): boolean {
  return a.start.getTime() < b.end.getTime() && b.start.getTime() < a.end.getTime();
}
