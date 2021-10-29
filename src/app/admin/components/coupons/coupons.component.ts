import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Coupon } from 'src/app/models/coupon';
import { CouponService } from 'src/app/services/coupon.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styles: [],
})
export class CouponsComponent implements OnInit {
  coupons: Coupon[] = [];
  private modalRef: NgbModalRef | null = null;
  couponToBeDeleted: Coupon | null = null;

  addCouponForm = new FormGroup({
    CouponCode: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    Discount: new FormControl('', [Validators.required]),
  });

  constructor(
    private couponService: CouponService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  unsetCouponToBeDeleted() {
    this.couponToBeDeleted = null;
    this.modalRef?.close();
    console.log('loo', this.couponToBeDeleted);
  }

  setCouponToBeDeleted(model: any, coupon: Coupon) {
    this.couponToBeDeleted = coupon;
    this.modalRef = this.modalService.open(model, {
      centered: true,
      backdrop: 'static',
    });

    console.log(this.couponToBeDeleted);
  }

  deleteCoupon() {
    if (this.couponToBeDeleted != null)
      this.couponService
        .deleteCoupon(this.couponToBeDeleted.CouponId)
        .subscribe((res) => {
          this.couponToBeDeleted = null;
          this.modalRef?.close();
          this.ngOnInit();
        });
  }

  OnSubmit() {
    this.couponService
      .addCoupon(this.addCouponForm.value)
      .subscribe((response) => {
        this.ngOnInit();
      });
  }

  ngOnInit(): void {
    this.couponService.getAllCoupons().subscribe((response) => {
      this.coupons = response;
    });

    this.addCouponForm.reset();
  }
}
