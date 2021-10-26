import { Component, OnInit } from '@angular/core';
//changes2
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories=['Kids','Science','Cook Books','Novel']
  constructor() { }

  ngOnInit(): void {
  }

}
