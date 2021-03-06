import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Account } from '../models/account';
import { map } from 'rxjs/operators';
import { parseJwtToken } from '../utilities/parseJwt';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseurl: string = 'https://localhost:44393/api/appusers/';

  private currentUserSource = new ReplaySubject<Account>(1);

  public token = '';

  currentUser$ = this.currentUserSource.asObservable();

  constructor(
    private http: HttpClient,
    private notifyService: NotificationService
  ) {
    if (this.isLoggedIn()) this.token = this.getCurrentUser().token;
  }

  getCurrentUser() {
    if (!this.isLoggedIn()) return null;
    else return JSON.parse(localStorage.getItem('user')!);
  }

  login(model: any) {
    return this.http.post<Account>(this.baseurl + 'login', model).pipe(
      map((response: any) => {
        let data = parseJwtToken(response);
        const user: Account = {
          name: data.unique_name,
          token: response,
          id: data.nameid,
          role: data.role,
        };

        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.token = user.token;
          this.notifyService.showSuccess('Success in Login', 'Welcome');
          this.currentUserSource.next(user);
        }
      })
    );
  }

  isLoggedIn() {
    return localStorage.getItem('user') != null;
  }

  setCurrentUser(user: Account) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.token = '';
    this.notifyService.showSuccess('Logged Out', '');
    this.currentUserSource.next();
  }

  register(model: any) {
    return this.http.post<Account>(this.baseurl + 'register', model).pipe(
      map((response: any) => {
        let data = parseJwtToken(response);
        const user: Account = {
          name: data.unique_name,
          token: response,
          id: data.nameid,
          role: data.role,
        };
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.token = user.token;
          this.notifyService.showSuccess('Success in Registration', 'Welcome!');
          this.currentUserSource.next(user);
        }
        return user;
      })
    );
  }
}
