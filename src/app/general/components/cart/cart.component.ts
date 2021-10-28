import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { Cart } from 'src/app/models/cart';
import { Coupon } from 'src/app/models/coupon';
import { AccountService } from 'src/app/services/account.service';
import { BookService } from 'src/app/services/book.service';
import { CartService } from 'src/app/services/cart.service';
import { CouponService } from 'src/app/services/coupon.service';
import { NotificationService } from 'src/app/services/notification.service';
import { BookOrder } from '../../../models/book-order';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  content: Cart;
  Coupon: Coupon | null = null;
  books: { book: Book; qty: number }[] = [];
  Total: number = 0;

  couponCode = new FormControl('');

  private computeTotal() {
    this.Total = 0;

    this.content.BookList.forEach((item) => {
      this.Total += item.ItemPrice * item.Qty;
    });

    if (this.Coupon != null) this.Total -= Math.max(this.Coupon.Discount, 0);
  }

  constructor(
    private cartService: CartService,
    public accountService: AccountService,
    private couponService: CouponService,
    private router: Router,
    private notifyService: NotificationService,
    private bookService: BookService
  ) {
    this.content = cartService.getContent();

    this.content.BookList.forEach(item => {
      this.bookService.getBookDetails(item.BookId.toString()).subscribe(response => {
        this.books.push({ book: response, qty: item.Qty})
      })
    })

     this.computeTotal();
  }

  removeFromCart(id: number) {
    let itemNumber: number = this.books.findIndex(
      (item) => item.book.BookId == id
    ) as number;

    if (itemNumber !== -1) this.books.splice(itemNumber, 1);
  }

  removeBook(id: number) {
    this.cartService.setBook(id, 0, -1);
    this.removeFromCart(id);
    this.computeTotal();
  }

  order() {
    let data: BookOrder = {
      UserId: this.accountService.getCurrentUser().id,
      CouponId: this.Coupon == null ? null : this.Coupon.CouponId,
      OrderDate: new Date(),
      BookList: [],
    };

    this.content.BookList.forEach((book) => {
      data.BookList.push({
        BookId: book.BookId,
        Qty: book.Qty,
        ItemPrice: book.ItemPrice,
      });
    });

    this.cartService.makeOrder(data).subscribe(
      (response) => {
        this.notifyService.showSuccess('Order placed', 'Success');
        this.cartService.emptyCart();
        this.router.navigate(['/']);
      },
      (error) => {
        this.notifyService.showError(
          error.error.Message,
          'Error in making order'
        );
      }
    );
  }

  ngOnInit(): void {
    this.couponCode.valueChanges.subscribe((code) => {
      this.couponService.getCouponFromCode(code).subscribe(
        (response: Coupon) => {
          this.Coupon = response;
          this.computeTotal();
        },
        (error) => {
          this.Coupon = null;
          this.computeTotal();
        }
      );
    });
  }
}
