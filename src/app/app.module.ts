import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginSignupComponent } from './auth/components/login-signup/login-signup.component';
import { LoginContainerCardComponent } from './auth/components/login-container-card/login-container-card.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { BooksComponent } from './menus/books/books.component';
import { SearchBarComponent } from './general/components/search-bar/search-bar.component';
import { HomeComponent } from './homepage/components/home.component';
import { HeroblockComponent } from './homepage/components/heroblock/heroblock.component';
import { BookcardComponent } from './homepage/components/bookcard/bookcard.component';
import { CategoriesComponent } from './menus/categories/categories.component';
import { BooksDetailsComponent } from './menus/books/books-details/books-details.component';


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
    BooksDetailsComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
