import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  baseurl: string = 'https://localhost:44393/api/';

  constructor(private http: HttpClient) {}

  getAllCategoryIdsAndNames() {
    return this.http.get<{ CategoryId: number; Name: string }[]>(
      this.baseurl + 'categories'
    );
  }

  getCategory(id: string) {
    return this.http.get<Category>(this.baseurl + 'categories/' + id);
  }
}
