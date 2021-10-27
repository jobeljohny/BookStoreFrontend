import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginContainerCardComponent } from './auth/components/login-container-card/login-container-card.component';
import { CartComponent } from './general/components/cart/cart.component';
import { HomeComponent } from './homepage/components/home.component';
import { BooksDetailsComponent } from './menus/books/books-details/books-details.component';
import { BooksComponent } from './menus/books/books.component';
import { CategoriesComponent } from './menus/categories/categories.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginContainerCardComponent },
  { path: 'books', component: BooksComponent },
  { path: 'books/:id', component: BooksDetailsComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'cart', component: CartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
