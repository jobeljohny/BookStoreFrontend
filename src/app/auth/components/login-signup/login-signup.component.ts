import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { WishListService } from 'src/app/services/wishlist.service';

declare var $: any;
@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.scss'],
})
export class LoginSignupComponent implements OnInit {
  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    Address: new FormControl(null, [Validators.required]),
  });

  loginForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private accountService: AccountService,
    private router: Router,
    private wishListService: WishListService
  ) {
    if (this.accountService.isLoggedIn()) this.router.navigate(['/']);
  }

  ngOnInit(): void {}

  register() {
    this.accountService.register(this.registerForm.value).subscribe(
      (response) => {
        this.wishListService.getWishList();
        this.router.navigate(['/']);
      },
      (error) => {
        alert(error.error.Message);
      }
    );
  }

  login() {
    this.accountService.login(this.loginForm.value).subscribe(
      (response) => {
        this.wishListService.getWishList();
        this.router.navigate(['/']);
      },
      (error) => {
        alert(error.error.Message);
      }
    );
  }

  menuButtonClick() {
    $('.form-signin').toggleClass('form-signin-left');
    $('.form-signup').toggleClass('form-signup-left');
    $('.frame').toggleClass('frame-long');
    $('.signup-inactive').toggleClass('signup-active');
    $('.signin-active').toggleClass('signin-inactive');
    $('.forgot').toggleClass('forgot-left');
    $(this).removeClass('idle').addClass('active');
  }

  signUpButtonClick() {
    $('.nav').toggleClass('nav-up');
    $('.form-signup-left').toggleClass('form-signup-down');
    $('.success').toggleClass('success-left');
    $('.frame').toggleClass('frame-short');
  }

  signInButtonClick() {
    $('.btn-animate').toggleClass('btn-animate-grow');
    $('.welcome').toggleClass('welcome-left');
    $('.cover-photo').toggleClass('cover-photo-down');
    $('.frame').toggleClass('frame-short');
    $('.profile-photo').toggleClass('profile-photo-down');
    $('.btn-goback').toggleClass('btn-goback-up');
    $('.forgot').toggleClass('forgot-fade');
  }
}
