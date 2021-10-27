import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.scss']
})
export class AddBooksComponent implements OnInit {
  addBookForm = new FormGroup({
    bookName:new FormControl('',[Validators.minLength(3),Validators.required]),
    bookAuthor:new FormControl('',[Validators.minLength(3),Validators.required]),
    isbnNumber:new FormControl('',[Validators.minLength(12),Validators.required]),
    publishedYear:new FormControl('',[Validators.required]),
    bookPosition:new FormControl('',[Validators.required]),  
    bookCategory:new FormControl('',[Validators.required]),
    bookStatus:new FormControl('',[Validators.required]),
    bookPrice:new FormControl('',[Validators.required]),
    bookQuantity:new FormControl('',[Validators.required]),
    isBookFeatured:new FormControl('',[Validators.required]),
    bookDescribtion:new FormControl('',[Validators.required]),
    // image?.....................................

  });


  constructor() { }

  ngOnInit(): void {
  }

}
