import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.scss'],
})
export class AddBooksComponent implements OnInit {
  addBookForm = new FormGroup({
    Title: new FormControl('', [Validators.minLength(3), Validators.required]),
    Author: new FormControl('', [Validators.minLength(3), Validators.required]),
    ISBN: new FormControl('', [Validators.minLength(12), Validators.required]),
    Year: new FormControl('', [Validators.required]),
    Position: new FormControl('', [Validators.required]),
    CategorId: new FormControl('', [Validators.required]),
    Status: new FormControl('', [Validators.required]),
    Price: new FormControl('', [Validators.required]),
    Qty: new FormControl('', [Validators.required]),
    Featured: new FormControl('', [Validators.required]),
    Describtion: new FormControl('', [Validators.required]),
    // image?.....................................
  });

  constructor(private router: Router, private accountService: AccountService) {
    if (
      this.accountService.isLoggedIn() === false ||
      this.accountService.getCurrentUser().role !== 'Admin'
    )
      this.router.navigate(['/']);
  }

  ngOnInit(): void {}
}
