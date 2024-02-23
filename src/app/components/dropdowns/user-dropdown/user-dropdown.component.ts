import { Component, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { createPopper } from "@popperjs/core";
import { AuthService } from "../../../services/authentication/auth.service";

@Component({
  selector: "app-user-dropdown",
  templateUrl: "./user-dropdown.component.html",
})
export class UserDropdownComponent implements AfterViewInit {

  constructor(private authService: AuthService) { }

  dropdownPopoverShow = false;
  @ViewChild("btnDropdownRef", { static: false }) btnDropdownRef!: ElementRef;
  @ViewChild("popoverDropdownRef", { static: false })
  popoverDropdownRef!: ElementRef;
  ngAfterViewInit() {
    createPopper(
      this.btnDropdownRef.nativeElement,
      this.popoverDropdownRef.nativeElement,
      {
        placement: "bottom-start",
      }
    );
  }
  toggleDropdown(event : any) {
    event.preventDefault();
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
    } else {
      this.dropdownPopoverShow = true;
    }
  }
  logout() {
    this.authService.logout();
  }
}
