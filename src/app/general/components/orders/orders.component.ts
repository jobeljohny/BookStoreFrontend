import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { Order } from 'src/app/models/order';
import { AccountService } from 'src/app/services/account.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  orders: Order[] | null = null;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private orderService: OrderService
  ) {
    this.activeRoute.paramMap.subscribe((params: Params) => {
      this.orderService
        .getAllOrders(
          params.get('id')
            ? params.get('id')
            : this.accountService.getCurrentUser().id
        )
        .subscribe((response) => {
          this.orders = response.reverse();
        });
    });
  }

  goToDetails(orderId: number) {
    this.orderService.getOrderDetails(orderId).subscribe((res) => {
      this.router.navigate(['/order-details']);
    });
  }

  ngOnInit(): void {}
}
