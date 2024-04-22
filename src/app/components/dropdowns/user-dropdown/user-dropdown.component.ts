import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from "@angular/core";
import { createPopper } from "@popperjs/core";
import { AuthService } from "../../../services/authentication/auth.service";

@Component({
  selector: "app-user-dropdown",
  templateUrl: "./user-dropdown.component.html",
})
export class UserDropdownComponent {

  currentUsername: string = "User";

  constructor(protected authService: AuthService) {

  }


  logout() {
    this.authService.logout();
  }
}
