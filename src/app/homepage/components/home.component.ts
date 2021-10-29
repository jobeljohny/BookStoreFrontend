import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from 'src/app/models/book';
import { AccountService } from 'src/app/services/account.service';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  books!: Book[];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService
      .getAllBooks()
      .pipe(
        map((response) => response.filter((res) => res.Featured && res.Status))
      )
      .subscribe(
        (data: Book[]) => {
          this.books = data;
        },
        (error) => {}
      );
  }

  ngOnDestroy() {}
}
