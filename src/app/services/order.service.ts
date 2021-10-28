import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseurl: string = 'https://localhost:44393/api/';

  private tempOrderDetails: Order | null = null;

  constructor(private http: HttpClient) {}

  getTempOrderDetails() {
    return this.tempOrderDetails;
  }

  deleteTempOrderDetails() {
    this.tempOrderDetails = null;
  }

  getAllOrders(id: number) {
    return this.http.get<Order[]>(this.baseurl + 'appUsers/orders', {
      params: new HttpParams().set('id', id),
    });
  }

  getOrderDetails(id: number) {
    return this.http
      .get<Order>(this.baseurl + 'bookorders/orderdetails', {
        params: new HttpParams().set('id', id),
      })
      .pipe(
        map((response) => {
          this.tempOrderDetails = response;
          return response;
        })
      );
  }
}
