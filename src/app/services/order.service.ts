import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseurl: string = 'https://localhost:44393/api/';

  base64DefaultString = '';
  base64StringHeader = 'data:image/png;base64,';

  private tempOrderDetails: Order | null = null;

  constructor(private http: HttpClient) {
    this.http
      .get('assets/text/default-image-base64.txt', {
        responseType: 'text',
      })
      .subscribe((data) => {
        this.base64DefaultString = data;
      });
  }

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
          response.BookList?.forEach((item) => {
            if (item.book.Image == null)
              item.book.Image =
                this.base64StringHeader + this.base64DefaultString;
            else item.book.Image = this.base64StringHeader + item.book.Image;
          });
          this.tempOrderDetails = response;
          return response;
        })
      );
  }
}
