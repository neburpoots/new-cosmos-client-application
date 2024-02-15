// login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../../services/authentication/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  login(email: string, password: string): void {
    console.log(email, password)
    this.authService.login(email, password).subscribe(
      (response) => {
        // Handle successful login
        console.log(response);
        // Store tokens in a secure place (e.g., in local storage or a service)
      },
      (error) => {
        // Handle login error
        console.error(error);
      }
    );
  }
}