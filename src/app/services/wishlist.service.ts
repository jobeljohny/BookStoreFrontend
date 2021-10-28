import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Book } from '../models/book';
import { AccountService } from './account.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  baseurl: string = 'https://localhost:44393/api/';

  bookSet = new Set();

  constructor(
    private http: HttpClient,
    private accountService: AccountService,
    private notifyService: NotificationService
  ) {
    if (this.accountService.isLoggedIn())
      this.getWishList()?.subscribe((response) => {});
  }

  getWishList() {
    this.bookSet = new Set();

    if (this.accountService.isLoggedIn())
      return this.http
        .get<Book[]>(this.baseurl + 'appusers/wishlist', {
          params: new HttpParams().set(
            'id',
            this.accountService.getCurrentUser().id
          ),
        })
        .pipe(
          map((response: Book[]) => {
            response.forEach((book) => this.bookSet.add(book.BookId));
            return response;
          })
        );
    else return null;
  }

  addBook(bookId: number) {
    if (this.accountService.isLoggedIn())
      return this.http
        .put(
          this.baseurl + 'appusers/wishlist',
          {},
          {
            params: new HttpParams()
              .set('UserId', this.accountService.getCurrentUser().id)
              .set('BookId', bookId),
          }
        )
        .pipe(
          map((response) => {
            this.bookSet.add(bookId);
            this.notifyService.showInfo('Book added to wishlist', '');
            return response;
          })
        );
    else return null;
  }

  removeBook(bookId: number) {
    if (this.accountService.isLoggedIn())
      return this.http
        .delete(this.baseurl + 'appusers/wishlist', {
          params: new HttpParams()
            .set('UserId', this.accountService.getCurrentUser().id)
            .set('BookId', bookId),
        })
        .pipe(
          map((response) => {
            this.bookSet.delete(bookId);
            this.notifyService.showInfo(
              'Book removed from wishlist',
              ''
            );
            return response;
          })
        );
    else return null;
  }
}
