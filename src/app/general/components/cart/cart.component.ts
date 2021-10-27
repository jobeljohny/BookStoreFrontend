import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { Coupon } from 'src/app/models/coupon';
import { AccountService } from 'src/app/services/account.service';
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
  Total: number = 0;

  couponCode = new FormControl('');

  private computeTotal() {
    this.Total = 0;

    this.content.BookList.forEach((book) => {
      this.Total += book.Price;
    });

    if (this.Coupon != null) this.Total -= Math.max(this.Coupon.Discount, 0);
  }

  constructor(
    private cartService: CartService,
    public accountService: AccountService,
    private couponService: CouponService,
    private router: Router,
    private notifyService: NotificationService
  ) {
    this.content = cartService.getContent();

    this.computeTotal();
  }

  removeBook(id: number) {
    this.cartService.setBook(id, 0, '', '', -1);
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
      data.BookList.push({ BookId: book.BookId, Qty: book.Qty });
    });

    this.cartService.makeOrder(data).subscribe(
      (response) => {
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
