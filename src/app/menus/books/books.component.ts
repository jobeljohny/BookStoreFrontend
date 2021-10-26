import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
declare var $: any;
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit, OnDestroy {
  books!: Book[];
  currentYear: number = new Date().getFullYear();

  constructor() {}

  ngOnDestroy(): void {}

  ngOnInit(): void {}

  setBooks(data: Book[]) {
    this.books = data;
  }
}
