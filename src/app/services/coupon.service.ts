import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coupon } from '../models/coupon';

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  baseurl: string = 'https://localhost:44393/api/';

  constructor(private http: HttpClient) {}

  getCouponFromCode(code: string) {
    return this.http.get<Coupon>(this.baseurl + '/coupons', {
      params: new HttpParams().set('code', code),
    });
  }
}
