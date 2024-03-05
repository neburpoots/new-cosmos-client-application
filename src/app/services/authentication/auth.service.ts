// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router'; // Import the Router

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080'; // Replace with your API URL
  private readonly TOKEN_KEY = 'access_token';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    // Make API request to your login endpoint
    const body = { username, password };
    let result = this.http.post(`${this.apiUrl}/api/auth/login`, body, { withCredentials: true }).pipe(
      tap((response: any) => {
        const token = response.access_token;
        this.setToken(token);
      })
    );
    return result;

  }

  refresh(): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/refresh`, {}, { withCredentials: true }).pipe(
      tap((response: any) => {
        const token = response.access_token;
        this.setToken(token);
      }, (error) => this.logout())

    );
  }

  logout(): void {
    this.removeToken();
    this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  // Add methods for refreshing token, checking authentication state, etc.
}
