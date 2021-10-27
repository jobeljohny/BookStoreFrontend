export interface BookOrder {
  OrderDate: Date;
  CouponId: number | null;
  UserId: number;
  BookList: {
    BookId: number;
    Qty: number;
  }[];
}
