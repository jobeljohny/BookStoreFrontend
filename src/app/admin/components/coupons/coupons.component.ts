import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styles: [
  ]
})
export class CouponsComponent implements OnInit {
  addCounponForm=new FormGroup({
    couponCode: new FormControl('',[Validators.required, Validators.minLength(6)]),
    discountAmount:new FormControl('',[Validators.required])
  });

  constructor() { }

  ngOnInit(): void {
  }

}
