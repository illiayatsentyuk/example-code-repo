export class Queue<T> {
  private readonly items: T[] = [];

  enqueue(value: T): void {
    this.items.push(value);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  peek(): T | undefined {
    return this.items[0];
  }

  size(): number {
    return this.items.length;
  }
}

export interface PrintJob {
  id: string;
  pages: number;
}

export class PrintQueue {
  private readonly queue = new Queue<PrintJob>();

  submit(job: PrintJob): void {
    if (job.pages < 1) throw new Error("job needs at least one page");
    this.queue.enqueue(job);
  }

  printNext(): PrintJob | undefined {
    return this.queue.dequeue();
  }

  waiting(): number {
    return this.queue.size();
  }
}
