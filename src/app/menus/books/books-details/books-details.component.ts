import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Book } from 'src/app/models/book';
import { AccountService } from 'src/app/services/account.service';
import { BookService } from 'src/app/services/book.service';
import { CartService } from 'src/app/services/cart.service';
import { WishListService } from 'src/app/services/wishlist.service';
import { SafeHTMLPipe } from 'src/app/pipes/safehtml.pipe';

@Component({
  selector: 'app-books-details',
  templateUrl: './books-details.component.html',
  styles: [],
})
export class BooksDetailsComponent implements OnInit, OnDestroy {
  book: Book | null = null;
  Qty = new FormControl(0);
  isPushedToCart: boolean = false;
  subscriber!: Subscription;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    public accountService: AccountService,
    private cartService: CartService,
    private router: Router,
    public wishListService: WishListService
  ) {
    this.subscriber = this.route.params
      .pipe(
        switchMap((params: Params) =>
          this.bookService.getBookDetails(params['id'])
        )
      )
      .subscribe((res: Book) => {
        this.book = res;
        let cart = cartService.getContent();
        let idx = cart.BookList.findIndex((i) => i.BookId == this.book?.BookId);

        if (idx !== -1) {
          this.isPushedToCart = true;
          this.Qty.setValue(cart.BookList[idx].Qty);
        }
      });
  }

  addToWishList() {
    if (this.book != null)
      this.wishListService.addBook(this.book.BookId)?.subscribe();
  }

  addToCart() {
    this.isPushedToCart = true;
    if (this.Qty.value > 0) this.Qty.setValue(this.Qty.value);
  }

  removeFromCart() {
    this.Qty.setValue(0);
  }

  addBook() {
    this.Qty.setValue(this.Qty.value + 1);
  }

  removeBook() {
    if (this.Qty.value > 0) this.Qty.setValue(this.Qty.value - 1);
  }

  buyNow() {
    if (this.Qty.value === 0) this.Qty.setValue(1);

    if (!this.isPushedToCart) this.addToCart();

    this.router.navigate(['/cart']);
  }

  editBook() {}

  deleteBook() {
    if (this.book != null) {
      this.bookService
        .deleteBook(this.book.BookId.toString())
        .subscribe((res) => {
          this.router.navigate(['/books']);
        });
    }
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

  ngOnInit(): void {
    this.Qty.valueChanges.subscribe((value) => {
      let id = this.book == null ? -1 : this.book.BookId;

      if (id != -1 && this.isPushedToCart && this.book != null) {
        this.cartService.setBook(id, value, this.book.Price);

        if (value === 0) this.isPushedToCart = false;
      }
    });
  }
}
