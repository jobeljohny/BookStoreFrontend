import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  baseurl: string = 'https://localhost:44393/api/';

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {}

  getWishList() {
    if (this.accountService.isLoggedIn())
      return this.http.get<Book[]>(this.baseurl + 'appusers/wishlist', {
        params: new HttpParams().set(
          'id',
          this.accountService.getCurrentUser().id
        ),
      });
    else return null;
  }

  addBook(bookId: number) {
    if (this.accountService.isLoggedIn())
      return this.http.put(
        this.baseurl + 'appusers/wishlist',
        {},
        {
          params: new HttpParams()
            .set('UserId', this.accountService.getCurrentUser().id)
            .set('BookId', bookId),
        }
      );
    else return null;
  }

  removeBook(bookId: number) {
    if (this.accountService.isLoggedIn())
      return this.http.delete(this.baseurl + 'appusers/wishlist', {
        params: new HttpParams()
          .set('UserId', this.accountService.getCurrentUser().id)
          .set('BookId', bookId),
      });
    else return null;
  }
}
