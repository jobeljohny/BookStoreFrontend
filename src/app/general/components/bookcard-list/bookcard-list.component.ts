import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { AccountService } from 'src/app/services/account.service';
import { WishListService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-bookcard-list',
  templateUrl: './bookcard-list.component.html',
  styleUrls: ['./bookcard-list.component.scss'],
})
export class BookcardListComponent implements OnInit {
  @Input() bookList!: Book[];
  currentYear: number = new Date().getFullYear();
  wishSet = new Set();

  constructor(
    public accountService: AccountService,
    private wishListService: WishListService
  ) {
    if (this.accountService.isLoggedIn()) {
      this.wishListService.getWishList()?.subscribe((response) => {
        response.forEach((book) => this.wishSet.add(book.BookId));
      });
    }
  }

  toggle(data: { bookId: number; setWishListStatus: boolean }) {
    if (data.setWishListStatus)
      this.wishListService.addBook(data.bookId)?.subscribe((response) => {});
    else
      this.wishListService.removeBook(data.bookId)?.subscribe((response) => {});
  }

  ngOnInit(): void {}
}
