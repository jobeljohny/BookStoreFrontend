import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private accountService: AccountService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.accountService.token !== '') {
      const cloned = req.clone({
        headers: req.headers.set(
          'Authorization',
          'Bearer ' + this.accountService.token
        ),
      });

      return next.handle(cloned);
    } else return next.handle(req);
  }
}
