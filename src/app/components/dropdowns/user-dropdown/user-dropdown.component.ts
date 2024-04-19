import { Component, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { createPopper } from "@popperjs/core";
import { AuthService } from "../../../services/authentication/auth.service";

@Component({
  selector: "app-user-dropdown",
  templateUrl: "./user-dropdown.component.html",
})
export class UserDropdownComponent {

  currentUsername: string = "User";

  constructor(protected authService: AuthService) {
    authService.currentUsername$.subscribe(user => {
      console.log(user);
      this.currentUsername = user ?? "User";
    });
  }


  logout() {
    this.authService.logout();
  }
}
