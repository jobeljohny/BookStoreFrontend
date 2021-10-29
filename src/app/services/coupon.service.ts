import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Coupon } from '../models/coupon';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  baseurl: string = 'https://localhost:44393/api/';

  constructor(
    private http: HttpClient,
    private notifyService: NotificationService
  ) {}

  getCouponFromCode(code: string) {
    return this.http.get<Coupon>(this.baseurl + 'coupons', {
      params: new HttpParams().set('code', code),
    });
  }

  getAllCoupons() {
    return this.http.get<Coupon[]>(this.baseurl + 'coupons');
  }

  deleteCoupon(id: number) {
    return this.http.delete(this.baseurl + 'coupons/' + id.toString()).pipe(
      tap(
        (res) => {
          this.notifyService.showInfo('Coupon Deleted', '');
        },
        catchError((err) => {
          this.notifyService.showError(
            err.error.Message,
            'Error in Deleting Coupon'
          );
          throw err;
        })
      )
    );
  }

  addCoupon(coupon: Coupon) {
    return this.http.post(this.baseurl + 'coupons/', coupon).pipe(
      tap(
        (res) => {
          this.notifyService.showSuccess('Coupon Added', 'Success');
        },
        catchError((err) => {
          this.notifyService.showError(
            err.error.Message,
            'Error in Adding Coupon'
          );
          throw err;
        })
      )
    );
  }
}
