export type LogLevel = "debug" | "info" | "warn" | "error";

export interface LogRecord {
  level: LogLevel;
  message: string;
  at: Date;
  context?: Record<string, string>;
}

const rank: Record<LogLevel, number> = { debug: 10, info: 20, warn: 30, error: 40 };

export class Logger {
  private readonly records: LogRecord[] = [];

  constructor(
    private readonly name: string,
    private minLevel: LogLevel = "info",
  ) {}

  debug(message: string, context?: Record<string, string>): void {
    this.write("debug", message, context);
  }

  info(message: string, context?: Record<string, string>): void {
    this.write("info", message, context);
  }

  warn(message: string, context?: Record<string, string>): void {
    this.write("warn", message, context);
  }

  error(message: string, context?: Record<string, string>): void {
    this.write("error", message, context);
  }

  setLevel(level: LogLevel): void {
    this.minLevel = level;
  }

  dump(): LogRecord[] {
    return [...this.records];
  }

  private write(level: LogLevel, message: string, context?: Record<string, string>): void {
    if (rank[level] < rank[this.minLevel]) return;
    this.records.push({
      level,
      message: `[${this.name}] ${message}`,
      at: new Date(),
      context,
    });
  }
}
