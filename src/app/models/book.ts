export interface Book {
  BookId: number;
  Title: string;
  ISBN: string;
  Year: number;
  Description: string;
  Status: boolean;
  Image: string | null;
  Price: number;
  Position: number;
  Qty: number;
  Featured: boolean;
  Author: string;
  Category: string;
  CategoryId: number;
}
