import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Book } from 'src/app/models/book';
import { AccountService } from 'src/app/services/account.service';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-books-details',
  templateUrl: './books-details.component.html',
  styles: [],
})
export class BooksDetailsComponent implements OnInit, OnDestroy {
  book: Book | null = null;

  subscriber!: Subscription;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    public accountService: AccountService
  ) {
    this.subscriber = this.route.params
      .pipe(
        switchMap((params: Params) =>
          this.bookService.getBookDetails(params['id'])
        )
      )
      .subscribe((res: Book) => {
        this.book = res;
      });
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

  ngOnInit(): void {}
}
