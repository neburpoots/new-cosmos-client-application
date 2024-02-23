// login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../../services/authentication/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(private toastr: ToastrService, private authService: AuthService, private router: Router) {}

  login(username: string, password: string): void {
    console.log(username, password)
    this.authService.login(username, password).subscribe(
      (response) => {
        // Handle successful login
        console.log(response);

        
        this.router.navigate(['/user/dashboard']); // Add this line
        this.toastr.success('Welcome back!', 'Success');
        // Store tokens in a secure place (e.g., in local storage or a service)
      },
      (error) => {
        this.toastr.error('Invalid username or password', 'Error');
        // Handle login error
        console.error(error);
      }
    );
  }
}