export interface Category {
  CategoryId: number;
  Name: string;
  CreatedAt: Date;
  Description: string;
  Status: boolean;
  Image: string | null;
  Position: number;
}
