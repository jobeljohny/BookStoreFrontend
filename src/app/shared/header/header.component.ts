import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { CartService } from 'src/app/services/cart.service';
import { WishListService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    public accountService: AccountService,
    public wishListService: WishListService,
    public cartService: CartService
  ) {}

  ngOnInit(): void {}

  logout() {
    this.accountService.logout();
    this.wishListService.getWishList()?.subscribe();
  }
}
