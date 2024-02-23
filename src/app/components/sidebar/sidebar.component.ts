import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/authentication/auth.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
})
export class SidebarComponent implements OnInit {
  collapseShow = "hidden";
  favoritesDropdownActive: boolean = false;
  assembleDropdownActive: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() { }
  toggleCollapseShow(classes: any) {
    this.collapseShow = classes;
  }

  logout() {
    this.authService.logout();
  }


  // Method to toggle the dropdown state
  toggleFavoritesDropdown() {
    this.favoritesDropdownActive = !this.favoritesDropdownActive;
  }

  // Method to toggle the dropdown state
  toggleAssembliesDropdown() {
    this.assembleDropdownActive = !this.assembleDropdownActive;
  }
}
