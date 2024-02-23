// auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  private isRefreshing = false;

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {

          return this.authService.refresh().pipe(
            switchMap(() => {
              // Retry the original request with the new token
              return next.handle(request.clone({
                setHeaders: {
                  Authorization: `Bearer ${this.authService.getToken()}`,
                },
              }));
            }),
            catchError((refreshError) => {
              
              console.log('test')
              // Handle refresh error, possibly redirect to login
              // or propagate the error depending on your application logic
              this.authService.logout();
              return throwError(refreshError);
            })
          );
        }

        return throwError(error);

      })
    );
  }
}