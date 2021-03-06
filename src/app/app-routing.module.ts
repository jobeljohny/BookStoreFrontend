import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBooksComponent } from './admin/components/add-books/add-books.component';
import { LoginContainerCardComponent } from './auth/components/login-container-card/login-container-card.component';
import { AdminGuardService } from './auth/guards/admin.guard';
import { GuardService } from './auth/guards/guard.guard';
import { LoginGuardService } from './auth/guards/login.guard';
import { CartComponent } from './general/components/cart/cart.component';
import { OrderDetailsComponent } from './general/components/orders/order-details/order-details.component';
import { OrdersComponent } from './general/components/orders/orders.component';
import { HomeComponent } from './homepage/components/home.component';
import { BooksDetailsComponent } from './menus/books/books-details/books-details.component';
import { BooksComponent } from './menus/books/books.component';
import { CategoriesComponent } from './menus/categories/categories.component';
import { WishlistComponent } from './menus/wishlist/wishlist.component';
import { CouponsComponent } from './admin/components/coupons/coupons.component';
import { ViewUsersComponent } from './admin/components/view-users/view-users.component';
import { EditBookComponent } from './admin/components/edit-book/edit-book.component';
import { AboutUsComponent } from './menus/about-us/about-us.component';
import { ContactUsComponent } from './menus/contact-us/contact-us.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'login',
    component: LoginContainerCardComponent,
    canActivate: [LoginGuardService],
  },
  { path: 'books', component: BooksComponent },
  { path: 'books/:id', component: BooksDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'orders', component: OrdersComponent, canActivate: [GuardService] },
  {
    path: 'orders/:id',
    component: OrdersComponent,
    canActivate: [AdminGuardService],
  },
  { path: 'order-details', component: OrderDetailsComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactUsComponent },
  {
    path: 'add-book',
    component: AddBooksComponent,
    canActivate: [AdminGuardService],
  },
  {
    path: 'add-coupon',
    component: CouponsComponent,
    canActivate: [AdminGuardService],
  },
  {
    path: 'view-users',
    component: ViewUsersComponent,
    canActivate: [AdminGuardService],
  },
  {
    path: 'edit-book/:id',
    component: EditBookComponent,
    canActivate: [AdminGuardService],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
