import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { Book } from '../models/book';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  baseurl: string = 'https://localhost:44393/api/';

  base64DefaultString = '';
  base64StringHeader = 'data:image/png;base64,';

  constructor(
    private http: HttpClient,
    private notifyService: NotificationService
  ) {
    this.http
      .get('assets/text/default-image-base64.txt', {
        responseType: 'text',
      })
      .subscribe((data) => {
        this.base64DefaultString = data;
      });
  }

  getAllBooks() {
    return this.http
      .get<Book[]>(this.baseurl + 'books/')
      .pipe(
        map((response) => {
          response.forEach((book) => {
            if (book.Image == null || book.Image === '')
              book.Image = this.base64StringHeader + this.base64DefaultString;
            else book.Image = this.base64StringHeader + book.Image;
          });
          return response;
        })
      )
      .pipe(
        tap((data: Book[]) => {}),
        catchError((err) => {
          this.notifyService.showError(err.error.Message, 'Error');
          throw err;
        })
      );
  }

  getBooksByField(model: { field: string; data: string }) {
    return this.http
      .get<Book[]>(this.baseurl + 'search/' + model.field, {
        params: new HttpParams().set('data', model.data),
      })
      .pipe(map((response) => response.filter((res) => res.Status)))
      .pipe(
        map((response) => {
          response.forEach((book) => {
            if (book.Image == null || book.Image === '')
              book.Image = this.base64StringHeader + this.base64DefaultString;
            else book.Image = this.base64StringHeader + book.Image;
          });
          return response;
        })
      );
  }

  getBookDetails(id: string) {
    return this.http.get<Book>(this.baseurl + 'books/' + id).pipe(
      map((book) => {
        if (book.Image == null || book.Image === '')
          book.Image = this.base64StringHeader + this.base64DefaultString;
        else book.Image = this.base64StringHeader + book.Image;
        return book;
      })
    );
  }

  addBook(model: Book) {
    return this.http.post<Book>(this.baseurl + 'books/', model).pipe(
      map((response) => {
        this.notifyService.showSuccess('Book Added', 'Success');
      })
    );
  }

  editBook(model: Book) {
    return this.http
      .put<Book>(this.baseurl + 'books/', model, {
        params: new HttpParams().set('id', model.BookId),
      })
      .pipe(
        tap(
          (response) => {
            this.notifyService.showSuccess('Book Updated', '');
          }),
          catchError((err) => {
            this.notifyService.showError(
              err.error.Message,
              'Error in updating book'
            );
            throw err;
          })
        
      );
  }

  deleteBook(id: string) {
    return this.http.delete<Book>(this.baseurl + 'books/' + id).pipe(
      tap((response) => {
        this.notifyService.showSuccess('Book Deleted', '');
      }),
      catchError((err) => {
        this.notifyService.showError(err.error.Message, 'Error in deletion');
        throw err;
      })
    );
  }
}
