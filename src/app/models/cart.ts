export interface Cart {
  BookList: {
    BookId: number;
    Qty: number;
    Author: string;
    Title: string;
    Price: number;
  }[];
}
