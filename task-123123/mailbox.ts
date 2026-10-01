export interface Message {
  id: number;
  from: string;
  subject: string;
  body: string;
  read: boolean;
}

export class Mailbox {
  private seq = 0;
  private readonly messages: Message[] = [];

  receive(from: string, subject: string, body: string): Message {
    const message: Message = { id: ++this.seq, from, subject, body, read: false };
    this.messages.unshift(message);
    return message;
  }

  open(id: number): Message | undefined {
    const message = this.messages.find((item) => item.id === id);
    if (message) message.read = true;
    return message;
  }

  unread(): Message[] {
    return this.messages.filter((item) => !item.read);
  }

  archiveRead(): number {
    const before = this.messages.length;
    for (let i = this.messages.length - 1; i >= 0; i--) {
      if (this.messages[i].read) this.messages.splice(i, 1);
    }
    return before - this.messages.length;
  }
}
