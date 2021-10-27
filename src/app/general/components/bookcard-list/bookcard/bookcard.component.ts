import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-bookcard',
  templateUrl: './bookcard.component.html',
  styleUrls: ['./bookcard.component.css'],
})
export class BookcardComponent implements OnInit {
  @Input() book!: Book;
  @Input() isLoggedIn!: boolean;
  @Input() isInWishList!: boolean;

  @Output() changeBookStatus = new EventEmitter<{
    bookId: number;
    setWishListStatus: boolean;
  }>();

  constructor() {}

  ngOnInit(): void {}

  toggle() {
    this.isInWishList = !this.isInWishList;

    this.changeBookStatus.emit({
      bookId: this.book.BookId,
      setWishListStatus: this.isInWishList,
    });
  }
}
