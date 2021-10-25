import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginContainerCardComponent } from './auth/components/login-container-card/login-container-card.component';
import { HomeComponent } from './homepage/home/home.component';
import { BooksComponent } from './menus/books/books.component';


const routes: Routes = [
  // {path:'',component : HomeComponent},
  {path:'',component : HomeComponent},
  {path:'login',component : LoginContainerCardComponent},
  {path:'books',component : BooksComponent}

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
