import { HttpClient } from '@angular/common/http';
import { Injectable, Query } from '@angular/core';
import { BookOrder } from '../models/book-order';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  baseurl: string = 'https://localhost:44393/api/';

  private content: Cart;

  constructor(private http: HttpClient) {
    this.content = {
      BookList: [],
    };

    if (localStorage.getItem('cart') != null)
      this.content = JSON.parse(localStorage.getItem('cart')!);
  }

  setBook(
    id: number,
    qty: number,
  ) {
    let itemNumber: number = this.content?.BookList.findIndex(
      (i) => i.BookId == id
    ) as number;

    if (itemNumber === -1) {
      itemNumber = this.content.BookList.length;
      this.content.BookList.push({
        BookId: id,
        Qty: qty,
      });
    } else {
      this.content.BookList[itemNumber].Qty = qty;
      
    }

    if (this.content.BookList[itemNumber].Qty === 0)
      this.content.BookList.splice(itemNumber, 1);

    localStorage.setItem('cart', JSON.stringify(this.content));
  }

  getContent() {
    return this.content;
  }

  makeOrder(order: BookOrder) {
    return this.http.post<BookOrder>(this.baseurl + '/bookorders', order);
  }

  emptyCart() {
    this.content = {
      BookList: [],
    };

    localStorage.removeItem('cart');
  }
}
