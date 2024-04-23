import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from "@angular/core";
import { createPopper } from "@popperjs/core";
import { AuthService } from "../../../services/authentication/auth.service";
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component({
  selector: "app-user-dropdown",
  templateUrl: "./user-dropdown.component.html",
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }), // Start with 0 opacity
        animate('0.2s', style({ opacity: 1 })) // Fade in animation
      ])
    ]),
  ]
})
export class UserDropdownComponent {

  isUserDropdownOpen = false;

  constructor(protected authService: AuthService) {

  }

  toggle() {
    this.isUserDropdownOpen = !this.isUserDropdownOpen;
  }


  logout() {
    this.authService.logout();
  }
}
