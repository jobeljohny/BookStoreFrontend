import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order';
import { CouponService } from 'src/app/services/coupon.service';
import { Coupon } from 'src/app/models/coupon';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
  orderDetails: Order;
  Total: number = 0;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private couponService: CouponService
  ) {
    this.orderDetails = this.orderService.getTempOrderDetails()!;
    if (this.orderDetails == null) router.navigate(['/orders']);

    this.orderDetails.BookList?.forEach((item) => {
      this.Total += item.book.Price * item.qty;
    });

    if (this.orderDetails.CouponCode != 'null') {
      this.couponService
        .getCouponFromCode(this.orderDetails.CouponCode!)
        .subscribe((response: Coupon) => {
          this.Total -= response.Discount;
        });
    }
  }

  ngOnDestroy(): void {
    this.orderService.deleteTempOrderDetails();
  }

  ngOnInit(): void {}
}
