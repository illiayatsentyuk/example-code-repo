export interface Reminder {
  id: string;
  title: string;
  dueAt: Date;
  done: boolean;
}

export class ReminderBoard {
  private readonly reminders: Reminder[] = [];
  private nextId = 1;

  schedule(title: string, dueAt: Date): Reminder {
    const reminder: Reminder = {
      id: `r-${this.nextId++}`,
      title,
      dueAt,
      done: false,
    };
    this.reminders.push(reminder);
    return reminder;
  }

  complete(id: string): boolean {
    const reminder = this.reminders.find((item) => item.id === id);
    if (!reminder || reminder.done) return false;
    reminder.done = true;
    return true;
  }

  overdue(now = new Date()): Reminder[] {
    return this.reminders
      .filter((item) => !item.done && item.dueAt.getTime() < now.getTime())
      .sort((a, b) => a.dueAt.getTime() - b.dueAt.getTime());
  }

  upcoming(now = new Date(), withinMs = 86_400_000): Reminder[] {
    const limit = now.getTime() + withinMs;
    return this.reminders.filter(
      (item) =>
        !item.done &&
        item.dueAt.getTime() >= now.getTime() &&
        item.dueAt.getTime() <= limit,
    );
  }
}

export function formatReminder(reminder: Reminder): string {
  const mark = reminder.done ? "done" : "open";
  return `[${mark}] ${reminder.title} @ ${reminder.dueAt.toISOString()}`;
}
