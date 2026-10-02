export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export class AddressBook {
  private readonly contacts = new Map<string, Contact>();

  upsert(contact: Contact): void {
    this.contacts.set(contact.id, { ...contact });
  }

  remove(id: string): boolean {
    return this.contacts.delete(id);
  }

  findByName(query: string): Contact[] {
    const needle = query.toLowerCase();
    return [...this.contacts.values()].filter((contact) =>
      contact.name.toLowerCase().includes(needle),
    );
  }

  findByEmail(email: string): Contact | undefined {
    const needle = email.toLowerCase();
    return [...this.contacts.values()].find((contact) => contact.email.toLowerCase() === needle);
  }
}
