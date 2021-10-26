import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  baseurl: string = 'https://localhost:44393/api/';

  constructor(private http: HttpClient) {}

  getAllBooks() {
    return this.http.get<Book[]>(this.baseurl + 'books/');
  }

  getBooksByField(model: { field: string; data: string }) {
    return this.http
      .get<Book[]>(this.baseurl + 'search/' + model.field, {
        params: new HttpParams().set('data', model.data),
      })
      .pipe(map((response) => response.filter((res) => res.Status)));
  }
}
