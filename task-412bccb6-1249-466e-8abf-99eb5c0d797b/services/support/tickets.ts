export type TicketStatus = "open" | "pending" | "closed";

export interface Ticket {
  id: number;
  title: string;
  requester: string;
  status: TicketStatus;
}

export class TicketDesk {
  private seq = 0;
  private readonly tickets: Ticket[] = [];

  open(title: string, requester: string): Ticket {
    const ticket: Ticket = { id: ++this.seq, title, requester, status: "open" };
    this.tickets.push(ticket);
    return ticket;
  }

  setStatus(id: number, status: TicketStatus): Ticket {
    const ticket = this.tickets.find((item) => item.id === id);
    if (!ticket) throw new Error("ticket not found");
    ticket.status = status;
    return ticket;
  }

  byStatus(status: TicketStatus): Ticket[] {
    return this.tickets.filter((ticket) => ticket.status === status);
  }

  summary(): Record<TicketStatus, number> {
    return {
      open: this.byStatus("open").length,
      pending: this.byStatus("pending").length,
      closed: this.byStatus("closed").length,
    };
  }
}
