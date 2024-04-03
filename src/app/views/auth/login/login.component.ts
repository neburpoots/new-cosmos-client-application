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
  constructor(private toastr: ToastrService, private authService: AuthService, private router: Router) { }

  async login(username: string, password: string): Promise<void> {
    console.log(username, password)
    await this.authService.login(username, password).subscribe
      (
        result => {
          //console.log(result);	
          if (result) {
            this.router.navigate(['/user/dashboard'])
            this.toastr.success('Logged in successfully!', 'Success');

          }
        }
      );;
  }
}