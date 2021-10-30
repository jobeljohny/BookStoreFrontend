import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss'],
})
export class EditBookComponent implements OnInit {
  imageSrc = '';
  currentYear = new Date().getFullYear();
  categories: { CategoryId: number; Name: string }[] = [];

  editBookForm = new FormGroup({
    Title: new FormControl('', [Validators.minLength(3), Validators.required]),
    Author: new FormControl('', [Validators.minLength(3), Validators.required]),
    ISBN: new FormControl('', [Validators.minLength(12), Validators.required]),
    Year: new FormControl('', [Validators.required]),
    Position: new FormControl('', [Validators.required]),
    CategoryId: new FormControl('', [Validators.required]),
    Category: new FormControl(''),
    Status: new FormControl('', [Validators.required]),
    Price: new FormControl('', [Validators.required]),
    Qty: new FormControl('', [Validators.required]),
    Featured: new FormControl('', [Validators.required]),
    Description: new FormControl('', [Validators.required]),
    Image: new FormControl(''),
    BookId: new FormControl(''),
  });

  constructor(
    private activeRoute: ActivatedRoute,
    private bookService: BookService,
    private categoryService: CategoryService
  ) {
    this.categoryService.getAllCategoryIdsAndNames().subscribe((response) => {
      this.categories = response;
      this.activeRoute.paramMap.subscribe((params: Params) => {
        this.bookService
          .getBookDetails(params.get('id').toString())
          .subscribe((response) => {
            this.imageSrc = response.Image!;
            response.Image = response
              .Image!.replace('data:', '')
              .replace(/^.+,/, '');

            this.editBookForm.setValue(response);
            this.editBookForm.controls['CategoryId'].setValue(
              this.categories.find(
                (category) => category.Name == response.Category
              )?.CategoryId
            );
          });
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
        this.editBookForm.controls['Image'].setErrors({ invalid: true });
        return;
      }
      reader.readAsDataURL(file);

      reader.onload = () => {
        let base64 = (reader.result as string)
          .replace('data:', '')
          .replace(/^.+,/, '');

        this.imageSrc = reader.result as string;

        this.editBookForm.controls['Image'].setValue(base64);
        this.editBookForm.controls['Image'].setErrors(null);
      };
    }
  }

  OnSubmit() {
    this.editBookForm.controls['CategoryId'].setValue(
      parseInt(this.editBookForm.controls['CategoryId'].value)
    );

    if (this.editBookForm.controls['Status'].touched) {
      this.editBookForm.controls['Status'].setValue(
        this.editBookForm.controls['Status'].value === '1'
      );
    }

    if (this.editBookForm.controls['Featured'].touched) {
      this.editBookForm.controls['Featured'].setValue(
        this.editBookForm.controls['Featured'].value === '1'
      );
    }

    this.bookService.editBook(this.editBookForm.value).subscribe();
  }

  removeFile() {
    this.editBookForm.controls['Image'].setValue('');
    this.editBookForm.controls['Image'].setErrors(null);
  }

  ngOnInit(): void {
    this.editBookForm.controls['Image'].valueChanges.subscribe((res) => {
      if (this.editBookForm.controls['Image'].value == '') this.imageSrc = '';
    });
  }
}
