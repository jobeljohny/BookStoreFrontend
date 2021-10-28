import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from 'src/app/models/book';
import { AccountService } from 'src/app/services/account.service';
import { BookService } from 'src/app/services/book.service';
import { NotificationService } from 'src/app/services/notification.service';
declare var $: any;
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit, OnDestroy {
  searchForm = new FormGroup({
    data: new FormControl('', [Validators.required]),
    field: new FormControl('', [Validators.required]),
  });

  @Output() getBooks = new EventEmitter<Book[]>();

  constructor(
    private bookService: BookService,
    private notifyService: NotificationService
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.bookService
      .getAllBooks()
      .pipe(map((response) => response.filter((res) => res.Status)))
      .subscribe(
        (data: Book[]) => {
          this.getBooks.emit(data);
        },
        (error) => {
          this.notifyService.showError(error.error.Message, '');
        }
      );
  }

  OnSubmit() {
    this.bookService.getBooksByField(this.searchForm.value).subscribe(
      (data: Book[]) => {
        this.getBooks.emit(data);
      },
      (error) => {
        this.notifyService.showError(error.error.Message, '');
      }
    );
  }
}
