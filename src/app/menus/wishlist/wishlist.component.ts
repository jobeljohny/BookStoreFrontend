import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { AccountService } from 'src/app/services/account.service';
import { WishListService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  books: Book[] | null = null;

  constructor(
    public accountService: AccountService,
    private wishListService: WishListService
  ) {
    this.generateWishlist();
  }

  generateWishlist() {
    if (this.accountService.isLoggedIn()) {
      this.wishListService.getWishList()?.subscribe(
        (response) => {
          this.books = response;
        },
        (error) => {
          alert(error.error.Message);
        }
      );
    }
  }

  removeBook(bookId: number) {
    this.wishListService.removeBook(bookId)?.subscribe((response) => {
      this.generateWishlist();
    });
  }

  ngOnInit(): void {}
}
