export interface Book {
  isbn: string;
  title: string;
  author: string;
  pages: number;
  finished: boolean;
}

export class Bookshelf {
  private readonly books: Book[] = [];

  shelve(book: Omit<Book, "finished">): Book {
    const stored: Book = { ...book, finished: false };
    this.books.push(stored);
    return stored;
  }

  markFinished(isbn: string): boolean {
    const book = this.books.find((item) => item.isbn === isbn);
    if (!book) return false;
    book.finished = true;
    return true;
  }

  byAuthor(author: string): Book[] {
    const needle = author.toLowerCase();
    return this.books.filter((book) => book.author.toLowerCase().includes(needle));
  }

  unreadPages(): number {
    return this.books
      .filter((book) => !book.finished)
      .reduce((sum, book) => sum + book.pages, 0);
  }
}
