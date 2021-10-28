import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginSignupComponent } from './auth/components/login-signup/login-signup.component';
import { LoginContainerCardComponent } from './auth/components/login-container-card/login-container-card.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { BooksComponent } from './menus/books/books.component';
import { SearchBarComponent } from './general/components/search-bar/search-bar.component';
import { HomeComponent } from './homepage/components/home.component';
import { HeroblockComponent } from './homepage/components/heroblock/heroblock.component';
import { BookcardComponent } from './general/components/bookcard-list/bookcard/bookcard.component';
import { CategoriesComponent } from './menus/categories/categories.component';
import { BooksDetailsComponent } from './menus/books/books-details/books-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './general/components/cart/cart.component';
import { WishlistComponent } from './menus/wishlist/wishlist.component';
import { BookcardListComponent } from './general/components/bookcard-list/bookcard-list.component';
<<<<<<< HEAD
import { OrdersComponent } from './general/components/orders/orders.component';
import { OrderDetailsComponent } from './general/components/orders/order-details/order-details.component';
=======
import { AddBooksComponent } from './admin/components/add-books/add-books.component';
>>>>>>> b6ec4777845056c5f03de0eff75130e88c4cb1e6

@NgModule({
  declarations: [
    AppComponent,
    LoginSignupComponent,
    LoginContainerCardComponent,
    HeaderComponent,
    FooterComponent,
    BooksComponent,
    SearchBarComponent,
    HomeComponent,
    HeroblockComponent,
    BookcardComponent,
    CategoriesComponent,
    BooksDetailsComponent,
    CartComponent,
    WishlistComponent,
    BookcardListComponent,
<<<<<<< HEAD
    OrdersComponent,
    OrderDetailsComponent,
=======
    AddBooksComponent,
>>>>>>> b6ec4777845056c5f03de0eff75130e88c4cb1e6
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
