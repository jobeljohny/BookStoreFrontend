import { Book } from './book';

export interface Order {
  OrderId: number;
  OrderDate: Date;
  CouponCode: string | null;
  BookList:
    | {
        book: Book;
        qty: number;
      }[]
    | null;
}
