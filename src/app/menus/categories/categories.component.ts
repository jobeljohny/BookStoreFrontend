import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { map } from 'rxjs/operators';
//changes2
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  @Output() getBooks = new EventEmitter<Book[]>();

  books!: Book[];
  categories=['Kids','Science','Cook Books','Novel']

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    
    this.bookService
      .getAllBooks()
      .pipe(map((response) => response.filter((res) => res.Status)))
      .subscribe(
        (data: Book[]) => {
          this.getBooks.emit(data);
          this.setBooks(data);
        },
        (error) => {
          alert(error.error.Message);
        }
      );
  }
  onClick(d:string) {
    
    this.bookService.getBooksByField( { field:'Category', data: d }).subscribe(
      (data: Book[]) => {
        this.getBooks.emit(data);
        this.setBooks(data);
      },
      (error) => {
        alert(error.error.Message);
      }
    );
  }
  
  setBooks(data: Book[]) {
    this.books = data;
  }

}
