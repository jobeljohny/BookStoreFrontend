import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseurl: string = 'https://localhost:44393/api/';

  constructor(private http: HttpClient) {}

  getAllNonAdminUsers() {
    return this.http.get<User[]>(this.baseurl + 'appusers/users');
  }

  toggleActivation(user: User) {
    user.IsActive = !user.IsActive;
    return this.http.put(this.baseurl + 'appusers/', user, {
      params: new HttpParams().set('id', user.Id),
    });
  }
}
