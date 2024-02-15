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
  private apiUrl = 'http://localhost:5181'; // Replace with your API URL
  private readonly TOKEN_KEY = 'access_token';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    // Make API request to your login endpoint
    const body = { email, password };
    let result = this.http.post(`${this.apiUrl}/api/account/login`, body).pipe(
      tap((response: any) => {
        const token = response.token;
        this.setToken(token);
      })
    );
    this.router.navigate(['/user/dashboard']); // Add this line
    return result;

  }

  refresh(): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/account/refresh`, {}).pipe(
      tap((response: any) => {
        const token = response.token;
        this.setToken(token);
      })
    );
  }

  logout(): void {
    this.removeToken();
    // Add additional cleanup logic if needed
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
