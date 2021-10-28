import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.scss'],
})
export class AddBooksComponent implements OnInit {
  imageSrc = '';
  currentYear = new Date().getFullYear();
  categories: { CategoryId: number; Name: string }[] = [];

  addBookForm = new FormGroup({
    Title: new FormControl('', [Validators.minLength(3), Validators.required]),
    Author: new FormControl('', [Validators.minLength(3), Validators.required]),
    ISBN: new FormControl('', [Validators.minLength(12), Validators.required]),
    Year: new FormControl('', [Validators.required]),
    Position: new FormControl('', [Validators.required]),
    CategoryId: new FormControl('', [Validators.required]),
    Status: new FormControl('', [Validators.required]),
    Price: new FormControl('', [Validators.required]),
    Qty: new FormControl('', [Validators.required]),
    Featured: new FormControl('', [Validators.required]),
    Description: new FormControl('', [Validators.required]),
    Image: new FormControl(''),
  });

  constructor(
    private categoryService: CategoryService,
    private bookservice: BookService,
    private router: Router
  ) {
    this.categoryService.getAllCategoryIdsAndNames().subscribe((response) => {
      response.forEach((category) => {
        this.categories.push(category);
      });
    });
  }

  onFileChange(event: Event) {
    const reader = new FileReader();
    let target = event.target as HTMLInputElement;

    if (target != null && target.files != null && target.files.length > 0) {
      const file = target.files[0];

      const ext = file.name.split('.')[1].toLowerCase();

      if (!['png', 'jpg', 'jpeg'].includes(ext)) {
        this.addBookForm.controls['Image'].setErrors({ invalid: true });
        return;
      }
      reader.readAsDataURL(file);

      reader.onload = () => {
        let base64 = (reader.result as string)
          .replace('data:', '')
          .replace(/^.+,/, '');

        this.imageSrc = reader.result as string;

        this.addBookForm.controls['Image'].setValue(base64);
        this.addBookForm.controls['Image'].setErrors(null);
      };
    }
  }

  removeFile() {
    this.addBookForm.controls['Image'].setValue('');
    this.addBookForm.controls['Image'].setErrors(null);
  }

  OnSubmit() {
    this.addBookForm.controls['CategoryId'].setValue(
      parseInt(this.addBookForm.controls['CategoryId'].value)
    );

    this.addBookForm.controls['Status'].setValue(
      this.addBookForm.controls['Status'].value === '1'
    );

    this.addBookForm.controls['Featured'].setValue(
      this.addBookForm.controls['Featured'].value === '1'
    );

    this.bookservice.addBook(this.addBookForm.value).subscribe(response => {
      this.router.navigate(['/books'])
    });
  }

  ngOnInit(): void {
    this.addBookForm.controls['Image'].valueChanges.subscribe((res) => {
      if (this.addBookForm.controls['Image'].value == '') this.imageSrc = '';
    });
  }
}
